import { useDBStore } from '@/stores/dbStore'
import { v4 as uuidv4 } from 'uuid'
import { useMessage } from 'naive-ui'

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

const message = useMessage();

export function useServer() {
  const showError = (msg) => {
    message.error(msg, {
      closable: true
    });
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

  const getTable = (table) => {
    return JSON.parse(localStorage.getItem(table));
  }

  const setTable = (table, data) => {
    localStorage.setItem(table, JSON.stringify(data));
  }

  const getUuid = () => {
    return uuidv4();
  }

  const artificialTimeout = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 100);
    })
  }

  const server = {
    get: async (table, id) => {
      return new Promise(async (resolve) => {
        let data = getTable(table);
        if (id) {
          data = data.find(el => el.id === id);
        }
        await artificialTimeout();
        resolve(data);
      })
    },

    post: async (table, data) => {
      return new Promise(async (resolve) => {
        const uuid = getUuid();
        let tableData = getTable(table);
        data.id = uuid;
        tableData.push(data);
        setTable(table, tableData);
        await artificialTimeout();
        resolve(true);
      })
    },

    put: async (table, data) => {
      return new Promise(async (resolve, reject) => {
        const id = data.id;
        if (!id) {
          showError("Bad request");
          reject();
        }
        let tableData = getTable(table);
        const record = tableData.find(el => el.id === id);
        if (!record) {
          showError("Can't find the record to update");
          reject();
        }
        for (const key of Object.keys(record)) {
          if (data[key] !== null) {
            record[key] = data[key];
          }
        }
        setTable(table, tableData);
        await artificialTimeout();
        resolve(true);
      })
    },

    delete: async (table, id) => {
      return new Promise(async (resolve) => {
        if (!id) {
          showError("Bad request");
          reject();
        }
        let tableData = getTable(table);
        tableData = tableData.filter(element => {
          if (element.id !== id) {
            return element;
          }
        });
        setTable(table, tableData);
        await artificialTimeout();
        resolve(true);
      })
    }
  }

  const initialize = () => {
    for (const tableName of Object.values(TABLES)) {
      const item = localStorage.getItem(tableName);
      if (!item) {
        localStorage.setItem(tableName, JSON.stringify([]));
      }
    }
  }

  const dbStore = useDBStore();

  return {
    TABLES,
    initialize,
    server,
    dbStore,
    toReal,
    toInt
  }
}