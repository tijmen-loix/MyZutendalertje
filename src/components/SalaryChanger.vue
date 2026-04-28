<script setup>
import { formatSalary } from "@/utils/functions.js"
import { useAuthStore } from "@/stores/auth.js"
import { ref } from "vue"
const Auth = useAuthStore()

const uurloon = ref(formatSalary(Number(Auth.user?.uurloon ?? 0)))

const visible = ref(false)

function toggleVisible() {
  visible.value = !visible.value
}

function saveUurloon() {
  Auth.updateUurloon(Number(uurloon.value))
  toggleVisible()
}
</script>
<template>
  <section class="uurloon">
    <h2>Uurloon: €</h2>
    <input type="number" v-model="uurloon" @change="toggleVisible" />
    <button v-if="visible" @click="saveUurloon" :disabled="Auth.updatingUurloon">-></button>
    <p>{{ Auth.error }}</p>
  </section>
</template>
<style scoped>
.uurloon {
  display: flex;
  align-items: flex-start;
  margin: 20px 40px 0 40px;
  font-style: italic;
}
input {
  background: transparent;
  border: none;
  color: var(--white-soft);
  margin: 3px 4px 0 8px;
  width: 80px;
  outline: none;
  font-size: 22px;
  font-weight: bold;
  font-style: italic;
}
input:focus {
  border-bottom: 2px solid var(--secondary);
}

button {
  margin: 0 20px 0 10px;
  background-color: var(--secondary);
  color: var(--white);
  width: 35px;
}

h2 {
  margin-top: -4px;
}
p {
  color: var(--secondary);
}
</style>
