<script setup>
import HeaderItem from "@/components/HeaderItem.vue"
import PlanningItem from "@/components/PlanningItem.vue"

import { useAuthStore } from "@/stores/auth.js"
import FullPlanning from "@/components/FullPlanning.vue"
const Auth = useAuthStore()
</script>
<template>
  <div v-if="Auth.loading" class="full">
    <h1>Loading...</h1>
  </div>

  <div v-else-if="Auth.isLoggedIn">
    <HeaderItem />
    <main>
      <section class="planning">
        <PlanningItem />
        <FullPlanning v-if="Auth.admin" />
      </section>
    </main>
  </div>

  <div v-else class="full">
    <h1>Je bent niet ingelogd!</h1>
  </div>
</template>
<style scoped>
.planning {
  display: flex;
  justify-content: center;
  margin: -10px 40px 20px 40px;
  padding-bottom: 40px;
  gap:40px
}
@media screen and (max-width: 1130px) {
  .planning {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px 20px 10px;
  }
}
</style>
