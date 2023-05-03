import { useServer } from '@/use/useServer'

export function usePlatforms() {
  const { req, dbStore } = useServer();

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

  const getPlatforms = async () => {
    const response = await req.get('Platforms/getAll');
    if (response.status !== 200) {
      alert("Something wrong!");
      return null;
    }
    return await response.json();
  }

  return {
    req,
    dbStore
  }
}