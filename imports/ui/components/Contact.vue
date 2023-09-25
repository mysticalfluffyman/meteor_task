<script setup>
import { router } from '../router';
defineProps({
  contact: Object
})
const onTap = (id) => {
  router.push('/contact/' + id)
}
</script>

<template>
  <li class="flex items-center justify-between py-2 px-3 ">
    <span class="text-lg">{{ contact.firstName.toUpperCase() }} {{ contact.lastName.toUpperCase() }}</span>
    <button @click="onTap(contact._id)"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
      <i class="fa-solid fa-eye"></i>
    </button>
  </li>
</template>