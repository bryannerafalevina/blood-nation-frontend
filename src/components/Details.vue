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
        <button v-if="isAuthorized" class="btn btn-primary" @click="goToDetail">Apply</button>
        <p v-else class="text-muted"><router-link :to="'/reservation/' + event.id" class="details-link">Apply</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCounterStore } from '@/store/counter';

const route = useRoute();
const router = useRouter();
const counterStore = useCounterStore();

const eventId = route.params.id;
const token = localStorage.getItem('token');
const isAuthorized = token !== null;

const event = ref({
  location: 'Location Placeholder',
  requirements: 'Requirements Placeholder',
  date: 'Date Placeholder',
  quota: 'Quota Placeholder',
});

const fetchEvent = async () => {
  try {
    const data = await counterStore.fetchEventById(eventId);
    event.value = {
      ...data,
      date: data.date.split('T')[0], // Format the date if necessary
    };
  } catch (error) {
    console.error('Error fetching event:', error);
  }
};

const goToDetail = () => {
  router.push(`/reservation/`+eventId); // Navigate to the event detail page
};

onMounted(() => {
  fetchEvent();
});
</script>

<style>

.container {
  display: flex;
  justify-content: center;
}
.card {
  margin-top: 100px;
  border-radius: 15px;
}

.custom-card {
  background-color: #f8f9fa;
  width: 350px;
}

.custom-header {
  color: white;
}
</style>
