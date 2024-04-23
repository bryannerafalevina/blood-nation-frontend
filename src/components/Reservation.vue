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
                <input type="text" id="address" v-model="formData.address" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="age" class="form-label">Age:</label>
                <input type="number" id="age" v-model="formData.age" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="weight" class="form-label">Weight:</label>
                <input type="number" id="weight" v-model="formData.weight" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="bloodType" class="form-label">Blood Type:</label>
                <select v-model="formData.bloodType" class="form-select" required>
                  <option disabled value="">Please select blood type</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="O">O</option>
                  <option value="AB">AB</option>
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
      }
    };
  },
  methods: {
    submitForm() {
      if (typeof this.formData.address !== 'string' ||
          typeof this.formData.age !== 'number' ||
          typeof this.formData.weight !== 'number' ||
          typeof this.formData.bloodType !== 'string') {
        alert('Invalid form data types!');
        return;
      }

      // Handle form submission here
      console.log('Form submitted:', this.formData);
      alert('Form submitted successfully!');
    }
  }
};
</script>

<style>

.reservation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}


</style>

