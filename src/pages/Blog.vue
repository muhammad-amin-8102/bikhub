<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-neutral-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-neutral-900 mb-2">BikeHub Blog</h1>
        <p class="text-neutral-600">Latest news, tips, and insights from the world of motorcycles</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Featured Post -->
      <div class="card mb-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src="https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Featured post"
              class="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div class="flex flex-col justify-center">
            <span class="badge-info mb-4">Featured</span>
            <h2 class="text-2xl font-bold text-neutral-900 mb-4">
              Top 10 Things to Check Before Buying a Used Motorcycle
            </h2>
            <p class="text-neutral-600 mb-6">
              Buying a used motorcycle can be tricky. Here's our comprehensive guide to help you make the right choice and avoid common pitfalls.
            </p>
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm text-neutral-500">
                <span>By BikeHub Team</span>
                <span class="mx-2">•</span>
                <span>Jan 15, 2024</span>
              </div>
              <button class="btn-primary">Read More</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Blog Posts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article v-for="post in blogPosts" :key="post.id" class="card group cursor-pointer hover:shadow-lg transition-shadow">
          <img
            :src="post.image"
            :alt="post.title"
            class="w-full h-48 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
          />
          <div class="space-y-3">
            <span class="badge" :class="getCategoryClass(post.category)">{{ post.category }}</span>
            <h3 class="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
              {{ post.title }}
            </h3>
            <p class="text-neutral-600 text-sm">{{ post.excerpt }}</p>
            <div class="flex items-center justify-between text-xs text-neutral-500">
              <span>{{ post.author }}</span>
              <span>{{ formatDate(post.date) }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Load More -->
      <div class="text-center mt-12">
        <button class="btn-secondary">Load More Posts</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  date: string
}

const blogPosts = ref<BlogPost[]>([
  {
    id: '1',
    title: 'Best Maintenance Tips for Your Motorcycle',
    excerpt: 'Keep your bike running smoothly with these essential maintenance tips that every rider should know.',
    image: 'https://images.pexels.com/photos/2393827/pexels-photo-2393827.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Maintenance',
    author: 'Rajesh Kumar',
    date: '2024-01-10'
  },
  {
    id: '2',
    title: 'Electric vs Petrol: Which is Right for You?',
    excerpt: 'Compare the pros and cons of electric and petrol motorcycles to make an informed decision.',
    image: 'https://images.pexels.com/photos/2954992/pexels-photo-2954992.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Comparison',
    author: 'Priya Sharma',
    date: '2024-01-08'
  },
  {
    id: '3',
    title: 'Monsoon Riding Safety Tips',
    excerpt: 'Stay safe during the monsoon season with these essential riding tips and precautions.',
    image: 'https://images.pexels.com/photos/2393825/pexels-photo-2393825.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Safety',
    author: 'Amit Patel',
    date: '2024-01-05'
  },
  {
    id: '4',
    title: 'Understanding Bike Insurance in India',
    excerpt: 'Everything you need to know about motorcycle insurance, coverage options, and claims process.',
    image: 'https://images.pexels.com/photos/2393819/pexels-photo-2393819.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Insurance',
    author: 'Neha Singh',
    date: '2024-01-03'
  },
  {
    id: '5',
    title: 'Top 5 Affordable Bikes Under ₹1 Lakh',
    excerpt: 'Discover the best budget-friendly motorcycles that offer great value for money.',
    image: 'https://images.pexels.com/photos/2954988/pexels-photo-2954988.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Reviews',
    author: 'Vikram Joshi',
    date: '2024-01-01'
  },
  {
    id: '6',
    title: 'How to Negotiate When Buying Used Bikes',
    excerpt: 'Master the art of negotiation and get the best deal on your next used motorcycle purchase.',
    image: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Tips',
    author: 'Suresh Reddy',
    date: '2023-12-28'
  }
])

const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    'Maintenance': 'badge-success',
    'Comparison': 'badge-info',
    'Safety': 'badge-warning',
    'Insurance': 'badge-error',
    'Reviews': 'badge-info',
    'Tips': 'badge-success'
  }
  return classes[category] || 'badge-info'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>