<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50 border-b border-neutral-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gradient">BikeHub</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.href"
            class="text-neutral-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
            :class="{ 'text-primary-600': $route.path === item.href }"
          >
            {{ item.name }}
          </router-link>
          <button class="btn-primary">
            <PhoneIcon class="w-4 h-4 mr-2" />
            Contact Us
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-neutral-600 hover:text-neutral-900 focus:outline-none focus:text-neutral-900 p-2"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-neutral-200">
      <div class="px-4 py-2 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.href"
          @click="mobileMenuOpen = false"
          class="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200"
        >
          {{ item.name }}
        </router-link>
        <button class="w-full mt-4 btn-primary">
          <PhoneIcon class="w-4 h-4 mr-2" />
          Contact Us
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bars3Icon, XMarkIcon, PhoneIcon } from '@heroicons/vue/24/outline'

const mobileMenuOpen = ref(false)

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Browse Bikes', href: '/bikes' },
  { name: 'Test Ride', href: '/test-ride' },
  { name: 'EMI Calculator', href: '/emi-calculator' },
  { name: 'Blog', href: '/blog' },
]
</script>