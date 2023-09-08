const apiUrl = "https://apirunner.mevng.net";

export async function getModules(page: number) {
    try {
      const response = await fetch(`${apiUrl}/Modules/GetModules?page=${page}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
}

export async function getModule(id: number) {
    try {
      const response = await fetch(`${apiUrl}/Modules/GetModule/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
}