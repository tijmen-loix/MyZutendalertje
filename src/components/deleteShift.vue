<script setup>
import { useAuthStore } from "@/stores/auth.js"
import confirmDelete from "@/components/confirmDelete.vue"
import { ref } from "vue"
const Auth = useAuthStore()
const props = defineProps({
  shiftId: {
    type: Number,
    required: true,
  },
  shiftUserCode: {
    type: String,
    required: true,
  },
  datum: {
    type: String,
    required: true,
  },
})

const visible = ref(false)

function handleDelete() {
  visible.value = true
}

function submitDelete() {
  Auth.deleteShift(props.shiftId, props.shiftUserCode)
  visible.value = false
}
</script>
<template>
  <img
    src="@/img/delete-svgrepo-com.svg"
    alt="Delete"
    @click="handleDelete"
    class="delete-icon"
  />
  <confirmDelete
    v-if="visible"
    @confirm="submitDelete"
    @cancel="visible = false"
    :datum="props.datum"
  />
</template>
<style scoped>
.delete-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin: 0 0 -3% 10%;
}
@media screen and (max-width: 1130px) {
  .delete-icon {
    width: 15px;
    height: 15px;
    margin: 0 0 -4% 10%;
  }
}
</style>
