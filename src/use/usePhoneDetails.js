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