import { useServer } from '@/use/useServer'
import { usePhonesStore } from '@/stores/phonesStore'

const { TABLES, server, dbStore } = useServer();
const phonesStore = usePhonesStore();

export function useMain() {

  const getAll = async () => {
    const relatedTables = await server.getTables([...Object.keys(TABLES)]);
    const result = [];
    const phones = relatedTables.Phones;
    phones.forEach((phone) => {
      // debugger;
      const phoneDetail = relatedTables[TABLES.PhoneDetails].find(el => el.id === phone.phoneDetailId);
      let brand = 'Apple';
      if (phoneDetail) {
        brand = relatedTables[TABLES.Brands].find(el => el.id === phoneDetail.brandId)?.name;
      }
      const ram = relatedTables[TABLES.RAMs].find(el => el.id === phone.ramId);
      const storage = relatedTables[TABLES.Storages].find(el => el.id === phone.storageId);
      const color = relatedTables[TABLES.Colors].find(el => el.id === phone.colorId);
      let image = relatedTables[TABLES.Images].find(el => (el.phoneDetailId === phoneDetail.id && el.colorId === color.id));
      if (!image) {
        image = 'iPhone12_Green.jpg'
      } else {
        image = image.name;
      }
      const obj = {
        id: phone.id,
        name: phoneDetail ? `${brand} ${phoneDetail.model}` : 'Phone',
        price: phone.price,
        storage: storage.size,
        ram: ram.size,
        color: color.name,
        image: image
      }
      result.push(obj);
    });
    phonesStore.phones = result;
    // const response = await server.get(table);
    // if (Array.isArray(response)) {
    //   response.forEach(record => {
    //     const brandsTable = relatedTables[TABLES.Brands];
    //     dbStore.brands = brandsTable;
    //     const platformsTable = relatedTables[TABLES.Platforms];
    //     dbStore.platforms = platformsTable;
    //     const osesTable = relatedTables[TABLES.OSes];
    //     dbStore.oses = osesTable;
    //     record.brand = (Array.isArray(brandsTable) && brandsTable.length > 0) ? brandsTable.find(el => el.id === record.brandId) : null;
    //     record.platform = (Array.isArray(platformsTable) && platformsTable.length > 0) ? platformsTable.find(el => el.id === record.platformId) : null;
    //     record.os = (Array.isArray(osesTable) && osesTable.length > 0) ? osesTable.find(el => el.id === record.osId) : null;
    //   })
    //   dbStore.phoneDetails = response;
    // }
    // return response;
  }

  const get = async (id) => {
    const response = await server.get(table, id);
    return response;
  }

  return {
    dbStore,
    getAll,
    get,
  }
}