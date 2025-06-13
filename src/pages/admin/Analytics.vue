<template>
  <div class="flex min-h-screen bg-neutral-50">
    <AdminSidebar />

    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-neutral-200 px-6 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-neutral-900">
            Analytics Dashboard
          </h1>
          <div class="flex space-x-4">
            <select class="input-field">
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
            <button class="btn-secondary">Export Report</button>
          </div>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-y-auto">
        <!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="card">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600">
                  Total Revenue
                </p>
                <p class="text-2xl font-bold text-neutral-900">₹125.5L</p>
                <p class="text-sm text-success-600">+15% from last month</p>
              </div>
              <div
                class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center"
              >
                <CurrencyRupeeIcon class="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600">Bikes Sold</p>
                <p class="text-2xl font-bold text-neutral-900">67</p>
                <p class="text-sm text-success-600">+8% from last month</p>
              </div>
              <div
                class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center"
              >
                <CubeIcon class="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600">
                  Lead Conversion
                </p>
                <p class="text-2xl font-bold text-neutral-900">24%</p>
                <p class="text-sm text-error-600">-2% from last month</p>
              </div>
              <div
                class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center"
              >
                <ChartBarIcon class="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600">
                  Avg. Sale Value
                </p>
                <p class="text-2xl font-bold text-neutral-900">₹87K</p>
                <p class="text-sm text-success-600">+5% from last month</p>
              </div>
              <div
                class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center"
              >
                <ArrowTrendingUpIcon class="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Sales Chart -->
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">
              Sales Trend
            </h3>
            <div
              class="h-64 flex items-center justify-center bg-neutral-50 rounded-lg"
            >
              <p class="text-neutral-500">Sales chart will be displayed here</p>
            </div>
          </div>

          <!-- Top Selling Bikes -->
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">
              Top Selling Bikes
            </h3>
            <div class="space-y-4">
              <div
                v-for="bike in topSellingBikes"
                :key="bike.name"
                class="flex items-center justify-between"
              >
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3"
                  >
                    <span class="text-primary-600 font-semibold">{{
                      bike.rank
                    }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-neutral-900">{{ bike.name }}</p>
                    <p class="text-sm text-neutral-500">
                      {{ bike.sold }} units sold
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-neutral-900">
                    ₹{{ bike.revenue.toLocaleString() }}
                  </p>
                  <p class="text-sm text-neutral-500">Revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  CurrencyRupeeIcon,
  CubeIcon,
  ChartBarIcon,
} from '@heroicons/vue/24/outline';
import { ArrowTrendingUpIcon } from '@heroicons/vue/24/solid';
import AdminSidebar from '../../components/AdminSidebar.vue';

const topSellingBikes = ref([
  { rank: 1, name: 'Honda CB Shine', sold: 15, revenue: 975000 },
  { rank: 2, name: 'TVS Jupiter', sold: 12, revenue: 696000 },
  { rank: 3, name: 'Bajaj Pulsar NS200', sold: 8, revenue: 760000 },
  { rank: 4, name: 'Hero Splendor Plus', sold: 10, revenue: 550000 },
  { rank: 5, name: 'Yamaha FZ-S', sold: 6, revenue: 480000 },
]);
</script>
