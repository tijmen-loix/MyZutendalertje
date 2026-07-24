<script setup>
import { ref } from "vue"
import { useAuthStore } from "@/stores/auth.js"
const Auth = useAuthStore()
const voornaam = ref("")
const naam = ref("")
const code = ref("")
const email = ref("")
const codeRepeated = ref("")
async function handleLogin() {
  await Auth.login(email.value, code.value)
}
async function handleRegister() {
  if (code.value !== codeRepeated.value) {
    Auth.setError("Wachtwoorden komen niet overeen", "error")
  } else {
    await Auth.register(voornaam.value, naam.value, email.value, code.value)
  }
}

const login = ref(true)

function toggleLogin() {
  login.value = !login.value
}

</script>
<template>
  <section v-if="login">
    <img src="@/img/logo-witGroot.png" alt="Logo 't Zutendalertje" class="logo" />
    <h4 @click="toggleLogin">Nog geen account? Registreer nu</h4>
    <input v-model="email" type="email" placeholder="E-mail" required />
    <input v-model="code" type="password" placeholder="Wachtwoord" required />
    <button type="submit" @click="handleLogin">inloggen</button>
    <p v-if="Auth.error" :class="Auth.error.type">{{ Auth.error.message }}</p>
  </section>
  <section v-else>
    <img src="@/img/logo-witGroot.png" alt="Logo 't Zutendalertje" class="logo" />
    <h4 @click="toggleLogin">Al een account? Login</h4>
    <input type="text" v-model="voornaam" placeholder="Voornaam" required />
    <input type="text" v-model="naam" placeholder="Naam" required />
    <input v-model="email" type="email" placeholder="E-mail" required />
    <input v-model="code" type="password" placeholder="Wachtwoord" required />
    <input v-model="codeRepeated" type="password" placeholder="Herhaal wachtwoord" required />
    <button type="submit" @click="handleRegister">Registreren</button>
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
input {
  padding: 6px 10px;
  font-size: 16px;
  border-radius: var(--radius);
  margin-top: 10px;
  border: 2px solid var(--black-soft);
  font-weight: bold;
  background-color: var(--white);
}
input:focus {
  border: 2px solid var(--secondary);
  outline: none;
}

.logo {
  width: 440px;
  margin-bottom: -40px;
}
h4{
  margin-bottom: 4px;
}
h4:hover {
  cursor: pointer;
  color: var(--secondary);
}

@media screen and (max-width: 500px) {
  .logo {
    width: 300px;
  }
}
@media screen and (max-width: 500px) {
  input {
    font-size: 14px;
  }
}
</style>
