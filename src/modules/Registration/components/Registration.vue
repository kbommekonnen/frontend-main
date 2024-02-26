<template>
  <div
    class="flex flex-col justify-center items-center w-full h-full space-y-1 bg-white lg:p-32"
  >
    <div
      class="w-full shadow-top flex justify-between items-center py-8 px-4 bg-white"
    >
      <div class="flex space-x-1 normal-case text-2xl">
        Welcome to
        <span class="font-semibold uppercase tracking-wider px-2">golleta</span>
        <span class="capitalize">inventory management system</span>
      </div>
      <div class="">
        <base-button
          icon="check-circle"
          v-if="canRegisterOrganization || true"
          label="register"
          :isWorking="registering"
          @click="registerOrganization"
        />
      </div>
    </div>

    <div class="flex-grow bg-white">
      <StepsNavigation
        :active="active"
        :steps="steps"
        @set-active-step="setActiveStep"
      />
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/base/BaseButton.vue'
import { computed, inject, ref, } from "vue"
import StepsNavigation from "./StepsNavigation.vue"
import OrganizationDetail from "./OrganizationDetail.vue"
import ContactAddress from "./ContactAddress.vue"
// import Preferences from "./Preferences.vue"
import {
  useContactAddressStore,
  useOrganizationStore,
  // usePreferencesStore,
} from "../store"
import { useUserStore } from "../../../stores"
import { useRouter } from "vue-router"
let router = useRouter()
const postRequest = inject("postRequest") // inject axios
const bindJoiErrors = inject("bindJoiErrors")

let registering = ref(false)
let active = ref(0)
const organizationStore = useOrganizationStore()
// const preferencesStore = usePreferencesStore()
const contactAddressStore = useContactAddressStore()
let steps = computed(() => [
  {
    label: "organization detail",
    component: OrganizationDetail,
    success: organizationStore.success,
    error: organizationStore.error,
  },
  {
    label: "contact address",
    component: ContactAddress,
    success: contactAddressStore.success,
    error: contactAddressStore.error,
  },
  // {
  //   label: "detail info",
  //   success: false,
  //   error: false,
  // },
  // {
  //   label: "personal details",
  //   success: false,
  //   error: false,
  // },
  // {
  //   label: "preferences",
  //   component: Preferences,
  //   success: computed(() => preferencesStore.success),
  //   error: computed(() => preferencesStore.error),
  // },
  // {
  //   label: "pricing",
  //   success: false,
  //   error: false,
  // },
])
let completedSuccessfully = computed(() =>
  steps.value.find(({ success }) => !success),
)
let canRegisterOrganization = computed(
  () => completedSuccessfully && active.value == steps.value.length - 1,
)
function setActiveStep(step) {
  active.value = step
}

async function registerOrganization() {
  registering.value = true
  const response = await postRequest({
    url: "/organization/add",
    data: {
      ...organizationStore.form,
      ...contactAddressStore.form,
      // preference: preferencesStore.$state,
    },
  })
  if (response.joiError) {
    bindJoiErrors(
      response.joi,
      "name shortName code businessType",
      organizationStore.setError,
    )
    bindJoiErrors(
      response.joi,
      "tel email website country state address",
      contactAddressStore.setError,
    )
  } else if (response.user) {
    handleLogin(response.user.username)
  }
  registering.value = false
}
async function handleLogin(username) {
  const { error, access_token, ...user } = await postRequest({
    url: "/credential/signin",
    data: {
      username: username,
      password: "admin",
    },
  })
  if (error) {
    return
  } else {
    await useUserStore().signin(user, access_token)
    router.push("/")
    // location.reload();
  }
  registering.value = false
}
</script>
