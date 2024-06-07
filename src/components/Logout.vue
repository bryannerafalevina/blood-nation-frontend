
<template>
  <div>
    <div v-if="!loggedOut" class="container-fluid d-flex justify-content-center align-items-center">
      <div class="card mt-5" style="width: 500px; margin-left: 350px;">
        <div class="card-header bg-primary text-white">
          <h4 class="card-title">Logout</h4>
        </div>
        <div class="card-body" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <p>Are you sure you want to logout?</p>
          <div class="button-container">
            <button class="btn btn-secondary btn-equal" @click="cancelLogout">Cancel</button>
            <button class="btn btn-danger btn-equal" @click="logout">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/store/counter'; // Import store


const store = useCounterStore(); // Access the Pinia store

const loggedOut = ref(false);
const router = useRouter();

const logout = () => {
  localStorage.clear(); // Clear user session
  loggedOut.value = true;
  router.push('/login'); // Redirect to login page
};

const cancelLogout = () => {
  router.push('/history'); // Redirect back to the history page
};
</script>

<style>
/* Add custom styles for the component here */
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.button-container button {
  margin: 5px;
}

.btn-equal {
  width: 120px; /* Adjust size as needed */
}
</style>
