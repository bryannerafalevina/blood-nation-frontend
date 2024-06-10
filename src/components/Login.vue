<template>
  <div class="container-fluid d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="card p-4 custom-card mx-auto">
      <img src="../assets/login.png" alt="Blood Nation Logo" class="custom-img">
      <div class="card-header bg-primary text-white text-center custom-header">
        <h4 class="card-title costum-login1">Login to Blood Nation</h4>
      </div>
      <div class="card-body custom-body">
        <form @submit.prevent="login">
          <div class="mb-3 custom-form-group">
            <label for="email" class="costum-login2">Email address</label> <br>
            <input type="email" class="form-control custom-input" id="email" v-model="email" placeholder="Enter your email address" required>
          </div>
          <div class="mb-3 custom-form-group">
            <label for="password" class="costum-login2">Password</label> <br>
            <input type="password" class="form-control custom-input" id="password" v-model="password" placeholder="Enter your password" required>
          </div>
          <button type="submit" class="btn-login btn-danger btn-block custom-button-login" :disabled="isLoggingIn">{{ isLoggingIn ? 'Logging in...' : 'Login' }}</button>
        </form>
        <div v-if="loginError" class="alert alert-danger mt-3" role="alert">
          {{ loginError }}
        </div>
        <div v-if="loginMessage" class="alert alert-success mt-3" role="alert">
          {{ loginMessage }}
        </div>
      </div>
      <div class="card-footer bg-light text-muted text-center custom-footer">
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
    console.log(counterStore.user_id, "==-");

    loginMessage.value = 'Login successful!';
    router.push('/'); 
  } catch (error) {
    console.error('Login error:', error);
    loginError.value = error.message || 'Invalid email or password. Please try again.';
  } finally {
    isLoggingIn.value = false;
  }
};
</script>

<style scoped>
.container-fluid {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height to center vertically */
  background-color: white; /* Mengubah background menjadi putih */
}

.custom-card {
  width: 800px;
  background-color: white; /* Mengubah warna background card menjadi putih */
  border: 2px solid #dc3545;
  border-radius: 15px;
}

.custom-img {
  width: 300px;
  margin-bottom: 20px;
}

.custom-header {
  border-radius: 15px 15px 0 0;
}

.custom-body {
  display: flex;
  flex-direction: column;
}

.custom-form-group {
  margin-bottom: 20px; /* Mengatur jarak antara elemen form */
}

.custom-input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
}

.custom-button-login {
  width: 80px; /* Lebar tombol menjadi lebih lebar ke arah kanan */
  height: 40px;
  background-color: #dc3545;
}

.custom-footer {
  border-radius: 0 0 15px 15px;
}

.costum-login2 {
  font-size: 18px;
  color: black;
}

.costum-login1 {
  font-size: 24px; /* Ubah ukuran teks sesuai kebutuhan */
  color: black; /* Ubah warna teks menjadi hitam */
}
</style>
