import { defineStore } from 'pinia'

export const useDBStore = defineStore('db', {
  state: () => ({
    platforms: [{
      id: "000-000-000",
      chipset: "Apple A16 Bionic (4 nm)",
      cpu: "Hexa-core (2x3.46 GHz Everest + 4x2.02 GHz Sawtooth)",
      gpu: "Apple GPU (5-core graphics)"
    }],
    oses: [{
      id: "000-000-000",
      name: "iOS 16"
    }],
    brands: [{
      id: "000-000-000",
      name: "Apple"
    }],
    phoneDetails: [{
      id: "1",
      brandId: "000-000-000",
      model: "iPhone 14 Pro Max",
      releaseDate: "2022, September 16",
      platformId: "000-000-000",
      height: 160.7,
      width: 77.6,
      depth: 7.9,
      screenSize: 6.7,
      resolution: "1290 x 2796",
      batteryCapacity: 4323,
      price: 1070.99,
      discount: 10
    }, {
      id: "2",
      brandId: "000-000-000",
      model: "iPhone 13 Pro Max",
      releaseDate: "2022, September 16",
      platformId: "000-000-000",
      height: 160.7,
      width: 77.6,
      depth: 7.9,
      screenSize: 6.7,
      resolution: "1290 x 2796",
      batteryCapacity: 4323,
      price: 1070.99,
      discount: 10
    }],
    phones: [{
      id: "000-000-000",
      phoneDetailId: "000-000-000",
      colorId: "000-000-000",
      storageId: "000-000-000",
      ramId: "000-000-000"
    }],
    images: [{
      id: "000-000-000",
      name: "iPhone14ProMax_spaceBlack.png",
      colorId: "000-000-000",
      phoneDetailId: "000-000-000"
    }],
    colors: [{
      id: "1",
      name: "Space Black",
      hex: "#000000",
      phoneDetailId: "1"
    }, {
      id: "2",
      name: "White",
      hex: "#fff",
      phoneDetailId: "1"
    }, {
      id: "3",
      name: "Blue",
      hex: "#00f",
      phoneDetailId: "2"
    }],
    rams: [{
      id: "000-000-000",
      size: 6
    }],
    storages: [{
      id: "000-000-000",
      size: 256
    }],
    users: [{
      id: "000-000-000",
      username: "Username",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email@email.com",
      phoneNum: "+1234567890",
      country: "Armenia",
      city: "Yerevan",
      address: "Kentron 15",
      postCode: "1001"
    }],
    countries: [{
      id: "000-000-000",
      name: "Armenia"
    }],
    cities: [{
      id: "000-000-000",
      name: "Hrazdan",
      countyId: "000-000-000"
    }]
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
