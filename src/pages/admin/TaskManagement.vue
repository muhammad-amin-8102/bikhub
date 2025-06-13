<template>
  <div class="flex min-h-screen bg-neutral-50">
    <AdminSidebar />
    
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-neutral-200 px-6 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-neutral-900">Task Management</h1>
          <button class="btn-primary">
            <PlusIcon class="w-4 h-4 mr-2" />
            Create Task
          </button>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Pending Tasks -->
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Pending</h3>
            <div class="space-y-3">
              <div v-for="task in pendingTasks" :key="task.id" class="p-3 bg-warning-50 border border-warning-200 rounded-lg">
                <h4 class="font-medium text-neutral-900">{{ task.title }}</h4>
                <p class="text-sm text-neutral-600">{{ task.description }}</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs text-neutral-500">{{ task.assignee }}</span>
                  <span class="badge-warning">{{ task.priority }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- In Progress Tasks -->
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">In Progress</h3>
            <div class="space-y-3">
              <div v-for="task in inProgressTasks" :key="task.id" class="p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <h4 class="font-medium text-neutral-900">{{ task.title }}</h4>
                <p class="text-sm text-neutral-600">{{ task.description }}</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs text-neutral-500">{{ task.assignee }}</span>
                  <span class="badge-info">{{ task.priority }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Completed Tasks -->
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Completed</h3>
            <div class="space-y-3">
              <div v-for="task in completedTasks" :key="task.id" class="p-3 bg-success-50 border border-success-200 rounded-lg">
                <h4 class="font-medium text-neutral-900">{{ task.title }}</h4>
                <p class="text-sm text-neutral-600">{{ task.description }}</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs text-neutral-500">{{ task.assignee }}</span>
                  <span class="badge-success">{{ task.priority }}</span>
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
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import AdminSidebar from '../../components/AdminSidebar.vue'

const pendingTasks = ref([
  { id: 1, title: 'Bike Inspection', description: 'Inspect Honda CB Shine', assignee: 'John Doe', priority: 'High' },
  { id: 2, title: 'Customer Follow-up', description: 'Call customer about test ride', assignee: 'Jane Smith', priority: 'Medium' }
])

const inProgressTasks = ref([
  { id: 3, title: 'Document Verification', description: 'Verify RC and insurance', assignee: 'Mike Johnson', priority: 'High' }
])

const completedTasks = ref([
  { id: 4, title: 'Bike Delivery', description: 'Delivered TVS Jupiter to customer', assignee: 'Sarah Wilson', priority: 'Medium' }
])
</script>