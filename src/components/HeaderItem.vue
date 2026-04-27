<script setup>
import { useAuthStore } from "@/stores/auth.js"
const Auth = useAuthStore()
</script>
<template>
  <header>
    <section class="header-left">
      <img src="@/img/logo-wit.png" alt="logo" class="logo"/>
      <h1>Welkom, Tijmen Loix</h1>
    </section>
    <button @click="Auth.logout">
      Uitloggen
    </button>
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

.logo {
  height: 120px;
}
h1{
  margin: 10px 0 20px 40px;
  font-weight: 600;
}

</style>
