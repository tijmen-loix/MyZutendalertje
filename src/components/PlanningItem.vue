<script setup>
import { workedHours, formatHour, totalHours, } from "@/utils/functions.js"

const shifts = [
  { datum: "01/05", start: "13:00", end: "20:00" },
  { datum: "03/05", start: "10:30", end: "18:00" },
  { datum: "10/05", start: "10:00", end: "18:00" },
  { datum: "24/05", start: "10:00", end: "18:00" },
  { datum: "31/05", start: "10:30", end: "18:00" },
]

const totalHoursCalculated = totalHours(shifts)

const monthSalary = (totalHours) => {
  const hourlyRate = 14.88
  return (totalHours * hourlyRate).toFixed(2)
}
</script>

<template>
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
      <tr v-for="shift in shifts" :key="shift.datum">
        <td>{{ shift.datum }}</td>
        <td>{{ shift.start }}</td>
        <td>{{ shift.end }}</td>
        <td>{{ workedHours(formatHour(shift.start), formatHour(shift.end)) }}</td>
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
        <td><strong>{{ monthSalary(totalHoursCalculated) }}</strong></td>
      </tr>
    </tfoot>
  </table>
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
</style>
