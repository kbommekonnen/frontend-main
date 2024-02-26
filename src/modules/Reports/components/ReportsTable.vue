<template>
  <div
    class="space-y-1 flex flex-col overflow-x-visible max-w-full max-h-full bg-primaryBg"
  >
    <div class="space-y-3 bg-white shadow-top w-full p-3">
      <div class="flex justify-between space-x-4">
        <div class="flex-grow flex space-x-3 text-sm">
          <base-button
            v-if="hasAdvancedFilterOption"
            type="plain"
            label="advancel filter"
            :icon="showAdvancedFilter ? 'chevron-down' : 'chevron-up'"
            @click="toggleShowFilter"
            :iconRight="true"
          />
          <slot name="primaryFilter"></slot>
        </div>
        <div class="flex flex-wrap gap-2 items-center">
          <base-button
            type="secondary"
            label="export as pdf"
            padding="small"
            icon="file-pdf"
            class="flex-shrink-0"
          />
          <base-button
            label="export as excel"
            icon="file-excel"
            class="flex-shrink-0"
          />
          <div class="flex space-x-2 px-3">
            <base-icon
              name="sync"
              class="text-primary cursor-pointer"
              @click="getDocuments"
            />
          </div>
        </div>
      </div>
      <div class="space-y-1 text-center">
        <div class="capitalize">{{ $t(userStore.user.organization.name) }}</div>
        <div class="light-title text-xl capitalize">{{ $t(title) }}</div>
        <slot name="subtitle"
          ><div class="first-letter:uppercase">{{ subtitle }}</div></slot
        >
      </div>
    </div>
    <div
      v-if="showAdvancedFilter && hasAdvancedFilterOption"
      class="bg-white p-3"
    >
      <slot name="advanced-filter"></slot>
    </div>
    <div
      v-if="showHeader"
      class="flex space-x-2 justify-between items-center flex-grow-0 p-4 bg-white shadow-top"
    >
      <div class="flex-auto">
        <slot name="more-head-display">
          <div class="light-title text-xl capitalize tracking-wider">
            {{ title }}
          </div>
        </slot>
      </div>

      <div class="flex space-x-3 items-center">
        <!-- search -->
        <div v-if="searchApi" class="flex flex-grow space-x-1 items-center">
          <base-input
            v-model="search"
            :size="12"
            padding="small"
            :placeholder="'SEARCH'"
            class="search"
            @enter="handleSearch"
          />
        </div>

        <base-icon
          name="sync"
          class="text-primary cursor-pointer"
          @click="getDocuments"
        />
        <base-icon
          name="file-export"
          class="text-primary cursor-pointer"
          @click="openSmartExport"
        />
        <base-button
          v-if="letCreate"
          :icon="actionIcon"
          :label="createLabel || 'new'"
          class="flex-shrink-0"
          @click="createHandler"
        />
        <base-select
          v-if="!hideSort"
          :items="sortOptions"
          v-model="newestFirst"
          padding="small"
          background="#fff"
        >
          <template #default="{ item }">
            <div class="flex space-x-1 items-center">
              <div class="text-textLight">Sort by:</div>
              <div>{{ item.label }}</div>
            </div>
          </template>
        </base-select>
      </div>
    </div>
    <div class="flex-grow p-3 bg-white">
      <table class="w-full table-auto">
        <thead
          class="bg-primaryBg text-textDark uppercase text-xs font-semibold bg-opacity-90"
        >
          <tr class="">
            <td
              v-for="({ label, key }, i) in headerOptions"
              :key="i"
              class="tracking-wider py-2 pl-4 text-left"
              :class="{
                // 'rounded-tl-lg pl-2': i === 0,
              }"
            >
              <slot :label="label" :key="key" :name="`header_${key}`">
                {{ label }}
              </slot>
            </td>
          </tr>
        </thead>
        <tbody v-if="loading" class="w-full h-full bg-white">
          <tr class="flex justify-between space-x-3 w-full">
            <td :colspan="headerOptions.length" class="p-6">
              <div class="flex justify-center space-x-2 items-center">
                <base-loader></base-loader>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody
          v-else-if="items && items.length > 0"
          class="flex-grow bg-primaryBg"
        >
          <tr
            v-for="(item, index) in items"
            :key="index"
            :id="index"
            class="hover:bg-lgray text-textMedium bg-white border-y-4 border-primaryBg"
            :class="{
              'bg-primary text-white font-semibold': index == selectedId,
              'cursor-pointer ': canSelect,
            }"
            @click.right.prevent="toggleSelect(index, $event)"
            @dblclick.right.prevent="toggleSelect(index, $event)"
          >
            <!-- <slot :item="item" :class="{}"> -->
            <td v-for="(header, i) in headerOptions" :key="header" class="py-1">
              <div class="py-1" :class="{ 'pl-2': i === 0 }">
                <div class="flex-shrink-0 pl-3">
                  <slot
                    :value="item[header.key]"
                    :item="item"
                    :index="index"
                    :name="header.key"
                  >
                    <div
                      v-if="header.key == 'status'"
                      class="w-full input-box flex flex-wrap flex-shrink-0 flex-grow uppercase text-white text-center rounded px-2"
                    >
                      <div
                        :style="{
                          backgroundColor: getStatusColor(item.status),
                        }"
                        class="px-3 rounded"
                      >
                        {{ item[header.key] }}
                      </div>
                    </div>
                    <div
                      v-else
                      class="w-full input-box flex-shrink-0 flex-grow"
                    >
                      <template v-if="header.type == 'date'">
                        {{
                          formateDate(getProp(item, header.key), header.formate)
                        }}
                      </template>
                      <template v-else-if="header.type == 'number'">
                        {{ formateNumber(getProp(item, header.key)) }}
                      </template>
                      <template v-else>
                        {{ getProp(item, header.key) }}
                      </template>
                    </div>
                  </slot>
                </div>
              </div>
            </td>
            <!-- </slot> -->
          </tr>
        </tbody>
        <tbody v-else class="flex-grow w-full h-full bg-white">
          <tr class="w-full">
            <td :colspan="headerOptions.length" class="p-6">
              <slot name="NoData">
                <div class="flex w-full justify-center text-2xl">
                  {{ $t("NO_DATA_FOUND") }}
                </div>
              </slot>
            </td>
          </tr>
        </tbody>

        <slot name="footer" class="bg-lightYellow">
          <div class="flex bg-white py-6 px-12">
            <div
              v-if="totalPages > 1"
              class="flex space-x-2 px-4 py-3 shadow-outline rounded-lg text-textMedium text-lg"
            >
              <template v-for="(page, i) in paginations" :key="i">
                <div
                  v-if="page > 0"
                  class="shadow-outline-sm px-3 py-1 rounded cursor-pointer"
                  :class="{
                    'bg-primary text-white ': pageNumber == page,
                    'hover:text-primary': pageNumber != page,
                  }"
                  @click="pageNumber = page"
                >
                  {{ page }}
                </div>
                <base-icon
                  v-else
                  name="ellipsis-h"
                  class="self-end text-textMedium opacity-50 text-xl tracking-widest"
                />
              </template>
            </div>
            <div
              v-if="false"
              class="flex space-x-4 items-center p-2 shadow-outline rounded-lg"
            >
              <div class="flex space-x-1 items-center p-2">
                <div>{{ "SHOW" }}:</div>
                <base-select
                  :items="pageSizeOptions"
                  v-model="pageSize"
                  padding="small"
                  background="transparent"
                >
                  <template #default="{ item }">
                    <div>{{ item.label }}</div>
                  </template>
                  <template #option="{ items }">
                    <div v-for="item in items" :key="item.value">
                      {{ item.label }}
                    </div>
                  </template>
                </base-select>
              </div>
              <div class="flex items-center space-x-3 flex-shrink-0">
                <!-- <div>{{ beginning }} - {{ ending }} of {{ totalPages }}</div> -->
                <div class="flex-shrink-0">
                  {{ pageNumber }} of {{ totalPages }}
                </div>
                <div class="flex items-center">
                  <div
                    class="p-2 hover:bg-primary hover:text-white cursor-pointer rounded-full lg-grow-active"
                    @click="goPrevious"
                  >
                    <base-icon name="chevron-left" :size="12" />
                  </div>
                  <div
                    class="p-2 hover:bg-primary hover:text-white cursor-pointer rounded-full lg-grow-active"
                    @click="goNext"
                  >
                    <base-icon name="chevron-right" :size="12" />
                  </div>
                </div>
                <div class="text-textLight">GO</div>
                <base-input
                  type="number"
                  :min="1"
                  :max="totalPages"
                  v-model="pageNumber"
                />
              </div>
            </div>
          </div>
        </slot>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { getPropByString } from "@/utils"
