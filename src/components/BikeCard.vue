<template>
  <div class="card group cursor-pointer transform hover:scale-105 transition-all duration-300" @click="$router.push(`/bike/${bike.id}`)">
    <div class="relative overflow-hidden rounded-lg mb-4">
      <img
        :src="bike.images[0]"
        :alt="`${bike.brand} ${bike.model}`"
        class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div class="absolute top-4 left-4">
        <span class="badge-success">{{ bike.condition }}</span>
      </div>
      <div class="absolute top-4 right-4">
        <HeartIcon class="w-6 h-6 text-white hover:text-red-500 transition-colors cursor-pointer" />
      </div>
      <div v-if="bike.tags.length > 0" class="absolute bottom-4 left-4">
        <span v-for="tag in bike.tags.slice(0, 1)" :key="tag" class="badge bg-primary-600 text-white text-xs">
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="space-y-3">
      <div>
        <h3 class="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
          {{ bike.brand }} {{ bike.model }}
        </h3>
        <p class="text-sm text-neutral-600">{{ bike.year }} • {{ bike.engine }} • {{ bike.fuelType }}</p>
      </div>

      <div class="flex items-center justify-between text-sm text-neutral-600">
        <span class="flex items-center">
          <MapPinIcon class="w-4 h-4 mr-1" />
          {{ bike.location }}
        </span>
        <span>{{ bike.kmDriven.toLocaleString() }} km</span>
      </div>

      <div class="flex items-center justify-between">
        <div>
          <span class="text-2xl font-bold text-primary-600">₹{{ bike.price.toLocaleString() }}</span>
          <p class="text-xs text-neutral-500">EMI from ₹{{ Math.round(bike.price * 0.02).toLocaleString() }}/month</p>
        </div>
        <button class="btn-primary px-4 py-2 text-sm">
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeartIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import type { Bike } from '../stores/bikes'

defineProps<{
  bike: Bike
}>()
</script>