<template>
  <div class="w-full px-6 flex flex-col space-y-6">
    <div class="flex flex-col space-y-0">
      <div class="py-4 capitalize">quantity</div>
      <div
        class="lg:flex w-full space-y-4 lg:space-y-0 lg:space-x-6 justify-between"
      >
        <div
          class="border border-[#E2E2EA] w-full lg:w-[32%] px-4 py-2 rounded-md flex flex-col space-y-2"
        >
          <p class="text-[#171725]">Ordered</p>
          <div>
            <div class="flex space-x-3 items-center">
              <p class="text-4xl text-[#171725]">
                {{ formateNumber(getReport("ordered").quantity) }}
              </p>

              <div class="flex items-center text-[#3DD598]">
                <p class="font-semibold">+55%</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <p class="text-[#696974] text-sm">
                Compared to (3454 last month)
              </p>
            </div>
          </div>
        </div>
        <div
          class="border border-[#E2E2EA] w-full lg:w-[32%] px-4 py-2 rounded-md flex flex-col space-y-2"
        >
          <p class="text-[#171725]">Confirmed Orders</p>
          <div>
            <div class="flex space-x-3 items-center">
              <p class="text-4xl text-[#171725]">
                {{ formateNumber(getReport("confirmed").quantity) }}
              </p>

              <div class="flex items-center text-[#3DD598]">
                <p class="font-semibold">+25%</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <p class="text-[#696974] text-sm">
                Compared to (1,123,654 last month)
              </p>
            </div>
          </div>
        </div>
        <div
          class="border border-[#E2E2EA] w-full lg:w-[32%] px-4 py-2 rounded-md flex flex-col space-y-2"
        >
          <p class="text-[#171725]">In transit</p>
          <div>
            <div class="flex space-x-3 items-center">
              <p class="text-4xl text-[#171725]">
                {{ formateNumber(getReport("intransit").quantity) }}
              </p>

              <div class="flex items-center text-[#3DD598]">
                <p class="font-semibold">+25%</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <p class="text-[#696974] text-sm">
                Compared to (1,123,654 last month)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-0">
      <div class="py-4">Amount (ETB)</div>
      <div
        class="lg:flex w-full space-y-4 lg:space-y-0 lg:space-x-6 justify-between"
      >
        <div
          class="border border-[#E2E2EA] w-full lg:w-[32%] px-4 py-2 rounded-md flex flex-col space-y-2"
        >
          <p class="text-[#171725]">Ordered</p>
          <div>
            <div class="flex space-x-3 items-center">
              <p class="text-4xl text-[#171725]">
                {{ formateNumber(getReport("ordered").amount) }}
              </p>

              <div class="flex items-center text-[#3DD598]">
                <p class="font-semibold">+55%</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <p class="text-[#696974] text-sm">
                Compared to (3454 last month)
              </p>
            </div>
          </div>
        </div>
        <div
          class="border border-[#E2E2EA] w-full lg:w-[32%] px-4 py-2 rounded-md flex flex-col space-y-2"
        >
          <p class="text-[#171725]">Confirmed Orders</p>
          <div>
            <div class="flex space-x-3 items-center">
              <p class="text-4xl text-[#171725]">
                {{ formateNumber(getReport("confirmed").amount) }}
              </p>

              <div class="flex items-center text-[#3DD598]">
                <p class="font-semibold">+25%</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <p class="text-[#696974] text-sm">
                Compared to (1,123,654 last month)
              </p>
            </div>
          </div>
        </div>
        <div
          class="border border-[#E2E2EA] w-full lg:w-[32%] px-4 py-2 rounded-md flex flex-col space-y-2"
        >
          <p class="text-[#171725]">In transit</p>
          <div>
            <div class="flex space-x-3 items-center">
              <p class="text-4xl text-[#171725]">
                {{ formateNumber(getReport("intransit").amount) }}
              </p>

              <div class="flex items-center text-[#3DD598]">
                <p class="font-semibold">+25%</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <p class="text-[#696974] text-sm">
                Compared to (1,123,654 last month)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue"
import api from "../api"
import { formateNumber } from "../../../utils"
const getRequest = inject("getRequest")
let report = ref([])
getRequest(api.orderedItemsSummaryReport).then(({ item }) => {
  if (item) {
    report.value = item
  }
})
function getReport(status) {
  if (report.value && report.value.length)
    return (
      report.value.find(({ _id }) => _id && _id.toLowerCase() == status) || {}
    )
  return {}
}
</script>

<style></style>
