
<template>
  <div id="app">
    <header v-if="showHeader">
      <img src="@/assets/logo.png" alt="BloodNation Logo" style="height: 40px; margin-right: 10px;">
      <div class="container">
        <div class="icon-link" style="color: white;">
          <router-link to="/user" class="welcome-text" style="color: black; text-decoration: none;">
            Welcome, {{ user.username }}
          </router-link>
          <button class="btn btn-link logout-btn" @click="logout" style="color: black;">
            <i class="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
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
  console.log('Checking auth with userId:', user_id, 'and token:', token); // Debug log
  if (user_id && token) {
    fetch(`http://localhost:3000/users/${user_id}`, {
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
      this.showHeader = true; // Show header after successful authentication
      console.log('User data fetched successfully:', data); // Debug log
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
/* Add Bootstrap styles */
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.4.0/dist/css/bootstrap.min.css');



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
