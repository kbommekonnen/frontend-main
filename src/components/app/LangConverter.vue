<template>
  <Tippy
    trigger="click"
    theme="light"
    arrow
    placement="bottom"
    animation="scale"
    interactive
    hideOnClick
    ref="tippy"
    content="change language"
    @outSideClickHandler="closeTippy"
  >
    <div
      class="flex items-end space-x-1 border border-primary px-3 rounded hover:text-primary cursor-pointer grow-active"
    >
      <!-- <base-icon name="language"/> -->
      <div class="rounded input-box flex-shrink-0 flex-grow">
        {{ language }}
      </div>
      <base-icon name="caret-down" class="text-textLight" />
    </div>
    <template #content>
      <div class="overflow-y-auto max-h-sm bg-white border shadow-md p-4">
        <div class="space-y-2">
          <div class="text-textLight">{{ "CHANGE_LANGUAGE" }}</div>
          <div
            v-for="lang in languages"
            :key="lang.value"
            class="border-2 rounded cursor-pointer hover:opacity-75 p-2"
            :class="{
              'border-primary': lang.value === language,
              'border-transparent': lang.value !== language,
            }"
            @click="toggleLang(lang.value)"
          >
            <div>{{ lang.label }}</div>
            <div class="text-sm">{{ "INPUT" }} ({{ lang.letters }})</div>
          </div>
        </div>
      </div>
    </template>
  </Tippy>
</template>

<script setup>
import { Tippy } from "vue-tippy"
import { LanguageService } from "@/services/storageService"
import { watch, ref } from "vue"
// import { useI18n } from "vue-i18n";
import { switchLanguage } from "../../plugins/localization"
const language = ref(LanguageService.getCurrentLanguage())
const tippyRef = ref("tippy")
const working = ref(false)
// const i18n = useI18n()
const languages = [
  { label: "English (United States)", letters: "ABC", value: "en" },
  { label: "Tigrigna - ትግርኛ", letters: "ሀለሐ", value: "tg" },
]
watch(
  () => language.value,
  () => {
     handleSave()
  },
  {},
)

function toggleLang(lang) {
  language.value = lang
}
async function handleSave() {
  working.value = true
  LanguageService.setCurrentLanguage(language.value) //to preserve if the page is refreshed
  // this.mainStore.setData({ stateKey: "language", data: this.language })
  // this.$i18n.locale = this.language //fast change
  // setI18nLanguage( i18n, language.value)
  await switchLanguage(language.value)
  working.value = false
  closeTippy()
}
function closeTippy() {
  console.log(tippyRef)
  // refs.tippy.hide()
  // $refs.tippy.hide()
}
</script>

<style></style>
