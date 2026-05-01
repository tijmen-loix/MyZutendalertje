<script setup>
import { useAuthStore } from "@/stores/auth.js"

const Auth = useAuthStore()
</script>
<template>
  <section>
    <select
      name="userChanger"
      @change="Auth.switchUser($event.target.value)"
      :value="Auth.user.code"
    >
      <option v-for="user in Auth.users" :key="user.code" :value="user.code">
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
