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
    const allShiftsAdmin = ref([])
    const allShiftsAdminOriginal = ref([])
    const loading = ref(false)
    const users = ref([])
    const month = ref(new Date().getMonth() + 1)
    const monthAdmin = ref(new Date().getMonth() + 1)
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
          await getAllShifts()
        }
        await getShifts(user.value.id)
        loading.value = false
        router.push("/home")
      } else {
        user.value = null
        loading.value = false
        router.push("/")
      }
    }

    async function getUser(email, wachtwoord) {
      try {
        user.value = await apiService.login(email, wachtwoord)
      } catch (error) {
        setError("Fout bij inloggen. Probeer opnieuw.")
      }
    }

    async function getShifts(userId) {
      try {
        allShifts.value = await apiService.getShifts(userId)
        switchMonth(month.value)
      } catch (error) {
        setError("Fout bij het ophalen van shifts. Probeer opnieuw.", "error")
      }
    }

    function setError(err, type = "error") {
      error.value = { message: err, type: type }
      setTimeout(() => {
        error.value = null
      }, 2000)
    }

    function logout() {
      setError(null, "error")
      user.value = null
      admin.value = false
      localStorage.removeItem("user")
      router.push("/")
    }

    async function login(email, wachtwoord) {
      if (!wachtwoord) {
        setError("Vul een wachtwoord in.", "error")
        return
      }
      loading.value = true
      await getUser(email, wachtwoord)
      if (!user.value) {
        loading.value = false
        return
      }
      if (user.value.rol === "werkgever") {
        admin.value = true
        await getAllShifts()
      }
      await getShifts(user.value.id)
      localStorage.setItem("user", JSON.stringify(user.value))
      loading.value = false
      router.push("/home")
    }

    async function register(voornaam, naam, email, wachtwoord) {
      if (!voornaam || !naam || !email || !wachtwoord) {
        setError("Vul alle velden in.", "error")
        return
      }
      loading.value = true
      try {
        user.value = await apiService.register(voornaam, naam, email, wachtwoord)
        if (user.value.rol === "werkgever") {
          admin.value = true
          await getAllShifts()
        }
        await getShifts(user.value.id)
        localStorage.setItem("user", JSON.stringify(user.value))
        loading.value = false
        router.push("/home")
      } catch (error) {
        setError("Fout bij registratie. Probeer opnieuw.", "error")
        loading.value = false
      }
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
      userShifts.value = allShifts.value
        .filter((shift) => {
          const maand = parseInt(shift.datum.slice(5, 7))
          return maand === month.value
        })
        .sort((a, b) => {
          const dateA = new Date(`${a.datum}T${a.startUur}`)
          const dateB = new Date(`${b.datum}T${b.startUur}`)
          return dateA - dateB
        })
    }

    function switchMonthAdmin(newMonth) {
      monthAdmin.value = Number(newMonth)
      allShiftsAdmin.value = allShiftsAdminOriginal.value
        .filter((shift) => {
          const maand = parseInt(shift.datum.slice(5, 7))
          return maand === monthAdmin.value
        })
        .sort((a, b) => {
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
        setError("Uurloon succesvol aangepast.", "success")
        localStorage.setItem("user", JSON.stringify(user.value))
        getShifts(user.value.code)
      } catch (error) {
        setError("Fout bij het aanpassen van het uurloon. Probeer opnieuw.", "error")
      } finally {
        updatingUurloon.value = false
      }
    }

    async function addShift(id, datum, startUur, eindUur) {
      loading.value = true
      if (!datum || !startUur || !eindUur) {
        setError("Vul alle velden in.", "error")
        loading.value = false
        return
      }
      try {
        await apiService.addShift(id, datum, startUur, eindUur)
        setError("Shift succesvol toegevoegd.", "success")
        await getShifts(user.value.code)
        await getAllShifts()
      } catch (error) {
        setError("Fout bij het toevoegen van de shift. Probeer opnieuw.", "error")
      } finally {
        loading.value = false
      }
    }

    async function addShiftAdmin(voornaam, datum, startUur, eindUur) {
      loading.value = true
      if (!voornaam || !datum || !startUur || !eindUur) {
        setError("Vul alle velden in.", "error")
        loading.value = false
        return
      }
      const user = users.value.find((u) => u.voornaam === voornaam)
      if (!user) {
        setError("Gebruiker niet gevonden.", "error")
        loading.value = false
        return
      }
      try {
        await apiService.addShift(user.id, datum, startUur, eindUur)
        setError("Shift succesvol toegevoegd.", "success")
        await getAllShifts()
      } catch (error) {
        setError("Fout bij het toevoegen van de shift. Probeer opnieuw.", "error")
      } finally {
        loading.value = false
      }
    }

    async function getAllShifts() {
      try {
        allShiftsAdminOriginal.value = await apiService.getAllShifts()
        switchMonthAdmin(monthAdmin.value)
      } catch (error) {
        setError("Fout bij het ophalen van alle shifts. Probeer opnieuw.", "error")
      }
    }

    async function deleteShift(id, code) {
      loading.value = true
      try {
        await apiService.deleteShift(id, code)
        setError("Shift succesvol verwijderd.", "success")
        await getShifts(user.value.code)
        await getAllShifts()
      } catch (error) {
        setError("Fout bij het verwijderen van de shift. Probeer opnieuw.", "error")
      } finally {
        loading.value = false
      }
    }

    async function updateShift(id, code, datum, startUur, eindUur) {
      loading.value = true
      try {
        await apiService.updateShift(id, code, datum, startUur, eindUur)
        setError("Shift succesvol bijgewerkt.", "success")
        await getShifts(user.value.code)
        await getAllShifts()
      } catch (error) {
        setError("Fout bij het bijwerken van de shift. Probeer opnieuw.", "error")
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
      allShiftsAdmin,
      switchMonthAdmin,
      monthAdmin,
      addShiftAdmin,
      deleteShift,
      updateShift,
      setError,
      register
    }
  })
