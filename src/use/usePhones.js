import { useServer } from '@/use/useServer'
import { usePhoneDetails } from '@/use/usePhoneDetails';

const { TABLES, server, dbStore } = useServer();
const phoneDetails = usePhoneDetails();

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
    await phoneDetails.getAll();
    const relatedTables = await server.getTables([TABLES.PhoneDetails, TABLES.Colors, TABLES.Storages, TABLES.RAMs]);
    const response = await server.get(table);
    if (Array.isArray(response)) {
      response.forEach(record => {
        const phoneDetailsTable = relatedTables[TABLES.PhoneDetails];
        dbStore.phoneDetails = phoneDetailsTable;
        const colorsTable = relatedTables[TABLES.Colors];
        dbStore.colors = colorsTable;
        const storagesTable = relatedTables[TABLES.Storages];
        dbStore.storages = storagesTable;
        const ramsTable = relatedTables[TABLES.RAMs];
        dbStore.rams = ramsTable;
        record.phoneDetail = (Array.isArray(phoneDetailsTable) && phoneDetailsTable.length > 0) ? phoneDetailsTable.find(el => el.id === record.phoneDetailId) : null;
        record.color = (Array.isArray(colorsTable) && colorsTable.length > 0) ? colorsTable.find(el => el.id === record.colorId) : null;
        record.storage = (Array.isArray(storagesTable) && storagesTable.length > 0) ? storagesTable.find(el => el.id === record.storageId) : null;
        record.ram = (Array.isArray(ramsTable) && ramsTable.length > 0) ? ramsTable.find(el => el.id === record.ramId) : null;
      })
      dbStore.phones = response;
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