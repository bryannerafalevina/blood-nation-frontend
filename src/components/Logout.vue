
<template>
  <div>
    <div v-if="!loggedOut" class="container-fluid d-flex justify-content-center align-items-center">
      <div class="card mt-5" style="width: 500px; margin-top: 350px;">
        <div class="card-header-logout bg-primary text-white">
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
import { useCounterStore } from '@/store/counter'; 


const store = useCounterStore(); 

const loggedOut = ref(false);
const router = useRouter();

const logout = () => {
  localStorage.clear(); 
  loggedOut.value = true;
  router.push('/login'); 
};

const cancelLogout = () => {
  router.push('/history'); 
};
</script>

<style>
.card {
  display: flex;
  flex-direction: column;
  align-items: center; 
  margin-top: 50px; 
}

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
  width: 120px; 
}
.card-header-logout{
  .card-header-logout {
  text-align: center; 
  padding: 20px; 
}};
</style>
