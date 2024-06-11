<template>
  <div id="app">
    <header v-if="showHeader">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="BloodNation Logo" style="height: 40px; margin-right: 10px;">
      </router-link>
      <div class="container">
        <div class="icon-link" style="color: white; display: flex; align-items: center;">
          <router-link to="/user" class="welcome-text" style="color: black; text-decoration: none; margin-right: 50px;">
            Welcome, {{ user.username }}
          </router-link>
          <router-link to="/history" style="color: black; text-decoration: none; margin-right: 40px;">
            History
          </router-link>
          <button class="btn btn-link logout-btn" @click="logout" style="color: black; margin-right: 30px; margin-bottom: 10px;">
            <i class="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>



<script>
import 'bootstrap-icons/font/bootstrap-icons.css';

export default {
  data() {
    return {
      user: {},
      isAuthenticated: false,
      showHeader: false
    };
  },

  methods: {
    logout() {
      this.showHeader = false;
      this.$router.push('/logout');
    },

    checkAuth() {
  const user_id = localStorage.getItem('userID');
  const token = localStorage.getItem('token');
  if (user_id && token) {
    fetch(`https://blood-nation.handuktangerang.online/users/${user_id}`, {
      headers: {
        'token': token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    })
    .then(data => {
      this.user = data;
      this.isAuthenticated = true;
      this.showHeader = true; 
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  } else {
    this.isAuthenticated = false;
    this.showHeader = false; // Hide header if not authenticated
    console.log('User is not authenticated'); // Debug log
  }
}

  },

  created() {
    this.checkAuth();
  },

  watch: {
    '$route': 'checkAuth'
  }
}
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");


.router-link-exact-active {
  text-decoration: none;
}

header {
  background-color: rgba(206, 139, 145, 0.9);
  display: flex;
  top: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 1000;
  padding: 10px; /* Optional: Add some padding for better spacing */
}

.icon-link {
  display: flex;
  align-items: center;
  margin-left: 20px; /* Add margin to move the whole block to the left */
}

.welcome-text {
  margin-right: 20px; /* Add margin to the right of the username link */
}

.logout-btn {
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
}



</style>
