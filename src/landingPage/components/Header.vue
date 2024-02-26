<template>
  <header
    class="flex space-x-8 justify-between items-center p-4 shadow-md capitalize text-textMedium"
  >
    <!-- Your logo and navigation here -->
    <router-link to="/" class="flex space-x-2 items-center cursor-pointer">
      <logo class="flex-shrink-0"></logo>
      <div class="text-2xl font-semibold uppercase tracking-wider">golleta</div>
    </router-link>

    <!-- Logo and navigation links -->
    <div class="flex space-x-16 lg:pr-32 items-center font-semibold tracking-wide">
      <!-- <nav class="cursor-pointer"><router-link to="/">Home</router-link></nav> -->
      <nav class="flex-shrink-0 cursor-pointer"><router-link to="/signin">sign in</router-link></nav>
      <!-- <nav class="cursor-pointer"><router-link to="#pricing">Pricing</router-link></nav> -->
      <nav class="cursor-pointer"><router-link to="#">Documentation</router-link></nav>
    </div>
  </header>
</template>

<script setup>
import Logo from "../../assets/Logo.vue"
</script>

<style scoped></style>
