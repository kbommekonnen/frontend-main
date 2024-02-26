export const modalHandlers = {
  data() {
    return {
      cb: null,
      cbParams: null,
      openedId: undefined,
      componentProps: null,
    }
  },
  methods: {
    handleClose(data) {
      if (!data) data = {}
      let { invokeCallBack = false, response = null } = data
      this.openedModals.pop()
      if (this.cb && invokeCallBack) {
        if (response) {
          if (this.cbParams) this.cbParams.response = response
          else {
            this.cbParams = {}
            this.cbParams.response = response
          }
        }
        if (this.cbParams) this.cb(this.cbParams)
        else this.cb()
      }
    },
  },
}
