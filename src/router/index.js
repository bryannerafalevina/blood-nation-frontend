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
const history = () => import("../views/History.vue")
const user = () => import("../views/User.vue")


const routes = [
  { path: '/', component: Login },
  { path: '/regist', component: Regist },
  { path: '/login', component: Home },
  { path: '/history', component: History },
  { path: '/logout', component: Logout },
  { path: '/event-details', component: Details },
  { path: '/event-details/:id', component: details },
  {path: '/reservation',component: Reservation},
  {path: '/reservation/:id',component: reservation},
  {path: '/history',component: history},
  {path: '/history/:id',component: history},
  {path: '/user',component: User},
  {path: '/user/:id',component: user},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;



