<template>
  <div class="container">
    <div class="card mt-5" style="outline: red">
      <div class="card-header bg-primary text-white">
        <h4 class="card-title">Event Details</h4>
      </div>
      <div class="card-body">
        <p><strong>Activity Address:</strong> {{ event.address }}</p>
        <p><strong>Preparation:</strong> {{ event.preparation }}</p>
        <p><strong>Date:</strong> {{ event.date }}</p>
        <p><strong>Quota:</strong> {{ event.quota }}</p>
        <button v-if="isAuthorized" class="btn btn-primary" @click="register">Register</button>
        <p v-else class="text-muted"> <router-link to="/reservation">Apply</router-link></p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      event: {
        address: 'Location 4',
        preparation: 'Requirements for Event 4',
        date: '2024-06-02T04:41:14.545Z',
        quota: 5
      },
      isAuthorized: false // Set to true if user is authorized
    };
  },
  methods: {
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
  border: none; /* Remove border */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add subtle shadow */
}

.card-header {
  padding: 10px 15px; /* Add padding */
}

.card-body {
  padding: 15px; /* Add padding */
}

.btn-primary {
  background-color: #007bff; /* Change primary button color */
  border-color: #007bff; /* Change primary button border color */
}

.btn-primary:hover {
  background-color: #0056b3; /* Change primary button hover color */
  border-color: #0056b3; /* Change primary button border hover color */
}
</style>
