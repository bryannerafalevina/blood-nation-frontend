<template>
    <div class="container-fluid d-flex justify-content-center align-items-center">
      <div class="card p-4" style="width: 500px;">
        <div class="card-header bg-primary text-white text-center">
          <h4 class="card-title"><strong>Forgot Password</strong></h4>
        </div>
        <div class="card-body" style="display: flex; flex-direction: column; flex-grow: 1;">
          <form @submit.prevent="resetPassword">
            <div class="mb-3">
              <label for="email" class="form-label"><strong>Email address</strong></label> <br>
              <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter your email address" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block" :disabled="isResetting">{{ isResetting ? 'Resetting...' : 'Reset Password' }}</button>
          </form>
          <div v-if="resetError" class="alert alert-danger mt-3" role="alert">
            {{ resetError }}
          </div>
          <div v-if="resetSuccess" class="alert alert-success mt-3" role="alert">
            {{ resetSuccess }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        isResetting: false,
        resetError: '',
        resetSuccess: ''
      };
    },
    methods: {
      resetPassword() {
        // Implement reset password logic here
        // For example, send reset password email to the user
        this.isResetting = true;
        setTimeout(() => {
          // Simulating reset password process
          if (this.email === 'example@example.com') {
            this.resetError = '';
            this.resetSuccess = 'Password reset email sent. Please check your inbox.';
          } else {
            this.resetError = 'Email address not found.';
            this.resetSuccess = '';
          }
          this.isResetting = false;
        }, 2000);
      }
    }
  };
  </script>
  
  <style>
  .card {
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .card-header {
    border-radius: 15px 15px 0 0;
  }
  .card-body {
    margin-right: 5px;
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
  .form-control {
    width: 480px;
  }
  </style>
  