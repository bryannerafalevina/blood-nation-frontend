<template>
  <div class="search-container-md">
    <input type="text" v-model="searchQuery" placeholder="Search by name" style="margin-top: 100px; margin-left: 80px; width: 400px; height: 30px; margin-right: 10px; border-radius: 5px;">
    <button @click="search" style="height: 30px; width: 60px;">Submit</button>
    <div v-if="isSubmitted" class="card-container-home">
      <div v-for="(bloodnation, index) in filteredBloodnations" :key="index" class="card">
        <img :src="getBloodnationImage(index)" alt="bloodnation Image" class="bloodnation-image" />
        <div class="card-content">
          <h3><b>{{ bloodnation.name }}</b></h3>
          <p>{{ formatDate(bloodnation.date) }}, {{ bloodnation.location }}</p> <!-- Display formatted date with a comma -->
          <p class="quota">Quota: {{ bloodnation.quota }} people</p>
          <p class="detail">{{ bloodnation.detail }}</p>
          <router-link :to="'/details/' + bloodnation.id" class="details-link">Details</router-link> <!-- Add class for Details link -->
        </div>
      </div>
    </div>
    <div v-else>
  <p v-if="!filteredBloodnations.length">No search results.</p>
  <div v-else class="card-container-home">
    <div v-for="(bloodnation, index) in filteredBloodnations" :key="index" class="card">
      <img :src="getBloodnationImage(index)" alt="bloodnation Image" class="bloodnation-image" />
      <div class="card-content">
        <h3><b>{{ bloodnation.name }}</b></h3>
        <p>{{ formatDate(bloodnation.date) }}, {{ bloodnation.location }}</p> <!-- Display formatted date with a comma -->
        <p class="quota">Quota: {{ bloodnation.quota }} people</p>
        <p class="detail">{{ bloodnation.detail }}</p>
        <router-link :to="'/details/' + bloodnation.id" class="details-link">Details</router-link> <!-- Add class for Details link -->
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const bloodnations = ref([]);
const searchQuery = ref('');

const fetchBloodnations = async () => {
  try {
    const response = await fetch('http://localhost:3000/events');
    const data = await response.json();
    bloodnations.value = data;
  } catch (error) {
    console.error('Error fetching bloodnations:', error);
  }
};

const getBloodnationImage = (index) => {
  return 'https://source.unsplash.com/featured/?hospital'; // Use the desired Unsplash URL here
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
};

onMounted(() => {
  fetchBloodnations();
});

const filteredBloodnations = computed(() => {
  if (!searchQuery.value.trim()) {
    return bloodnations.value; // Return all blood nations if search query is empty
  }
  return bloodnations.value.filter(bloodnation => {
    return bloodnation.name.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

const search = () => {
  if (!searchQuery.value.trim()) {
    filteredBloodnations.value = bloodnations.value;
  } else {
    filteredBloodnations.value = bloodnations.value.filter(bloodnation => {
      return bloodnation.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  }
};


// const resetSearch = () => {
//   searchQuery.value = '';
// };

</script>
  
  <style>
  .card-container-home {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-left: 70px;
    justify-content: flex-start; /* Menggeser kartu ke kiri */
  }
  
  .card {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #f8f9fa; /* Updated background color */
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 70px 0; /* Adjusted margin to remove space on the left */
  }
  
  .bloodnation-image {
    width: 200px;
    height: auto;
    border-radius: 5px 5px 0 0;
  }
  
  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: auto; /* Push content to the top */
    align-items: center; 
    /* Center items vertically */
  }
  
  .card-content p {
    margin: 0; /* Remove default margin */
  }
  
  button {
    margin-top: 10px;
    margin-right: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .card-content b {
    font-weight: bold;
  }
  
  .quota {
    color: white;
    background-color: red;
    padding: 5px 10px;
    border-radius: 10px;
    display: inline-block; /* Ensure the background covers the text */
    font-size: 15px; /* Set the font size to 16 pixels */
  }
  
  
  .detail {
    color: blue; /* Set the text color to blue */
  }
  
  .details-link {
    color: blue; /* Set the link text color to blue */
    text-decoration: underline; /* Add underline to the link text */
  }
  
  .search-container {
    margin-bottom: 20px;
    display: contents;
    margin-top: 200px;
  }
  </style>