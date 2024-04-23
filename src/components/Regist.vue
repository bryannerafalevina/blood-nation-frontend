<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div class="card p-4" style="width: 600px; height: 640px;">
      <img src="../assets/register.png" alt="Blood Nation Logo" style="width: 300px;">
      <div class="card-header bg-danger text-white text-center">
        <h4 class="card-title costum-regist1">Register for a Blood Nation Account</h4>
      </div>
      <div class="card-body">
        <form @submit.prevent="register" v-if="!isRegistered">
          <div class="mb-3">
            <label for="username" class="form-label costum-regist2">Username</label>
            <input type="text" class="form-control2" id="username" v-model="username" placeholder="Enter your username" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label costum-regist2">Email address</label>
            <input type="email" class="form-control2" id="email" v-model="email" placeholder="Enter your email address" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label costum-regist2">Password</label>
            <input type="password" class="form-control2" id="password" v-model="password" placeholder="Enter a password" required>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label costum-regist2">Phone Number</label>
            <input type="text" class="form-control2" id="phone" v-model="phone" placeholder="Enter your phone number" required inputmode="numeric">
          </div>
          <button type="submit" class="btn btn-danger btn-block" :disabled="isSubmitting">{{ isSubmitting ? 'Registering...' : 'Register' }}</button>
        </form>
        <div v-else>
          <p class="text-success">Registration successful!</p>
          <p>Redirecting to login page...</p>
        </div>
      </div>
      <div class="card-footer bg-light text-muted text-center">
        <p class="mt-3 text-center costum-regist3">Already have an account? <router-link to="/">Login</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const email = ref('');
const password = ref('');
const isSubmitting = ref(false);
const isRegistered = ref(false);
const phone = ref('');

const register = async () => {
  isSubmitting.value = true;
  try {
    console.log(phone.value);
    const response = await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username.value, email: email.value, password: password.value, phoneNumber: phone.value }),
    });

    if (!response.ok) {
      throw new Error('Registration failed. Please try again.');
    }

    // Registration successful
    isRegistered.value = true;
    setTimeout(() => {
      router.push('/login'); // Redirecting to login page after 2 seconds
    }, 2000);

  } catch (error) {
    console.error('Registration error:', error);

    alert('Registration failed. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
};

</script>


<style>
.card {
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: fadeInUp 0.5s ease forwards;
  border: 2px solid #dc3545; /* Add a 2px solid border with red color */
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  border-radius: 5px 5px 0 0;
}

.card-body2{
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

.form-control2{
  width: 580px;
}

.costum-regist1{
  font-size: 27px;
}

.costum-regist2{
  font-size: 18px;
}

.costum-regist3{
  font-size: 17px;
}
</style>
"