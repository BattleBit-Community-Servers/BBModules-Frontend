const apiUrl = "https://apirunner.mevng.net";

export async function currentUser() {
  try {
    const response = await fetch(apiUrl + '/profile', {
      method: 'GET',
      credentials: 'include', // important part
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}