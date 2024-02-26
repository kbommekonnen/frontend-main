<template>
    <div class="">
      <button
        @click="expanded = !expanded"
        class="flex justify-between items-center text-left w-full "
      >
        <slot name="header">{{header}}</slot>
        <svg
          v-if="expanded"
          class="w-4 h-4 ml-2 transform rotate-180"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M6.293 6.293a1 1 0 0 1 1.414 0L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
          ></path>
        </svg>
        <svg
          v-else
          class="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <transition
        name="accordion-content"
        enter-active-class="transition-all duration-300 ease-in"
        leave-active-class="transition-all duration-300 ease-out"
        class=""
      >
        <div
          v-if="expanded"
          class="accordion-content p-2 rounded-md"
        >
          <slot></slot>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
    },
    data() {
      return {
        expanded: false,
      };
    },
  };
  </script>
  
  <style>
  /* Tailwind CSS classes are used directly in the template */
  </style>
  