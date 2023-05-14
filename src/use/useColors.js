import { useServer } from '@/use/useServer'
import { usePhoneDetails } from '@/use/usePhoneDetails';

const { TABLES, server, dbStore } = useServer();
const phoneDetails = usePhoneDetails();

const table = TABLES.Colors;

export function useColors() {
  const constructData = (data) => {
    return {
      id: data.id || null,
      name: data.name,
      hex: data.hex,
      phoneDetailId: data.phoneDetail
    }
  }

  const getAll = async () => {
    await phoneDetails.getAll();
    const relatedTables = await server.getTables([TABLES.PhoneDetails]);
    const response = await server.get(table);
    if (Array.isArray(response)) {
      response.forEach(record => {
        const phoneDetailsTable = relatedTables[TABLES.PhoneDetails];
        dbStore.phoneDetails = phoneDetailsTable;
        record.phoneDetail = (Array.isArray(phoneDetailsTable) && phoneDetailsTable.length > 0) ? phoneDetailsTable.find(el => el.id === record.phoneDetailId) : null;
      })
      dbStore.colors = response;
    }
    console.log(response);
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