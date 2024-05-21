<template>
  <div id="app">
    <header>
      <img src="@/assets/logo.png" alt="BloodNation Logo" style="height: 40px; margin-right: 10px;">
      <div class="container">
        <div class="spacer"></div>
        <template v-if="user">
          <div class="icon-link" style="color: white;">
            <router-link to="/user" style="color: inherit; text-decoration: none;">
              Welcome, {{ user.username }}
            </router-link>
            <button class="btn btn-link" @click="logout" style="color: inherit;">
              <i class="bi bi-box-arrow-right"></i> Logout
            </button>
          </div>
        </template>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },

  methods: {
    logout() {
      localStorage.removeItem('userID');
      localStorage.removeItem('token');
      this.user = {};
      // Redirect to the login page or perform any other actions needed
      this.$router.push('/logout');
    }
  },

  created() {
    const userId = localStorage.getItem('userID');
    const token = localStorage.getItem('token');
    if (userId && token) {
      fetch(`http://localhost:3000/users/${userId}`, {
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
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }
}
</script>

<style>
/* Add Bootstrap styles */
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.4.0/dist/css/bootstrap.min.css');

/* Set full gradient background */
html, body {
  background-color: wheat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}


header {
  background-color: rgba(206, 139, 145, 0.9);
  display: flex;
  top: 0;
  left: 0;
  justify-content: space-between;
  align-items: center;
  position: fixed; /* Tambahkan properti position: fixed */
  width: 100%;
  z-index: 1000; /* Tambahkan z-index untuk memastikan header muncul di atas konten lain */
}



/* Add margin between navbar items */
.spacer {
  margin-left: 10px;
  margin-right: 10px;
}

.icon-link {
  display: flex;
  align-items: center;
  margin-left: 10px; /* Add margin to separate from other links */
}
</style>
