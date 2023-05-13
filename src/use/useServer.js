import { useDBStore } from '@/stores/dbStore'
import { v4 as uuidv4 } from 'uuid';

const apiUrl = 'http://localhost:5169/api/';

const TABLES = {
  Brands: 'Brands',
  Platforms: 'Platforms',
  OSes: 'OSes',
  PhoneDetails: 'PhoneDetails',
  Colors: 'Colors',
  Storages: 'Storages',
  RAMs: 'RAMs',
  Images: 'Images',
  Phones: 'Phones',
  Countries: 'Countries',
  Cities: 'Cities',
  Users: 'Users',
  Carts: 'Carts',
  Orders: 'Orders'
}

export function useServer() {
  const setDB = (data) => {
    localStorage.setItem('dbStore', JSON.stringify(data));
  }

  const getDB = () => {
    return JSON.parse(localStorage.getItem('dbStore'));
  }

  const getUuid = () => {
    return uuidv4();
  }

  const fakeTimeout = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 50);
    })
  }

  const toInt = (value) => {
    const newValue = parseInt(value);
    if (isNaN(newValue)) {
      return 0;
    }
    return newValue;
  }

  const toReal = (value) => {
    const newValue = parseFloat(value);
    if (isNaN(newValue)) {
      return 0;
    }
    return newValue;
  }

  const req = {
    get: async (url) => {
      return await fetch(apiUrl + url);
    },

    post: async (url, data) => {
      try {
        return await fetch(apiUrl + url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
      } catch {
        return {
          status: 401
        }
      }
    },

    put: async (url, data) => {
      return await fetch(apiUrl + url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    },

    delete: async (url, id) => {
      return await fetch(apiUrl + url + '/' + id, {
        method: 'DELETE'
      });
    }
  }

  const initialize = () => {
    for (const tableName of Object.values(TABLES)) {
      const item = localStorage.getItem(tableName);
      if (!item) {
        localStorage.setItem(tableName, JSON.stringify("[]"));
      }
    }
  }

  const dbStore = useDBStore();

  return {
    req,
    dbStore,
    setDB,
    getDB,
    getUuid,
    fakeTimeout,
    toReal,
    toInt,
    initialize
  }
}