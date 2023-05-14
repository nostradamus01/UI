import { defineStore } from 'pinia'

export const usePhonesStore = defineStore('phones', {
  state: () => ({
    phoneDetails: {
      name: '',
      phoneDetails: {},
      
    },
    phones: [],
    cart: [],
    compare: [],
    filters: {
      brands: {
        Samsung: false,
        Apple: false,
        Nokia: false,
        Xiaomi: false,
        Realme: false
      },
      price: [0, 2500],
      storage: {
        '32': false,
        '64': false,
        '128': false,
        '256': false,
        '512': false,
        '1024': false
      },
      ram: {
        '2': false,
        '3': false,
        '4': false,
        '6': false,
        '8': false,
        '12': false
      }
    },
    searchQuery: '',
    isPhonesLoading: false
  }),
  getters: {
    cartSize(state) {
      return state.cart.length;
    },
    compareSize(state) {
      return state.compare.length;
    }
  },
  actions: {
    addToCart(id) {
      if (this.cart.includes(id)) {
        this.removeFromCart(id);
      } else {
        this.cart.push(id);
      }
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(el => {
        if (el !== id) {
          return el;
        }
      });
    },
    addToCompare(id) {
      if (this.compare.includes(id)) {
        this.removeFromCompare(id);
      } else if (this.compare.length < 3) {
        this.compare.push(id);
      }
    },
    removeFromCompare(id) {
      this.compare = this.compare.filter(el => {
        if (el !== id) {
          return el;
        }
      });
    }
  }
});
