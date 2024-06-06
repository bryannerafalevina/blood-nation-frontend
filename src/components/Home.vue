
<template>
  <div class="search-container-md">
    <select v-model="searchType" style="margin-top: 100px; margin-left: 80px; width: 200px; height: 30px; margin-right: 10px; border-radius: 5px;">
      <option value="name">Name</option>
      <option value="location">Location</option>
      <option value="quota">Quota</option>
      <option value="date">Date</option>
    </select>
    <input type="text" v-model="searchQuery" :placeholder="'Search by ' + searchType" style="margin-top: 20px; width: 400px; height: 30px; margin-right: 10px; border-radius: 5px;">
    <button @click="search" style="height: 30px; width: 60px; margin-top: 20px;">Submit</button>

    <div v-if="isSubmitted" class="card-container-home">
      <div v-for="(bloodnation, index) in paginatedBloodnations" :key="index" class="card">
        <img :src="bloodnation.image_url" alt="bloodnation Image" class="bloodnation-image" />
        <div class="card-content">
          <!-- <h3><b>{{ bloodnation.name }}</b></h3>
          <p>{{ formatDate(bloodnation.date) }}, {{ bloodnation.location }}</p> -->
          <h3 class="name-style"><b>{{ bloodnation.name }}</b></h3>
        <p class="location-style">{{ formatDate(bloodnation.date) }}, {{ bloodnation.location }}</p>
          <p class="quota">Quota: {{ bloodnation.quota }} people</p>
          <p class="detail">{{ bloodnation.detail }}</p>
          <router-link :to="'/event-details/' + bloodnation.id" class="details-link">Details</router-link>
        </div>
      </div>
    </div>

    <div v-else>
      <p v-if="!filteredBloodnations.length">No search results.</p>
      <div v-else class="card-container-home">
        <div v-for="(bloodnation, index) in paginatedBloodnations" :key="index" class="card">
          <img :src="bloodnation.image_url" alt="bloodnation Image" class="bloodnation-image" />
          <div class="card-content">
            <!-- <h3><b>{{ bloodnation.name }}</b></h3>
            <p>{{ formatDate(bloodnation.date) }}, {{ bloodnation.location }}</p> -->

            <h3 class="name-style"><b>{{ bloodnation.name }}</b></h3>
        <p class="location-style">{{ formatDate(bloodnation.date) }}, {{ bloodnation.location }}</p>
            <p class="quota">Quota: {{ bloodnation.quota }} people</p>
            <p class="detail">{{ bloodnation.detail }}</p>
            <router-link :to="'/event-details/' + bloodnation.id" class="details-link">Details</router-link>
          </div>
        </div>
      </div>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="prevPage()">Previous</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="nextPage()">Next</a>
        </li>
      </ul>
    </nav>



  </div>
</template>

<script setup>
import { fetchBloodnations } from '@/store/counter'; // Import fetchBloodnations from store counter.js

const bloodnations = ref([]);
const searchQuery = ref('');
const searchType = ref('name');
const isSubmitted = ref(false);
const filteredBloodnations = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);

const paginatedBloodnations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredBloodnations.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredBloodnations.value.length / itemsPerPage.value);
});

onMounted(async () => {
  await fetchBloodnations();
});

async function fetchBloodnations() {
  try {
    const data = await fetchBloodnations();
    bloodnations.value = data;
    filteredBloodnations.value = data;
    console.log(filteredBloodnations.value);
  } catch (error) {
    console.error('Error fetching bloodnations:', error);
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function search() {
  isSubmitted.value = true;
  if (!searchQuery.value.trim()) {
    filteredBloodnations.value = bloodnations.value;
  } else {
    filteredBloodnations.value = bloodnations.value.filter(bloodnation => {
      const query = searchQuery.value.toLowerCase();
      if (searchType.value === 'name') {
        return bloodnation.name.toLowerCase().includes(query);
      } else if (searchType.value === 'location') {
        return bloodnation.location.toLowerCase().includes(query);
      } else if (searchType.value === 'quota') {
        return bloodnation.quota.toString().includes(query);
      } else if (searchType.value === 'date') {
        return formatDate(bloodnation.date) === query;
      }
      return false;
    });
  }
  currentPage.value = 1;
}
</script>

<style>
/* Add your existing styles here */

.card-container-home {
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 20px;
margin-left: 70px;
justify-content: flex-start;
}

.card {
display: flex;
flex-direction: column;
padding: 10px;
background-color: #f8f9fa;
border: 1px solid #ccc;
border-radius: 15px;
margin: 70px 0;
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
margin-top: auto;
align-items: center;
}

.card-content p {
margin: 0;
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
display: inline-block;
font-size: 15px;
}

.detail {
color: blue;
}

.details-link {
color: blue;
text-decoration: underline;
}

.search-container {
margin-bottom: 20px;
display: contents;
margin-top: 200px;
}

/* Pagination Styles */

.pagination {
display: flex;
justify-content: center;
margin-top: 20px;
list-style: none;
padding: 0;
}

.page-item {
margin: 0 5px;
}

.page-item a {
color: #007bff;
text-decoration: none;
padding: 8px 12px;
border: 1px solid #ddd;
border-radius: 5px;
}

.page-item a:hover {
background-color: #007bff;
color: white;
border-color: #007bff;
}

.page-item.active a {
background-color: #007bff;
color: white;
border-color: #007bff;
}

.page-item.disabled a {
color: #ccc;
cursor: not-allowed;
}
.name-style b {
margin-right: 0; /* Menghapus margin antara nama dan tanggal */
}

</style>