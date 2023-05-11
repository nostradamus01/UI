import { defineStore } from 'pinia'

export const usePhonesStore = defineStore('phones', {
  state: () => ({
    phones: [{
      id: '000-000-000',
      brand: 'Apple',
      model: 'iPhone 14 Pro Max',
      price: 1200,
      storage: 256,
      ram: 6,
      color: 'Space black',
      image: 'Picture1_7f77d8d2-70eb-4ad9-b92c-032bc71858ef.png'
    }, {
      id: '000-000-001',
      brand: 'Apple',
      model: 'iPhone 14 Pro Max',
      price: 1200,
      storage: 256,
      ram: 6,
      color: 'Space black',
      image: 'Picture3_d7528b94-2924-40ac-8b18-81f05e437752.png'
    }, {
      id: '000-000-002',
      brand: 'Apple',
      model: 'iPhone 13 Pro Max',
      price: 1200,
      storage: 256,
      ram: 4,
      color: 'Space black',
      image: 'Picture2_05d23132-1ad5-41c3-b4ff-54983e379e63.png'
    }, {
      id: '000-000-003',
      brand: 'Apple',
      model: 'iPhone 13 Pro Max',
      price: 1200,
      storage: 256,
      ram: 4,
      color: 'Space black',
      image: 'Picture2_05d23132-1ad5-41c3-b4ff-54983e379e63.png'
    }],
    cart: ['000-000-001'],
    compare: ['000-000-002']
  }),
  getters: {
    //...
  },
  actions: {
    addToCart(id) {
      if (this.isInCart(id)) {
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
    isInCart(id) {
      return this.cart.includes(id);
    },
    addToCompare(id) {
      if (this.isInCompare(id)) {
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
    },
    isInCompare(id) {
      return this.compare.includes(id);
    }
  }
});
