<template>
  <div>
    <template v-for="modal in openedModals" :key="modal.modalId">
      <Modal
        @close="handleClose"
        class=""
        :component="modal.component"
        :componentProps="modal.componentProps"
        :variant="modal.variant"
      />
    </template>
  </div>
</template>
<script>
import { modalHandlers } from "@/mixins/modal"
import { useModal } from "@/plugins/modal"
import Modal from "./Modal.vue"
export default {
  components: { Modal },
  mixins: [modalHandlers],
  data() {
    return {
      openedModals: useModal(),
    }
  },
  computed: {},
  methods: {},
  created() {
    console.log("dynamic modal created ", this.openedModals)
  },
}
</script>
