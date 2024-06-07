import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Regist from '../views/Regist.vue';
import Login from '../views/Login.vue';
import History from '../views/History.vue';
import Logout from '../views/Logout.vue';
import Details from '../views/Details.vue';
import Reservation from '../views/Reservation.vue';
import User from '../views/User.vue';

const details = () => import("../views/Details.vue")
const reservation = () => import("../views/Reservation.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/regist', name: 'regist', component: Regist },
    { path: '/login', name: 'login', component: Login },
    { path: '/history', name: 'history', component: History },
    { path: '/logout', name: 'logout', component: Logout },
    { path: '/event-details', name: 'event-details', component: Details },
    { path: '/event-details/:id', name: 'event-details-id', component: details },
    { path: '/reservation', name: 'reservation', component: Reservation },
    { path: '/reservation/:id', name: 'reservation-id', component: reservation },
    { path: '/user', name: 'user', component: User },
    { path: '/user/:id', name: 'user-id', component: User },
  ]
});

router.beforeEach((to, from, next) => {
  if ((to.name == 'login' || to.name == 'regist') && localStorage.token) next({ name: 'home'})
  else next()
})
 export default router 