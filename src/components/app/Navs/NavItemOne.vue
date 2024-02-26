<template>
  <div class="cursor-pointer flex-shrink-0" :class="{ '': !nav.group }">
    <div
      class="flex-shrink-0 hover:bg-secondaryBg hover:font-semibold group-hover:font-semibold flex space-x-2 items-center py-2 px-2"
      :class="{ 'font-semibold bg-secondaryBg': nav.path == active }"
      @click="
        nav.group ? toggleGroup(nav.label) : navigate(nav.path, nav.label)
      "
    >
      <base-icon
        :size="16"
        :name="nav.icon"
        class="flex-grow-0 flex-shrink-0"
      />
      <div class="flex flex-shrink-0 text-lg flex-grow">
        {{ nav.label }}
      </div>
      <base-icon
        v-if="nav.group"
        class="flex-grow-0 flex-shrink-0"
        :name="nav.label == active ? 'angle-up' : 'angle-right'"
      />
      <base-icon v-else class="flex-grow-0 flex-shrink-0" />
    </div>
    <div
      v-if="nav.group && active_group == nav.label"
      class="bg-secondaryBg pl-6"
    >
      <div
        v-for="(child, i) in nav.children"
        class="p-1 cursor-pointer hover:font-semibold group-hover:font-semibold flex space-x-2 items-center"
        :class="{ 'font-semibold': child.path == active }"
        :key="i"
        @click="navigate(child.path)"
      >
        <base-icon name="arrow-right" class="" />
        <div class="text-lg">
          {{ child.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: {
    nav: {
      default: {},
    },
    active: { type: String, default: "" },
    active_group: { type: String, default: "" },
  },
  methods: {
    toggleGroup(label) {
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
