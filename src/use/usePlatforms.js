import { useServer } from '@/use/useServer'

export function usePlatforms() {
  const { req, dbStore } = useServer();

  const getPlatforms = async () => {
    const response = await req.get('Platforms/getAll');
    if (response.status !== 200) {
      alert("Something wrong!");
      return null;
    }
    return await response.json();
  }

  const addPlatform = async (data) => {
    const reqBody = {
      chipset: data.chipset,
      cpu: data.cpu,
      gpu: data.gpu
    }

    const response = await req.post('Platforms/add', reqBody);
    if (response.status !== 200) {
      alert("Something wrong!");
      return null;
    }
    return true;
  }

  const editPlatform = async (platformData) => {
    const data = {
      id: platformData.id,
      chipset: platformData.chipset,
      cpu: platformData.cpu,
      gpu: platformData.gpu
    }
    const response = await putRequest('Platforms/edit', data);
    if (response.status !== 200) {
      return null;
    }
    return true;
  }

  const deletePlatform = async (platformId) => {
    const response = await deleteRequest('http://localhost:5169/api/Platforms/delete', platformId);
    if (response.status !== 200) {
      return null;
    }
    return true;
  }

  return {
    req,
    dbStore,
    getPlatforms,
    addPlatform,
    editPlatform,
    deletePlatform
  }
}