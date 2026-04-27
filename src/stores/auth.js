import { defineStore } from "pinia"
import { ref } from "vue"
import router from "@/router"

export const useAuthStore = defineStore("auth", () => {
  const error = ref(null)

  function setError(err) {
    error.value = err
  }

  function logout() {
    router.push("/")
  }

  async function login() {
    router.push("/home")
  }
  return { login, error, logout }
})
