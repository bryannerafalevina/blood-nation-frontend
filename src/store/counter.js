

// import { defineStore } from 'pinia';

// export const useCounterStore = defineStore('counter', {
//   state: () => ({
//     filteredBloodnations: [],
//     bloodnations: [],
//     count: 0,
//     events: [],
//     reservations: [],
//     user: null,
//     token: null,
//   }),
//   actions: {
//     async fetchBloodnations() {
//       const token = localStorage.getItem('token');
//       console.log(token, '==');
//       try {
//         const response = await fetch('http://localhost:3000/events', {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'token': token,
//           },
//         });
//         let data = await response.json();
//         this.bloodnations = data;
//         this.filteredBloodnations = data; 
//         console.log(this.filteredBloodnations);
//       } catch (error) {
    
//         console.error('Error fetching bloodnations:', error);
//       }
//     },
//     async fetchReservations(userId) {
//       try {
//         const response = await fetch(`http://localhost:3000/reservations/user/${userId}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'token' : token, // Use Authorization header for token
//           },
//         });
//         const data = await response.json();
//         this.reservations = data.reservations; // Adjust according to your API response structure
//       } catch (error) {
//         console.error('Error fetching reservations:', error);
//       }
//     },
//     async fetchEventById(eventId) {
//       try {
//         const response = await fetch(`http://localhost:3000/events/${eventId}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'token' : token, // Use Authorization header for token
//           },
//         });
//         const data = await response.json();
//         // Do something with the data
//       } catch (error) {
//         console.error('Error fetching event:', error);
//       }
//     },
//     async loginUser(credentials) {
//       try {
//         const response = await fetch(`http://localhost:3000/users/login`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(credentials),
//         });
//         const data = await response.json();
//         if (!response.ok) {
//           throw new Error(data.message || 'Login failed');
//         }
//         this.token = data.token;
//         this.user_id = data.user_id;
//         console.log('Login successful:', data);
//       } catch (error) {
//         console.error('Error logging in:', error);
//         throw error;
//       }
//     },
//     async registerUser(userInfo) {
//       try {
//         const response = await fetch(`http://localhost:3000/users/register`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(userInfo),
//         });
//         const data = await response.json();
//         // Handle the response data as needed
//       } catch (error) {
//         console.error('Error registering user:', error);
//       }
//     },
//     async reserveEvent(eventId, userId) {
//       try {
//         const response = await fetch(`http://localhost:3000/reservations/${eventId}/${userId}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'token' : token, // Use Authorization header for token
//           },
//         });
//         const data = await response.json();
//         // Handle the response data as needed
//       } catch (error) {
//         console.error('Error reserving event:', error);
//       }
//     },
//     async fetchUserById(userId) {
//       try {
//         const response = await fetch(`http://localhost:3000/users/${userId}`, {
//           headers: {
//             'Content-Type': 'application/json',
//             'token' : token, // Use Authorization header for token
//           },
//         });
//         const data = await response.json();
//         this.user = data.user; // Adjust according to your API response structure
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       }
//     },
//   },
// });



// counter.js
// counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    filteredBloodnations: [],
    bloodnations: [],
    count: 0,
    events: [],
    reservations: [],
    user: null,
    token: null,
    user_id: null, // Add user_id to the state
  }),
  actions: {
    async fetchBloodnations() {
      const token = this.$state.token; // Fix the way token is accessed
      console.log(token, '==');
      try {
        const response = await fetch('http://localhost:3000/events', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
        });
        let data = await response.json();
        this.$state.bloodnations = data; // Update state directly
        this.$state.filteredBloodnations = data; // Update state directly
        console.log(this.$state.filteredBloodnations);
      } catch (error) {
        console.error('Error fetching bloodnations:', error);
      }
    },
    async fetchReservations(userId) {
      const token = this.$state.token; // Fix the way token is accessed
      try {
        const response = await fetch(`http://localhost:3000/reservations/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'token' : token,
          },
        });
        const data = await response.json();
        this.$state.reservations = data.reservations; // Update state directly
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    },
    async fetchEventById(eventId) {
      const token = this.$state.token; // Fix the way token is accessed
      try {
        const response = await fetch(`http://localhost:3000/events/${eventId}`, {
          headers: {
            'Content-Type': 'application/json',
            'token' : token,
          },
        });
        const data = await response.json();
        // Do something with the data
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    },
    async loginUser(credentials) {
      try {
        const response = await fetch(`http://localhost:3000/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }
        this.$state.token = data.token; // Update state directly
        this.$state.user_id = data.user_id; // Update state directly
        console.log('Login successful:', data);
      } catch (error) {
        console.error('Error logging in:', error);
        throw error;
      }
    },
    async registerUser(userInfo) {
      try {
        const response = await fetch(`http://localhost:3000/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        // Handle the response data as needed
      } catch (error) {
        console.error('Error registering user:', error);
      }
    },
    async reserveEvent(eventId, userId) {
      const token = this.$state.token; // Fix the way token is accessed
      try {
        const response = await fetch(`http://localhost:3000/reservations/${eventId}/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token' : token,
          },
        });
        const data = await response.json();
        // Handle the response data as needed
      } catch (error) {
        console.error('Error reserving event:', error);
      }
    },
    async fetchUserData(userId) {
      const token = this.$state.token; // Fix the way token is accessed
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'token' : token,
          },
        });
        const data = await response.json();
        this.$state.user = data.user; // Update state directly
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async logout() {
      try {
        // Clear user session
        localStorage.clear();
        // Other async logout logic can go here
        // For example, you can make an API call to invalidate the user session on the server-side
        // Simulate a delay using setTimeout to demonstrate an asynchronous operation
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Update store state after logout
        this.$state.token = null; // Update state directly
        this.$state.user_id = null; // Update state directly
        this.$state.user = null; // Update state directly
        // Reset any other state variables as needed
      } catch (error) {
        console.error('Error during logout:', error);
        throw error;
      }
    }
  },
});
