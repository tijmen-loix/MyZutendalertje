<script setup>
import { useAuthStore } from "@/stores/auth.js"
const Auth = useAuthStore()
const props = defineProps({
  shiftId: {
    type: Number,
    required: true
  },
  shiftUserCode: {
    type: String,
    required: true
  }
})

function handleDelete(){
  Auth.deleteShift(props.shiftId, props.shiftUserCode)
  console.log(props.shiftId,props.shiftUserCode)
}

</script>
<template>
  <img src="@/img/delete-svgrepo-com.svg" alt="Delete" v-if="Auth.admin" @click="handleDelete" class="delete-icon"/>
</template>
<style scoped>
.delete-icon {
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin: 0 0 -3% 50%;
}
@media screen and (max-width: 1130px) {
  .delete-icon {
    width: 15px;
    height: 15px;
    margin: 0 0 -4% 35%;
  }
}
</style>
