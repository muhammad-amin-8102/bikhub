<template>
  <div class="flex min-h-screen bg-neutral-50">
    <AdminSidebar />
    
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-neutral-200 px-6 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-neutral-900">Inventory Management</h1>
          <button class="btn-primary">
            <PlusIcon class="w-4 h-4 mr-2" />
            Add New Bike
          </button>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-y-auto">
        <div class="card">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-neutral-900">Bike Inventory</h2>
            <div class="flex space-x-4">
              <input
                type="text"
                placeholder="Search bikes..."
                class="input-field w-64"
              />
              <select class="input-field">
                <option>All Status</option>
                <option>Available</option>
                <option>Sold</option>
                <option>Under Inspection</option>
              </select>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-neutral-200">
              <thead class="bg-neutral-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Bike Details
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-neutral-200">
                <tr v-for="bike in bikes" :key="bike.id" class="hover:bg-neutral-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img :src="bike.images[0]" :alt="`${bike.brand} ${bike.model}`" class="w-12 h-12 rounded-lg object-cover mr-4" />
                      <div>
                        <div class="text-sm font-medium text-neutral-900">{{ bike.brand }} {{ bike.model }}</div>
                        <div class="text-sm text-neutral-500">{{ bike.year }} • {{ bike.kmDriven.toLocaleString() }} km</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    ₹{{ bike.price.toLocaleString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="badge" :class="bike.isAvailable ? 'badge-success' : 'badge-error'">
                      {{ bike.isAvailable ? 'Available' : 'Sold' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {{ bike.location }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button class="text-primary-600 hover:text-primary-900">Edit</button>
                      <button class="text-error-600 hover:text-error-900">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import AdminSidebar from '../../components/AdminSidebar.vue'
import { useBikesStore } from '../../stores/bikes'

const bikesStore = useBikesStore()
const bikes = computed(() => bikesStore.bikes)
</script>