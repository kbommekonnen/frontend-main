<template>
  <div class="side-navigation h-full border-r border-primaryBg" :class=" {
    'side-navigation-sm': navOpened,
  } ">
    <div class="h-full min-h-full space-y-0 min-w-8">
      <div class="h-1 w-full shadow-md -my-1"></div>
      <div class="relative flex items-center justify-center pt-8 pb-3 w-full px-3">
        <div v-if=" title && navOpened " class="w-full capitalize text-center text-xl text-primary">
          {{ $t(title) }}
        </div>
        <div class="absolute bg-white -right-2 top-1 mb-4 rounded-circle border border-borderGray p-1"
          :class=" { '': navOpened, '': !navOpened } ">
          <base-icon :name=" navOpened ? 'chevron-left' : 'chevron-right' " :size=" navOpened ? 16 : 16 "
            class="cursor-pointer" @click=" toggleNavBar " />
        </div>
      </div>

      <div class="w-full space-y-1" :class=" {} ">
        <router-link v-for=" { label, to, icon }  in  filteredNavs " :to=" to " v-slot="{ isActive }" :key=" to ">
          <div class="flex rounded w-full space-x-3 py-2 text-lg items-center cursor-pointer hover:active-item" :class=" {
            'active-item': isActive,
            'pl-8 pr-8': navOpened,
            'px-4': !navOpened,
          } ">
            <!-- @click="toggleNavBar" -->
            <div class="flex space-x-1 items-center">
              <div class="w-1 h-3 rounded" :class=" {
                'bg-primary': isActive,
              } "></div>
              <base-icon :name=" icon " />
            </div>
            <div v-if=" navOpened " class="capitalize">
              {{ $t(label) }}
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"
const props = defineProps({
  navs: {
    type: Array,
  },
  // to be displayed as a header of the menus
  title: {
    type: String,
  },
})
let filteredNavs = computed(() =>
  props.navs.filter(({ filter }) => !filter || filter()),
)
let navOpened = ref(true)
function toggleNavBar() {
  navOpened.value = !navOpened.value
}
</script>

<style scoped>
.side-navigation {
  @apply bg-white;
}

.active-item {
  @apply text-primary bg-primaryBg;
}

@media (max-width: 640px) {
  .side-navigation-sm {
    @apply absolute left-0 bg-white border-secondaryBg shadow-lg border-r;
  }
}
</style>
