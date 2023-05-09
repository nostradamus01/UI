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
        component: () => import('@/components/ui/Main.vue')
      }, {
        path: 'details/:id',
        name: 'details',
        component: () => import('@/components/ui/Details.vue')
      }, {
        path: 'cart',
        name: 'cart',
        component: () => import('@/components/ui/Cart.vue')
      }, {
        path: 'compare',
        name: 'compare',
        component: () => import('@/components/ui/Compare.vue')
      }, {
        path: 'user',
        name: 'user',
        component: () => import('@/components/ui/User.vue')
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
        redirect: { name: 'phoneDetails' },
      }, {
        path: 'phoneDetails',
        name: 'phoneDetails',
        component: () => import('@/components/tables/PhoneDetailsTable.vue')
      }, {
        path: 'brands',
        name: 'brands',
        component: () => import('@/components/tables/BrandsTable.vue')
      }, {
        path: 'platforms',
        name: 'platforms',
        component: () => import('@/components/tables/PlatformsTable.vue')
      }, {
        path: 'oses',
        name: 'oses',
        component: () => import('@/components/tables/OsesTable.vue')
      }, {
        path: 'phones',
        name: 'phones',
        component: () => import('@/components/tables/PhonesTable.vue')
      }, {
        path: 'storages',
        name: 'storages',
        component: () => import('@/components/tables/StoragesTable.vue')
      }, {
        path: 'rams',
        name: 'rams',
        component: () => import('@/components/tables/RAMsTable.vue')
      }, {
        path: 'colors',
        name: 'colors',
        component: () => import('@/components/tables/ColorsTable.vue')
      }, {
        path: 'images',
        name: 'images',
        component: () => import('@/components/tables/ImagesTable.vue')
      }, {
        path: 'users',
        name: 'users',
        component: () => import('@/components/tables/UsersTable.vue')
      }, {
        path: 'countries',
        name: 'countries',
        component: () => import('@/components/tables/CountriesTable.vue')
      }, {
        path: 'cities',
        name: 'cities',
        component: () => import('@/components/tables/CitiesTable.vue')
      }]
    },
  ]
})

export default router
