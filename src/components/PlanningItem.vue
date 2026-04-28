<script setup>
import { workedHours, formatHour, totalHours, formatDate, formatTime } from "@/utils/functions.js"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth.js"
import { computed } from "vue"
import MonthChanger from "@/components/MonthChanger.vue"

const today = new Date().toISOString().slice(0, 10)

const Auth = useAuthStore();
const {userShifts, user} = storeToRefs(Auth)

const totalHoursCalculated = computed(()=>totalHours(userShifts.value));

const monthSalary = computed(() => {
  const hourlyRate = user.value?.uurloon ?? 0
  return "€ "+(totalHoursCalculated.value * hourlyRate).toFixed(2)
})

</script>

<template>
  <div v-if="userShifts">
  <MonthChanger/>
    <table>
      <thead>
      <tr>
        <th>Datum</th>
        <th>Startuur</th>
        <th>Einduur</th>
        <th>Uren gewerkt</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="shift in userShifts" :key="shift.code" :class="{ future: shift.datum > today }">
        <td>{{ formatDate(shift.datum) }}</td>
        <td>{{ formatTime(shift.startUur) }}</td>
        <td>{{ formatTime(shift.eindUur) }}</td>
        <td>{{ workedHours(formatHour(shift.startUur), formatHour(shift.eindUur)) }}</td>
      </tr>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td colspan="3">Totaal</td>
        <td><strong>{{ totalHoursCalculated }}</strong></td>
      </tr>
      <tr>
        <td colspan="3">Verwacht maandloon</td>
        <td><strong>{{ monthSalary }}</strong></td>
      </tr>
      </tfoot>
    </table>
  </div>
  <div v-else class="full">
    <h2>Loading...</h2>
  </div>
</template>
<style>
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

td:nth-child(4) {
  width: 300px;
}
.future td {
  color: var(--error);
  font-weight: bold;
}
</style>
