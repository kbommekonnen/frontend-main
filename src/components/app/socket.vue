<template>
  <div>
    <!-- <pre>{{{ connecting, clientConnected, showSnakbar } }}}</pre> -->
    <div
      class="absolute z-20 left-0 bottom-0 py-2 px-4 ml-4 mb-4 shadow rounded"
      :class="
        connecting || clientConnected
          ? 'bg-primary text-white'
          : 'bg-danger text-error'
      "
      v-if="showSnakbar"
    >
      <div v-if="connecting" class="flex space-x-2 items-center">
        <base-icon name="spin" class="spinner" :size="36" />
        <div class="-space-y-1">
          <div>Connecting to server</div>
          <div class="text-sm">
            Please wait until it gets connected to the server!
          </div>
        </div>
      </div>
      <div v-else-if="clientConnected">Server connected</div>
      <div v-else>
        <div>Server disconnected</div>
        <div class="flex space-x-2 items-center text-textDark text-sm">
          <div>Reconnecting after {{ counter }} seconds</div>
          <base-button
            label="connect now"
            class="text-xs px-2 rounded"
            @click="ioconnect"
          />
        </div>
      </div>
    </div>
    <!-- <sign-me-out /> -->
  </div>
</template>

<script>
import io from "socket.io-client"
import { IO_BASE_URL } from "@/config/config"
import useSocketStore from "../../stores/modules/socket"
// import SignMeOut from './SignMeOut.vue'
import { tokenService } from "@/services/storageService"
import { userInfoService } from "../../services/storageService"
import { toRefs } from "vue"
export default {
  //   components: { SignMeOut },
  setup() {
    const { sioClient, clientConnected, socketId } = toRefs(useSocketStore())
    return { sioClient, clientConnected, socketId }
  },
  data() {
    return {
      connecting: false,
      showSnakbar: true,
      counter: 0,
      timerId: undefined,
    }
  },
  methods: {
    async ioconnect() {
      if (this.timerId) {
        this.counter = 0
        // clearInterval(this.timerId)
        this.timerId = undefined
      }
      const token = tokenService.getToken()
      this.connecting = true

      let sioClient = await io(IO_BASE_URL, {
        query: { token: '"' + token + '"' },
        withCredentials: true,
      })
      this.sioClient = sioClient
      sioClient.on("connect", () => {
        console.log("socket id ", sioClient.id)
        if (sioClient.id) {
          userInfoService.saveUserSocket(sioClient.id)
        }
        this.clientConnected = true
      })
      sioClient.on("disconnected", (data) => {
        console.log("sio disconnected", data)
      })
      sioClient.on("connecting", (data) => {
        console.log("sio connecting", data)
      })
      if (sioClient) {
        // this.socketStore.smartSet({ stateKey: 'sioClient', data: sioClient });
        if (sioClient.connected) {
          this.clientConnected = true
        } else {
          this.counter = 59
          this.timerId = setInterval(
            () => (this.counter === 0 ? this.ioconnect() : this.counter--),
            1000,
          )
        }
      }

      this.connecting = false
    },
  },
  async created() {
    await this.ioconnect()
  },
  watch: {
    deep: true,
    sioClient: {
      immediate: true,
      handler() {
        if (this.sioClient) {
          if (this.sioClient.connected) {
            this.clientConnected = true
          }
          this.sioClient.on("connected", () => {
            this.clientConnected = true
          })

          this.sioClient.on("disconnect", () => {
            this.clientConnected = false
          })
        }
      },
    },
    clientConnected: {
      immediate: true,
      handler() {
        setTimeout(
          () => (this.showSnakbar = !this.clientConnected),
          this.clientConnected ? 2000 : 0,
        )
      },
    },
  },
  unmounted() {
    this.sioClient = null
    this.clientConnected = false
  },
}
</script>

<style></style>
