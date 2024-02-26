<template>
  <div v-if="false" class="space-y-0.5 p-0.5 capitalize bg-primaryBg">
    <div
      v-for="module in moduleOptions"
      :key="module._id"
      class="bg-white p-3 shadow-sm"
    >
      <div class="light-title border-b border-primaryBg py-2">
        {{ module.name }}
      </div>
      <div class="space-y-2">
        <div
          class="grid grid-cols-9 gap-1 p-1 border-b border-primaryBg font-medium"
        >
          <div class="col-span-2"></div>
          <div class="lowercase first-letter:uppercase">
            {{ $t("full access") }}
          </div>
          <div class="">{{ $t("view") }}</div>
          <div class="">{{ $t("create") }}</div>
          <div class="">{{ $t("edit") }}</div>
          <div class="">{{ $t("delete") }}</div>
        </div>
        <div v-for="({ name, actions }, i) in module.categories" :key="i">
          <div class="grid grid-cols-9 gap-1 border-b border-primaryBg p-1">
            <div class="col-span-2 text-lg tracking-wider text-opacity-25">
              {{ name }}
            </div>
            <div class="">
              <base-check-box
                :selected="hasCategoryFullAccess(actions)"
                @click="toggleCategory(actions)"
              />
            </div>
            <div class="">
              <base-check-box
                :selected="store.authorizedActions.includes(actions.view)"
                @click="toggleAction(actions.view)"
              />
            </div>
            <div class="">
              <base-check-box
                :selected="store.authorizedActions.includes(actions.create)"
                @click="toggleAction(actions.create)"
              />
            </div>
            <div class="">
              <base-check-box
                :selected="store.authorizedActions.includes(actions.edit)"
                @click="toggleAction(actions.edit)"
              />
            </div>
            <div class="">
              <base-check-box
                :selected="store.authorizedActions.includes(actions.delete)"
                @click="toggleAction(actions.delete)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGrantAndRevokeActionStore } from "../store.js"
import itemsActions from "../../Items/authCodes.json"
import compositesActions from "../../Composites/authCodes.json"
import itemGroupsActions from "../../ItemGroups/authCodes.json"
import categoriesActions from "../../ItemCategory/authCodes.json"
import transfersActions from "../../Transfers/authCodes.json"
import adjustmentsActions from "../../Adjustments/authCodes.json"

let store = useGrantAndRevokeActionStore()

let moduleOptions = [
  {
    name: "dashboard",
    code: "DS01",
    categories: [],
  },
  {
    name: "inventory",
    code: "IV02",
    categories: [
      itemsActions,
      compositesActions,
      itemGroupsActions,
      categoriesActions,
      transfersActions,
      adjustmentsActions,
    ],
  },
  {
    name: "purchases",
    code: "PR03",
    categories: [],
  },
  {
    name: "sales",
    code: "SL04",
    categories: [],
  },
  {
    name: "reports",
    code: "RP05",
    categories: [],
  },
  {
    name: "settings",
    code: "ST06",
    categories: [],
  },
]

// toggle action
function toggleAction(code) {
  const codeIndex = store.authorizedActions.indexOf(code)
  if (codeIndex > -1) {
    store.authorizedActions.splice(codeIndex, 1)
  } else {
    store.authorizedActions.push(code)
  }
}

function getCategoryActionCodes(actions) {
  return [
    actions.view,
    actions.create,
    actions.edit,
    actions.delete,
    ...actions.other.map(({ code }) => code),
  ].filter((code) => code)
}
function hasCategoryFullAccess(actions) {
  const actionCodes = getCategoryActionCodes(actions)
  const fullAccessGranted = actionCodes.every((code) =>
    store.authorizedActions.includes(code),
  )
  return fullAccessGranted
}
function toggleCategory(actions) {
  const actionCodes = getCategoryActionCodes(actions)
  const fullAccessGranted = hasCategoryFullAccess(actions)
  if (fullAccessGranted) {
    actionCodes.forEach((code) => {
      const index = store.authorizedActions.indexOf(code)
      store.authorizedActions.splice(index, 1)
    })
  } else {
    actionCodes.forEach((code) => {
      if (!store.authorizedActions.includes(code)) {
        store.authorizedActions.push(code)
      }
    })
  }
}
</script>

<style scoped></style>
