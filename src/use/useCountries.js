import { useServer } from '@/use/useServer'

const { TABLES, server, dbStore } = useServer();

const table = TABLES.Countries;

export function useCountries() {
  const constructData = (data) => {
    return {
      id: data.id || null,
      name: data.name
    }
  }

  const getAll = async () => {
    const response = await server.get(table);
    if (Array.isArray(response)) {
      dbStore.countries = response;
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

  const initialize = async () => {
    // const table = await getAll();
    // if (Array.isArray(table) && table.length === 0) {
    //   imageNames.forEach(async image => {
    //     await add({
    //       name: image,
    //       phoneDetail: null,
    //       color: null
    //     });
    //   })
    // }
  }

  return {
    dbStore,
    getAll,
    get,
    add,
    edit,
    remove,
    initialize
  }
}