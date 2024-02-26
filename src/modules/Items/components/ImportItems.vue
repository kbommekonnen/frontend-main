<template>
  <div class="h-fullspace-y-2">
    <div class="flex flex-col space-y-1h-full">
      <data-table
        title="Bulk Import Items"
        :showHeader="true"
        :headers="headers"
        :items="items"
        letCreate
        :isWorking="loading"
        createLabel="Import Items"
        :createHandler="handleSave"
        class="flex-grow"
      >
      </data-table>

      <div class="flex space-x-2 justify-end bg-white text-textMedium">
        <input
          v-if="fileSelector"
          type="file"
          class="hidden"
          ref="csvFileInput"
          @input="handleFileSelect"
        />
        <base-button
          :label="importing ? 'importing' : 'import csv'"
          :primary="true"
          class="text-sm px-2 rounded"
          :class="{ 'bg-brightGray hover:text-primary': !importing }"
          :isWorking="importing"
          @click="openFileSelector"
        />
        <base-button
          label="remove all rows"
          :primary="true"
          class="text-sm px-2 rounded bg-brightGray hover:text-primary"
          @click="removeAllRows"
        />
        <base-button
          label="add row"
          :primary="true"
          class="text-sm px-2 rounded bg-brightGray hover:text-primary"
          @click="addRow(items.length - 1)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, inject, nextTick, ref } from "vue"
import { importItemsHeaders } from "../headers"
import DataTable from "@/components/table/DataTable.vue"
export default {
  setup() {
    let items = ref([])
    let errors = ref([])
    let loading = ref(false)
    let importing = ref(false)
    let fileSelector = ref(false)
    let csvFileInput = ref(null)
    const postRequest = inject("postRequest")
    let formTemplate = computed(() => {
      let template = {
        name: "",
        sku: "",
        manufacturer: "",
        brand: "",
        size: "",
        unit: "",
        onStore: 0,
      }
      return template
    })

    function handleSave() {
      loading.value = true
      postRequest({
        url: "/item/bulk-import",
        data: { items: items.value },
      })
      loading.value = false
    }

    function addNewItem(item) {
      console.log("item", item)
      items.value.push(item)
    }
    function addRow(index) {
      items.value = [
        ...items.value.slice(0, index + 1),
        { ...formTemplate.value },
        ...items.value.slice(index + 1).map(({ ...rest }) => ({ ...rest })),
      ]
    }

    function removeAllRows() {
      clear()
      errors.value = []
    }
    function clear() {
      items.value = []
    }
    // function importCsv(file) {
    //   importing.value = true
    //   this.$papa.parse(file, {
    //     skipEmptyLines: true,
    //     complete: ({ data }) => {
    //       importing.value = false
    //       // let lastIndex = this.items.length;
    //       data.slice(1).forEach((row) => {
    //         let Item = Object.keys(formTemplate.value).reduce(
    //           (Item, key) => ({
    //             ...Item,
    //             [key]: row[data[0].indexOf(key)],
    //           }),
    //           {},
    //         )
    //         // console.log(data, row);
    //         addNewItem(Item)
    //       })
    //       resetFile()
    //     },
    //   })
    // }
    function openFileSelector() {
      fileSelector.value = true
      nextTick(() => {
        csvFileInput.value.click()
      })
    }
    function resetFile() {
      fileSelector.value = false
    }
    return {
      items,
      errors,
      loading,
      importing,
      fileSelector,
      csvFileInput,
      addNewItem,
      addRow,
      removeAllRows,
      openFileSelector,
      resetFile,
      handleSave,
    }
  },
  components: { DataTable },
  computed: {
    headers() {
      return importItemsHeaders
    },
  },
  methods: {
    importCsv(file) {
      console.log(file)
      let template = {
        name: "",
        sku: "",
        manufacturer: "",
        brand: "",
        size: "",
        unit: "",
        onStore: 0,
      }

      //   this.importing = true
      this.$papa.parse(file, {
        skipEmptyLines: true,
        complete: ({ data }) => {
          console.log(data)
          this.importing = false
          // let lastIndex = this.items.length;
          data.slice(1).forEach((row) => {
            let Item = Object.keys(template).reduce(
              (Item, key) => ({
                ...Item,
                [key]: row[data[0].indexOf(key)],
              }),
              {},
            )
            console.log(data, row)
            this.addNewItem(Item)
          })
          this.resetFile()
        },
      })
    },
    handleFileSelect() {
      let file = this.$refs["csvFileInput"].files[0]
      this.importCsv(file)
    },
  },
}
</script>
<style></style>
