<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCounterStore } from '@/store/counter';
import { useRouter } from 'vue-router';

const router = useRouter('');
const counterStore = useCounterStore();
const originalBloodnations = ref([]); 
const bloodnations = ref([]);
const searchQuery = ref('');
const searchType = ref('');
const filteredBloodnations = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(2);
const handleImageError = (url) => {
  console.error(`Image not found at URL: ${url}`);
};

const paginatedBloodnations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return bloodnations.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(bloodnations.value.length / itemsPerPage.value);
});

const fetchBloodnations = async () => {
  try {
    await counterStore.fetchBloodnations();
    originalBloodnations.value = counterStore.bloodnations; 
    bloodnations.value = counterStore.bloodnations;
    filteredBloodnations.value = counterStore.filteredBloodnations;
  } catch (error) {
    console.error('Error fetching bloodnations:', error);
  }
};

const search = (searchQuery) => {
  const query = searchQuery.toLowerCase().trim();
  bloodnations.value = originalBloodnations.value.filter(bloodnation => {
    if (searchType.value === 'name') {
      const lowerCaseName = bloodnation.name.toLowerCase();
      return lowerCaseName.includes(query);
    } else if (searchType.value === 'location') {
      const lowerCaseLocation = bloodnation.location.toLowerCase();
      return lowerCaseLocation.includes(query);
    } else if (searchType.value === 'quota') {
      const quotaString = bloodnation.quota.toString();
      return quotaString.includes(query);
    } else if (searchType.value === 'date') {
      const formattedDate = formatDate(bloodnation.date);
      return formattedDate.includes(query);
    }
    return false;
  });
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
};

onMounted(fetchBloodnations);
</script>

<template>
  <div class="search-container-md">
    <select v-model="searchType" class="search-select">
      <option value="name">Name</option>
      <option value="location">Location</option>
      <option value="quota">Quota</option>
      <option value="date">Date</option>
    </select>
    <input type="text" v-model="searchQuery" :placeholder="'Search by ' + searchType" class="search-input">
    <button @click="search(searchQuery)" class="search-button">Submit</button>

      <div v-for="(bloodnation, index) in paginatedBloodnations" :key="index" class="card">
        <img :src="bloodnation.image_url" alt="bloodnation Image" class="bloodnation-image" @error="handleImageError(bloodnation.image_url)" />
        <div class="card-content">
          <h3 class="name-style"><b>{{ bloodnation.name }}</b></h3>
          <p class="location-style">{{ formatDate(bloodnation.date) }}, {{ bloodnation.location }}</p>
          <p class="quota">Quota: {{ bloodnation.quota }} people</p>
          <p class="detail">{{ bloodnation.detail }}</p>
          <router-link :to="'/event-details/' + bloodnation.id" class="details-link">Details</router-link>
        </div>
      </div>
  
      <p v-if="!filteredBloodnations.length"></p>
      <div v-else class="card-container-home">
        <div v-for="(bloodnation, index) in bloodnations" :key="index" class="card">
          <img :src="bloodnation.image_url" alt="bloodnation Image" class="bloodnation-image" />
          <div class="card-content">
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
</template>

<style>
.search-select {
  margin-top: 100px;
  margin-left: 80px;
  width: 200px;
  height: 30px;
  margin-right: 10px;
  border-radius: 5px;
}

.search-input {
  margin-top: 20px;
  width: 1500px;
  height: 30px;
  margin-right: 10px;
  border-radius: 5px;
}

.search-button {
  height: 30px;
  width: 60px;
  margin-top: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 300px;
  margin: 20px auto; 
  border: 2px solid red;
}

.card-container-home {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  margin-left: 70px;
  justify-content: flex-start;
  margin-bottom: 20px; 
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: auto;
  align-items: center;
}

.bloodnation-image {
  width: 200px;
  height: auto;
  border-radius: 5px 5px 0 0;
}

.card-content h3,
.card-content p,
.card-content .details-link {
  margin: 4px ; 
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

.search-container {
  margin-bottom: 20px;
  display: contents;
  margin-top: 200px;
}

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
  margin-right: 0;
}

</style>