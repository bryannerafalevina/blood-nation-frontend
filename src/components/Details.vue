<template>
  <div class="container">
    <div class="card mt-5" style="background-color: #f8f9fa;">
      <div class="card-header bg-primary text-white">
        <h4 class="card-title">Event Details</h4>
      </div>
      <div class="card-body">
        <p><strong>Activity Location:</strong> {{ events.location }}</p>
        <p><strong>Requirements:</strong> {{ events.requirements }}</p>
        <p><strong>Date:</strong> {{ events.date }}</p>
        <p><strong>Quota:</strong> {{ events.quota }}</p>
        <!-- Existing content -->
        <button v-if="isAuthorized" class="btn btn-primary" @click="register">Register</button>
        <p v-else class="text-muted"> <router-link to="/reservation">Apply</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      events: {},
      isAuthorized: false
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      const eventId = this.$route.params.id
      try {
        const response = await axios.get(`http://localhost:3000/events/${eventId}`);
        console.log(response.data)
        this.events = response.data;
        
      } catch (error) {
        console.error(error);
      }
    },
    async createEvent() {
      try {
        await axios.post(`http://localhost:3000/events/`, this.events);
        this.fetchEvents();
      } catch (error) {
        console.error(error);
      }
    },
    async updateEvent() {
      const eventId = this.$route.params.id
      try {
        await axios.put(`http://localhost:3000/events/${eventId}`, this.events);
        this.fetchEvents();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEvent() {
      const eventId = this.$route.params.id;
      try {
        await axios.delete(`http://localhost:3000/events/${eventId}`);
        this.fetchEvents();
      } catch (error) {
        console.error(error);
      }
    },
    register() {
      // Implement registration logic
      // Redirect to registration form page
      if (this.isAuthorized) {
        this.$router.push('/registration-form');
      } else {
        // Redirect to register page
        this.$router.push('/register');
      }
    }
  }
};
</script>

<style>
.card {
  border-radius: 15px;
}
</style>
