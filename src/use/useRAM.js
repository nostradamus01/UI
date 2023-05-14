import { useServer } from '@/use/useServer'

const { TABLES, server, dbStore, toInt } = useServer();

const table = TABLES.RAMs;

export function useRAM() {
  const constructData = (data) => {
    return {
      id: data.id || null,
      size: toInt(data.size)
    }
  }

  const getAll = async () => {
    const response = await server.get(table);
    if (Array.isArray(response)) {
      dbStore.rams = response;
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