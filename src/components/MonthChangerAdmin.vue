<script setup>
import { useAuthStore } from "@/stores/auth.js"
const Auth = useAuthStore()
</script>
<template>
  <select
    name="monthChanger"
    @change="Auth.switchMonthAdmin(Number($event.target.value))"
    :value="Auth.monthAdmin"
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
  margin: 0 10px 10px 0;
  width: 120px;
}
@media screen and (max-width: 1130px) {
  select {
    margin: 0 10px 10px 0;
    width: 80px;
    padding: 4px;
    font-size: 10px;
  }
}
</style>
