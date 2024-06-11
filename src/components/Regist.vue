<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card-register p-4">
      <img src="../assets/register.png" alt="Blood Nation Logo" style="width: 200px;">
      <div class="card-header bg-danger text-white text-center">
        <h4 class="card-title costum-regist1">Register for a Blood Nation Account</h4>
      </div>
      <div class="card-body2">
        <form @submit.prevent="register" v-if="!isRegistered">
          <div class="mb-3 custom-form-group">
            <label for="username" class="form-label costum-regist2">Username</label>
            <input type="text" class="form-control2" id="username" v-model="username" placeholder="Enter your username" required>
          </div>
          <div class="mb-3 custom-form-group">
            <label for="email" class="form-label costum-regist2">Email address</label>
            <input type="email" class="form-control2" id="email" v-model="email" placeholder="Enter your email address" required>
          </div>
          <div class="mb-3 custom-form-group">
            <label for="password" class="form-label costum-regist2">Password</label>
            <input type="password" class="form-control2" id="password" v-model="password" placeholder="Enter a password" required>
          </div>
          <div class="mb-3 custom-form-group">
            <label for="phoneNumber" class="form-label costum-regist2">Phone Number</label>
            <input type="text" class="form-control2" id="phoneNumber" v-model="phoneNumber" placeholder="Enter your phone number" required inputmode="numeric">
          </div>
          <button type="submit" class="btn btn-danger btn-block" :disabled="isSubmitting">{{ isSubmitting ? 'Registering...' : 'Register' }}</button>
        </form>
        <div v-else>
          <p class="text-success">Registration successful!</p>
          <p>Redirecting to login page...</p>
        </div>
      </div>
      <div class="card-footer bg-light text-muted text-center">
        <p class="mt-3 text-center costum-regist3">Already have an account? <router-link to="/login">Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/store/counter'; // Adjust the path according to your project structure

const router = useRouter();
const counterStore = useCounterStore();

const username = ref('');
const email = ref('');
const password = ref('');
const phoneNumber = ref('');
const isSubmitting = ref(false);
const isRegistered = ref(false);

const register = async () => {
  isSubmitting.value = true;
  try {
    await counterStore.registerUser({ username: username.value, email: email.value, password: password.value, phoneNumber: phoneNumber.value });
    isRegistered.value = true;
    setTimeout(() => {
      router.push('/login'); 
    }, 2000);
    username.value = '';
    email.value = '';
    password.value = '';
    phoneNumber.value = '';
  } catch (error) {
    console.error('Registration error:', error);
    alert('Registration failed. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.card-register {
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadeInUp 0.5s ease forwards;
  border: 2px solid #dc3545; 
  width: 600px; 
  height: 700px;
  margin-top: 70px;
}


.card-header {
  border-radius: 5px 5px 0 0;
}

.card-body2 {
  margin-right: 5px;
}

.card-footer {
  border-radius: 0 0 15px 15px;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #c82333;
}

.card-title {
  color: #c82333;
}

.form-control2 {
  display: block;
  width: 570px; 
  margin-top: 5px; 
  border-radius: 5px;
  height: 30px;
}

.custom-form-group {
  margin-bottom: 20px;
}


</style>
