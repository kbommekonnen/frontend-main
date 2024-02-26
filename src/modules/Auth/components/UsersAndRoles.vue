<template>
  <div class="h-full bg-white shadow-top">
    <tabs :tabs="tabsList" @toggle-tab="toggleTab">
      <template #more-actions>
        <div
          class="flex-grow flex-shrink-0 self-center flex justify-end px-8 capitalize"
        >
          <base-button
            v-if="activeTabIndex == 0"
            icon="plus"
            :label="$t('create user')"
            class="p-0"
            @click="openCreateUser"
          />
          <base-button
            v-else-if="activeTabIndex == 1"
            icon="plus"
            :label="$t('create role')"
            class="p-0"
            @click="openCreateRole"
          />
          <!-- <base-button
            v-else-if="activeTabIndex == 2"
            icon="plus"
            :label="$t('create module')"
            class="p-0"
            @click="openCreateModule"
          />
          <base-button
            v-else
            icon="plus"
            :label="$t('create action')"
            class="p-0"
            @click="openCreateAction"
          /> -->
        </div>
      </template>
    </tabs>
  </div>
</template>

<script setup>
import Tabs from "@/components/app/Tabs.vue"
import UsersList from "./UsersList.vue"
import RolesList from "../../Roles/components/RolesList.vue"
// import ModulesList from "../../Modules/components/ModulesList.vue"
// import ActionsList from "../../Actions/components/ActionsList.vue"
import { ref } from "vue"
import { useRouter } from "vue-router"

// import { openCreateForm as openCreateUser } from "../functions.js"
// import { openCreateForm as openCreateRole } from "../../Roles/functions.js"
// import { openCreateForm as openCreateModule } from "../../Modules/functions.js"
// import { openCreateForm as openCreateAction } from "../../Actions/functions.js"
const router = useRouter()
const tabsList = [
  {
    title: "users",
    icon: "users",
    component: UsersList,
  },
  {
    title: "roles",
    icon: "users",
    component: RolesList,
  },
  // {
  //   title: "modules",
  //   icon: "users",
  //   component: ModulesList,
  // },
  // {
  //   title: "actions",
  //   icon: "users",
  //   component: ActionsList,
  // },
]

let activeTabIndex = ref(0)
function toggleTab(index) {
  activeTabIndex.value = index
}
function openCreateRole() {
  router.push("/settings/auth/roles/new-role")
}
function openCreateUser() {
  router.push("/settings/auth/new-user")
}
</script>

<style></style>