import { useMainStore, useUserStore } from "@/stores"
import eventBus from "@/eventBus"
import { formateDate, formateNumber } from "@/utils"
export default {
  inject: ["request"],
  expose: ["items", "getDocuments"],
  props: {
    headers: { type: Array, default: () => [] },
    api: { type: String, default: "" },
    query: { type: Object, default: () => ({}) },
    searchApi: { type: String, default: "" },
    params: { type: Array },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    handlers: { type: Array, default: () => [] },
    letCreate: { type: Boolean, default: false },
    showHeader: { type: Boolean, default: false },
    createLabel: { type: String, default: "Add" },
    actionIcon: { type: String, default: "plus" },
    createHandler: { type: Boolean, default: false },
    canSelect: { type: Boolean, default: true },
    hideSort: { type: Boolean, default: true },
    paginated: { type: Boolean, default: true },
    exportable: { type: Boolean, default: false },
    hasAdvancedFilterOption: { type: Boolean, default: false },
  },
  data() {
    return {
      selectedId: -1,
      mainStore: useMainStore(),
      userStore: useUserStore(),
      loading: false,
      showAdvancedFilter: false,
      showActionsMenu: false,
      actionsMenuOffset: { x: 0, y: 0 },
      search: "",
      pageSize: 10,
      totalPages: 1,
      pageNumber: 1,
      newestFirst: true,
      pageSizeOptions: [
        { label: "2", value: 2 },
        { label: "5", value: 5 },
        { label: "10", value: 10 },
        { label: "15", value: 15 },
        { label: "20", value: 20 },
        { label: "25", value: 25 },
      ],
      sortOptions: [
        { label: "Newest Apply", value: true },
        { label: "Earliest Apply", value: false },
      ],
      filteredHeaders: [],
      items: [],
    }
  },
  computed: {
    topOffset() {
      if (this.selectedId >= 0)
        return document.getElementById(this.selectedId).offsetHeight
      else return null
    },
    paginations() {
      let totalPages = this.totalPages
      let pages = []
      if (totalPages > 15) {
        pages = Array.from({ length: 2 }).map((v, index) => index + 1)
        pages.push(-1)
        pages.push(
          ...Array.from({ length: 3 })
            .map((v, index) => Math.ceil(totalPages / 2) - index)
            .reverse(),
        )
        pages.push(-1)
        pages.push(
          ...Array.from({ length: 2 })
            .map((v, index) => totalPages - index)
            .reverse(),
        )
      } else if (totalPages > 8) {
        pages = Array.from({ length: 4 }).map((v, index) => index + 1)
        pages.push(-1)
        pages.push(
          ...Array.from({ length: 4 })
            .map((v, index) => totalPages - index)
            .reverse(),
        )
      } else if (totalPages > 1) {
        pages = Array.from({ length: totalPages }).map((v, index) => index + 1)
      }
      return pages
    },
    beginning() {
      return this.pageNumber * this.pageSize + 1
    },
    ending() {
      let ending = this.beginning + this.pageSize - 1
      if (ending > this.items.length) return this.items.length
      return ending
    },
    beginningPageReached() {
      return this.pageNumber == 1
    },
    endOfPageReached() {
      return this.pageNumber == this.totalPages
    },
    itemsDisplayed() {
      return this.items.slice(this.beginning - 1, this.ending)
    },
    hasActions() {
      return this.actionPosition == "header"
        ? this.selectedId > -1 && this.handlers.length > 0
        : this.handlers.length > 0
    },
    selected() {
      return this.items.find((item, i) => i === this.selectedId)
    },
    headerOptions() {
      // if ('start' == this.actionPosition)
      // 	return [{ key: '__actions' }, ...this.filteredHeaders];
      // else if ('end' == this.actionPosition)
      // 	return [...this.filteredHeaders, { key: '__actions' }];
      // else
      return this.filteredHeaders
    },
  },
  watch: {
    newestFirst() {
      // this.sortitems();
    },
    pageSize() {
      if (this.pageNumber == 1) {
        this.getDocuments()
      } else {
        this.pageNumber = 1
      }
    },
    pageNumber() {
      this.getDocuments()
    },
    params() {
      this.getDocuments()
    },
    query: {
      deep: true,
      immediate: false,
      handler: function () {
        this.getDocuments()
      },
    },
    api: {
      deep: true,
      immediate: false,
      handler: function () {
        this.getDocuments()
      },
    },
    "$attrs.items"() {
      this.items = this.$attrs.items
    },
  },
  methods: {
    // ...mapActions(useMainStore),
    getProp: getPropByString,
    formateDate,
    formateNumber,
    toggleShowFilter() {
      this.showAdvancedFilter = !this.showAdvancedFilter
    },
    openSmartExport() {
      eventBus.$emit("open-modal", {
        component: vite.base.components.SmartExportReport,
        componentProps: {
          headers: this.headers,
          title: "",
          filteredHeaders: this.filteredHeaders,
        },
      })
      this.downloadDocuments()
    },
    getStatusColor(status = "") {
      let colors = {
        pending: "orange",
        calculated: "orange", //salary
        due: "teal", //salary
        approved: "#3bb979",
        verified: "#3bb979",
        active: "#3bb979",
        adjusted: "#3bb979",
        given: "#3bb979", //salary
        modified: "#2B6CB0", //
        closed: "#2B6CB0", //
        terminated: "#ffe0e0",
        suspended: "orange",
        "partial paid": "teal",
      }
      return colors[status.toLowerCase()]
    },
    goPrevious() {
      if (this.beginningPageReached) return
      this.pageNumber--
    },
    goNext() {
      if (this.endOfPageReached) return
      this.pageNumber++
    },
    unselect() {
      this.selectedId = -1
      this.$emit("unselect")
    },
    select(id) {
      this.selectedId = id
      // this.$emit('select', id);
    },
    toggleSelect(index, event) {
      // if (
      //   (this.canSelect || this.hasActions) &&
      //   !["start", "end"].includes(this.actionPosition)
      // ) {
      // if (this.selectedId === index) return this.unselect();
      this.showActionsMenu = true
      this.select(index)
      this.setActionOffset(event)
      // }
    },
    setActionOffset(event) {
      this.actionsMenuOffset = {
        x: event.x,
        y: event.y,
        screenX: event.screenX,
        screenY: event.screenY,
        offsetX: event.offsetX,
        offsetY: event.offsetY,
      }
    },
    createItem() {
      this.$emit("create")
    },

    sortitems() {
      if (this.newestFirst) {
        this.items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      } else {
        this.items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      }
    },
    async getDocuments() {
      this.loading = true
      const response = await this.request({
        ...this.api,
        params: this.params,
        query: { ...this.query, page: this.pageNumber, limit: this.pageSize },
      })
      this.items = response.items || []
      this.totalPages = response.total_pages
      this.loading = false
    },
    async downloadDocuments() {
      this.mainStore.setData({ stateKey: "downloading", data: true })
      const response = await this.request({
        ...this.api,
        params: this.params,
        query: { ...this.query, page: this.pageNumber, limit: 0 },
      })
      this.setData({ stateKey: "reports", data: response.items || [] })
      this.setData({ stateKey: "downloading", data: false })
    },
    async handleSearch() {
      if (this.search == "") return this.getDocuments()
      this.loading = true
      const response = await this.request({
        ...this.searchApi,
        query: { keyword: this.search },
      })
      this.items = response.items
      this.totalPages = response.total_pages
      this.loading = false
    },
    smartHandler(action, item) {
      item = item || this.selected
      if (action.fullParam) action.function(item)
      else if (action.idParam) action.function(item._id)
      else action.handler()
    },
  },

  created() {
    this.filteredHeaders = this.headers.filter(
      ({ selected }) => selected !== false,
    )
    if (this.api) this.getDocuments()
    else if (this.$attrs.items && this.$attrs.items.length) {
      this.items = this.$attrs.items
      this.loading = false
    }
    // eventBus.$on("refresh", () => this.getDocuments());
  },

  beforeUnmount() {
    // eventBus.$off("refresh", null);
  },
}
</script>

<style>
.dark-gray {
  background-color: #8f92a1;
}
</style>
