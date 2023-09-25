import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from './Home.vue'
import ContactDetails from './ContactDetails.vue'
import NotFound from './NotFound.vue'
import RegistrationForm from './components/RegistrationForm.vue'


export const router = createRouter({
  history: createWebHistory(),
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/contact/:id',
      name: 'contactDetails',
      component: ContactDetails,
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationForm,
    },
    {
      path: '/*',
      name: 'notFound',
      component: NotFound,
    },

  ],
})