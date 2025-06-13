<template>
  <aside class="bg-neutral-900 text-white w-64 min-h-screen flex flex-col">
    <div class="p-6 border-b border-neutral-800">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span class="text-lg font-bold">BikeHub Admin</span>
      </div>
    </div>

    <nav class="flex-1 p-4">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.name">
          <router-link
            :to="item.href"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-200"
            :class="{ 'bg-primary-600 text-white': $route.path === item.href }"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="p-4 border-t border-neutral-800">
      <div class="flex items-center space-x-3 mb-4">
        <img :src="user?.avatar" :alt="user?.name" class="w-10 h-10 rounded-full" />
        <div>
          <p class="font-medium">{{ user?.name }}</p>
          <p class="text-xs text-neutral-400 capitalize">{{ user?.role }}</p>
        </div>
      </div>
      <button @click="logout" class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
        <ArrowRightOnRectangleIcon class="w-4 h-4" />
        <span>Logout</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import {
  HomeIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CurrencyRupeeIcon,
  ChartBarIcon,
  UsersIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Inventory', href: '/admin/inventory', icon: CubeIcon },
  { name: 'Tasks', href: '/admin/tasks', icon: ClipboardDocumentListIcon },
  { name: 'CRM & Leads', href: '/admin/crm', icon: UserGroupIcon },
  { name: 'Sales', href: '/admin/sales', icon: CurrencyRupeeIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'Users', href: '/admin/users', icon: UsersIcon },
]

const logout = () => {
  authStore.logout()
  router.push('/admin/login')
}
</script>