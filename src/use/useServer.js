import { useDBStore } from '@/stores/dbStore'
import { v4 as uuidv4 } from 'uuid'

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
  Orders: 'Orders'
}

export function useServer() {
  const showError = (msg) => {
    alert(msg);
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

  const artificialTimeout = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time || 100);
    })
  }

  const server = {
    get: async (table, id) => {
      return new Promise(async (resolve) => {
        let data = getTable(table);
        if (id) {
          data = data.find(el => el.id === id);
        }
        await artificialTimeout(1);
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
        await artificialTimeout(1);
        resolve(true);
      })
    },

    put: async (table, data) => {
      return new Promise(async (resolve) => {
        const id = data.id;
        if (!id) {
          showError("Bad request");
          return resolve();
        }
        let tableData = getTable(table);
        const record = tableData.find(el => el.id === id);
        if (!record) {
          showError("Can't find the record to update");
          return resolve();
        }
        for (const key of Object.keys(record)) {
          if (data[key] !== null) {
            record[key] = data[key];
          }
        }
        setTable(table, tableData);
        await artificialTimeout(1);
        resolve(true);
      })
    },

    delete: async (table, id) => {
      return new Promise(async (resolve) => {
        if (!id) {
          showError("Bad request");
          return resolve();
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
    },

    getTables: async (tables) => {
      return new Promise(async (resolve) => {
        const result = {};
        tables.forEach(table => {
          const tableData = getTable(table);
          if (Array.isArray(tableData)) {
            result[table] = tableData;
          }
        });
        await artificialTimeout(20);
        resolve(result);
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