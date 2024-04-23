import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import Regist from '../views/Regist.vue';
import Login from '../views/Login.vue';
import History from '../views/History.vue';
import Logout from '../views/Logout.vue';
import Details from '../views/Details.vue';
import ForgotPassword from '../views/ForgotPassword.vue';
import Reservation from '../views/Reservation.vue';
import User from '../views/User.vue';

const details = () => import("../views/Details.vue")



const routes = [
  { path: '/', component: Login },
  { path: '/regist', component: Regist },
  { path: '/login', component: Home },
  { path: '/history', component: History },
  { path: '/logout', component: Logout },
  { path: '/details', component: Details },
  { path: '/details/:id', component: details },
  {path: '/forgot-password',component: ForgotPassword},
  {path: '/reservation',component: Reservation},
  {path: '/user',component: User}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

