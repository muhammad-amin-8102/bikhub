<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-neutral-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-neutral-900 mb-2">EMI Calculator</h1>
        <p class="text-neutral-600">Calculate your monthly EMI and plan your bike purchase</p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Calculator -->
        <div class="card">
          <h2 class="text-xl font-semibold text-neutral-900 mb-6">Calculate Your EMI</h2>
          
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Bike Price: ₹{{ bikePrice.toLocaleString() }}
              </label>
              <input
                v-model="bikePrice"
                type="range"
                min="30000"
                max="300000"
                step="5000"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-neutral-500 mt-1">
                <span>₹30,000</span>
                <span>₹3,00,000</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Down Payment: ₹{{ downPayment.toLocaleString() }} ({{ downPaymentPercent }}%)
              </label>
              <input
                v-model="downPayment"
                type="range"
                :min="bikePrice * 0.1"
                :max="bikePrice * 0.5"
                :step="1000"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-neutral-500 mt-1">
                <span>10%</span>
                <span>50%</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Loan Tenure: {{ loanTenure }} months
              </label>
              <input
                v-model="loanTenure"
                type="range"
                min="12"
                max="60"
                step="6"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-neutral-500 mt-1">
                <span>12 months</span>
                <span>60 months</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Interest Rate: {{ interestRate }}% per annum
              </label>
              <input
                v-model="interestRate"
                type="range"
                min="8"
                max="18"
                step="0.5"
                class="w-full"
              />
              <div class="flex justify-between text-xs text-neutral-500 mt-1">
                <span>8%</span>
                <span>18%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Results -->
        <div class="space-y-6">
          <div class="card bg-primary-50 border-primary-200">
            <h3 class="text-lg font-semibold text-primary-900 mb-4">EMI Breakdown</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-primary-700">Monthly EMI</span>
                <span class="text-2xl font-bold text-primary-900">₹{{ monthlyEMI.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-primary-700">Principal Amount</span>
                <span class="font-semibold text-primary-900">₹{{ loanAmount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-primary-700">Total Interest</span>
                <span class="font-semibold text-primary-900">₹{{ totalInterest.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between items-center border-t border-primary-200 pt-2">
                <span class="text-primary-700">Total Amount</span>
                <span class="font-semibold text-primary-900">₹{{ totalAmount.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Payment Summary</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-neutral-600">Bike Price</span>
                <span class="font-medium">₹{{ bikePrice.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Down Payment</span>
                <span class="font-medium">₹{{ downPayment.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Loan Amount</span>
                <span class="font-medium">₹{{ loanAmount.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Loan Tenure</span>
                <span class="font-medium">{{ loanTenure }} months</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Interest Rate</span>
                <span class="font-medium">{{ interestRate }}% p.a.</span>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Apply for Loan</h3>
            <p class="text-neutral-600 mb-4">Get pre-approved loan with competitive interest rates</p>
            <button class="w-full btn-primary">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <!-- Popular Bikes -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-neutral-900 mb-6">Calculate EMI for Popular Bikes</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="bike in popularBikes" :key="bike.id" class="card cursor-pointer hover:shadow-lg transition-shadow" @click="selectBike(bike)">
            <img :src="bike.images[0]" :alt="`${bike.brand} ${bike.model}`" class="w-full h-32 object-cover rounded-lg mb-4" />
            <h3 class="font-semibold text-neutral-900">{{ bike.brand }} {{ bike.model }}</h3>
            <p class="text-primary-600 font-bold">₹{{ bike.price.toLocaleString() }}</p>
            <p class="text-sm text-neutral-500">EMI from ₹{{ Math.round(bike.price * 0.02).toLocaleString() }}/month</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBikesStore } from '../stores/bikes'

const bikesStore = useBikesStore()

const bikePrice = ref(80000)
const downPayment = ref(16000)
const loanTenure = ref(24)
const interestRate = ref(12)

const loanAmount = computed(() => bikePrice.value - downPayment.value)

const downPaymentPercent = computed(() => Math.round((downPayment.value / bikePrice.value) * 100))

const monthlyEMI = computed(() => {
  const principal = loanAmount.value
  const monthlyRate = interestRate.value / 12 / 100
  const tenure = loanTenure.value
  
  if (monthlyRate === 0) return principal / tenure
  
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
              (Math.pow(1 + monthlyRate, tenure) - 1)
  
  return Math.round(emi)
})

const totalAmount = computed(() => monthlyEMI.value * loanTenure.value + downPayment.value)
const totalInterest = computed(() => totalAmount.value - bikePrice.value)

const popularBikes = computed(() => bikesStore.bikes.slice(0, 3))

const selectBike = (bike: any) => {
  bikePrice.value = bike.price
  downPayment.value = Math.round(bike.price * 0.2)
}
</script>