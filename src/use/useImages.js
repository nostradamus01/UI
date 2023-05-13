import { useServer } from '@/use/useServer'

const tableName = 'images';

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

export function useImages() {
  const { req, dbStore, getDB, setDB, getUuid, fakeTimeout } = useServer();

  const getNames = async () => {
    await fakeTimeout();
  }

  const getAll = async () => {
    await fakeTimeout();
    return getDB()[tableName];
  }

  const getPhoneDetails = async () => {
    await fakeTimeout();
  }

  const get = async (id) => {
    await fakeTimeout();
    return true;
  }

  const add = async (data) => {
    await fakeTimeout();
    const reqBody = {
      id: getUuid(),
      name: data.name
    }
    const db = getDB();
    db[tableName].push(reqBody);
    setDB(db);
    return true;
  }

  const edit = async (data) => {
    await fakeTimeout();
    const newData = {
      id: data.id,
      colorId: data.colorId,
      phoneDetailId: data.phoneDetailId
    }
    const db = getDB();
    const found = db[tableName].find(element => element.id === newData.id);
    if (found) {
      for (const key of Object.keys(found)) {
        if (newData[key] !== null) {
          found[key] = newData[key];
        }
      }
    } else {
      return 'Not found'
    }
    setDB(db);
    return true;
  }

  const remove = async (id) => {
    await fakeTimeout();
    const db = getDB();
    db[tableName] = db[tableName].filter(element => {
      if (element.id !== id) {
        return element;
      }
    });
    setDB(db);
    return true;
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