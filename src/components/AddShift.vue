<script setup>
import { ref, watch } from "vue"
import { useAuthStore } from "@/stores/auth.js"

const Auth = useAuthStore()

const datum = ref(`${Auth.year}-${String(Auth.month).padStart(2, "0")}-`)
const startUur = ref("")
const eindUur = ref("")

watch(
  () => Auth.month,
  (newMonth) => {
    datum.value = `${Auth.year}-${String(newMonth).padStart(2, "0")}-`
  },
)
</script>
<template>
  <tr v-if="Auth.admin">
    <td><input type="text" v-model="datum" /></td>
    <td><input type="text" v-model="startUur" placeholder="10:00" /></td>
    <td><input type="text" v-model="eindUur" placeholder="18:00" /></td>
    <td>
      <button @click="Auth.addShift(Auth.user.code, datum, startUur, eindUur)">Toevoegen</button>
    </td>
  </tr>
</template>
<style scoped>
td {
  border: 1px solid var(--white-soft);
  padding: 0;
  width: 200px;
}
td:nth-child(4) {
  width: 300px;
}
input {
  margin: 0;
  height: 30px;
  width: 100%;
  outline: none;
  background-color: var(--black-mute);
  border: none;
  color: var(--white-soft);
  padding: 0 6px;
  font-size: 14px;
}
button {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: var(--black-mute);
  color: var(--white-soft);
  font-weight: 200;
  font-style: italic;
}

@media screen and (max-width: 1130px) {
  table {
    width: 100%;
  }
  td,
  th {
    width: 20%;
    padding: 1px 3px;
    height: 26px;
  }
  td:nth-child(4) {
    width: 25%;
  }
  td {
    font-size: 12px;
  }
  th {
    font-size: 14px;
  }

  input {
    font-size: 10px;
    height: 100%;
    width: 100%;
    padding: 0 2px;
  }
  button {
    font-size: 12px;
  }
}
</style>
