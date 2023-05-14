import { useServer } from '@/use/useServer'

const { TABLES, server, dbStore } = useServer();

const table = TABLES.Users;

export function useUsers() {
  const constructData = (data) => {
    return {
      id: data.id || null,
      name: data.name
    }
  }

  const getAll = async () => {
    const response = await server.get(table);
    if (Array.isArray(response)) {
      dbStore.users = response;
    }
    return response;
  }

  const get = async (id) => {
    const response = await server.get(table, id);
    return response;
  }

  const add = async (data) => {
    const newData = constructData(data);
    await server.post(table, newData);
  }

  const edit = async (data) => {
    const newData = constructData(data);
    await server.put(table, newData);
  }

  const remove = async (id) => {
    await server.delete(table, id);
  }

  return {
    dbStore,
    getAll,
    get,
    add,
    edit,
    remove
  }
}