import { TOKEN_KEY, USER_KEY, SOCKET_KEY } from "../config/config"
const CURRENT_LANGUAGE_KEY = "__current_language__"
const ACTIVE_NAV = "__active_nav__"

export class AppStorage {
  constructor(storage) {
    this.storage = storage || window.localStorage

    /** Is storage is supported or not */
    if (!this.isSupported()) {
      throw new Error("Storage is not supported by browser!")
    }
  }

  setItem(key, value) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  getItem(key) {
    return JSON.parse(this.storage.getItem(key))
  }

  removeItem(key) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }

  isSupported() {
    let supported = true

    if (!this.storage) {
      supported = false
    }

    return supported
  }
}

const appLocalStorage = new AppStorage()
// const appSesstionLocalStorage = new AppStorage(window.sessionStorage);
const appStorage = appLocalStorage //MARK: - Default localstorage

const tokenService = {
  getToken() {
    return appStorage.getItem(TOKEN_KEY)
  },

  saveToken(accessToken) {
    appStorage.setItem(TOKEN_KEY, accessToken)
  },

  removeToken() {
    appStorage.removeItem(TOKEN_KEY)
  },
}

const userInfoService = {
  getUser() {
    return appStorage.getItem(USER_KEY)
  },

  saveUser(user) {
    appStorage.setItem(USER_KEY, user)
  },

  removeUser() {
    appStorage.removeItem(USER_KEY)
  },
  // socket
  getUserSocket() {
    return appStorage.getItem(SOCKET_KEY)
  },
  saveUserSocket(socket) {
    appStorage.setItem(SOCKET_KEY, socket)
  },

  removeUserSocket() {
    appStorage.removeItem(SOCKET_KEY)
  },
}

const navService = {
  getActiveNav() {
    return appStorage.getItem(ACTIVE_NAV)
  },

  saveActiveNav(nav) {
    appStorage.setItem(ACTIVE_NAV, nav)
  },

  removeActiveNav() {
    appStorage.removeItem(ACTIVE_NAV)
  },
}

const LanguageService = {
  getCurrentLanguage() {
    return localStorage.getItem(CURRENT_LANGUAGE_KEY)
  },

  setCurrentLanguage(currentLanguage) {
    localStorage.setItem(CURRENT_LANGUAGE_KEY, currentLanguage)
  },
}
export {
  appStorage,
  tokenService,
  userInfoService,
  LanguageService,
  navService,
}
