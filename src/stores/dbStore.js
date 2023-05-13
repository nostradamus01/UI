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
    cities: []
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
    }
  }
});
