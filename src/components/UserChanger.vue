<script setup>
import { useAuthStore } from "@/stores/auth.js"
import { ref } from "vue"

const Auth = useAuthStore()

const selectedUser = ref(Auth.user.id)

function handleUserChange(event) {
  Auth.switchUser(event)
  selectedUser.value = Number(event)
}
</script>
<template>
  <section>
    <select
      name="userChanger"
      @change="handleUserChange($event.target.value)"
      :value="selectedUser"
    >
      <option v-for="user in Auth.users" :key="user.id" :value="user.id">
        {{ user.voornaam }}
      </option>
    </select>
  </section>
</template>
<style scoped>
select {
  padding: 6px;
  border-radius: var(--radius);
  margin: 0 10px 10px 0;
  outline: none;
}
@media screen and (max-width: 1130px) {
  select {
    margin: 0 5px 10px 0;
    padding: 4px;
    font-size: 10px;
  }
}
</style>
