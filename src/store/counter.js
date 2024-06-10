// counter.js

import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    filteredBloodnations: [],
    bloodnations: [],
    count: 0,
    events: [],
    reservations: [],
    user: {},
    token: null,
    user_id: null,
  }),
  actions: {
    async fetchBloodnations() {
      const userId = localStorage.getItem('userID');
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://3.27.136.219/events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });
        let data = await response.json();
        this.bloodnations = data; 
      } catch (error) {
        console.error('Error fetching bloodnations:', error);
      }
    },    
    async fetchReservations(userId) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`https://3.27.136.219/reservations/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'token' : token,
          },
        });
        const data = await response.json();
        this.$state.reservations = data;
        console.log(data)
      
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    },
    async fetchEventById(eventId) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`https://3.27.136.219/events/${eventId}`, {
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching event:', error);
        throw error;
      }
    },
    async loginUser(credentials) {
      try {
        const response = await fetch(`https://3.27.136.219/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }
        this.$state.token = data.token; 
        this.$state.user_id = data.user_id; 
        console.log('Login successful:', data);
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
    async registerUser(userInfo) {
      console.log(userInfo,"-infoo");
      try {
        const response = await fetch(`https://3.27.136.219/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        });
        const data = await response.json();
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
    async reserveEvent(eventId, user_id, formData) {
      const token = localStorage.getItem('token');
      console.log(JSON.stringify(formData))
      console.log(eventId)
      console.log(user_id)
      const response = await fetch(`https://3.27.136.219/reservations/${eventId}/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      return await response.json();
    },
    async fetchUserData() {
      const user_Id = localStorage.getItem('userID');
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`https://3.27.136.219/users/${user_Id}`, {
          headers: {
            'Content-Type': 'application/json',
            'token' : token,
          },
        });
        const data = await response.json();
        console.log(data,"data---");
        this.$state.user = data; 

      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async logout() {
      try {
        localStorage.clear();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.$state.token = null; 
        this.$state.user_id = null; 
        this.$state.user = null; 
      } catch (error) {
        console.error('Error during logout:', error);
        throw error;
      }
    }
  },
});