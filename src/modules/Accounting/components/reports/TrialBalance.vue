<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex space-x-2 h-full w-full">
    <data-table
      title="trial balance"
      :showHeader="true"
      :headers="TrialBalanceHeaders"
      :api="api.getTrialBalance"
      :searchApi="api.search"
      class="flex-grow bg-white h-full"
    >
      <template #gl="{ item, value }">
        <router-link :to="`/account/detail/${item._id}`" class="text-textDark">{{
          value.name
        }}</router-link>
      </template>
      <template #debit="{ item }">
        <div>
          {{
            (item.gl.side == "Debit" && item.balance >= 0) ||
            (item.gl.side == "Credit" && item.balance < 0)
              ? Number(Math.abs(item.balance)).toLocaleString()
              : 0
          }}
        </div>
      </template>
      <template #credit="{ item }">
        <div>
          {{
            (item.gl.side == "Credit" && item.balance >= 0) ||
            (item.gl.side == "Debit" && item.balance < 0)
              ? Number(Math.abs(item.balance)).toLocaleString()
              : 0
          }}
        </div>
      </template>
      <template #mobile="{ item }">
        <router-link :to="`/accounts/${item._id}`">
          <mobile-account-card :account="item" />
        </router-link>
      </template>
    </data-table>
  </div>
</template>

<script setup>
import { TrialBalanceHeaders } from "../../headers"
import api from "../../api"
import DataTable from "@/components/table/DataTable.vue"
import MobileAccountCard from "../mobile-view/MobileAccountCard.vue"
</script>

<style></style>
