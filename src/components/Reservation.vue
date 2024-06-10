
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
                <input type="text" id="address" v-model="formData.address" class="form-control3" placeholder="Enter your address" required>
              </div>
              <div class="form-group">
                <label for="age" class="form-label">Age:</label>
                <input type="number" id="age" v-model="formData.age" class="form-control3" placeholder="Enter your age" required>
              </div>
              <div class="form-group">
                <label for="weight" class="form-label">Weight:</label>
                <input type="number" id="weight" v-model="formData.weight" class="form-control3" placeholder="Enter your weight" required>
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

<script setup>
import { ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useCounterStore } from '@/store/counter'; // Import store
const store = useCounterStore(); // Access the Pinia store

const toast = useToast();
const router = useRouter();
const route = useRoute();

const formData = reactive({
  address: '',
  age: null,
  weight: null,
  bloodType: ''
});

const submitForm = async () => {
  // Check if any form field is empty
  if (!formData.address || !formData.age || !formData.weight || !formData.bloodType) {
    toast.error('Please fill in all fields');
    return;
  }

  // Check if age and weight are numbers
  if (isNaN(formData.age) || isNaN(formData.weight)) {
    toast.error('Age and weight must be numbers');
    return;
  }

  // Check if age is within range
  if (formData.age < 18 || formData.age > 65) {
    toast.error('Age must be between 18 and 65');
    return;
  }

  // Check if weight is within range
  if (formData.weight < 40 || formData.weight > 150) {
    toast.error('Weight must be between 40 and 150');
    return;
  }

  // Check if bloodtype is a valid value
  const validBloodTypes = ['A', 'O', 'B', 'AB'];
  if (!validBloodTypes.includes(formData.bloodType.toUpperCase())) {
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
  const eventId = route.params.id;
  try {
    const data = await store.reserveEvent(eventId, userID, formData);
    console.log('Form submitted:', data);
    toast.success('Form submitted successfully!');
    router.push('/history');  // Redirect to history page
  } catch (error) {
    console.error('Error submitting form:', error.message);
    toast.error('Failed to submit form. Please try again.');
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

.form-control3 {
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
