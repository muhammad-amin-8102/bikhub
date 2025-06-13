<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-accent-600/20"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8 animate-fade-in">
            <h1 class="text-4xl lg:text-6xl font-bold leading-tight">
              Find Your Perfect
              <span class="text-gradient bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                Ride
              </span>
            </h1>
            <p class="text-xl text-neutral-300 leading-relaxed">
              Maharashtra's most trusted marketplace for premium used motorcycles and scooters. 
              Quality guaranteed, dreams delivered.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <router-link to="/bikes" class="btn-primary text-lg px-8 py-4">
                Browse Bikes
                <ArrowRightIcon class="w-5 h-5 ml-2" />
              </router-link>
              <router-link to="/test-ride" class="btn-secondary text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
                Book Test Ride
              </router-link>
            </div>
          </div>
          
          <div class="relative animate-slide-up">
            <div class="relative z-10">
              <img
                src="https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Featured Motorcycle"
                class="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div class="absolute -top-4 -right-4 w-full h-full bg-gradient-primary rounded-2xl opacity-20"></div>
          </div>
        </div>
      </div>

      <!-- Floating Stats -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="stat in stats" :key="stat.label" class="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-white">{{ stat.value }}</div>
            <div class="text-sm text-neutral-300">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            Why Choose BikeHub?
          </h2>
          <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
            We're not just selling bikes - we're delivering trust, quality, and exceptional service.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="card text-center group hover:shadow-glow">
            <div class="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <component :is="feature.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-neutral-900 mb-4">{{ feature.title }}</h3>
            <p class="text-neutral-600 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Bikes -->
    <section class="py-20 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-12">
          <div>
            <h2 class="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Featured Bikes
            </h2>
            <p class="text-xl text-neutral-600">
              Hand-picked premium motorcycles and scooters
            </p>
          </div>
          <router-link to="/bikes" class="btn-primary">
            View All Bikes
          </router-link>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BikeCard v-for="bike in featuredBikes" :key="bike.id" :bike="bike" />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-primary text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-6">
          Ready to Find Your Dream Bike?
        </h2>
        <p class="text-xl mb-8 opacity-90">
          Join thousands of satisfied customers who found their perfect ride with us.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/bikes" class="bg-white text-primary-600 hover:bg-neutral-100 px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
            Start Shopping
          </router-link>
          <router-link to="/contact" class="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-lg font-semibold transition-colors duration-200">
            Contact Us
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import {
  ShieldCheckIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
  CurrencyRupeeIcon,
  WrenchScrewdriverIcon,
  DocumentCheckIcon
} from '@heroicons/vue/24/outline'
import BikeCard from '../components/BikeCard.vue'
import { useBikesStore } from '../stores/bikes'

const bikesStore = useBikesStore()

const stats = [
  { value: '500+', label: 'Happy Customers' },
  { value: '200+', label: 'Bikes Available' },
  { value: '15+', label: 'Cities Covered' },
  { value: '98%', label: 'Satisfaction Rate' }
]

const features = [
  {
    title: 'Quality Assured',
    description: 'Every bike undergoes rigorous 100-point inspection to ensure top quality and safety.',
    icon: ShieldCheckIcon
  },
  {
    title: 'Free Delivery',
    description: 'Get your bike delivered to your doorstep at no extra cost across Maharashtra.',
    icon: TruckIcon
  },
  {
    title: '24/7 Support',
    description: 'Our expert team is always ready to help you with any queries or concerns.',
    icon: ChatBubbleLeftRightIcon
  },
  {
    title: 'Easy EMI',
    description: 'Flexible financing options with easy EMI plans starting from just ₹2,000/month.',
    icon: CurrencyRupeeIcon
  },
  {
    title: 'Service Support',
    description: '6-month warranty and comprehensive after-sales service support.',
    icon: WrenchScrewdriverIcon
  },
  {
    title: 'Clear Documentation',
    description: 'Complete paperwork handled by us with transparent pricing and legal compliance.',
    icon: DocumentCheckIcon
  }
]

const featuredBikes = computed(() => bikesStore.bikes.slice(0, 3))
</script>