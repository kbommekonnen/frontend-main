<template>
  <div class="flex space-x-4 items-center">
    <div class="flex space-x-1 items-center">
      <div>{{ "SHOW" }}:</div>
      <base-select
        :items="pageSizeOptions"
        v-model="pageSizeInput"
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
      <div class="flex-shrink-0">{{ pageNumber }} of {{ totalPages }}</div>
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
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    currentPage: { type: Number },
    pageSize: { type: Number },
    totalPages: { type: Number },
  },
  data() {
    return {
      pageNumber: this.currentPage,
      pageSizeInput: this.pageSize,
      pageSizeOptions: [
        { label: "2", value: 2 },
        { label: "5", value: 5 },
        { label: "10", value: 10 },
        { label: "15", value: 15 },
        { label: "20", value: 20 },
        { label: "25", value: 25 },
      ],
    }
  },
  computed: {
    beginning() {
      return this.pageNumber * this.pageSizeInput + 1
    },
    ending() {
      let ending = this.beginning + this.pageSizeInput - 1
      if (ending > this.items.length) return this.items.length
      return ending
    },
    beginningPageReached() {
      return this.pageNumber == 1
    },
    endOfPageReached() {
      return this.pageNumber == this.totalPages
    },
    //     pages() {
    //   let p = [];
    //   if (this.currentPage >= 2 && this.currentPage <= this.totalPages - 1)
    //     p = [this.currentPage - 1, this.currentPage, this.currentPage + 1];
    //   if (this.currentPage === 1)
    //     p = [2, 3].reduce(
    //       (acc, i) => {
    //         if (i <= this.totalPages) acc.push(i);
    //         return acc;
    //       },
    //       [1]
    //     );
    //   if (this.currentPage === this.totalPages) {
    //     p = [this.currentPage - 1, this.currentPage - 2].reduce(
    //       (acc, i) => {
    //         if (i >= 1) acc.unshift(i);
    //         return acc;
    //       },
    //       [this.currentPage]
    //     );
    //   }
    //   return p;
    // },
  },
  watch: {
    pageSizeInput() {
      if (this.pageNumber == 1) {
        this.getDocuments()
      } else {
        this.pageNumber = 1
      }
    },
    pageNumber() {
      this.getDocuments()
    },
  },
  methods: {
    goPrevious() {
      if (this.beginningPageReached) return
      this.pageNumber--
    },
    goNext() {
      if (this.endOfPageReached) return
      this.pageNumber++
    },
    getDocuments() {
      this.$emit("get-documents", {
        pageNumber: this.pageNumber,
        pageSize: this.pageSizeInput,
      })
    },
  },
}
</script>

<style></style>
