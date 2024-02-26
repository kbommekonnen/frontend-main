<template>
  <div
    class="space-y-1 flex flex-col overflow-x-visible max-w-full max-h-full h-full overflow-y-auto bg-white"
    @scroll="handleScroll"
  >
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
        <base-icon name="filter-alt" class="text-primary cursor-pointer" />
        <!-- @click="openHeadersFilterForm" -->
        <base-icon
          name="sync"
          class="text-primary cursor-pointer"
          @click="getDocuments(true)"
        />
        <base-icon
          name="file-export"
          class="text-primary cursor-pointer"
          @click="openSmartExport"
        />
        <slot name="actions"> </slot>
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
        <!-- <div v-if="hasActions && actionPosition == 'header'" class="p-2">
          <div class="flex justify-center items-center">
            <actions :handlers="handlers" :item="selected" label="Action" />
          </div>
        </div> -->
      </div>
    </div>
    <div class="flex-grow w-full p-2">
      <table class="w-full table-auto">
        <template v-if="!(isMobileView && hasMobileSlot)">
          <thead class="bg-lightYellow text-textDark">
            <tr class="">
              <td
                v-for="({ label, key }, i) in headerOptions"
                :key="i"
                class="tracking-wide py-2 pl-4 uppercase text-left text-xs"
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
          <tbody v-if="loading" class="w-full space-y-2 h-full bg-white">
            <tr v-for="(_, index) in 4" :key="index" class="">
              <td v-for="(_, i) in headerOptions" :key="i" class="p-2 pr-16">
                <div
                  class="animate h-8 bg-gray-200 rounded dark:bg-gray-700 w-full"
                ></div>
              </td>
            </tr>
          </tbody>
          <tbody v-else class="flex-grow bg-primaryBg">
            <tr
              v-for="(item, index) in items"
              :key="index"
              :id="index"
              class="hover:bg-opacity-50 hover:text-textDark text-textMedium bg-white border-y-2 border-x-2 border-primaryBg ml-2"
              :class="{
                'bg-primaryBg text-textDark font-semibold': index == selectedId,
                'cursor-pointer ': canSelect,
              }"
              @mouseenter="showActionsIndex = index"
              @mouseleave="showActionsIndex = 0"
              @click.right.prevent="toggleSelect(index, $event)"
              @dblclick.right.prevent="toggleSelect(index, $event)"
            >
              <!-- <slot :item="item" :class="{}"> -->
              <td
                v-for="(header, i) in headerOptions"
                :key="header"
                class="py-1 align-top"
              >
                <div class="py-1" :class="{ 'pl-2': i === 0 }">
                  <div
                    v-if="
                      showActionsIndex == index &&
                      hasActions &&
                      header.key == '__actions'
                    "
                    class="inline-flex py-0 px-2 justify-start space-x-2 items-center"
                  >
                    <!-- <template> -->
                    <base-button
                      v-for="(action, i) in shownHandlers.filter(
                        ({ filter }) => !filter || filter(item),
                      )"
                      :key="i"
                      :label="action.label"
                      :type="action.type || 'secondary'"
                      :icon="action.icon"
                      class="capitalize py-0"
                      @click="smartHandler(action, item)"
                    />
                    <!-- </template> -->
                    <actions :handlers="hiddenHandlers" :item="item" />
                  </div>
                  <div v-else class="flex-shrink-0 pl-3">
                    <slot
                      :value="item[header.key]"
                      :item="item"
                      :index="index"
                      :name="header.key"
                    >
                      <div
                        v-if="header.key == 'status'"
                        class="w-full input-box flex flex-wrap flex-shrink-0 flex-grow uppercase text-center rounded px-2"
                      >
                        <div
                          :style="{
                            backgroundColor: `${getStatusColor(item.status)}`,
                          }"
                          :class="`text-[${getStatusColor(
                            item.status,
                          )}] bg-[${getStatusColor(item.status)}]`"
                          class="px-3 rounded bg-opacity-30 text-white"
                        >
                          {{ item.status }}
                        </div>
                      </div>
                      <div
                        v-else
                        class="w-full input-box flex-shrink-0 flex-grow"
                      >
                        <template v-if="header.type == 'date'">
                          <div class="flex flex-shrink-0">
                            {{
                              formateDate(
                                getProp(item, header.key),
                                header.formate || "MMM DD YYYY",
                              )
                            }}
                          </div>
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
        </template>

        <template v-else-if="items && items.length > 0">
          <tbody
            v-if="isMobileView && hasMobileSlot"
            class="overflow-y-auto flex-grow bg-primaryBg"
          >
            <template v-for="(item, index) in items" :key="index">
              <div class="mobile-view mb-2">
                <slot name="mobile" :item="item"></slot>
              </div>
            </template>
            <div
              v-if="loading"
              class="flex justify-center space-x-2 items-center"
            >
              <base-loader></base-loader>
            </div>
          </tbody>
        </template>

        <tbody
          v-if="items.length == 0 && !loading"
          class="flex-grow w-full h-full bg-white"
        >
          <tr class="w-full">
            <td :colspan="headerOptions.length" class="p-6">
              <slot name="NoData">
                <div class="flex w-full justify-center text-2xl">
                  {{ $t("No records") }}
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
        <tr v-if="!(isMobileView && hasMobileSlot)" class="w-full">
          <td :colspan="headerOptions.length" class="p-6">
            <slot name="footer" class="bg-lightYellow">
              <div class="flex bg-white px-12">
                <div
                  v-if="totalPages > 1 && !loading"
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
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { getPropByString } from "@/utils"
import Actions from "../card/Actions.vue"
import { useMainStore } from "@/stores"
import eventBus from "@/eventBus"
import { formateDate, formateNumber, getStatusColor } from "../../utils"
import { refresh } from "../../stores/datatable"
import { useEventBus, useMagicKeys, whenever } from "@vueuse/core"
import { nextTick, ref, toRefs } from "vue"
import { useSocketStore } from "../../stores"

export default {
  props: {
    headers: { type: Array },
    api: { type: Object, default: () => ({}) },
    query: { type: Object, default: () => ({}) },
    searchApi: { type: Object, default: () => ({}) },
    params: { type: Array },
    title: { type: String, default: "" },
    handlers: { type: Array, default: () => [] },
    letCreate: { type: Boolean, default: false },
    showHeader: { type: Boolean, default: false },
    createLabel: { type: String, default: "New" },
    actionIcon: { type: String, default: "plus" },
    createHandler: { type: Function, default: () => {} },
    canSelect: { type: Boolean, default: false },
    hideSort: { type: Boolean, default: true },
    paginated: { type: Boolean, default: true },
    actionPosition: { type: String, default: "start" },
    exportable: { type: Boolean, default: false },
    actionType: { type: String, default: "tippy" },
    socket: { type: Object },
  },
  setup(props, ctx) {
    let pageNumber = ref(1)
    const keys = useMagicKeys()
    whenever(keys.alt_n, () => {
      if (props.letCreate) {
        props.createHandler()
      }
    })
    whenever(keys.alt_r, () => {
      refresh.value = true
      nextTick(() => (refresh.value = false))
    })
    whenever(keys.arrowright, (e) => {
      pageNumber.value++
      console.log(e)
    })

    const { sioConnect } = toRefs(useSocketStore)

    return { pageNumber, refresh, sioConnect }
  },
  inject: ["request"],
  expost: ["addNewItem", "removeItem"],
  components: { Actions },
  data() {
    return {
      isMobileView: false,
      hasMobileSlot: false,
      selectedId: -1,
      mainStore: useMainStore(),
      loading: false,
      showActionsMenu: false,
      actionsMenuOffset: { x: 0, y: 0 },
      search: "",
      pageSize: 10,
      totalPages: 1,
      newestFirst: true,
      showActionsIndex: 0,
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
      // utils
    }
  },
  computed: {
    //calculates screen width and returns if it is mobile screen or not
    isMobileScreen() {
      return false
    },
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
    shownHandlers() {
      return this.handlers.filter(({ shown = false }) => shown)
    },
    hiddenHandlers() {
      return this.handlers.filter(({ shown = false }) => !shown)
    },
  },
  watch: {
    headers() {
      this.filteredHeaders = this.headers
    },
    refresh() {
      this.getDocuments(true)
    },
    newestFirst() {
      // this.sortitems();
    },
    pageSize() {
      if (this.pageNumber == 1 && this.api.url) {
        this.getDocuments()
      } else {
        this.pageNumber = 1
      }
    },
    pageNumber() {
      if (this.api.url) this.handleSearch()
    },
    params() {
      if (this.api.url) this.getDocuments()
    },
    query() {
      if (this.api.url) this.getDocuments()
    },
    api() {
      if (this.api.url) this.getDocuments()
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
    addNewItem(item = {}) {
      this.items.push(item)
    },
    removeItem(index) {
      this.items.splice(index, 1)
    },
    checkMobileView() {
      // Check if the screen width is less than a certain threshold (e.g., 768px)
      this.isMobileView = window.innerWidth < 768
    },
    checkMobileSlot() {
      // Check if the desktop slot is provided
      this.hasMobileSlot = !!this.$slots.mobile
    },
    handleScroll(event) {
      if (!(this.isMobileView && this.hasMobileSlot)) return
      const element = event.target
      const scrollPosition = element.scrollHeight - element.clientHeight

      if (element.scrollTop === scrollPosition) {
        // Call your function here when scrolled to the end
        this.scrollToEnd()
      }
    },
    scrollToEnd() {
      if (this.endOfPageReached) return
      // Function to execute when scrolled to the end
      console.log("Scrolled to the end!")
      this.pageNumber += 1
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
    getStatusColor,
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
    async getDocuments(refreshing = false) {
      this.loading = true
      if (refreshing) {
        this.pageNumber = 1
        return this.getDocuments()
      }
      const response = await this.request({
        ...this.api,
        params: this.params,
        query: {
          ...this.query,
          page: this.pageNumber,
          limit: this.paginated ? this.pageSize : Number.POSITIVE_INFINITY,
        },
      })
      if (this.isMobileView && this.hasMobileSlot && !refreshing) {
        this.items.push(...response.items)
      } else {
        this.items = response.items || []
      }
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
    listenSocketEvents() {
      this.sioConnect.on(this.socket.updated, () => {})
      this.sioClient.on(this.socket.created, (item) => {
        this.items.unshift(item)
      })
      this.sioClient.on(this.socket.deleted, (id) => {
        console.info(id)
        const index = this.items.findIndex(({ _id }) => _id)
        if (index) this.items.splice(index, 1)
      })
    },
  },
  beforeUnmount() {
    // Remove event listener on component destroy
    window.removeEventListener("resize", this.checkMobileView)
    // eventBus.$off("refresh", null);
  },
  mounted() {
    // listen socket events
    listenSocketEvents()

    // Check screen width on component mount
    this.checkMobileView()
    // Add event listener to check screen width on window resize
    window.addEventListener("resize", this.checkMobileView)

    // Check if the mobile slot is provided
    this.checkMobileSlot()

    this.filteredHeaders = this.headers.filter(
      ({ selected }) => selected !== false,
    )
    if (this.api.url) {
      this.getDocuments()
    } else if (this.$attrs.items && this.$attrs.items.length > 0) {
      this.items = this.$attrs.items
      this.loading = false
    }
    if (this.$attrs.pageSize) {
      this.pageSize = this.$attrs.pageSize
    }
    // eventBus.$on("refresh", () => this.getDocuments());
  },
}
</script>

<style scoped>
.dark-gray {
  background-color: #8f92a1;
}
.mobile-view {
  display: none;
}

.desktop-view {
  display: none;
}

@media (max-width: 767px) {
  .mobile-view {
    display: block;
  }
}

@media (min-width: 768px) {
  .desktop-view {
    /* display: block; */
  }
}
</style>
