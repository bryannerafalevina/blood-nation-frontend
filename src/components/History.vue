<template>
  <div>
    <h2 class="mt-4 mb-3" style="margin-top: 50px;">History Page</h2>


    <!-- Event Cards -->
    <div class="container-history" style="margin-bottom: 100px;">
      <div class="row">
        <div class="col-md-12">
          <div class="card mb-4" v-for="(event, index) in filteredEvents" :key="index">
            <div class="card-body-history">
              <h5 class="card-title">Blood Donation Event</h5>
              <p><strong>Date:</strong> {{ formatDate(event.date) }}</p>
              <!-- New fields for address, age, and weight -->
              <p><strong>Address:</strong> {{ event.address }}</p>
              <p><strong>Age:</strong> {{ event.age }}</p>
              <p><strong>Weight:</strong> {{ event.weight }}</p>
              <!-- End of new fields -->
              <div class="d-flex justify-content-between">
                <button class="btn btn-primary" @click="editEvent(event)">Edit</button>
                <button class="btn btn-danger" @click="deleteEvent(event)">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

</script>

<style>
.container-history {
  margin-top: 50px;
}
.date-filter {
  margin-bottom: 20px;
}
.edit-form {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Make the form inputs wider */
.edit-form input[type="date"],
.edit-form input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

/* Center the form buttons */
.edit-form button {
  margin-right: 10px;
  margin-bottom: 10px; /* Add margin bottom here */
}

</style>
