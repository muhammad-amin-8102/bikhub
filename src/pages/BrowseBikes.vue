<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-neutral-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-neutral-900 mb-2">Browse Bikes</h1>
        <p class="text-neutral-600">Find your perfect ride from our extensive collection</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="lg:w-1/4">
          <div class="card sticky top-24">
            <h3 class="text-lg font-semibold text-neutral-900 mb-6">Filters</h3>
            
            <!-- Search -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-neutral-700 mb-2">Search</label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by brand or model..."
                class="input-field"
              />
            </div>

            <!-- Brand Filter -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-neutral-700 mb-2">Brand</label>
              <select v-model="selectedBrand" class="input-field">
                <option value="">All Brands</option>
                <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
              </select>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Price Range (₹{{ priceRange[0].toLocaleString() }} - ₹{{ priceRange[1].toLocaleString() }})
              </label>
              <div class="space-y-2">
                <input
                  v-model="priceRange[0]"
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  class="w-full"
                />
                <input
                  v-model="priceRange[1]"
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  class="w-full"
                />
              </div>
            </div>

            <!-- Fuel Type -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-neutral-700 mb-2">Fuel Type</label>
              <select v-model="selectedFuelType" class="input-field">
                <option value="">All Types</option>
                <option value="Petrol">Petrol</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <button @click="clearFilters" class="w-full btn-secondary">
              Clear Filters
            </button>
          </div>
        </div>

        <!-- Bikes Grid -->
        <div class="lg:w-3/4">
          <!-- Results Header -->
          <div class="flex justify-between items-center mb-6">
            <p class="text-neutral-600">
              Showing {{ filteredBikes.length }} of {{ totalBikes }} bikes
            </p>
            <select v-model="sortBy" class="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="km-low">KM: Low to High</option>
            </select>
          </div>

          <!-- Bikes Grid -->
          <div v-if="filteredBikes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BikeCard v-for="bike in sortedBikes" :key="bike.id" :bike="bike" />
          </div>

          <!-- No Results -->
          <div v-else class="text-center py-12">
            <div class="w-24 h-24 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MagnifyingGlassIcon class="w-12 h-12 text-neutral-400" />
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-2">No bikes found</h3>
            <p class="text-neutral-600 mb-4">Try adjusting your filters to see more results</p>
            <button @click="clearFilters" class="btn-primary">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import BikeCard from '../components/BikeCard.vue'
import { useBikesStore } from '../stores/bikes'

const bikesStore = useBikesStore()

const searchQuery = computed({
  get: () => bikesStore.searchQuery,
  set: (value) => bikesStore.searchQuery = value
})

const selectedBrand = computed({
  get: () => bikesStore.selectedBrand,
  set: (value) => bikesStore.selectedBrand = value
})

const priceRange = computed({
  get: () => bikesStore.priceRange,
  set: (value) => bikesStore.priceRange = value
})

const selectedFuelType = computed({
  get: () => bikesStore.selectedFuelType,
  set: (value) => bikesStore.selectedFuelType = value
})

const sortBy = ref('price-low')

const brands = computed(() => {
  const uniqueBrands = [...new Set(bikesStore.bikes.map(bike => bike.brand))]
  return uniqueBrands.sort()
})

const filteredBikes = computed(() => bikesStore.filteredBikes)
const totalBikes = computed(() => bikesStore.bikes.length)

const sortedBikes = computed(() => {
  const bikes = [...filteredBikes.value]
  
  switch (sortBy.value) {
    case 'price-low':
      return bikes.sort((a, b) => a.price - b.price)
    case 'price-high':
      return bikes.sort((a, b) => b.price - a.price)
    case 'year-new':
      return bikes.sort((a, b) => b.year - a.year)
    case 'km-low':
      return bikes.sort((a, b) => a.kmDriven - b.kmDriven)
    default:
      return bikes
  }
})

const clearFilters = () => {
  bikesStore.searchQuery = ''
  bikesStore.selectedBrand = ''
  bikesStore.priceRange = [0, 200000]
  bikesStore.selectedFuelType = ''
}
</script>