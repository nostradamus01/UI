import { useServer } from '@/use/useServer'

const { TABLES, server, dbStore } = useServer();

const table = TABLES.Users;

export function useUsers() {
  const constructData = (data) => {
    return {
      id: data.id || null,
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
      password1: data.password1,
      postcode: data.postcode,
      countryId: data.country,
      cityId: data.city
    }
  }

  const loadCountries = async () => {
    const relatedTables = await server.getTables([TABLES.Countries, TABLES.Cities]);
    dbStore.countries = relatedTables[TABLES.Countries];
    dbStore.cities = relatedTables[TABLES.Cities];
    return relatedTables;
  }

  const getAll = async () => {
    const relatedTables = await loadCountries();
    const response = await server.get(table);
    if (Array.isArray(response)) {
      response.forEach(record => {
        const countriesTable = relatedTables[TABLES.Countries];
        const citiesTable = relatedTables[TABLES.Cities];
        record.country = (Array.isArray(countriesTable) && countriesTable.length > 0) ? countriesTable.find(el => el.id === record.countryId) : null;
        record.city = (Array.isArray(citiesTable) && citiesTable.length > 0) ? citiesTable.find(el => el.id === record.cityId) : null;
      })
      dbStore.users = response;
    }
    return response;
  }

  const get = async () => {
    const response = await getAll();
    const result = response.find(el => el.username === dbStore.username);
    dbStore.user = result;
    return result;
  }

  const register = async (data) => {
    const newData = constructData(data);
    await server.post(table, newData);
  }

  const edit = async (data) => {
    const newData = constructData(data);
    await server.put(table, newData);
  }

  const login = async (data) => {
    const allUsers = await server.get(table);
    let result = false;
    allUsers.forEach(user => {
      if (user.username === data.username && user.password === data.password) {
        result = true;
        dbStore.setUsername(user.username);
      }
    });
    return result;
  }

  return {
    dbStore,
    getAll,
    get,
    register,
    edit,
    login,
    loadCountries
  }
}