
<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card mt-5 custom-card">
      <div class="card-header custom-header">
        <h4 class="card-title">Event Details</h4>
      </div>
      <div class="card-body">
        <p>Activity Location: {{ event.location }}</p>
        <p>Requirements: {{ event.requirements }}</p>
        <p>Date: {{ event.date }}</p>
        <p>Quota: {{ event.quota }}</p>
        <button v-if="isAuthorized" class="btn btn-primary" @click="register">Register</button>
        <p v-else class="text-muted"><router-link :to="'/reservation/' + event.id" class="details-link">Apply</router-link></p>
      </div>
    </div>
  </div>
</template>


<script>
import { useCounterStore } from '@/store/counter'; // Adjust the path according to your project structure
import axios from 'axios';

export default {
  data() {
    return {
      event: {},
      isAuthorized: false
    };
  },
  created() {
    this.fetchEvent();
  },
  methods: {
    async fetchEvent() {
      const eventId = this.$route.params.id;
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:3000/events/${eventId}`, {
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          }
        });
        console.log(response.data);
        const dateParts = response.data.date.split('T');
        this.event = {
          ...response.data,
          date: dateParts[0],
        };
      } catch (error) {
        console.error(error);
      }
    },
    async createEvent() {
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://localhost:3000/events/', this.event, {
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });
        this.fetchEvent();
      } catch (error) {
        console.error(error);
      }
    },
    async updateEvent() {
      const eventId = this.$route.params.id;
      const token = localStorage.getItem('token');
      try {
        await axios.put(`http://localhost:3000/events/${eventId}`, this.event, {
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });
        this.fetchEvent();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEvent() {
      const eventId = this.$route.params.id;
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:3000/events/${eventId}`, {
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });
        this.fetchEvent();
      } catch (error) {
        console.error(error);
      }
    },
    register() {
      if (this.isAuthorized) {
        this.$router.push('/registration-form');
      } else {
        this.$router.push('/register');
      }
    }
  }
};
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.4.0/dist/css/bootstrap.min.css');

.container {
  display: flex;
  justify-content: center;
}
.card {
  border-radius: 15px;
}

.custom-card {
  background-color: #f8f9fa;
  width: 350px; 
  /* justify-content: center;
  align-content: center; */

}


.custom-header {
  color: white;
}
</style> 

<!-- <template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card mt-5 custom-card">
      <div class="card-header custom-header">
        <h4 class="card-title">Event Details</h4>
      </div>
      <div class="card-body">
        <p>Activity Location: {{ event.location }}</p>
        <p>Requirements: {{ event.requirements }}</p>
        <p>Date: {{ event.date }}</p>
        <p>Quota: {{ event.quota }}</p>
        <button v-if="isAuthorized" class="btn btn-primary" @click="register">Register</button>
        <p v-else class="text-muted"><router-link :to="'/reservation/' + event.id" class="details-link">Apply</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from '@/store/counter'; // Adjust the path according to your project structure
import { computed } from 'vue'; // Import computed from Vue
import { useRouter } from 'vue-router'; // Import useRouter from vue-router

export default {
  setup() {
    const counterStore = useCounterStore(); // Initialize the Pinia store
    const router = useRouter(); // Initialize the router

    // Define computed property for isAuthorized
    const isAuthorized = computed(() => {
      return counterStore.token !== null; // Change this condition based on your authentication logic
    });

    // Define state for event
    const event = counterStore.event; // Assuming you have event state in your Pinia store

    // Define method to handle registration
    const register = () => {
      if (isAuthorized.value) {
        router.push('/registration-form');
      } else {
        router.push('/register');
      }
    };

    return {
      event,
      isAuthorized,
      register
    };
  }
};
</script>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.4.0/dist/css/bootstrap.min.css');

.container {
  display: flex;
  justify-content: center;
}
.card {
  border-radius: 15px;
}

.custom-card {
  background-color: #f8f9fa;
  width: 350px; 
  /* justify-content: center;
  align-content: center; */
}

.custom-header {
  color: white;
}
</style> -->
