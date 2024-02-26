<template>
  <div class="cursor-pointer">
    <tippy
      trigger="click"
      theme="light"
      arrow
      animation="scale"
      interactive
      hideOnClick
      :ref="(el) => (profileTippy = el)"
      content="detail"
      @outSideClickHandler="closeTippy"
    >
      <div
        class="flex items-center space-x-2 py-1 px-3 rounded hover:text-primary cursor-pointer grow-active shadow-sm"
      >
        <div class="rounded input-box flex-shrink-0 flex-grow">
          <base-image
            class="w-8 h-8"
            v-if="userStore.user.profileImg"
            :src="userStore.user.profileImg"
            placeholder="image"
          />
          <base-avatar
            v-else
            :name="userStore.user.name"
            icon="user"
            placeholder="image"
          />
        </div>
      </div>
      <template #content>
        <div
          class="py-2 px-1 space-y-4 overflow-y-auto max-h-sm bg-white shadow-md border border-bgPrimary"
        >
          <div class="flex space-x-3">
            <div
              class="flex items-center justify-around flex-shrink-0 shadow-md bg-brightGray rounded p-2"
            >
              <base-image
                class="h-32"
                v-if="userStore.user.profileImg"
                :src="userStore.user.profileImg"
                placeholder="image"
              />
              <base-avatar
                v-else
                :name="userStore.user.name"
                icon="user"
                placeholder="image"
              />
            </div>
            <div class="flex-grow-0">
              <div>
                <div class="text-xl text-textLight">
                  {{ userStore.user.name }}
                </div>

                <div class="text-sm text-textLight">
                  @ {{ userStore.user.username }}
                </div>
                <!-- <div class="text-sm text-textLight">
								@{{ user.officeName }}
							</div> -->
              </div>
            </div>
          </div>
          <div
            class="flex justify-around p-2 space-x-3 items-center capitalize"
          >
            <base-button icon="user-cog" label="settings" />
            <base-button
              icon="sign-out-alt"
              label="log out"
              @click="logout"
              class="flex-shrink-0"
            />
          </div>
        </div>
      </template>
    </tippy>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores"
import { Tippy } from "vue-tippy"
import { useRouter } from "vue-router"
import { ref } from "vue"
let profileTippy = ref("profileTippy")
const router = useRouter()
const userStore = useUserStore()
const logout = function logout() {
  userStore.logout()
  closeTippy()
  router.push("/signin")
}
const closeTippy = () => {
  console.log(profileTippy)
  // profileTippy.tip.hide()
}
</script>

<style></style>
