import { useServer } from '@/use/useServer'
import { usePhoneDetails } from '@/use/usePhoneDetails';

const imageNames = [
  'iPhone12_Green.jpg',
  'iPhone12Mini_Red.jpg',
  'iPhone12Pro_Blue.jpg',
  'iPhone12ProMax_Black.jpg',
  'iPhone13_Midnight.png',
  'iPhone13Mini_Pink.jpg',
  'iPhone13Pro_Alphone-Green.jpg',
  'iPhone13ProMax_Blue.png',
  'iPhone14_Blue.png',
  'iPhone14_Yellow.jpg',
  'iPhone14Plus_Red.png',
  'iPhone14Plus_White.png',
  'iPhone14Pro_Gold.jpg',
  'iPhone14Pro_Silver.jpg',
  'iPhone14ProMax_Deep-Purple.jpg',
  'iPhone14ProMax_Space-Black.jpg',
  'NokiaC20_Dark-Blue.png',
  'NokiaG21_Nordic-Blue.png',
  'NokiaG60_Black.png',
  'Realme9i_Glacier-Blue.png',
  'Realme10_Black.png',
  'RealmeC33_Night-Sea.png',
  'RealmeC35_Green.png',
  'SamsungGalaxyA53_5G_White.jpg',
  'SamsungGalaxyA54_Violet.png',
  'SamsungGalaxyS21_FE5G_Green.png',  
  'SamsungGalaxyS22_Green.png',
  'SamsungGalaxyS22+_PInk-Gold.png',  
  'SamsungGalaxyS22Ultra_Black.png',
  'SamsungGalaxyS23_White.png',  
  'SamsungGalaxyS23+_Pink.png',
  'SamsungGalaxyS23Ultra_Black.jpg',  
  'SamsungGalaxyS23Ultra_Green.jpg',
  'SamsungGalaxyZFlip4_5G_Gray_1.png',
  'SamsungGalaxyZFlip4_5G_Gray_2.png',
  'SamsungGalaxyZFlip4_5G_Gray_3.png',
  'SamsungGalaxyZFlip4_5G_Gray_4.png',
  'SamsungGalaxyZFold4_Black_1.jpg',
  'SamsungGalaxyZFold4_Black_2.jpg',
  'SamsungGalaxyZFold4_Black_3.jpg',  
  'SamsungGalaxyZFold4_Black_4.jpg',
  'SamsungGalaxyZFold4_Black_5.jpg',
  'Xiaomi12Lite_Green.png',  
  'Xiaomi13_Black.png',
  'Xiaomi13Lite_Lite-Blue.png',  
  'XiaomiPocoF4_Night-Black.png',
  'XiaomiRedmi12C_Mint-Green.png', 
  'XiaomiRedmiNote10Pro_Onyx-Gray.png',
  'XiaomiRedmiNote12_Onyx-Gray.png',  
  'XiaomiRedmiNote12Pro+5G_Midnigh-Black.png',
]

const { TABLES, server, dbStore } = useServer();
const phoneDetails = usePhoneDetails();

const table = TABLES.Images;

export function useImages() {
  const constructData = (data) => {
    return {
      id: data.id || null,
      name: data.name,
      phoneDetailId: data.phoneDetail,
      colorId: data.color
    }
  }

  const getNames = () => {
    return imageNames;
  }

  const getAll = async () => {
    await phoneDetails.getAll();
    const relatedTables = await server.getTables([TABLES.PhoneDetails, TABLES.Colors]);
    const response = await server.get(table);
    if (Array.isArray(response)) {
      response.forEach(record => {
        const phoneDetailsTable = relatedTables[TABLES.PhoneDetails];
        dbStore.phoneDetails = phoneDetailsTable;
        const colorsTable = relatedTables[TABLES.Colors];
        dbStore.colors = colorsTable;
        record.phoneDetail = (Array.isArray(phoneDetailsTable) && phoneDetailsTable.length > 0) ? phoneDetailsTable.find(el => el.id === record.phoneDetailId) : null;
        record.color = (Array.isArray(colorsTable) && colorsTable.length > 0) ? colorsTable.find(el => el.id === record.colorId) : null;
      })
      dbStore.images = response;
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
    console.log(newData);
    await server.put(table, newData);
  }

  const remove = async (id) => {
    await server.delete(table, id);
  }

  const initialize = async () => {
    const table = await getAll();
    if (Array.isArray(table) && table.length === 0) {
      for (const image of imageNames) {
        await add({
          name: image,
          phoneDetail: null,
          color: null
        });
      }
    }
  }

  return {
    dbStore,
    getAll,
    get,
    add,
    edit,
    remove,
    getNames,
    initialize
  }
}