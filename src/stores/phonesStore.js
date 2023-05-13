import { defineStore } from 'pinia'

export const usePhonesStore = defineStore('phones', {
  state: () => ({
    phones: [{
      id: '000-000-000',
      brand: 'Apple',
      model: 'iPhone 14 Pro Max',
      price: 1000,
      storage: 256,
      ram: 6,
      color: 'Space Black',
      image: 'iPhone14ProMax_Space-Black.jpg'
    }, {
      id: '000-000-003',
      brand: 'Apple',
      model: 'iPhone 14 Pro',
      price: 750,
      storage: 256,
      ram: 4,
      color: 'Gold',
      image: 'iPhone14Pro_Gold.jpg'
    }, {
      id: '000-000-001',
      brand: 'Samsung',
      model: 'Galaxy S23+',
      price: 900,
      storage: 512,
      ram: 8,
      color: 'Black',
      image: 'SamsungGalaxyS23Plus_Black.jpg'
    }, {
      id: '000-000-002',
      brand: 'Xiaomi',
      model: 'Redmi Note 11',
      price: 250,
      storage: 128,
      ram: 4,
      color: 'Gray',
      image: 'xiaomi.jpg'
    }],
    cart: [],
    compare: []
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
