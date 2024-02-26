<template>
  <div class="p-2">
    <div class="w-full flex flex-col space-y-3 items-start p-3">
      <div
        class="w-full flex justify-between items-start capitalize tracking-wider border-b-2 border-primaryBg py-1"
      >
        <div class="text-xl">{{ $t("basic information") }}</div>
        <base-button
          icon="check-circle"
          label="update"
          class="capitalize"
          padding="small"
          :isWorking="working"
          @click="handleUpdate"
        />
      </div>

      <PerfectScrollbar
        class="flex-grow space-y-3 p-3 items-start flex flex-col w-full"
      >
        <div class="w-full flex flex-col lg:flex-row-reverse lg:space-x-1">
          <div class="text-left items-center py-3 lg:px-3 space-y-2">
            <div
              class="border-2 border-primaryBg rounded p-4 first-letter:capitalize cursor-pointer"
            >
              {{ $t("upload your logo") }}
            </div>
            <div class="text-sm first-letter:capitalize">
              {{
                $t(
                  "this logo will appear on your app bar and documents that are created",
                )
              }}
            </div>
          </div>
          <div
            class="flex-grow space-y-2 border-2 border-primaryBg rounded text-left capitalize items-center p-3"
          >
            <base-input
              v-model="organization.name"
              padding="big"
              label="organization name"
              class="col-span-2"
            />
            <base-input
              v-model="organization.shortName"
              padding="big"
              label="short name"
              class="col-span-2"
            />
            <base-text-area
              v-model="organization.code"
              padding="big"
              label="description"
              class="col-span-2"
            />
            <base-select
              v-model="organization.businessType"
              :items="businessTypeOptions"
              padding="small"
              label="bussiness type"
              searchable
              class="col-span-2"
            />
          </div>
        </div>
        <contact-address class="w-full py-3" />
      </PerfectScrollbar>
    </div>
  </div>
</template>

<script setup>
import ContactAddress from "../../Registration/components/ContactAddress.vue"
import { useContactAddressStore } from "../../Registration/store.js"
import { inject, onMounted, ref, watch } from "vue"
import api from "../api"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
const getRequest = inject("getRequest")
const putRequest = inject("putRequest")

let contactAddressStore = useContactAddressStore()

let working = ref(false)
let organization = ref("")
let businessTypeOptions = [
  {
    label: "wholesale or distribution",
    value: "wholesale or distribution",
  },
  {
    label: "manufacturing",
    value: "manufacturing",
  },
  {
    label: "internal office assets",
    value: "internal office assets",
  },
  {
    label: "retail",
    value: "retail",
  },
  {
    label: "other",
    value: "other",
  },
]

watch(
  () => organization.value,
  (data) => {
    if (data)
      return ["address", "country", "website", "email", "state", "tel"].forEach(
        (attribute) => {
          contactAddressStore[attribute] = data[attribute]
        },
      )
  },
)

function init() {
  getRequest(api.getMyOrganization).then(({ item = [] }) => {
    if (item) {
      organization.value = item
    }
  })
}
onMounted(() => {
  init()
})
async function handleUpdate() {
  if (working.value) return
  working.value = true
  putRequest({
    ...api.edit,
    params: [organization.value._id],
    data: {
      ...contactAddressStore.form,
      name: organization.value.name,
      shortName: organization.value.shortName,
      businessType: organization.value.businessType,
    },
  }).then(() => {
    // organization.value = item
    init()
    working.value = false
  })
}
</script>

<style></style>
