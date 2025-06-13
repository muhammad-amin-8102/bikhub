<template>
  <div class="flex min-h-screen bg-neutral-50">
    <AdminSidebar />
    
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-neutral-200 px-6 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-neutral-900">Sales Management</h1>
          <button class="btn-primary">
            <PlusIcon class="w-4 h-4 mr-2" />
            Record Sale
          </button>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-y-auto">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="card">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600">Today's Sales</p>
                <p class="text-2xl font-bold text-neutral-900">₹2.5L</p>
              </div>
              <div class="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                <CurrencyRupeeIcon class="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600">This Month</p>
                <p class="text-2xl font-bold text-neutral-900">₹45L</p>
              </div>
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <ChartBarIcon class="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600">Bikes Sold</p>
                <p class="text-2xl font-bold text-neutral-900">23</p>
              </div>
              <div class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <CubeIcon class="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600">Pending Payments</p>
                <p class="text-2xl font-bold text-neutral-900">₹8.5L</p>
              </div>
              <div class="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <ClockIcon class="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Sales -->
        <div class="card">
          <h2 class="text-lg font-semibold text-neutral-900 mb-6">Recent Sales</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-neutral-200">
              <thead class="bg-neutral-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Bike
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-neutral-200">
                <tr v-for="sale in recentSales" :key="sale.id" class="hover:bg-neutral-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-neutral-900">{{ sale.customerName }}</div>
                    <div class="text-sm text-neutral-500">{{ sale.customerPhone }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {{ sale.bikeName }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    ₹{{ sale.amount.toLocaleString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="badge" :class="{
                      'badge-success': sale.paymentStatus === 'Paid',
                      'badge-warning': sale.paymentStatus === 'Partial',
                      'badge-error': sale.paymentStatus === 'Pending'
                    }">
                      {{ sale.paymentStatus }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {{ new Date(sale.date).toLocaleDateString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button class="text-primary-600 hover:text-primary-900">View</button>
                      <button class="text-success-600 hover:text-success-900">Invoice</button>
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
import { ref } from 'vue'
import { PlusIcon, CurrencyRupeeIcon, ChartBarIcon, CubeIcon, ClockIcon } from '@heroicons/vue/24/outline'
import AdminSidebar from '../../components/AdminSidebar.vue'

const recentSales = ref([
  {
    id: 1,
    customerName: 'Rajesh Kumar',
    customerPhone: '+91 9876543210',
    bikeName: 'Honda CB Shine',
    amount: 65000,
    paymentStatus: 'Paid',
    date: '2024-01-15'
  },
  {
    id: 2,
    customerName: 'Priya Sharma',
    customerPhone: '+91 9876543211',
    bikeName: 'TVS Jupiter',
    amount: 58000,
    paymentStatus: 'Partial',
    date: '2024-01-14'
  }
])
</script>