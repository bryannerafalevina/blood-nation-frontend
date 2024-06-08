import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: null,
  }),
  getters: {
    isAuthenticated() {
      return !!this.token;
    },
  },
  actions: {
    // other actions...
    removeToken() {
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});
