<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/store/counter';

const counterStore = useCounterStore();
const userData = ref ({});
const token = ref('');
const userId = ref('');
const router = useRouter('');

onMounted(async () => { 
  await counterStore.fetchUserData() 
  console.log(counterStore.user,"--user---");
  userData.value = counterStore.user
});
</script>

<template>
  <div class="user-profile-container">
    <div class="user-profile">
      <div class="profile-card" v-if="userData">
        <div class="profile-info">
          <p><strong>Username:</strong> {{ userData.username }}</p>
          <p><strong>Email:</strong> {{ userData.email }}</p>
          <p><strong>Phone Number:</strong> {{ userData.phone_number }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  width: 100%;
  background-color: white;
  padding: 20px;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Arial', sans-serif;
  width: 65vw;
}

.profile-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  max-width: 600px;
  width: 100%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s;
  border: 2px solid red; 
}

.profile-info {
  font-size: 18px;
  color: #333;
  width: 100%;
}

.profile-info p {
  margin: 10px 0;
  line-height: 1.6;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.profile-info strong {
  display: block;
  margin-bottom: 5px;
}

</style>
