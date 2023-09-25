<script setup>
import { ref } from 'vue';

const firstNameRef = ref('')
const lastNameRef = ref('')


const addContact = () => {
  Meteor.call('contacts.insert', firstNameRef.value, lastNameRef.value)
  firstNameRef.value = ''
  lastNameRef.value = ''

}
</script>


<template>
  <div class="flex min-h-full flex-col justify-center px-6 pb-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="text-center text-2xl font-bold tracking-tight text-gray-900">Add new contacts</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="addContact">
        <div>
          <label for="first_name" class="block text-sm font-medium leading-6 text-gray-900 text-left">First name</label>
          <div class="mt-2">
            <input v-model="firstNameRef" id="first_name" name="first_name" type="text" required
              class="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="last_name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>

          </div>
          <div class="mt-2">
            <input v-model="lastNameRef" id="last_name" name="last_name" type="text" required
              class="block w-full rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center">Add
            contact</button>
        </div>
      </form>


    </div>
  </div>
</template>