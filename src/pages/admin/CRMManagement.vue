<template>
  <div class="flex min-h-screen bg-neutral-50">
    <AdminSidebar />
    
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-neutral-200 px-6 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-neutral-900">CRM & Lead Management</h1>
          <button class="btn-primary">
            <PlusIcon class="w-4 h-4 mr-2" />
            Add Lead
          </button>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-y-auto">
        <div class="card">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-neutral-900">All Leads</h2>
            <div class="flex space-x-4">
              <select class="input-field">
                <option>All Status</option>
                <option>New</option>
                <option>Contacted</option>
                <option>Qualified</option>
                <option>Converted</option>
              </select>
            </div>
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
                    Priority
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-neutral-200">
                <tr v-for="lead in leads" :key="lead.id" class="hover:bg-neutral-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-neutral-900">{{ lead.name }}</div>
                      <div class="text-sm text-neutral-500">{{ lead.phone }}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {{ lead.interestedBike || 'Not specified' }}
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
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="badge" :class="{
                      'badge-error': lead.priority === 'High',
                      'badge-warning': lead.priority === 'Medium',
                      'badge-info': lead.priority === 'Low'
                    }">
                      {{ lead.priority }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {{ lead.source }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button class="text-primary-600 hover:text-primary-900">View</button>
                      <button class="text-success-600 hover:text-success-900">Call</button>
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
import { useLeadsStore } from '../../stores/leads'

const leadsStore = useLeadsStore()
const leads = computed(() => leadsStore.leads)
</script>