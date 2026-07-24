<script setup>
import { workedHours, formatHour, totalHours, formatDate, formatTime } from "@/utils/functions.js"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth.js"
import { computed } from "vue"
import MonthChanger from "@/components/MonthChanger.vue"
import AddShift from "@/components/AddShift.vue"
import UserChanger from "@/components/UserChanger.vue"
import deleteShift from "@/components/deleteShift.vue"
import updateShift from "@/components/updateShift.vue"
import { ref } from "vue"

const today = new Date().toISOString().slice(0, 10)

const Auth = useAuthStore()
const { userShifts, user } = storeToRefs(Auth)

const totalHoursCalculated = computed(() => totalHours(userShifts.value))

const monthSalary = computed(() => {
  const hourlyRate = user.value?.uurloon ?? 0
  return "€ " + (totalHoursCalculated.value * hourlyRate).toFixed(2)
})

const edits = ref({})

function getEdit(shift) {
  if (!edits.value[shift.id]) {
    edits.value[shift.id] = {
      datum: formatDate(shift.datum),
      datumRaw:  shift.datum.slice(0, 10),
      startUur: formatTime(shift.startUur),
      eindUur: formatTime(shift.eindUur),
    }
  }
  return edits.value[shift.id]
}
</script>

<template>
  <div v-if="userShifts">
    <section class="changers">
      <MonthChanger />
      <UserChanger v-if="Auth.admin" />
    </section>
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
        <tr v-for="shift in userShifts" :key="shift.id" :class="{ future: shift.datum > today }">
          <td><input type="text" v-model="getEdit(shift).datum" /></td>
          <td><input type="text" v-model="getEdit(shift).startUur" /></td>
          <td><input type="text" v-model="getEdit(shift).eindUur" /></td>
          <td>
            {{ workedHours(formatHour(shift.startUur), formatHour(shift.eindUur)).toFixed(2) }}
            <updateShift
              :shift-id="shift.id"
              :shift-user-id="shift.user_id"
              :datum="getEdit(shift).datumRaw"
              :start-uur="getEdit(shift).startUur"
              :eind-uur="getEdit(shift).eindUur"
            />
            <deleteShift :shift-user-id="shift.user_id" :shift-id="shift.id" :datum="shift.datum" />
          </td>
        </tr>
        <AddShift />
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">Totaal</td>
          <td>
            <strong>{{ totalHoursCalculated }}</strong>
          </td>
        </tr>
        <tr>
          <td colspan="3">Verwacht maandloon</td>
          <td>
            <strong>{{ monthSalary }}</strong>
          </td>
        </tr>
      </tfoot>
    </table>
    <p v-if="Auth.error" :class="Auth.error.type">{{ Auth.error.message }}</p>
  </div>
  <div v-else class="full">
    <h2>Loading...</h2>
  </div>
</template>
<style scoped>
.changers {
  display: flex;
}

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
.future td,
.future td input {
  color: var(--error);
  font-weight: bold;
  font-family: inherit;
}

p {
  font-weight: 500;
  margin-top: 10px;
  display: none;
}

input {
  border: none;
  background: transparent;
  width: 100%;
  height: 100%;
  font-size: inherit;
  color: var(--white-soft);
  outline: none;
}

@media screen and (max-width: 1130px) {
  table {
    width: 100%;
    margin-bottom: -10px;
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
  td {
    font-size: 12px;
  }
  th {
    font-size: 14px;
  }
  p {
    display: block;
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
