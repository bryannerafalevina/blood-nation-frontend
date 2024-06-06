<template>
  <div class="container-fluid d-flex justify-content-center align-items-center" style="display: flex; justify-content: center; align-items: center; margin-left: 300px;">
    <div class="card p-4" style="width: 500px; background-color: #f8f9fa; border: 2px solid #dc3545; border-radius: 15px;">
      <img src="../assets/login.png" alt="Blood Nation Logo" style="width: 300px;">
      <div class="card-header bg-primary text-white text-center" style="border-radius: 15px 15px 0 0;">
        <h4 class="card-title costum-login1">Login to Blood Nation</h4>
      </div>
      <div class="card-body" style="display: flex; flex-direction: column; flex-grow: 1;">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="costum-login2">Email address</label> <br>
            <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter your email address" required>
          </div>
          <div class="mb-3">
            <label for="password" class="costum-login2"><b>Password</b></label> <br>
            <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter your password" required>
          </div>
          <button type="submit" class="btn btn-danger btn-block" style="width: 80px; height: 40px" :disabled="isLoggingIn">{{ isLoggingIn ? 'Logging in...' : 'Login' }}</button>
        </form>
        <div v-if="loginError" class="alert alert-danger mt-3" role="alert">
          {{ loginError }}
        </div>
        <div v-if="loginMessage" class="alert alert-success mt-3" role="alert">
          {{ loginMessage }}
        </div>
      </div>
      <div class="card-footer bg-light text-muted text-center" style="border-radius: 0 0 15px 15px;">
        <p class="mt-3 text-center costum-login3">Don't have an account? <router-link to="/regist"> <span style="color: red;">Regist</span></router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/store/counter'; // Import store

const email = ref('');
const password = ref('');
const isLoggingIn = ref(false);
const loginError = ref('');
const loginMessage = ref('');
const router = useRouter();

const counterStore = useCounterStore(); // Buat instance store

const login = async () => {
  isLoggingIn.value = true;
  loginError.value = ''; // Reset error message
  loginMessage.value = ''; // Reset success message

  try {
    const responsedata = await counterStore.loginUser({ email: email.value, password: password.value }); // Panggil loginUser dari store
    console.log(responsedata);
    const token = counterStore.token;
    console.log('Token:', token);
    localStorage.setItem('token', token);
    localStorage.setItem('userID', counterStore.user_id);
    console.log(counterStore.user_id,"==-");

    loginMessage.value = 'Login successful!';
    router.push('/login'); 
  } catch (error) {
    console.error('Login error:', error);
    loginError.value = error.message || 'Invalid email or password. Please try again.';
  } finally {
    isLoggingIn.value = false;
  }
};
</script>

<style>
.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-header {
  border-radius: 15px 15px 0 0;
  color: red; /* Red text */
}

.card-footer {
  border-radius: 0 0 15px 15px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

#email {
  width: 270px;
  height: 30px;
  border-radius: 5px;
}

#password {
  width: 270px;
  height: 30px;
  border-radius: 5px;
}

.costum-login1 {
  font-size: 27px;
  font-weight: bolder;
}

.costum-login2 {
  font-size: 18px;
  color: red;
}
</style>
