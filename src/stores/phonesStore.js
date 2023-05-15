import { defineStore } from 'pinia'

export const usePhonesStore = defineStore('phones', {
  state: () => ({
    phoneDetails: {},
    phones: [],
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    compare: localStorage.getItem('compare') ? JSON.parse(localStorage.getItem('compare')) : [],
    userPhones: localStorage.getItem('userPhones') ? JSON.parse(localStorage.getItem('userPhones')) : [],
    cartPhones: [],
    comparePhones: [],
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
      let cart = localStorage.getItem('cart');
      if (!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
      }
      cart = JSON.parse(localStorage.getItem('cart'));
      if (this.cart.includes(id)) {
        this.removeFromCart(id);
      } else {
        this.cart.push(id);
        cart.push(id);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    },
    removeFromCart(id) {
      let cart = [];
      this.cart = this.cart.filter(el => {
        if (el !== id) {
          cart.push(el);
          return el;
        }
      });
      localStorage.setItem('cart', JSON.stringify(cart));
    },
    addToCompare(id) {
      let compare = localStorage.getItem('compare');
      if (!compare) {
        localStorage.setItem('compare', JSON.stringify([]));
      }
      compare = JSON.parse(localStorage.getItem('compare'));
      if (this.compare.includes(id)) {
        this.removeFromCompare(id);
      } else if (this.compare.length < 3) {
        this.compare.push(id);
        compare.push(id);
        localStorage.setItem('compare', JSON.stringify(compare));
      }
    },
    removeFromCompare(id) {
      let compare = [];
      this.compare = this.compare.filter(el => {
        if (el !== id) {
          compare.push(id);
          return el;
        }
      });
      localStorage.setItem('compare', JSON.stringify(compare));
    },
    emptyCart() {
      this.cart = [];
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }
});
