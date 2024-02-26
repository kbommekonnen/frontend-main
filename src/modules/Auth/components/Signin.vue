<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <img
          class="w-8 h-8 mr-2"
          src="/public/logo.png"
          alt="logo"
        />
        golleta
      </a>
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <div class="space-y-4 md:space-y-6" action="/">
            <div v-if="errorMessage" class="text-center text-error">
              {{ errorMessage }}
            </div>
            <div>
              <label
                for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your username</label
              >
              <input
                type="username"
                v-model="username"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                required=""
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <!-- <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300"
                    >Remember me</label
                  >
                </div> -->
              </div>
              <a
                href="#"
                class="text-sm font-medium text-primary hover:underline dark:text-primary"
                >Forgot password?</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:focus:ring-blue-800"
              @click="handleLogin"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <a
                href="/registration"
                class="font-medium text-primary hover:underline dark:text-primary"
                >Sign up</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// import BaseIcon from "@/components/base/BaseIcon.vue"
import BaseInput from "@/components/base/BaseInput.vue"
import BaseButton from "@/components/base/BaseButton.vue"
import { inject, ref } from "vue"
import { tokenService, userInfoService } from "../../../services/storageService"
import { setHeaderAuthToken } from "../../../plugins/axios"
// import { useRouter } from "vue-router"

const postRequest = inject("postRequest")

// const router = useRouter()

let username = ref("")
let password = ref("")
let errorMessage = ref("")
let errors = ref({})
let working = ref(false)

async function handleLogin() {
  if (working.value) return
  working.value = true
  errorMessage.value = ""

  const { error, message, access_token, ...user } = await postRequest({
    url: "/credential/signin",
    data: {
      username: username.value,
      password: password.value,
    },
  })
  if (error) {
    errorMessage.value = message
    password.value = ""
  } else {
    await saveUserInformation(user, access_token)
    // router.push("/")
    // location.reload();
  }
  working.value = false
}
async function saveUserInformation(user, access_token) {
  try {
    if (access_token) {
      tokenService.saveToken(access_token)
      setHeaderAuthToken(access_token)
    }
    userInfoService.saveUser(user)

    window.location.reload()
    return true
  } catch (e) {
    return false
  }
}
</script>

<style></style>
