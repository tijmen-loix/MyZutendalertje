<script setup>
import { useAuthStore } from "@/stores/auth.js"

const Auth = useAuthStore()


</script>
<template>
  <section>
    <select name="userChanger" @change="Auth.switchUser($event.target.value)" :value="Auth.user.code">
      <option v-for="user in Auth.users" :key="user.code" :value="user.code">{{user.voornaam}}</option>
    </select>
  </section>
</template>
<style scoped>
select {
  padding: 6px;
  border-radius: var(--radius);
  margin: 20px 20px 0 0;
  outline: none;
}
</style>
