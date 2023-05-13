import { useServer } from '@/use/useServer'

const { TABLES, server, dbStore } = useServer();

const table = TABLES.Phones;

export function usePhones() {
  const constructData = (data) => {
    return {
      id: data.id || null,
      phoneDetailId: data.phoneDetail,
      colorId: data.color,
      storageId: data.storage,
      ramId: data.ram
    }
  }

  const getAll = async () => {
    const response = await server.get(table);
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