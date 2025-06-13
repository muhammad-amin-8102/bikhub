import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// User-facing pages
import Home from '../pages/Home.vue';
import BrowseBikes from '../pages/BrowseBikes.vue';
import BikeDetails from '../pages/BikeDetails.vue';
import TestRideBooking from '../pages/TestRideBooking.vue';
import EMICalculator from '../pages/EMICalculator.vue';
import Blog from '../pages/Blog.vue';
import Contact from '../pages/Contact.vue';

// Admin pages
import AdminDashboard from '../pages/admin/Dashboard.vue';
import AdminLogin from '../pages/admin/Login.vue';
import InventoryManagement from '../pages/admin/InventoryManagement.vue';
import TaskManagement from '../pages/admin/TaskManagement.vue';
import CRMManagement from '../pages/admin/CRMManagement.vue';
import SalesManagement from '../pages/admin/SalesManagement.vue';
import Analytics from '../pages/admin/Analytics.vue';
import UserManagement from '../pages/admin/UserManagement.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/bikes',
    name: 'BrowseBikes',
    component: BrowseBikes,
  },
  {
    path: '/bike/:id',
    name: 'BikeDetails',
    component: BikeDetails,
  },
  {
    path: '/test-ride',
    name: 'TestRideBooking',
    component: TestRideBooking,
  },
  {
    path: '/emi-calculator',
    name: 'EMICalculator',
    component: EMICalculator,
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  // Admin routes
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/inventory',
    name: 'InventoryManagement',
    component: InventoryManagement,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/tasks',
    name: 'TaskManagement',
    component: TaskManagement,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/crm',
    name: 'CRMManagement',
    component: CRMManagement,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/sales',
    name: 'SalesManagement',
    component: SalesManagement,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/analytics',
    name: 'Analytics',
    component: Analytics,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/users',
    name: 'UserManagement',
    component: UserManagement,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
