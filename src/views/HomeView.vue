<script setup>
import HeaderItem from "@/components/HeaderItem.vue"
import PlanningItem from "@/components/PlanningItem.vue"

import { useAuthStore } from "@/stores/auth.js"
const Auth = useAuthStore();

</script>
<template>
  <div v-if="Auth.loading" class="full">
    <h1>Loading...</h1>
  </div>

  <div v-else-if="Auth.isLoggedIn">
    <HeaderItem/>
    <main>
      <section class="planning">
        <PlanningItem/>
      </section>
    </main>
  </div>

  <div v-else class="full">
    <h1>Je bent niet ingelogd!</h1>
  </div>
</template>
<style scoped>
.planning {
  margin-left: 220px;
  margin-top: -20px;
}
</style>
