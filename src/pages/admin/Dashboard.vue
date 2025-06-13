<template>
  <div class="flex min-h-screen bg-neutral-50">
    <AdminSidebar />
    
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-neutral-200 px-6 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <div class="text-sm text-neutral-500">
            {{ new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
          </div>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-y-auto">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div v-for="stat in stats" :key="stat.title" class="card">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-neutral-600">{{ stat.title }}</p>
                <p class="text-3xl font-bold text-neutral-900">{{ stat.value }}</p>
                <p class="text-sm" :class="stat.change > 0 ? 'text-success-600' : 'text-error-600'">
                  {{ stat.change > 0 ? '+' : '' }}{{ stat.change }}% from last month
                </p>
              </div>
              <div class="w-12 h-12 rounded-lg flex items-center justify-center" :class="stat.bgColor">
                <component :is="stat.icon" class="w-6 h-6" :class="stat.iconColor" />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Recent Sales Chart -->
          <div class="lg:col-span-2 card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Sales Overview</h3>
            <div class="h-64 flex items-center justify-center bg-neutral-50 rounded-lg">
              <p class="text-neutral-500">Sales chart will be displayed here</p>
            </div>
          </div>

          <!-- Recent Activities -->
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Recent Activities</h3>
            <div class="space-y-4">
              <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-3">
                <div class="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-neutral-900">{{ activity.title }}</p>
                  <p class="text-xs text-neutral-500">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Leads -->
        <div class="mt-8 card">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-neutral-900">Recent Leads</h3>
            <router-link to="/admin/crm" class="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </router-link>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-neutral-200">
              <thead class="bg-neutral-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Interested Bike
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-neutral-200">
                <tr v-for="lead in recentLeads" :key="lead.id" class="hover:bg-neutral-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-neutral-900">{{ lead.name }}</div>
                      <div class="text-sm text-neutral-500">{{ lead.phone }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {{ lead.interestedBike }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="badge" :class="{
                      'badge-info': lead.status === 'New',
                      'badge-warning': lead.status === 'Contacted',
                      'badge-success': lead.status === 'Converted'
                    }">
                      {{ lead.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {{ lead.source }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {{ new Date(lead.createdAt).toLocaleDateString() }}
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
import {
  CubeIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  ClipboardDocumentListIcon
} from '@heroicons/vue/24/outline'
import AdminSidebar from '../../components/AdminSidebar.vue'
import { useBikesStore } from '../../stores/bikes'
import { useLeadsStore } from '../../stores/leads'

const bikesStore = useBikesStore()
const leadsStore = useLeadsStore()

const stats = [
  {
    title: 'Total Inventory',
    value: bikesStore.bikes.length.toString(),
    change: 12,
    icon: CubeIcon,
    bgColor: 'bg-primary-100',
    iconColor: 'text-primary-600'
  },
  {
    title: 'Active Leads',
    value: leadsStore.leads.filter(l => ['New', 'Contacted'].includes(l.status)).length.toString(),
    change: 8,
    icon: UserGroupIcon,
    bgColor: 'bg-success-100',
    iconColor: 'text-success-600'
  },
  {
    title: 'Monthly Sales',
    value: '₹12.5L',
    change: 15,
    icon: CurrencyRupeeIcon,
    bgColor: 'bg-accent-100',
    iconColor: 'text-accent-600'
  },
  {
    title: 'Pending Tasks',
    value: '23',
    change: -5,
    icon: ClipboardDocumentListIcon,
    bgColor: 'bg-warning-100',
    iconColor: 'text-warning-600'
  }
]

const recentActivities = [
  { id: 1, title: 'New lead from website inquiry', time: '2 minutes ago' },
  { id: 2, title: 'Bike inspection completed for Honda CB Shine', time: '15 minutes ago' },
  { id: 3, title: 'Test ride booked for TVS Jupiter', time: '1 hour ago' },
  { id: 4, title: 'Payment received for Bajaj Pulsar', time: '2 hours ago' },
  { id: 5, title: 'New bike added to inventory', time: '3 hours ago' }
]

const recentLeads = computed(() => leadsStore.leads.slice(0, 5))
</script>