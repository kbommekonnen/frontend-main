<template>
  <Tippy
    trigger="click"
    theme="dark"
    :arrow="false"
    animation="scale"
    placement="left"
    interactive
    ref="tippy"
    :style="positionStyle"
    class="px-2"
    hideOnClick
  >
    <div
      class="flex space-x-3 items-center py-1 px-1 rounded text-left bg-secondaryBg border border-primaryBg"
    >
      <div class="">
        <!-- {{ $t("actions") }} -->
        <base-icon name="cog" />
      </div>
      <base-icon name="chevron-down" :size="12" class="text-textLight" />
    </div>
    <template #content>
      <div
        class="space-y-0.5 bg-primaryBg border border-textLight rounded shadow-sm flex-shrink-0 min-w-fit"
      >
        <div
          class="py-2 px-4 hover:bg-primaryBg bg-white cursor-pointer grow-active min-w-fit text-textMedium hover:text-primary flex justify-start space-x-3"
          v-for="(action, i) in actions"
          :key="i"
          @click="smartHandler(action)"
        >
          <div
            class="flex justify-start items-center max-w-max w-12 flex-grow-0"
          >
            <base-icon v-if="action.icon" :name="action.icon" :size="14" />
          </div>
          <div class="flex-grow w-full text-sm flex-shrink-0 capitalize">
            {{ $t(action.label) }}
          </div>
        </div>
      </div>
    </template>
  </Tippy>
</template>

<script>
import { Tippy } from "vue-tippy"
export default {
  components: { Tippy },
  props: {
    handlers: { type: Array, default: () => [] },
    item: {},
    arrow: { type: Boolean, default: true },
    topOffset: { type: Number, default: 0 },
    actionsMenuOffset: { type: Object, default: () => ({ x: 0, y: 0 }) },
    btnO9n: { type: String, default: "horizontal" }, //?btnO9n=btnOrientation
  },
  data() {
    return {
      showActions: true,
    }
  },
  computed: {
    positionStyle() {
      return {
        left: this.actionsMenuOffset.x + "px",
        top: this.topOffset + this.actionsMenuOffset.offsetY + "px",
      }
    },
    actions() {
      return this.handlers.filter(
        ({ filter }) =>
          //   (!code ||
          //     (typeof code == "string"
          //       ? this.isGranted(code)
          //       : this.hasGrantedActivity(code))) &&
          !filter || filter(this.item),
      )
    },
  },
  methods: {
    hideActionDialog() {
      this.showActions = false
      // console.log(this.$refs)
      this.$refs.tippy.hide()
    },
    smartHandler(action) {
      this.hideActionDialog()
      if (action.fullParam) action.function(this.item)
      else if (action.idParam) action.function(this.item._id)
      else action.handler()
    },
  },
  mounted() {
    this.showActions = true
  },
}
</script>

<style></style>
