<template>
  <div class="space-y-0">
    <div class="flex h-full w-full space-x-1 transparent shadow-inner">
      <left-nav title="Settings" :navs="formatedNavs" :active="activeNav" />
      <div class="flex-grow bg-white">
        <div class="h-1 w-full shadow-md -my-1"></div>

        <router-view class="w-full h-full"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import LeftNav from "../../../components/app/Navs/LeftNav.vue"
export default {
  name: "Settings",
  components: { LeftNav },
  data() {
    return {
      navs: [
        {
          label: "organization profile",
          to: "organization",
          icon: "user-alt",
        },
        {
          label: "locations",
          to: "locations",
          icon: "map-marker-alt",
        },
        {
          label: "users & roles",
          to: "users-and-roles",
          icon: "users",
        },
        {
          label: "preferences",
          to: "preferences",
          icon: "cogs",
        },
        {
          label: "tax rates",
          to: "tax-rates",
          icon: "percentage",
        },
      ],
    }
  },
  computed: {
    formatedNavs() {
      return this.navs.map((nav) => ({ ...nav, to: "/settings/" + nav.to }))
    },
    activeNav() {
      const currentRoute = this.$route.path.split("/")[2]
      return "/settings/" + currentRoute
    },
  },
}
</script>

<style></style>
