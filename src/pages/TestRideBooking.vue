<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-neutral-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-neutral-900 mb-2">Book a Test Ride</h1>
        <p class="text-neutral-600">Experience your dream bike before you buy</p>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Form -->
        <div class="card">
          <h2 class="text-xl font-semibold text-neutral-900 mb-6">Test Ride Details</h2>
          
          <form @submit.prevent="submitTestRide" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Select Bike</label>
              <select v-model="testRideForm.bikeId" required class="input-field">
                <option value="">Choose a bike</option>
                <option v-for="bike in availableBikes" :key="bike.id" :value="bike.id">
                  {{ bike.brand }} {{ bike.model }} - ₹{{ bike.price.toLocaleString() }}
                </option>
              </select>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                <input v-model="testRideForm.name" type="text" required class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                <input v-model="testRideForm.phone" type="tel" required class="input-field" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Email</label>
              <input v-model="testRideForm.email" type="email" required class="input-field" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Preferred Date</label>
                <input v-model="testRideForm.date" type="date" required class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Preferred Time</label>
                <select v-model="testRideForm.time" required class="input-field">
                  <option value="">Select time</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Location</label>
              <select v-model="testRideForm.location" required class="input-field">
                <option value="">Select location</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Nashik">Nashik</option>
                <option value="Aurangabad">Aurangabad</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Additional Notes</label>
              <textarea v-model="testRideForm.notes" rows="3" class="input-field" placeholder="Any specific requirements or questions..."></textarea>
            </div>

            <button type="submit" class="w-full btn-primary">
              Book Test Ride
            </button>
          </form>
        </div>

        <!-- Info -->
        <div class="space-y-6">
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">What to Bring</h3>
            <ul class="space-y-2 text-neutral-600">
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-success-500 mr-2" />
                Valid driving license
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-success-500 mr-2" />
                Government ID proof
              </li>
              <li class="flex items-center">
                <CheckIcon class="w-5 h-5 text-success-500 mr-2" />
                Comfortable riding gear
              </li>
            </ul>
          </div>

          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Test Ride Policy</h3>
            <ul class="space-y-2 text-sm text-neutral-600">
              <li>• Test rides are available for customers above 18 years</li>
              <li>• Valid driving license is mandatory</li>
              <li>• Test ride duration: 15-20 minutes</li>
              <li>• Our executive will accompany you</li>
              <li>• Free service available across Maharashtra</li>
            </ul>
          </div>

          <div class="card bg-primary-50 border-primary-200">
            <h3 class="text-lg font-semibold text-primary-900 mb-2">Need Help?</h3>
            <p class="text-primary-700 mb-4">Call us for immediate assistance</p>
            <a href="tel:+919876543210" class="btn-primary">
              <PhoneIcon class="w-4 h-4 mr-2" />
              +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CheckIcon, PhoneIcon } from '@heroicons/vue/24/outline'
import { useBikesStore } from '../stores/bikes'
import { useLeadsStore } from '../stores/leads'

const bikesStore = useBikesStore()
const leadsStore = useLeadsStore()

const testRideForm = ref({
  bikeId: '',
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  location: '',
  notes: ''
})

const availableBikes = computed(() => bikesStore.bikes.filter(bike => bike.isAvailable))

const submitTestRide = () => {
  const selectedBike = availableBikes.value.find(bike => bike.id === testRideForm.value.bikeId)
  
  leadsStore.addLead({
    name: testRideForm.value.name,
    email: testRideForm.value.email,
    phone: testRideForm.value.phone,
    interestedBike: selectedBike ? `${selectedBike.brand} ${selectedBike.model}` : '',
    source: 'Website',
    status: 'New',
    priority: 'High',
    notes: `Test ride booking - Date: ${testRideForm.value.date}, Time: ${testRideForm.value.time}, Location: ${testRideForm.value.location}. Notes: ${testRideForm.value.notes}`,
    budget: selectedBike?.price || 0,
    location: testRideForm.value.location
  })
  
  alert('Test ride booked successfully! We will contact you soon to confirm.')
  
  // Reset form
  testRideForm.value = {
    bikeId: '',
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    location: '',
    notes: ''
  }
}
</script>