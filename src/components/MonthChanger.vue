<script setup>
import { useAuthStore } from "@/stores/auth.js"
const Auth = useAuthStore()
</script>
<template>
  <select
    name="monthChanger"
    @change="Auth.switchMonth(Number($event.target.value))"
    :value="Auth.month"
  >
    <option value="1">Januari</option>
    <option value="2">Februari</option>
    <option value="3">Maart</option>
    <option value="4">April</option>
    <option value="5">Mei</option>
    <option value="6">Juni</option>
    <option value="7">Juli</option>
    <option value="8">Augustus</option>
    <option value="9">September</option>
    <option value="10">Oktober</option>
    <option value="11">November</option>
    <option value="12">December</option>
  </select>
</template>
<style scoped>
select {
  padding: 6px;
  border-radius: var(--radius);
  outline: none;
  margin: -10px 0 10px 0;
  width: 120px;
}
</style>
