<template>
  <div class="h-full flex flex-col bg-primaryBg space-y-1 overflow-x-hidden">
    <div
      class="flex flex-col lg:flex-row justify-between items-center lg:space-x-3 capitalize shadow-top bg-white p-2 w-full"
    >
      <div class="flex-grow flex flex-col space-y-2 items-start h-full">
        <base-icon
          content="back"
          name="arrow-left"
          class="cursor-pointer"
          @click="router.back"
        />
        <account-card :id="accountId" />
        <account-transactions :id="accountId" class="w-full" />
      </div>
      <div class="flex-grow-0 flex flex-col justify-start space-y-4">
        <debit-and-credit-card v-for="({label, api}, i) in reportCards" :label="label" :api="api" :key="i" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import AccountCard from "./card/AccountCard.vue"
import AccountTransactions from "./card/AccountTransactions.vue"
import DebitAndCreditCard from "./card/DebitAndCreditCard.vue"
import api from "../api"
const accountId = useRoute().params.id

const router = useRouter()

const reportCards = [
  {
    label: "today",
    api: { ...api.getAccountTodayDebitAndCreditReport, params: [accountId] },
  },
  {
    label: "this week",
    api: { ...api.getAccountThisWeekDebitAndCreditReport, params: [accountId] },
  },
  {
    label: "this month",
    api: { ...api.getAccountThisMonthDebitAndCreditReport, params: [accountId] },
  },
  {
    label: "this year",
    api: { ...api.getAccountThisYearDebitAndCreditReport, params: [accountId] },
  },
]
</script>

<style scoped>
@media (max-width: 780px) {
  .tabs {
    @apply pb-6 pt-2  overflow-x-scroll w-full;
  }
  .account-nav {
    /* @apply mb-6; */
  }
}
</style>
