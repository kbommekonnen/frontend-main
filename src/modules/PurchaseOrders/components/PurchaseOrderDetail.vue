<template>
  <div class="flex flex-col h-full max-h-full space-y-1 items-start">
    <div
      class="flex justify-between items-center w-full capitalize text-xl tracking-wider shadow-top bg-white p-3"
    >
      <div class="w-full flex justify-between space-x-2 items-center">
        <div class="flex-grow flex space-x-2 items-center">
          <router-link :to="{ name: 'PurchaseOrders' }">
            <base-icon
              content="back"
              name="arrow-left"
              class="cursor-pointer"
            />
          </router-link>
          <div class="text-textDark">{{ $t("purchase order detail") }}</div>
        </div>
        <div class="flex space-x-2 items-center">
          <!-- <base-button
            type="secondary"
            label="print invoice"
            icon="file-invoice"
            @click="deleteTransaction"
            disabled
            class="capitalize"
          /> -->
          <base-button
            v-if="false"
            type="primary"
            label="convert purchase"
            icon="check-circle"
            @click="convertToPurchase"
            class="capitalize"
          />
          <transaction-actions :transaction="transaction" />
          <base-button
            type="danger"
            label="delete"
            icon="trash"
            disabled
            @click="deleteTransaction"
            class="capitalize"
          />
        </div>
      </div>
    </div>
    <PerfectScrollbar
      class="flex-grow w-full flex space-x-1 bg-primaryBg overflow-y-scroll"
    >
      <div class="flex flex-col h-full space-y-4 bg-white p-3">
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("invoice number") }}</div>
          <div class="text-lg uppercase">
            {{ transaction.invoiceNumber }}
          </div>
        </div>
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("order number") }}</div>
          <div class="text-lg uppercase">
            {{ transaction.orderNumber }}
          </div>
        </div>
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("issue number") }}</div>
          <div class="text-lg uppercase">
            {{ transaction.issueNumber }}
          </div>
        </div>
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("plate number") }}</div>
          <div class="text-lg uppercase">
            {{ transaction.plateNumber }}
          </div>
        </div>
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("warehouse") }}</div>
          <div v-if="transaction.store" class="text-lg uppercase">
            {{ transaction.store.name }}
          </div>
        </div>
        <!-- <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("supplier") }}</div>
          <div class="text-lg uppercase">{{ transaction.supplier }}</div>
        </div> -->
        <div class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("date") }}</div>
          <div class="text-lg">
            {{ formateDate(transaction.createdAt, "MMM DD YYYY hh:mm") }}
          </div>
        </div>
        <div v-if="transaction" class="space-y-0 bg-secondaryBg p-2">
          <div class="capitalize">{{ $t("status") }}</div>
          <div
            :style="{
              backgroundColor: `${getStatusColor(transaction.status)}`,
            }"
            :class="`text-[${getStatusColor(
              transaction.status,
            )}] bg-[${getStatusColor(transaction.status)}]`"
            class="px-3 rounded bg-opacity-30 text-white text-lg"
          >
            {{ transaction.status }}
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col space-y-1">
        <data-table
          :headers="purchaseDetailHeaders"
          :api="api.getPurchaseItems"
          :params="[id]"
          ref="orderedItemsTable"
          class="flex-grow-0 flex-shrink-0 max-h-[70%] bg-white"
        >
          <template #item="{ item }">
            <router-link
              v-if="item._id"
              class="cursor-pointer"
              :to="`/inventory/items/${item.item.id}`"
              >{{ item.item.name }}
              <span
                class="inline-flex text-primary border border-primary px-2 text-xs mx-2 rounded"
                v-if="editing.includes(item._id)"
              >
                editing
              </span>

              <span
                class="inline-flex text-error border border-error px-2 text-xs mx-2 rounded"
                v-if="deleting.includes(item._id)"
              >
                deleting
              </span>
            </router-link>
            <div v-else class="w-full">
              <item-selector
                v-model="newItemForm.item"
                label=""
                placeholder="Add new item"
              />
            </div>
          </template>
          <template #quantity="{ item }">
            <base-input
              v-if="editing.includes(item._id)"
              type="number"
              v-model="Form[item._id].quantity"
            />
            <base-input
              v-else-if="!item._id"
              type="number"
              placeholder="quantity"
              v-model="newItemForm.quantity"
            />
            <div v-else class="px-4">{{ $n(item.quantity || 0) }}</div>
          </template>
          <template #rate="{ item }">
            <base-input
              v-if="editing.includes(item._id)"
              type="number"
              v-model="Form[item._id].rate"
            />
            <base-input
              v-else-if="!item._id"
              type="number"
              placeholder="rate"
              v-model="newItemForm.rate"
            />
            <div v-else>{{ $n(item.rate || 0) }}</div>
          </template>

          <template #amount="{ item }">
            <div v-if="editing.includes(item._id)">
              {{ $n(Form[item._id].quantity * Form[item._id].rate || 0) }}
            </div>
            <div v-else-if="!item._id">
              {{ $n(newItemForm.quantity * newItemForm.rate || 0) }}
            </div>
            <div v-else>{{ $n(item.quantity * item.rate || 0) }}</div>
          </template>
          <template #actions="{ item, index }">
            <div class="inline-flex space-x-2">
              <base-button
                v-if="editing.includes(item._id)"
                label="Update"
                icon="check"
                @click="handleUpdate(item._id)"
              />
              <base-button
                v-else-if="deleting.includes(item._id)"
                type="danger"
                label="Confirm Delete"
                icon="trash"
                @click="handleDeleteOrderItem(item._id)"
              />
              <base-button
                v-else-if="!item._id"
                label="Save"
                icon="check-circle"
                @click="saveNewOrderItem(index)"
              />
              <template v-else-if="orderedItemsTable.showActionsIndex == index">
                <base-button
                  type="secondary"
                  label="Edit"
                  icon="edit"
                  @click="handleEdit(item)"
                />
                <base-button
                  type="secondary"
                  label="Delete"
                  icon="times"
                  @click="preDeleteOrderItem(item)"
                />
              </template>
            </div>
          </template>

          <template #footer>
            <div
              class="w-full bg-white flex justify-between space-x-4 p-4 items-center"
            >
              <div class="flex-grow-0">
                <base-button
                  type="plain"
                  label="add item"
                  icon="plus"
                  @click="addNewItem"
                />
              </div>
              <div class="flex-grow flex justify-end items-center space-x-4">
                <div class="first-letter:uppercase">
                  {{ $t("total amount") }}
                </div>
                <div class="text-lg font-semibold">
                  {{ $n(transaction.totalAmount || 0) }}
                </div>
              </div>
            </div>
          </template>
        </data-table>
        <empty-issue-items
          class="flex-grow bg-white max-h-[60%]"
          :issueNumber="transaction.issueNumber"
        />
      </div>
    </PerfectScrollbar>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue"
import api from "../api.js"
import { purchaseDetailHeaders } from "../headers.js"
import { confirmDelete as deleteTransaction } from "../functions.js"
import { useRoute, useRouter } from "vue-router"
import { PerfectScrollbar } from "vue3-perfect-scrollbar"
import DataTable from "@/components/table/DataTable.vue"
import ItemSelector from "../../Items/components/ItemSelector.vue"
import TransactionActions from "./TransactionActions.vue"
import EmptyIssueItems from "../../Issues/components/EmptyIssueItems.vue"
import { formateDate, getStatusColor } from "../../../utils"
const getRequest = inject("getRequest") // inject axios
const putRequest = inject("putRequest") // inject axios
const deleteRequest = inject("deleteRequest") // inject axios
const postRequest = inject("postRequest") // inject axios
const orderedItemsTable = ref()
onMounted(() => {
  console.info(orderedItemsTable.value.items)
})

let working = ref(true)
let transaction = ref({})
const router = useRouter()
const id = useRoute().params.id

const Form = ref({})
const newItemForm = ref({})

const editing = ref([])
const deleting = ref([])

getRequest({ ...api.get, params: [id] }).then(({ item }) => {
  transaction.value = item
  working.value = false
})
function addNewItem() {
  newItemForm.value.organization = transaction.value.organization
  newItemForm.value.store = transaction.value.store._id
  newItemForm.value.status = transaction.value.status
  newItemForm.value.purchaseOrder = id
  newItemForm.value.item = ref("")
  newItemForm.value.quantity = ref(1)
  newItemForm.value.rate = ref(0)

  orderedItemsTable.value.addNewItem(newItemForm.value)
}
function handleEdit({ _id, quantity, rate }) {
  editing.value.push(_id)
  Form.value[_id] = {
    quantity: ref(quantity),
    rate: ref(rate),
  }
}
async function saveNewOrderItem(index) {
  const response = await postRequest({
    ...api.addPurchaseOrderItem,
    data: newItemForm.value,
  })
  if (response.error) {
    return
  }
  newItemForm.value = ref({})
  orderedItemsTable.value.removeItem(index)

}
async function handleUpdate(_id) {
  const response = await putRequest({
    ...api.editPurchaseOrderItem,
    params: [_id],
    data: Form.value[_id],
  })
  if (response.error) {
    return
  }
  const index = editing.value.indexOf(_id)
  editing.value.splice(index, 1)
  Form.value.splice(index, 1)
}
function preDeleteOrderItem({ _id }) {
  deleting.value.push(_id)
}
async function handleDeleteOrderItem(_id) {
  const response = await deleteRequest({
    ...api.deletePurchaseOrderItem,
    params: [_id],
  })
  if (response.error) {
    return
  }
  const index = deleting.value.indexOf(_id)
  deleting.value.splice(index, 1)
}

function convertToPurchase() {
  router.back()
}
</script>

<style></style>
