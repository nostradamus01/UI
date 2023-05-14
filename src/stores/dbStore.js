import { defineStore } from 'pinia'

export const useDBStore = defineStore('db', {
  state: () => ({
    platforms: [],
    oses: [],
    brands: [],
    phoneDetails: [],
    phones: [],
    images: [],
    colors: [],
    rams: [],
    storages: [],
    users: [],
    countries: [],
    cities: [],
    orders: [],
    username: localStorage.getItem('username'),
    user: {}
  }),
  getters: {
    //...
  },
  actions: {
    resetAllData() {
      this.platforms = [];
      this.oses = [];
      this.brands = [];
      this.phoneDetails = [];
      this.phones = [];
      this.users = [];
      this.images = [];
      this.colors = [];
      this.rams = [];
      this.storages = [];
      this.countries = [];
      this.cities = [];
      this.orders = [];
      this.username = null;
      this.user = {};
    },
    setUsername(username) {
      this.username = username;
      localStorage.setItem('username', username);
    },
    resetUser() {
      this.username = null;
      localStorage.setItem('username', null);
    }
  }
});
