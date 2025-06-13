<template>
  <div class="min-h-screen bg-gradient-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <h2 class="text-3xl font-bold text-white">BikeHub Admin</h2>
        <p class="mt-2 text-primary-100">Sign in to your admin account</p>
      </div>

      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div v-if="error" class="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg">
            {{ error }}
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-neutral-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="loginForm.email"
              type="email"
              required
              class="input-field"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-neutral-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="loginForm.password"
              type="password"
              required
              class="input-field"
              placeholder="Enter your password"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-neutral-700">
                Remember me
              </label>
            </div>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-500">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary py-3"
            :class="{ 'opacity-50 cursor-not-allowed': loading }"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </form>

        <div class="mt-6 p-4 bg-neutral-50 rounded-lg">
          <p class="text-sm text-neutral-600 mb-2">Demo Credentials:</p>
          <p class="text-xs text-neutral-500">Email: admin@bikemarketplace.com</p>
          <p class="text-xs text-neutral-500">Password: admin123</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loginForm = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const success = await authStore.login(loginForm.value.email, loginForm.value.password)
    
    if (success) {
      router.push('/admin')
    } else {
      error.value = 'Invalid email or password'
    }
  } catch (err) {
    error.value = 'An error occurred during login'
  } finally {
    loading.value = false
  }
}
</script>