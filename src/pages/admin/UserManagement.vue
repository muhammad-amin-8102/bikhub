<template>
  <div class="flex min-h-screen bg-neutral-50">
    <AdminSidebar />
    
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-neutral-200 px-6 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-neutral-900">User Management</h1>
          <button class="btn-primary">
            <PlusIcon class="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-y-auto">
        <div class="card">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold text-neutral-900">Team Members</h2>
            <div class="flex space-x-4">
              <input
                type="text"
                placeholder="Search users..."
                class="input-field w-64"
              />
              <select class="input-field">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Sales</option>
                <option>Service</option>
                <option>Inventory</option>
              </select>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-neutral-200">
              <thead class="bg-neutral-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    User
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-neutral-200">
                <tr v-for="user in users" :key="user.id" class="hover:bg-neutral-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <img :src="user.avatar" :alt="user.name" class="w-10 h-10 rounded-full mr-4" />
                      <div>
                        <div class="text-sm font-medium text-neutral-900">{{ user.name }}</div>
                        <div class="text-sm text-neutral-500">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="badge" :class="getRoleClass(user.role)">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="badge" :class="user.isActive ? 'badge-success' : 'badge-error'">
                      {{ user.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                    {{ user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never' }}
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
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import AdminSidebar from '../../components/AdminSidebar.vue'

const users = ref([
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@bikehub.com',
    role: 'admin',
    isActive: true,
    lastLogin: '2024-01-15T10:30:00Z',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: 2,
    name: 'Sales Manager',
    email: 'sales@bikehub.com',
    role: 'sales',
    isActive: true,
    lastLogin: '2024-01-14T16:45:00Z',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  },
  {
    id: 3,
    name: 'Service Executive',
    email: 'service@bikehub.com',
    role: 'service',
    isActive: false,
    lastLogin: '2024-01-10T09:20:00Z',
    avatar: 'https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
  }
])

const getRoleClass = (role: string) => {
  const classes: Record<string, string> = {
    'admin': 'badge-error',
    'sales': 'badge-success',
    'service': 'badge-info',
    'inventory': 'badge-warning',
    'support': 'badge-info'
  }
  return classes[role] || 'badge-info'
}
</script>