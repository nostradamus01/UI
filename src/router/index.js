import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainView,
      children: [{
        path: '',
        name: 'home',
        component: () => import('@/components/Main.vue')
      }, {
        path: 'details/:id',
        name: 'details',
        component: () => import('@/components/Details.vue')
      }, {
        path: 'cart',
        name: 'cart',
        component: () => import('@/components/Cart.vue')
      }, {
        path: 'compare',
        name: 'compare',
        component: () => import('@/components/Compare.vue')
      }, {
        path: 'user',
        name: 'user',
        component: () => import('@/components/User.vue')
      }, {
        path: '/:pathMatch(.*)*',
        redirect: '/'
      }]
    }, {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }, {
      path: '/admin',
      component: () => import('@/views/AdminView.vue'),
      children: [{
        path: '',
        name: 'admin',
        redirect: { name: 'phoneDetails' },
      }, {
        path: 'phoneDetails',
        name: 'phoneDetails',
        component: () => import('@/admin/tables/PhoneDetailsTable.vue')
      }, {
        path: 'brands',
        name: 'brands',
        component: () => import('@/admin/tables/BrandsTable.vue')
      }, {
        path: 'platforms',
        name: 'platforms',
        component: () => import('@/admin/tables/PlatformsTable.vue')
      }, {
        path: 'oses',
        name: 'oses',
        component: () => import('@/admin/tables/OsesTable.vue')
      }, {
        path: 'phones',
        name: 'phones',
        component: () => import('@/admin/tables/PhonesTable.vue')
      }, {
        path: 'storages',
        name: 'storages',
        component: () => import('@/admin/tables/StoragesTable.vue')
      }, {
        path: 'rams',
        name: 'rams',
        component: () => import('@/admin/tables/RAMsTable.vue')
      }, {
        path: 'colors',
        name: 'colors',
        component: () => import('@/admin/tables/ColorsTable.vue')
      }, {
        path: 'images',
        name: 'images',
        component: () => import('@/admin/tables/ImagesTable.vue')
      }, {
        path: 'users',
        name: 'users',
        component: () => import('@/admin/tables/UsersTable.vue')
      }, {
        path: 'countries',
        name: 'countries',
        component: () => import('@/admin/tables/CountriesTable.vue')
      }, {
        path: 'cities',
        name: 'cities',
        component: () => import('@/admin/tables/CitiesTable.vue')
      }]
    },
  ]
})

export default router
