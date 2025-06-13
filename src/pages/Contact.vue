<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-neutral-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-neutral-900 mb-2">Contact Us</h1>
        <p class="text-neutral-600">Get in touch with our team for any queries or assistance</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div class="card">
            <h2 class="text-xl font-semibold text-neutral-900 mb-6">Send us a Message</h2>
            
            <form @submit.prevent="submitContact" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-neutral-700 mb-2">First Name</label>
                  <input v-model="contactForm.firstName" type="text" required class="input-field" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
                  <input v-model="contactForm.lastName" type="text" required class="input-field" />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                  <input v-model="contactForm.email" type="email" required class="input-field" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
                  <input v-model="contactForm.phone" type="tel" required class="input-field" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Subject</label>
                <select v-model="contactForm.subject" required class="input-field">
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="bike-inquiry">Bike Inquiry</option>
                  <option value="test-ride">Test Ride</option>
                  <option value="service">Service Support</option>
                  <option value="complaint">Complaint</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Message</label>
                <textarea v-model="contactForm.message" rows="5" required class="input-field" placeholder="Tell us how we can help you..."></textarea>
              </div>

              <button type="submit" class="w-full btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="space-y-6">
          <!-- Contact Details -->
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Get in Touch</h3>
            <div class="space-y-4">
              <div class="flex items-start space-x-3">
                <MapPinIcon class="w-5 h-5 text-primary-600 mt-1" />
                <div>
                  <p class="font-medium text-neutral-900">Address</p>
                  <p class="text-neutral-600 text-sm">123 Bike Street, Mumbai, Maharashtra 400001</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <PhoneIcon class="w-5 h-5 text-primary-600 mt-1" />
                <div>
                  <p class="font-medium text-neutral-900">Phone</p>
                  <p class="text-neutral-600 text-sm">+91 98765 43210</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <EnvelopeIcon class="w-5 h-5 text-primary-600 mt-1" />
                <div>
                  <p class="font-medium text-neutral-900">Email</p>
                  <p class="text-neutral-600 text-sm">info@bikehub.com</p>
                </div>
              </div>
              <div class="flex items-start space-x-3">
                <ClockIcon class="w-5 h-5 text-primary-600 mt-1" />
                <div>
                  <p class="font-medium text-neutral-900">Business Hours</p>
                  <p class="text-neutral-600 text-sm">Mon-Sat: 9:00 AM - 7:00 PM</p>
                  <p class="text-neutral-600 text-sm">Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <router-link to="/test-ride" class="block w-full btn-primary text-center">
                Book Test Ride
              </router-link>
              <router-link to="/bikes" class="block w-full btn-secondary text-center">
                Browse Bikes
              </router-link>
              <a href="tel:+919876543210" class="block w-full btn-accent text-center">
                Call Now
              </a>
            </div>
          </div>

          <!-- FAQ -->
          <div class="card">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Frequently Asked</h3>
            <div class="space-y-3 text-sm">
              <div>
                <p class="font-medium text-neutral-900">Do you provide warranty?</p>
                <p class="text-neutral-600">Yes, we provide 6-month warranty on all bikes.</p>
              </div>
              <div>
                <p class="font-medium text-neutral-900">Can I exchange my old bike?</p>
                <p class="text-neutral-600">Yes, we accept old bikes in exchange with best valuation.</p>
              </div>
              <div>
                <p class="font-medium text-neutral-900">Do you provide financing?</p>
                <p class="text-neutral-600">Yes, we have tie-ups with leading banks for easy EMI options.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/vue/24/outline'
import { useLeadsStore } from '../stores/leads'

const leadsStore = useLeadsStore()

const contactForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitContact = () => {
  leadsStore.addLead({
    name: `${contactForm.value.firstName} ${contactForm.value.lastName}`,
    email: contactForm.value.email,
    phone: contactForm.value.phone,
    interestedBike: '',
    source: 'Website',
    status: 'New',
    priority: 'Medium',
    notes: `Subject: ${contactForm.value.subject}. Message: ${contactForm.value.message}`,
    budget: 0,
    location: 'Online'
  })
  
  alert('Message sent successfully! We will get back to you soon.')
  
  // Reset form
  contactForm.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  }
}
</script>