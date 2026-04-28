import { defineStore } from "pinia"
import { ref } from "vue"
import router from "@/router"
import { computed } from "vue"
import apiService from "@/services/api.service.js"

export const useAuthStore = defineStore("auth", () => {
  const error = ref(null)
  const user = ref(null)
  const admin = ref(false)
  const userShifts = ref([])
  const allShifts = ref([])
  const loading = ref(false)
  const users = ref([])
  const month = ref(new Date().getMonth() + 1)
  const year = ref(new Date().getFullYear())
  const updatingUurloon = ref(false)

  async function initialize() {
    loading.value = true
    error.value = null
    const storedUser = localStorage.getItem("user")
    users.value = await apiService.getUsers()
    if (storedUser) {
      user.value = JSON.parse(storedUser)
      if (user.value.rol === "werkgever") {
        admin.value = true
      }
      await getShifts(user.value.code)
      loading.value = false
    } else {
      user.value = null
      loading.value = false
    }
  }

  async function getUser(code) {
    try {
      user.value = await apiService.login(code)
    } catch (error) {
      setError("Fout bij inloggen. Probeer opnieuw.")
    }
  }

  async function getShifts(code) {
    try {
      allShifts.value = await apiService.getShifts(code)
      switchMonth(month.value)
    } catch (error) {
      setError("Fout bij het ophalen van shifts. Probeer opnieuw.")
    }
  }

  function setError(err) {
    error.value = err
    setTimeout(() => {
      error.value = null
    }, 1500)
  }

  function logout() {
    setError(null)
    user.value = null
    admin.value = false
    localStorage.removeItem("user")
    router.push("/")
  }

  async function login(code) {
    if (!code) {
      setError("Vul een code in.")
      return
    }
    loading.value = true
    await getUser(code)
    if (!user.value) {
      loading.value = false
      return
    }
    if (user.value.rol === "werkgever") {
      admin.value = true
    }
    await getShifts(code)
    localStorage.setItem("user", JSON.stringify(user.value))
    loading.value = false
    router.push("/home")
  }

  async function switchUser(newCode) {
    loading.value = true
    await getUser(newCode)
    await getShifts(newCode)
    localStorage.setItem("user", JSON.stringify(user.value))
    loading.value = false
  }

  function switchMonth(newMonth) {
    month.value = Number(newMonth)
    userShifts.value = allShifts.value.filter((shift) => {
      const maand = parseInt(shift.datum.slice(5, 7))
      return maand === month.value
    }).sort((a, b) => {
      const dateA = new Date(`${a.datum}T${a.startUur}`)
      const dateB = new Date(`${b.datum}T${b.startUur}`)
      return dateA - dateB
    })
  }

  async function updateUurloon(uurloon) {
    if (updatingUurloon.value) return
    updatingUurloon.value = true
    try {
      await apiService.updateUurloon(user.value.code, uurloon)
      user.value.uurloon = uurloon
      setError("Uurloon succesvol aangepast.")
      localStorage.setItem("user", JSON.stringify(user.value))
      getShifts(user.value.code)
    } catch (error) {
      setError("Fout bij het aanpassen van het uurloon. Probeer opnieuw.")
    } finally {
      updatingUurloon.value = false
    }
  }

  async function addShift(code, datum, startUur, eindUur) {
    loading.value = true
    if (!datum || !startUur || !eindUur) {
      setError("Vul alle velden in.")
      console.log(eindUur, startUur, datum)
      loading.value = false
      return
    }
    try {
      await apiService.addShift(code, datum, startUur, eindUur)
      setError("Shift succesvol toegevoegd.")
      await getShifts(user.value.code)
    } catch (error) {
      setError("Fout bij het toevoegen van de shift. Probeer opnieuw.")
    } finally {
      loading.value = false
    }
  }

  const isLoggedIn = computed(() => !!user.value)

  initialize()

  return {
    login,
    error,
    logout,
    user,
    userShifts,
    users,
    switchUser,
    isLoggedIn,
    loading,
    month,
    year,
    switchMonth,
    admin,
    updateUurloon,
    updatingUurloon,
    addShift,
  }
})
