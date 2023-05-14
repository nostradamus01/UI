import { useServer } from '@/use/useServer'

const { TABLES, server, dbStore, toReal } = useServer();

const table = TABLES.PhoneDetails;

export function usePhoneDetails() {
  const constructData = (data) => {
    return {
      id: data.id || null,
      brandId: data.brand,
      platformId: data.platform,
      osId: data.os,
      model: data.model,
      releaseDate: data.releaseDate || new Date(),
      height: toReal(data.height),
      width: toReal(data.width),
      depth: toReal(data.depth),
      screenSize: toReal(data.screenSize),
      resolution: data.resolution || '0x0',
      batteryCapacity: toReal(data.batteryCapacity),
      price: toReal(data.price),
      discount: toReal(data.discount)
    }
  }

  const getAll = async () => {
    const relatedTables = await server.getTables([TABLES.Brands, TABLES.Platforms, TABLES.OSes]);
    const response = await server.get(table);
    if (Array.isArray(response)) {
      response.forEach(record => {
        const brandsTable = relatedTables[TABLES.Brands];
        dbStore.brands = brandsTable;
        const platformsTable = relatedTables[TABLES.Platforms];
        dbStore.platforms = platformsTable;
        const osesTable = relatedTables[TABLES.OSes];
        dbStore.oses = osesTable;
        record.brand = (Array.isArray(brandsTable) && brandsTable.length > 0) ? brandsTable.find(el => el.id === record.brandId) : null;
        record.platform = (Array.isArray(platformsTable) && platformsTable.length > 0) ? platformsTable.find(el => el.id === record.platformId) : null;
        record.os = (Array.isArray(osesTable) && osesTable.length > 0) ? osesTable.find(el => el.id === record.osId) : null;
      })
      dbStore.phoneDetails = response;
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