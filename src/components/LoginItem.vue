<script setup>
import {ref} from 'vue'
import {useAuthStore} from '@/stores/auth.js'
const Auth = useAuthStore();
const code = ref('')
async function handleSubmit() {
  await Auth.login(code.value);
}
</script>
<template>
  <section>
    <img src="@/img/logo-wit.png" alt="Logo 't Zutendalertje" class="logo">
    <input v-model="code" type="text" placeholder="code" required/>
    <button type="submit" @click="handleSubmit">inloggen</button>
    <p class="error">{{Auth.error}}</p>
  </section>
</template>
<style scoped>
section{
  display: flex;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  margin-top: 60px;
}
.logo {
  width: 400px;
}
input {
  padding: 6px;
  font-size: 16px;
  border-radius: var(--radius);
  margin-top: 20px;
  border: 2px solid var(--black-soft);
  font-weight: bold;
  background-color: var(--white);

}
input:focus {
  border: 2px solid var(--secondary);
  outline: none;
}

button {
  padding: 6px;
  font-size: 16px;
  border-radius: var(--radius);
  margin-top: 20px;
  border: 2px solid var(--black-soft);
  font-weight: bold;
  background-color: var(--white);
  width: 100px;
  transition: 0.1s;
}
button:hover{
  background-color: var(--secondary);
  color: var(--white);
  cursor: pointer;
  transition: 0.1s;
}
</style>
