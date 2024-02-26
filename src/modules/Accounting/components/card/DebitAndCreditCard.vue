<template>
  <div v-if="isLoading">loading</div>
  <div v-else class="">
    <div>
      <div class="">{{ $t(label) }}</div>
      <error-card v-if="errorMessage" :error="errorMessage" />
      <div
        v-if="report"
        class="flex truncate text-primary text-2xl flex-grow limit-lines limit-lines-1 break-all w-full"
      >
        {{ report }}
      </div>

      <pre>{{ report }}</pre>
    </div>
    <!-- <error-card v-if="errorMessage" :error="errorMessage" /> -->
  </div>
  <div class=""></div>
</template>
<script>
import { ref } from "vue"
export default {
  props: { label: String, api: Object },
  inject: ["getRequest"],

  setup() {
    let report = ref({})
    const isLoading = ref(true)
    return { report, isLoading }
  },
  methods: {
    async getReport() {
      // this.isLoading = true
      this.getRequest({ ...this.api }).then(({ error, item, message }) => {
        this.isLoading = false
        if (error) {
          this.errorMessage = message
        } else {
          this.report = item
        }
      })
    },
  },
  mounted() {
    this.getReport()
  },
}
</script>
