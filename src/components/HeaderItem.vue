<script setup>
import { useAuthStore } from "@/stores/auth.js"
import UserChanger from "@/components/UserChanger.vue"
import SalaryChanger from "@/components/SalaryChanger.vue"
const Auth = useAuthStore()
</script>
<template>
  <header>
    <section class="header-left">
      <img src="@/img/logo-wit.png" alt="logo" class="logo" />
      <h1>Welkom, {{ Auth.user.voornaam + " " + Auth.user.naam }}</h1>
      <SalaryChanger />
    </section>
    <section class="header-right">
      <UserChanger v-if="Auth.admin" />
      <button @click="Auth.logout">Uitloggen</button>
    </section>
  </header>
</template>
<style scoped>
header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  top: 0;
  left: 0;
  width: 100%;
  color: var(--white-soft);
}
.header-left {
  display: flex;
}
.header-right {
  display: flex;
  align-items: flex-start;
}

.logo {
  height: 120px;
}
h1 {
  margin: 10px 0 20px 40px;
  font-weight: 600;
}
</style>
