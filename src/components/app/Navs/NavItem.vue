<template>
  <div
    class="tracking-widest shadow-md py-2 cursor-pointer flex-shrink-0 text-sm text-primary uppercase font-serif"
    :id="nav.id"
    :class="{ '': !nav.group }"
  >
    <div
      class="flex-shrink-0 hover:bg-primary hover:font-semibold hover:text-white hover:font-serif hover:tracking-wider group-hover:font-semibold flex space-x-0 items-center py-1 px-2"
      :class="{
        'font-semibold font-serif tracking-wider bg-secondaryBg text-white':
          nav.path == active,
      }"
      @click="
        nav.group ? toggleGroup(nav.label) : navigate(nav.path, nav.label)
      "
    >
      <div
        class="h-4 w-1 rounded"
        :class="{ 'bg-primary': nav.path == active }"
      ></div>
      <base-icon
        v-if="nav.group"
        class="flex-grow-0 flex-shrink-0 text-textLight px-1 self-center"
        :name="
          nav.group && active_group == nav.label ? 'caret-up' : 'caret-right'
        "
      />
      <base-icon v-else class="flex-grow-0 flex-shrink-0" />
      <base-icon
        :size="16"
        :name="nav.icon"
        class="flex-grow-0 flex-shrink-0"
      />
      <div
        v-if="mainStore.navExpanded"
        class="flex flex-shrink-0 flex-grow pl-2"
      >
        {{ nav.label }}
      </div>
    </div>
    <div
      v-if="nav.group && active_group == nav.label"
      class="-shadow-md pl-6 mb-1 py-2"
    >
      <div
        v-for="(child, i) in grantedNavChildrens"
        :id="child.id"
        class="px-1 cursor-pointer hover:font-semibold group-hover:font-semibold flex space-x-2 items-center"
        :class="{
          ' font-semibold font-serif tracking-wider bg-secondaryBg':
            child.path == active,
        }"
        :key="i"
        @click="navigate(child.path)"
      >
        <base-icon
          :name="child.path == active ? 'arrow-circle-right' : 'arrow-right'"
          :size="11"
          class=""
          :class="{
            ' text-primary': child.path == active,
            ' text-secondaryBg': child.path != active,
          }"
        />
        <div class="">
          {{ child.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "@/stores"
import { mapStores } from "pinia"
/* eslint-disable no-undef */
export default {
  props: {
    nav: {
      default: {},
    },
    active: { type: String, default: "" },
    active_group: { type: String, default: "" },
  },
  computed: {
    ...mapStores(useMainStore),
    grantedNavChildrens() {
      return this.nav.children.filter(
        ({ code }) => !code || this.isGranted(code),
      )
    },
  },
  methods: {
    toggleGroup(label) {
      this.mainStore.expandNav()
      if (this.active_group == label) this.$emit("toggle-active-group", "")
      else this.$emit("toggle-active-group", label)
    },
    navigate(path, group) {
      if (group != undefined) this.$emit("toggle-active-group", group)
      this.$emit("toggle-active-nav", path)
      this.$router.push(path)
    },
  },
}
</script>

<style></style>
