import { useServer } from '@/use/useServer'

const tableName = 'rams';

export function useRAM() {
  const { req, dbStore, getDB, setDB, getUuid, fakeTimeout, toInt } = useServer();

  const getAll = async () => {
    await fakeTimeout();
    return getDB()[tableName];
  }

  const get = async (id) => {
    await fakeTimeout();
    return true;
  }

  const add = async (data) => {
    await fakeTimeout();
    const reqBody = {
      id: getUuid(),
      size: toInt(data.size)
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
      size: toInt(data.size)
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