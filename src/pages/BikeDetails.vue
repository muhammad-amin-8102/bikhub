<template>
  <div v-if="bike" class="min-h-screen bg-neutral-50">
    <!-- Image Gallery -->
    <div class="bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="space-y-4">
            <div class="relative overflow-hidden rounded-lg">
              <img
                :src="selectedImage"
                :alt="`${bike.brand} ${bike.model}`"
                class="w-full h-96 object-cover"
              />
              <div class="absolute top-4 left-4">
                <span class="badge-success">{{ bike.condition }}</span>
              </div>
            </div>
            <div class="grid grid-cols-4 gap-2">
              <button
                v-for="(image, index) in bike.images"
                :key="index"
                @click="selectedImage = image"
                class="relative overflow-hidden rounded-lg border-2 transition-colors duration-200"
                :class="selectedImage === image ? 'border-primary-500' : 'border-neutral-200 hover:border-neutral-300'"
              >
                <img :src="image" :alt="`${bike.brand} ${bike.model} ${index + 1}`" class="w-full h-20 object-cover" />
              </button>
            </div>
          </div>

          <div class="space-y-6">
            <div>
              <div class="flex items-start justify-between mb-2">
                <h1 class="text-3xl font-bold text-neutral-900">{{ bike.brand }} {{ bike.model }}</h1>
                <HeartIcon class="w-6 h-6 text-neutral-400 hover:text-red-500 cursor-pointer transition-colors" />
              </div>
              <p class="text-neutral-600">{{ bike.year }} • {{ bike.engine }} • {{ bike.fuelType }}</p>
              <div class="flex items-center mt-2 text-sm text-neutral-500">
                <MapPinIcon class="w-4 h-4 mr-1" />
                {{ bike.location }}
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <span v-for="tag in bike.tags" :key="tag" class="badge-info">{{ tag }}</span>
            </div>

            <div class="bg-primary-50 rounded-lg p-6">
              <div class="text-3xl font-bold text-primary-600 mb-2">₹{{ bike.price.toLocaleString() }}</div>
              <p class="text-sm text-neutral-600">EMI starts from ₹{{ Math.round(bike.price * 0.02).toLocaleString() }}/month</p>
            </div>

            <div class="grid grid-cols-2 gap-4 text-sm">
              <div class="bg-white rounded-lg p-4 border border-neutral-200">
                <div class="text-neutral-500">Year</div>
                <div class="font-semibold">{{ bike.year }}</div>
              </div>
              <div class="bg-white rounded-lg p-4 border border-neutral-200">
                <div class="text-neutral-500">KM Driven</div>
                <div class="font-semibold">{{ bike.kmDriven.toLocaleString() }} km</div>
              </div>
              <div class="bg-white rounded-lg p-4 border border-neutral-200">
                <div class="text-neutral-500">Engine</div>
                <div class="font-semibold">{{ bike.engine }}</div>
              </div>
              <div class="bg-white rounded-lg p-4 border border-neutral-200">
                <div class="text-neutral-500">Fuel Type</div>
                <div class="font-semibold">{{ bike.fuelType }}</div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <button @click="showInquiryForm = true" class="btn-primary flex-1">
                <ChatBubbleLeftIcon class="w-5 h-5 mr-2" />
                Send Inquiry
              </button>
              <router-link to="/test-ride" class="btn-secondary flex-1 text-center">
                <TruckIcon class="w-5 h-5 mr-2" />
                Book Test Ride
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Details Tabs -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-sm border border-neutral-200">
        <div class="border-b border-neutral-200">
          <nav class="flex space-x-8 px-6" aria-label="Tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
              :class="activeTab === tab.id 
                ? 'border-primary-500 text-primary-600' 
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <div class="p-6">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-neutral-900 mb-3">Description</h3>
              <p class="text-neutral-600 leading-relaxed">{{ bike.description }}</p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-neutral-900 mb-3">Key Features</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div v-for="feature in bike.features" :key="feature" class="flex items-center">
                  <CheckIcon class="w-5 h-5 text-success-500 mr-2" />
                  <span class="text-neutral-700">{{ feature }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Service History Tab -->
          <div v-if="activeTab === 'service'" class="space-y-4">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Service History</h3>
            <div v-for="service in bike.serviceHistory" :key="service.date" class="border border-neutral-200 rounded-lg p-4">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <div class="font-medium text-neutral-900">{{ service.type }}</div>
                  <div class="text-sm text-neutral-500">{{ new Date(service.date).toLocaleDateString() }}</div>
                </div>
                <div class="text-right">
                  <div class="font-semibold text-neutral-900">₹{{ service.cost.toLocaleString() }}</div>
                </div>
              </div>
              <p class="text-sm text-neutral-600">{{ service.description }}</p>
            </div>
          </div>

          <!-- Documents Tab -->
          <div v-if="activeTab === 'documents'" class="space-y-4">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Documents</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="doc in bike.documents" :key="doc.type" class="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                <div class="flex items-center">
                  <DocumentIcon class="w-5 h-5 text-neutral-400 mr-3" />
                  <span class="font-medium text-neutral-900">{{ doc.type }}</span>
                </div>
                <span v-if="doc.verified" class="badge-success">Verified</span>
                <span v-else class="badge-warning">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Inquiry Modal -->
    <div v-if="showInquiryForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-neutral-900">Send Inquiry</h3>
          <button @click="showInquiryForm = false" class="text-neutral-400 hover:text-neutral-600">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        
        <form @submit.prevent="submitInquiry" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1">Name</label>
            <input v-model="inquiryForm.name" type="text" required class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input v-model="inquiryForm.email" type="email" required class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1">Phone</label>
            <input v-model="inquiryForm.phone" type="tel" required class="input-field" />
          </div>
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1">Message</label>
            <textarea v-model="inquiryForm.message" rows="4" class="input-field" placeholder="I'm interested in this bike..."></textarea>
          </div>
          <button type="submit" class="w-full btn-primary">Send Inquiry</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  HeartIcon,
  MapPinIcon,
  ChatBubbleLeftIcon,
  TruckIcon,
  CheckIcon,
  DocumentIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import { useBikesStore } from '../stores/bikes'
import { useLeadsStore } from '../stores/leads'

const route = useRoute()
const bikesStore = useBikesStore()
const leadsStore = useLeadsStore()

const bike = computed(() => bikesStore.getBikeById(route.params.id as string))
const selectedImage = ref('')
const activeTab = ref('overview')
const showInquiryForm = ref(false)

const inquiryForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const tabs = [
  { id: 'overview', name: 'Overview' },
  { id: 'service', name: 'Service History' },
  { id: 'documents', name: 'Documents' }
]

const submitInquiry = () => {
  leadsStore.addLead({
    name: inquiryForm.value.name,
    email: inquiryForm.value.email,
    phone: inquiryForm.value.phone,
    interestedBike: `${bike.value?.brand} ${bike.value?.model}`,
    source: 'Website',
    status: 'New',
    priority: 'Medium',
    notes: inquiryForm.value.message,
    budget: bike.value?.price || 0,
    location: 'Online'
  })
  
  showInquiryForm.value = false
  alert('Inquiry sent successfully! We will contact you soon.')
  
  // Reset form
  inquiryForm.value = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
}

onMounted(() => {
  if (bike.value) {
    selectedImage.value = bike.value.images[0]
  }
})
</script>