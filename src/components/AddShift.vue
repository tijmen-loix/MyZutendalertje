<script setup>
import { ref, watch } from "vue"
import { useAuthStore } from "@/stores/auth.js"

const Auth = useAuthStore()

const datum = ref(`${Auth.year}-${String(Auth.month).padStart(2, '0')}-`)
const startUur = ref("")
const eindUur = ref("")

watch(() => Auth.month, (newMonth) => {
  datum.value = `${Auth.year}-${String(newMonth).padStart(2, '0')}-`
})

</script>
<template>
  <tr>
    <td><input type="text" v-model="datum" /></td>
    <td><input type="text" v-model="startUur" placeholder="10:00"/></td>
    <td><input type="text" v-model="eindUur" placeholder="18:00"/></td>
    <td>
      <button @click="Auth.addShift(Auth.user.code, datum, startUur, eindUur)">
        Toevoegen
      </button>
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
  margin:0;
  height: 100%;
  width: 100%;
  outline: none;
  background-color: var(--black-mute);
  color: var(--white-soft);
  padding: 0 4px;
  font-size: 14px;
}
button{
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: var(--black-mute);
  color: var(--white-soft);
  font-weight: 200;
  font-style: italic;
}
</style>
