
<script setup>
import { router } from './router';
import { autorun, subscribe } from 'vue-meteor-tracker';
import { ref, watch } from 'vue';
import { ContactsCollection } from '../db/ContactsCollection';
import { DonationsCollection } from '../db/DonationCollection';

import Tab from './components/Tab.vue'
import TabsWrapper from './components/TabsWrapper.vue'
subscribe('contacts')
subscribe('donations')
const contact = autorun(() => {
  const allContacts = ContactsCollection.find({ _id: router.currentRoute.value.params.id }).fetch()
  return allContacts[0]
}).result;
const contactName = ref('')
watch(() => contact.value, (newDetails) => { contactName.value = contact.value.firstName.concat(' ', contact.value.lastName) }, { immediate: true })
const donations = autorun(() => {
  const donations = DonationsCollection.find({ contact_id: router.currentRoute.value.params.id }).fetch()
  return donations
}).result;
const allDonations = ref([])
watch(() => donations.value, (newDonations) => { allDonations.value = newDonations }, { immediate: true })
const deleteDonation = (id) => {
  Meteor.call('donation.remove', id)
}
const deleteContact = (id) => {
  Meteor.call('contacts.remove', id)
  router.go(-1)

}
const editingDonationId = ref(['', 0])
const editDonationId = (id, amount) => {
  console.log(id, amount)
  editingDonationId.value = [id, amount];

}

</script>
<template>
  <div
    class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 md:mb-0 md:mt-8 md:px-4 md:py-8 text-center md:bg-gray-100 md:rounded-lg">
    <TabsWrapper :contact="contact" :editingDonation="editingDonationId">
      <Tab title="Information">
        <div
          class="w-full max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">

          <div class="flex flex-row justify-between items-center pb-2 px-4">

            <h5 class="mb-1 text-xl space-x-3 py-px font-medium text-gray-900 dark:text-white">
              {{ contactName.toUpperCase() }}</h5>
            <div @click="deleteContact(contact._id)" class="flex mt-4  md:mt-2">
              <a href="#"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Delete</a>

            </div>
          </div>
        </div>
      </Tab>
      <Tab title="Donation">

        <ul>
          <li v-for="donation in allDonations" :id="donation._id" class="flex items-center justify-between py-2 px-3 ">
            <span class="text-lg">{{ donation.amount }}</span>
            <div class="flex flex-row">
              <button @click="editDonationId(donation._id, donation.amount)"
                class="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                <!-- <img src="../../images/edit.png" /> -->
                <i class="fa-solid fa-pen"></i>
              </button>
              <button @click="deleteDonation(donation._id)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </li>
        </ul>
      </Tab>

    </TabsWrapper>

  </div>
</template>