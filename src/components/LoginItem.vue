<script setup>
import { ref } from "vue"
import { useAuthStore } from "@/stores/auth.js"
const Auth = useAuthStore()
const code = ref("")
async function handleSubmit() {
  await Auth.login(code.value)
}
</script>
<template>
  <section>
    <img src="@/img/logo-witGroot.png" alt="Logo 't Zutendalertje" class="logo" />
    <input v-model="code" type="password" placeholder="code" required />
    <button type="submit" @click="handleSubmit">inloggen</button>
    <p v-if="Auth.error" :class="Auth.error.type">{{ Auth.error.message }}</p>
  </section>
</template>
<style scoped>
section {
  display: flex;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  margin-top: 60px;
}
.logo {
  width: 440px;
}
input {
  padding: 6px;
  font-size: 16px;
  border-radius: var(--radius);
  margin-top: -20px;
  border: 2px solid var(--black-soft);
  font-weight: bold;
  background-color: var(--white);
}
input:focus {
  border: 2px solid var(--secondary);
  outline: none;
}
@media screen and (max-width: 500px) {
  .logo {
    width: 300px;
  }
  input {
    font-size: 14px;
  }
}
</style>
