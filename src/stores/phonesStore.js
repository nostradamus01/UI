import { defineStore } from 'pinia'

export const usePhonesStore = defineStore('phones', {
  state: () => ({
    phones: [],
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
