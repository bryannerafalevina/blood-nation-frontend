<template>
  <div class="history">
    <h1>Reservation History</h1>
    <div class="card-container">
      <div v-for="reservation in reservations" :key="reservation.id" class="card">
        <div class="card-body">
          <div class="card-content">
            <p class="card-text">Date: {{ formatDate(reservation.created_at) }}</p>
            <p class="card-text">Age: {{ reservation.age }}</p>
            <p class="card-text">Address: {{ reservation.address }}</p>
            <p class="card-text">Weight: {{ reservation.weight }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; 
import { useCounterStore } from '@/store/counter'; 
import { useRouter } from 'vue-router';
const router = useRouter('');

const counterStore = useCounterStore();
const reservations = ref([]);

const fetchReservations = async () => {
  try {
    const userId = localStorage.getItem('userID');
    await counterStore.fetchReservations(userId);
    reservations.value = counterStore.reservations;
    console.log('Fetched reservations:', reservations.value);
  } catch (error) {
    console.error('Error fetching reservations:', error);
  }
};

const formatDate = (date) => {
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      console.error('Invalid Date:', date);
      return 'Invalid Date';
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return parsedDate.toLocaleDateString(undefined, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

onMounted(() => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userID');
  fetchReservations(userId, token);
});
</script>

<style scoped>
.history {
  font-family: Arial, sans-serif;
  margin-left: 250px;

}

h1 {
  margin-top: 80px; 
  margin-bottom: 0; 
}

.card-container {
  flex-direction: column;
  padding-top: 0; 
  }

.card {
  border: 2px solid red;
  border-radius: 5px;
  box-shadow: 0 4px 8px black;
  background-color: white;
  margin-bottom: 0; 
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.card-content {
  padding: 10px;
  background-color: white;
}

.card-text {
  margin: 5px 0;
  font-size: 1.1em;
}

.card:nth-child(odd) {
  border: 2px solid #dc3545; 
}

.card:nth-child(even) {
  border: 2px solid #007bff; 
}
</style>
