<template>
  <div id="app">
    <div v-if="!isAdminRoute">
      <Navbar />
      <router-view />
      <Footer />
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})
</script>