<script setup>
import { useAuthStore } from "@/stores/auth.js"
import SalaryChanger from "@/components/SalaryChanger.vue"
const Auth = useAuthStore()
</script>
<template>
  <header>
    <section class="header-left">
      <section><img src="@/img/logo-witGroot.png" alt="logo" class="logo" /></section>
      <section>
        <h1>Welkom, {{ Auth.user.voornaam }}</h1>
        <SalaryChanger />
      </section>
    </section>
    <section class="header-right">
      <button class="uitloggen" @click="Auth.logout">Uitloggen</button>
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
  align-items: flex-start;
}
.header-right {
  display: flex;
  align-items: flex-start;
}

.logo {
  width: 160px;
  height: auto;
}
h1 {
  margin: 10px 0 5px 40px;
  font-weight: 600;
}

@media screen and (max-width: 1130px) {
  .logo {
    display: none;
  }
  h1 {
    font-size: 18px;
    margin: 8px 0 5px 10px;
  }
  .header-left {
    display: flex;
    flex-direction: column;
  }
  .header-right {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
  }
  header {
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .uitloggen {
    margin: 10px 5px 0 0;
    font-size: 12px;
    width: 70px;
    padding: 4px 0;
  }
}
</style>
