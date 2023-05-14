import { useServer } from '@/use/useServer'
import { usePhonesStore } from '@/stores/phonesStore'

const { TABLES, server, dbStore, toInt } = useServer();
const phonesStore = usePhonesStore();

export function useMain() {

  const getAll = async (loadPhones) => {
    if (loadPhones) {
      phonesStore.isPhonesLoading = true;
    }
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
        brand: brand,
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
    phonesStore.isPhonesLoading = false;
    return result;
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

  const getFiltered = async () => {
    const allPhones = await getAll();
    const brandsFilter = phonesStore.filters.brands;
    const brands = [];
    for (const key of Object.keys(brandsFilter)) {
      // debugger;
      if (brandsFilter[key]) {
        brands.push(key);
      }
    }
    const storagesFilter = phonesStore.filters.storage;
    const storages = [];
    for (const key of Object.keys(storagesFilter)) {
      if (storagesFilter[key]) {
        storages.push(key);
      }
    }
    const ramsFilter = phonesStore.filters.ram;
    const rams = [];
    for (const key of Object.keys(ramsFilter)) {
      if (ramsFilter[key]) {
        rams.push(key);
      }
    }
    const priceRange = phonesStore.filters.price;
    const result = allPhones.filter((phone) => {
      if (priceCheck(phone.price, priceRange) && brandCheck(phone.brand, brands) && storageCheck(phone.storage, storages) && ramCheck(phone.ram, rams)) {
        return phone;
      }
    });
    phonesStore.phones = result;
  }

  const priceCheck = (price, priceRange) => {
    return price >= priceRange[0] && price <= priceRange[1];
  }

  const brandCheck = (brand, brands) => {
    return brands.length === 0 || brands.includes(brand);
  }

  const storageCheck = (storage, storages) => {
    return storages.length === 0 || storages.includes(storage + '');
  }

  const ramCheck = (ram, rams) => {
    return rams.length === 0 || rams.includes(ram + '');
  }

  const getSearchResult = async () => {

    const allPhones = await getAll();
    const result = allPhones.filter(phone => {
      if (phone.name.toLowerCase().includes(phonesStore.searchQuery.toLowerCase())) {
        return phone;
      }
    });
    phonesStore.phones = result;
  }

  // const getPhoneDetails = async (id) => {
  //   const relatedTables = await server.getTables([...Object.keys(TABLES)]);
  //   const phones = relatedTables.Phones;
  //   let result = {
  //     rams: [],
  //     storages: [],
  //     colors: []
  //   };
  //   const phone = phones.find(el => el.id === id);
  //   if (phone) {
  //     const phonesWithSameDetails = phones.filter(el => el.phoneDetailId === phone.phoneDetailId);

  //     phonesWithSameDetails.forEach((phone, index) => {
  //       const ram = relatedTables[TABLES.RAMs].find(el => el.id === phone.ramId)?.size;
  //       ram.phoneId = phone.id;
  //       if (!result.rams.includes(ram)) {
  //         result.rams.push(ram);
  //       }
  //       const storage = relatedTables[TABLES.Storages].find(el => el.id === phone.storageId)?.size;
  //       storage.phoneId = phone.id;
  //       if (!result.storages.includes(storage)) {
  //         result.storages.push(storage);
  //       }
  //       const color = relatedTables[TABLES.Colors].find(el => el.id === phone.colorId);
  //       const images = relatedTables[TABLES.Images].filter(el => {
  //         if (el.colorId === color.id) {
  //           if (el.phoneDetailId === phone.phoneDetailId) {
  //             return true;
  //           }
  //         }
  //         return false;
  //       });
  //       if (!result.colors.find(el => el.id === color.id)) {
  //         color.images = images.map(el => el.name);
  //         result.colors.push(color);
  //       }
  //       if (index === 0) {
  //         const phoneDetail = relatedTables[TABLES.PhoneDetails].find(el => el.id === phone.phoneDetailId);
  //         result.phoneDetail = phoneDetail;
  //         result.brand = relatedTables[TABLES.Brands].find(el => el.id === phoneDetail.brandId)?.name;
  //         result.platform = relatedTables[TABLES.Platforms].find(el => el.id === phoneDetail.platformId);
  //         result.os = relatedTables[TABLES.OSes].find(el => el.id === phoneDetail.osId)?.name;
  //         result.name = result.brand + ' ' + phoneDetail?.model;
  //       }
  //     });
  //     phonesStore.phoneDetails = result;
  //   }
  // }

  const getPhoneDetails = async (id) => {
    const relatedTables = await server.getTables([...Object.keys(TABLES)]);
    const phones = relatedTables.Phones;
    let result = {
      rams: [],
      storages: [],
      colors: []
    };
    const phone = phones.find(el => el.id === id);
    if (phone) {
      const phoneDetail = relatedTables[TABLES.PhoneDetails].find(el => el.id === phone.phoneDetailId);
      result.phoneDetail = phoneDetail;
      result.brand = relatedTables[TABLES.Brands].find(el => el.id === phoneDetail.brandId)?.name;
      result.platform = relatedTables[TABLES.Platforms].find(el => el.id === phoneDetail.platformId);
      result.os = relatedTables[TABLES.OSes].find(el => el.id === phoneDetail.osId)?.name;
      result.name = result.brand + ' ' + phoneDetail?.model;
      const phonesWithSameDetails = phones.filter(el => el.phoneDetailId === phone.phoneDetailId);

      phonesWithSameDetails.forEach((phone, index) => {
        const ram = relatedTables[TABLES.RAMs].find(el => el.id === phone.ramId)?.size;
        ram.phoneId = phone.id;
        if (!result.rams.includes(ram)) {
          result.rams.push(ram);
        }
        const storage = relatedTables[TABLES.Storages].find(el => el.id === phone.storageId)?.size;
        storage.phoneId = phone.id;
        if (!result.storages.includes(storage)) {
          result.storages.push(storage);
        }
        const color = relatedTables[TABLES.Colors].find(el => el.id === phone.colorId);
        const images = relatedTables[TABLES.Images].filter(el => {
          if (el.colorId === color.id) {
            if (el.phoneDetailId === phone.phoneDetailId) {
              return true;
            }
          }
          return false;
        });
        if (!result.colors.find(el => el.id === color.id)) {
          color.images = images.map(el => el.name);
          result.colors.push(color);
        }
        if (index === 0) {

        }
      });
      phonesStore.phoneDetails = result;
    }
  }

  const get = async (id) => {
    const response = await server.get(table, id);
    return response;
  }

  return {
    dbStore,
    getAll,
    get,
    getFiltered,
    getSearchResult,
    getPhoneDetails
  }
}