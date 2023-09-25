<script setup>
import Contact from './components/Contact.vue'
import ContactForm from './components/ContactForm.vue';
import { subscribe, autorun } from 'vue-meteor-tracker';
import { ContactsCollection } from '../db/ContactsCollection';
import { ref, watch } from 'vue';
import LoginForm from './components/LoginForm.vue';

subscribe('contacts')
const isLogged = ref(false)
const user = autorun(() => Meteor.userId()).result;
watch(() => user.value, (newUser) => { isLogged.value = !!newUser }, { immediate: true })
const contacts = autorun(() => ContactsCollection.find({ addedBy: user.value }).fetch()).result
const logout = () => Meteor.logout()
</script>

<template>
  <div v-if='isLogged'
    class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 md:mb-0 md:mt-8 md:px-4 md:py-8 text-center md:bg-gray-100 md:rounded-lg">
    <div class="w-full flex flex-row justify-end">
      <button
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        @click="logout">
        Logout
      </button>
    </div>
    <div class="flex">
      <div class="w-1/2 p-4 border-r border-gray-300 text-left">
        <h2 class="text-xl font-bold mb-4">List</h2>
        <ul>
          <Contact v-for="contact in contacts" :key="contact._id" :contact="contact" />
        </ul>
      </div>
      <div class="w-1/2 p-4">
        <ContactForm />
      </div>

    </div>
  </div>
  <div v-else>
    <LoginForm />
  </div>
</template>
