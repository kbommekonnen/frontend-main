<template>
  <div class="p-4 text-textMedium space-y-4">
    <div
      class="w-full flex justify-center flex-grow pb-2 text-xl text-center border-b uppercase border-brightGray"
    >
      {{ downloading ? "DOWNLOADING TO EXPORT ..." : "EXPORT " + title }}
    </div>
    <div v-if="downloading" class="flex w-full justify-center">
      <bar-loader />
    </div>
    <div v-else class="space-y-2">
      <div class="grid grid-cols-2 gap-1">
        <div v-for="(header, i) in headers" :key="i">
          <div
            class="flex space-x-2 items-center border p-2 cursor-pointer hover:bg-brightGray text-textDark hover:text-primary"
            :class="
              selectedKeys.includes(header.key)
                ? 'border-primary'
                : 'border-transparent'
            "
            @click="toggleHeader(header.key)"
          >
            <div
              style="padding: 0.375rem"
              :class="
                selectedKeys.includes(header.key)
                  ? 'bg-primary'
                  : 'bg-textLight'
              "
            >
              <base-icon
                name="check"
                fill="#fff"
                :size="selectedKeys.includes(header.key) ? 14 : 12"
              />
            </div>

            <div class="uppercase">{{ header.label }}</div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <div>{{ reports.length }} records</div>
        <div>{{ selectedKeys.length }} coloumns selected</div>
      </div>
      <div class="flex space-x-1 reports-center border">
        <input
          type="text"
          v-model="fileName"
          class="flex-auto outline-none p-2 uppercase"
        />
        <div class="bg-brightGray p-2">.CSV</div>
      </div>
      <errors
        v-if="zeroColumn"
        :errors="['Select one or more columun please']"
      />
      <div class="flex space-x-1 justify-between items-end">
        <div>
          <base-button
            label="cancel"
            icon=""
            :primary="false"
            class="px-2 rounded bg-brightGray hover:text-lightDanger"
            @click="handleClose"
          />
        </div>
        <div class="flex space-x-2">
          <base-button
            label="PDF"
            icon="file-pdf"
            class="px-4 rounded"
            :isWorking="working"
            @click="exportPdf"
          />
          <base-button
            label="CSV"
            icon="file-excel"
            class="px-4 rounded"
            @click="exportCsv"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import Errors from "@/components/app/Errors.vue"
import { getPropByString } from "@/utils"
import { mapStores } from "pinia"
import { useMainStore } from "@/stores"
export default {
  props: ["title", "headers"],
  components: { Errors },
  data() {
    return {
      selectedKeys: [],
      fileName: "",
      working: false,
    }
  },

  computed: {
    ...mapStores(useMainStore),
    zeroColumn() {
      return this.selectedKeys.length === 0
    },
  },
  methods: {
    getProp: getPropByString,
    exportCsv() {
      this.working = true

      let headersSelected = this.headers.filter(({ key }) =>
        this.selectedKeys.includes(key),
      )
      let data = this.printerStore.reports.map((item) =>
        headersSelected.reduce(
          (acc, { key }) => [...acc, this.getProp(item, key)],
          [],
        ),
      )

      let unparsedResults = this.$papa.unparse(
        { fields: headersSelected.map(({ label }) => label), data },
        {
          delimiter: ",",
        },
      )
      this.$papa.download(unparsedResults, this.fileName)
      this.working = false
    },
    handleClose() {
      this.$emit("close")
    },
    toggleHeader(key) {
      if (this.selectedKeys.includes(key))
        return (this.selectedKeys = this.selectedKeys.filter(
          (sk) => sk !== key,
        ))
      this.selectedKeys.push(key)
    },

    switchPrinterOn() {
      this.smartSet({ stateKey: "printer_on", data: true })
    },
    switchPrinterOff() {
      this.smartSet({ stateKey: "printer_on", data: false })
    },
    async exportPdf() {
      this.working = true
      let headersSelected = this.headers.filter(({ key }) =>
        this.selectedKeys.includes(key),
      )
      await this.printReport({
        title: this.title,
        headers: headersSelected,
        items: this.reports,
      })
      this.switchPrinterOn()
      window.onafterprint = this.closePrinter
      setTimeout(() => window.print(), 500)
      this.working = false
    },
    closePrinter() {
      this.clearExportPdfReport()
      this.switchPrinterOff()
    },
  },
  created() {
    this.selectedKeys = this.headers.map(({ key }) => key)
    this.fileName = this.title
  },
}
</script>

<style></style>
