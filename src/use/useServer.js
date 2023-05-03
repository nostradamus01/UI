import { useDBStore } from '@/store/dbStore';

const apiUrl = 'http://localhost:5169/api/';

export function useServer() {
  const req = {
    get: async (url) => {
      return await fetch(apiUrl + url);
    },
  
    post: async (url, data) => {
      return await fetch(apiUrl + url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
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
      return await fetch(apiUrl + url, {
        method: 'DELETE'
      });
    }
  }

  const dbStore = useDBStore();

  return {
    req,
    dbStore
  }
}