<script>
import { ref, provide, watch } from 'vue';
export default {
    props: {
        contact: Object,
        editingDonation: Object
    },
    setup(props, { slots }) {
        const tabTitles = ref(slots.default().map((tab) => tab.props.title))
        const selectedTitle = ref(tabTitles.value[0])
        const firstNameRef = ref('')
        const lastNameRef = ref('')
        const donationRef = ref(0)

        const editingDonationRef = ref([false, props.editingDonation[0], props.editingDonation[1]])

        watch(() => props.editingDonation, (newDetails) => { editingDonationRef.value = [!!newDetails[0], newDetails[0], newDetails[1]] }, { immediate: true })
        console.log(editingDonationRef.value)
        const editContact = (id) => {
            Meteor.call('contacts.update', id, firstNameRef.value === '' ? null : firstNameRef.value,
                lastNameRef.value === '' ? null : lastNameRef.value
            )
            firstNameRef.value = ''
            lastNameRef.value = ''
        }
        const addDonation = () => {
            console.log(props.contact._id)
            Meteor.call('donation.insert', donationRef.value, props.contact._id)
            donationRef.value = 0
        }
        const editDonation = () => {
            Meteor.call('donation.update', props.editingDonation[0], editingDonationRef.value[2])
        }

        provide('selectedTitle', selectedTitle)
        return {
            selectedTitle,
            tabTitles,
            firstNameRef,
            lastNameRef,
            donationRef,
            editingDonationRef,
            addDonation,
            editDonation,
            editContact
        }
    }

}
</script>

<template>
    <div class="flex">
        <div class="w-1/2 p-4 border-r border-gray-300 text-left">

            <div>
                <div class="text-sm font-medium text-center">
                    <ul class="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0">
                        <li class="flex-grow basis-0 text-center" v-for="title in  tabTitles " :key="title"
                            @click="selectedTitle = title" role="presentation">
                            <a :class="{ ' inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500': selectedTitle === title, ' inline-block p-4  border-b-2  rounded-t-lg': selectedTitle !== title }"
                                role="tab">{{
                                    title }}</a>
                        </li>
                    </ul>
                </div>
                <slot />
            </div>


            <!--  -->
        </div>
        <div class="w-1/2 p-4">
            <div v-if="selectedTitle === 'Information'">
                <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Edit Contact
                        </h2>
                    </div>

                    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-6" @submit.prevent="editContact(contact._id)">
                            <div>
                                <label for="first_name"
                                    class="block text-sm font-medium leading-6 text-gray-900 text-left">First
                                    name</label>
                                <div class="mt-2">
                                    <input v-model="firstNameRef" id="first_name" name="first_name" type="text" required
                                        :placeholder="contact.firstName.toUpperCase()"
                                        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>

                            <div>
                                <div class="flex items-center justify-between">
                                    <label for="last_name" class="block text-sm font-medium leading-6 text-gray-900">Last
                                        name</label>

                                </div>
                                <div class="mt-2">
                                    <input v-model="lastNameRef" :placeholder="contact.lastName.toUpperCase()"
                                        id="last_name" name="last_name" type="text" required
                                        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>

                            <div>
                                <button type="submit"
                                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center">Update</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
            <div v-if="selectedTitle === 'Donation'">
                <div v-if="editingDonationRef[0]" class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Edit
                            Donation
                        </h2>
                    </div>

                    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-6 py-4" @submit.prevent="editDonation">
                            <div>
                                <label for="first_name"
                                    class="block text-sm font-medium leading-6 text-gray-900 text-left">Amount</label>
                                <div class="mt-2">
                                    <input v-model="editingDonationRef[2]" :placeholder="editingDonationRef[2].toString()"
                                        id="edit-donation" name="edit-donation" type="number" required
                                        class="block w-full rounded-md border-0 py-[2px] px-[4px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>


                            <div>
                                <button type="submit"
                                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-[2px] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center">Edit</button>
                            </div>
                        </form>
                        <div>
                            <button @click="editingDonationRef[0] = false"
                                class="flex w-full mx-auto justify-center rounded-md bg-indigo-600 px-3 py-[2px] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center">New
                                Donation</button>
                        </div>

                    </div>
                </div>
                <div v-else class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add Donation
                        </h2>
                    </div>

                    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-6" @submit.prevent="addDonation">
                            <div>
                                <label for="first_name"
                                    class="block text-sm font-medium leading-6 text-gray-900 text-left">Amount</label>
                                <div class="mt-2">
                                    <input v-model="donationRef" id="donation" name="donation" type="number" required
                                        class="block w-full rounded-md border-0 py-[2px] px-[4px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                </div>
                            </div>


                            <div>
                                <button type="submit"
                                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-[2px] text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-center">Add</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>

    </div>
</template>