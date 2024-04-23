import "@fontsource/heebo";
import "@fontsource/nunito";
import "@fontsource/pacifico";

import './scss/styles.scss';
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"
import 'wow.js/css/libs/animate.css';

import './assets/main.css'

import WOW from "wow.js"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import { useMenuStore, useBookingStore } from './store';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUtensils, faBars, faUserTie, faCartPlus, faHeadset, faMapMarkerAlt, faPhoneAlt, faEnvelope, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

import App from './App.vue'
import router from './router'

library.add(faUtensils,faBars, faUserTie, faCartPlus, faHeadset, faMapMarkerAlt, faPhoneAlt, faEnvelope, faTwitter,faFacebookF, faYoutube, faLinkedinIn, faChevronRight)

const app = createApp(App)

app.mixin({
    mounted() {
      // Initialize WOW.js when the component is mounted
      new WOW().init();
    },
  });

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')