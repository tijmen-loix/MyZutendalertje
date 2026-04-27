<script setup>
import HeaderItem from "@/components/HeaderItem.vue"
import PlanningItem from "@/components/PlanningItem.vue"

</script>

<template>
  <HeaderItem/>
  <main>
    <section class="planning">
      <PlanningItem/>
    </section>
  </main>
</template>
<style scoped>
.planning {
  margin-left: 220px;
}
</style>
