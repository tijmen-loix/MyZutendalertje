<script setup>
import { formatDate, formatTime } from "@/utils/functions.js"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth.js"
import MonthChangerAdmin from "@/components/MonthChangerAdmin.vue"

const today = new Date().toISOString().slice(0, 10)

const Auth = useAuthStore()
const { allShiftsAdmin} = storeToRefs(Auth)
</script>

<template>
  <div>
    <MonthChangerAdmin />
    <table>
      <thead>
      <tr>
        <th>Naam</th>
        <th>Datum</th>
        <th>Startuur</th>
        <th>Einduur</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="shift in allShiftsAdmin" :key="shift.id" :class="{ future: shift.datum > today }">
        <td>{{shift.voornaam}}</td>
        <td>{{ formatDate(shift.datum) }}</td>
        <td>{{ formatTime(shift.startUur) }}</td>
        <td>{{ formatTime(shift.eindUur) }}</td>
      </tr>

      </tbody>
    </table>
    <p v-if="Auth.error" :class="Auth.error.type">{{Auth.error.message}}</p>
  </div>
</template>
<style scoped>
table {
  border-collapse: collapse;
}
td,
th {
  border: 1px solid var(--white-soft);
  padding: 3px 6px;
  width: 200px;
  height: 30px;
}
th {
  text-align: left;
}

td:nth-child(4),
th:nth-child(4) {
  width: 300px;
}
.future td {
  color: var(--error);
  font-weight: bold;
}

p{
  font-weight: 500;
  margin-top: 10px;
  display: none;
}

@media screen and (max-width: 1130px) {
  table{
    width: 100%;
  }
  td,
  th {
    width: 20%;
    padding: 1px 3px;
    height: 26px;
  }
  td:nth-child(4) {
    width: 25%;
  }
  td{
    font-size: 12px;
  }
  th{
    font-size: 14px;
  }
  p{
    display: block;
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
