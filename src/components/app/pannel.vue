<template>
  <div class="border border-primary rounded">
    <div
      class="text-textMedium bg-brightGray p-2 text-center rounded-t flex justify-center"
    >
      <slot name="title"
        ><div>
          {{ title }}
        </div></slot
      >

      <slot name="actions" class="mx-auto"></slot>
    </div>
    <div class="p-2"><slot></slot></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: ["title"],
}
</script>

<style></style>
