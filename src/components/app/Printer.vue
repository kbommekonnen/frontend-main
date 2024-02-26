<template>
  <div>
    <component
      v-if="printing"
      v-bind="componentProps"
      :is="component"
      :class="{ 'w-screen h-screen': printing }"
    />
    <div v-else class="space-y-2">
      <div class="flex w-full justify-end pt-2">
        <base-button icon="print" label="PRINT" @click="print" />
      </div>
      <component v-bind="componentProps" :is="component" />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-undef */
export default {
  props: {
    component: {
      type: [Object, String],
      required: true,
    },
    componentProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      printing: false,
    }
  },
  computed: {},
  methods: {
    print() {
      this.printing = true
      // window.onbeforeprint = () => {
      // 	this.printing = true;
      // };
      // window.onafterprint = () => (this.printing = false);
      window.print()
      // this.$refs.html2Pdf.generatePdf();
    },
  },
}
</script>

<style></style>
