import { useServer } from '@/use/useServer'

export function usePlatforms() {
  const { req, dbStore, getDB, setDB, getUuid, fakeTimeout } = useServer();

  const getAll = async () => {
    await fakeTimeout();
    // const response = await req.get('Platforms/getAll');
    // if (response.status !== 200) {
    //   alert("Something wrong!");
    //   return null;
    // }
    // return await response.json();
    return getDB().platforms;
  }

  const get = async (id) => {
    await fakeTimeout();
    return true;
  }

  const add = async (data) => {
    await fakeTimeout();
    const reqBody = {
      id: getUuid(),
      chipset: data.chipset,
      cpu: data.cpu,
      gpu: data.gpu
    }

    // const response = await req.post('Platforms/add', reqBody);
    // if (response.status !== 200) {
    //   alert("Something wrong!");
    //   return null;
    // }
    // return true;
    const db = getDB();
    db.platforms.push(reqBody);
    setDB(db);
    return true;
  }

  const edit = async (data) => {
    await fakeTimeout();
    const newData = {
      id: data.id,
      chipset: data.chipset,
      cpu: data.cpu,
      gpu: data.gpu
    }
    // const response = await req.put('Platforms/edit', data);
    // if (response.status !== 200) {
    //   return null;
    // }
    const db = getDB();
    const found = db.platforms.find(element => element.id === newData.id);
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
    // const response = await req.delete('Platforms/delete', platformId);
    // if (response.status !== 200) {
    //   return null;
    // }
    const db = getDB();
    db.platforms = db.platforms.filter(element => {
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