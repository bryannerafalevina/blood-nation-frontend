<!-- 
<template>
  <div class="reservation-container">
    <div class="card-container">
      <div class="outer-card">
        <div class="inner-card">
          <h1 class="card-title">Apply Form</h1>
          <div class="form-container">
            <form @submit.prevent="submitForm" class="reservation-form">
              <div class="form-group">
                <label for="address" class="form-label">Address:</label>
                <input type="text" id="address" v-model="formData.address" class="form-control" placeholder="Enter your address" required>
              </div>
              <div class="form-group">
                <label for="age" class="form-label">Age:</label>
                <input type="number" id="age" v-model="formData.age" class="form-control" placeholder="Enter your age" required>
              </div>
              <div class="form-group">
                <label for="weight" class="form-label">Weight:</label>
                <input type="number" id="weight" v-model="formData.weight" class="form-control" placeholder="Enter your weight" required>
              </div>
              <div class="form-group">
                <label for="bloodtype" class="form-label">Bloodtype:</label>
                <select v-model="formData.bloodType" class="form-select" aria-label="Default select example">
                  <option selected disabled>Choose Blood Type</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        address: '',
        age: null,
        weight: null,
        bloodType: ''
      },
    };
  },
  methods: {
    async submitForm() {
      // Check if any form field is empty
      if (
        !this.formData.address ||
        !this.formData.age ||
        !this.formData.weight ||
        !this.formData.bloodType
      ) {
        alert('Please fill in all fields');
        return;
      }

      // Check if age and weight are numbers
      if (isNaN(this.formData.age) || isNaN(this.formData.weight)) {
        alert('Age and weight must be numbers');
        return;
      }

      // Check if age is within range
      if (this.formData.age < 18 || this.formData.age > 65) {
        alert('Age must be between 18 and 65');
        return;
      }

      // Check if weight is within range
      if (this.formData.weight < 40 || this.formData.weight > 150) {
        alert('Weight must be between 40 and 150');
        return;
      }

      // Check if bloodtype is a valid value
      const validBloodTypes = ['A', 'O', 'B', 'AB'];
      if (!validBloodTypes.includes(this.formData.bloodType.toUpperCase())) {
        alert('Blood type must be A, O, B, or AB');
        return;
      }

      // Retrieve user ID from local storage
      const userID = localStorage.getItem('userID');
      if (!userID) {
        alert('submit berhasil');
        return;
      }
      console.log(userID);

      // Proceed with form submission
      const token = localStorage.getItem('token');
      const eventId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/reservations/${eventId}/${userID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
          body: JSON.stringify({...this.formData }),  // Include user ID in the form data
        });
        console.log(response,"===");

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        const data = await response.json();
        console.log('Form submitted:', data);
        alert('Form submitted successfully!');
        this.$router.push('/history');  // Redirect to history page
      } catch (error) {
        console.error('Error submitting form:', error.message);
        alert('Failed to submit form. Please try again.');
      }
    }
  }
};
</script>

<style>
.reservation-container { 
  align-items: center;
  margin-left: 250px;
}

.card-container {
  width: 630px;
  margin-top: 70px;

}

.outer-card {
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #dc3545; 
}

.inner-card {
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(248, 249, 250, 0.9); 
}

.card-title {
  text-align: center;
  margin-bottom: 20px;
  color: #dc3545; 
}


.card-container {
  padding: 20px;
  }


.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-label {
  color: black;
  margin-bottom: 5px;
}

.form-control {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
}

.btn {
  padding: 10px 20px;
  background-color: #dc3545; 
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn:hover {
  background-color: #c82333; 
}


.form-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-top: 5px; 
}
</style>
 -->

 <template>
  <div class="reservation-container">
    <div class="card-container">
      <div class="outer-card">
        <div class="inner-card">
          <h1 class="card-title">Apply Form</h1>
          <div class="form-container">
            <form @submit.prevent="submitForm" class="reservation-form">
              <div class="form-group">
                <label for="address" class="form-label">Address:</label>
                <input type="text" id="address" v-model="formData.address" class="form-control" placeholder="Enter your address" required>
              </div>
              <div class="form-group">
                <label for="age" class="form-label">Age:</label>
                <input type="number" id="age" v-model="formData.age" class="form-control" placeholder="Enter your age" required>
              </div>
              <div class="form-group">
                <label for="weight" class="form-label">Weight:</label>
                <input type="number" id="weight" v-model="formData.weight" class="form-control" placeholder="Enter your weight" required>
              </div>
              <div class="form-group">
                <label for="bloodtype" class="form-label">Bloodtype:</label>
                <select v-model="formData.bloodType" class="form-select" aria-label="Default select example">
                  <option selected disabled>Choose Blood Type</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      formData: {
        address: '',
        age: null,
        weight: null,
        bloodType: ''
      },
    };
  },
  methods: {
    async submitForm() {
      const toast = useToast();

      // Check if any form field is empty
      if (
        !this.formData.address ||
        !this.formData.age ||
        !this.formData.weight ||
        !this.formData.bloodType
      ) {
        toast.error('Please fill in all fields');
        return;
      }

      // Check if age and weight are numbers
      if (isNaN(this.formData.age) || isNaN(this.formData.weight)) {
        toast.error('Age and weight must be numbers');
        return;
      }

      // Check if age is within range
      if (this.formData.age < 18 || this.formData.age > 65) {
        toast.error('Age must be between 18 and 65');
        return;
      }

      // Check if weight is within range
      if (this.formData.weight < 40 || this.formData.weight > 150) {
        toast.error('Weight must be between 40 and 150');
        return;
      }

      // Check if bloodtype is a valid value
      const validBloodTypes = ['A', 'O', 'B', 'AB'];
      if (!validBloodTypes.includes(this.formData.bloodType.toUpperCase())) {
        toast.error('Blood type must be A, O, B, or AB');
        return;
      }

      // Retrieve user ID from local storage
      const userID = localStorage.getItem('userID');
      if (!userID) {
        toast.error('User ID not found');
        return;
      }
      console.log(userID);

      // Proceed with form submission
      const token = localStorage.getItem('token');
      const eventId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/reservations/${eventId}/${userID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
          },
          body: JSON.stringify({...this.formData }),  // Include user ID in the form data
        });
        console.log(response, "===");

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        const data = await response.json();
        console.log('Form submitted:', data);
        toast.success('Form submitted successfully!');
        this.$router.push('/history');  // Redirect to history page
      } catch (error) {
        console.error('Error submitting form:', error.message);
        toast.error('Failed to submit form. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
.reservation-container { 
  align-items: center;
  margin-left: 250px;
}

.card-container {
  width: 630px;
  margin-top: 70px;
}

.outer-card {
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #dc3545; 
}

.inner-card {
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(248, 249, 250, 0.9); 
}

.card-title {
  text-align: center;
  margin-bottom: 20px;
  color: #dc3545; 
}

.card-container {
  padding: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-label {
  color: black;
  margin-bottom: 5px;
}

.form-control {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
}

.btn {
  padding: 10px 20px;
  background-color: #dc3545; 
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.btn:hover {
  background-color: #c82333; 
}

.form-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-top: 5px; 
}
</style>
