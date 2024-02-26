<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col space-y-2 h-full w-full bg-primaryBg p-4">
    <div class="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      <account-preference-card
        v-model="cashOnHandAccount"
        label="cash on hand account"
        :api="api.changeCashOnHandAccount"
      />
      <account-preference-card
        v-model="defaultSellAccount"
        label="default sell account"
        :api="api.changeDefaultSellAccount"
      />
      <account-preference-card
        v-model="defaultPurchaseAccount"
        label="default purchase account"
        :api="api.changeDefaultPurchaseAccount"
      />
    </div>
  </div>
</template>

<script setup>
import AccountPreferenceCard from "./card/AccountPreferenceCard.vue"
import { usePreferencesStore } from "../../Settings/store"
import api from "../api"
import { toRefs } from "vue"
const { cashOnHandAccount, defaultSellAccount, defaultPurchaseAccount } =
  toRefs(usePreferencesStore())
</script>

<style></style>
