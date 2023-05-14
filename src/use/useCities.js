import { useServer } from '@/use/useServer'

const { TABLES, server, dbStore } = useServer();

const table = TABLES.Cities;

export function useCities() {
  const constructData = (data) => {
    return {
      id: data.id || null,
      name: data.name,
      countryId: data.country
    }
  }

  const getAll = async () => {
    const relatedTables = await server.getTables([TABLES.Countries]);
    const response = await server.get(table);
    if (Array.isArray(response)) {
      response.forEach(record => {
        const countriesTable = relatedTables[TABLES.Countries];
        dbStore.countries = countriesTable;
        record.country = (Array.isArray(countriesTable) && countriesTable.length > 0) ? countriesTable.find(el => el.id === record.countryId) : null;
      })
      dbStore.cities = response;
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