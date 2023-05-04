import { useDBStore } from '@/stores/dbStore'

const apiUrl = 'http://localhost:5169/api/';

export function useServer() {
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
  
    delete: async (url) => {
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