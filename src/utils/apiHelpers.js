// utils/apiHelper.js
export const handleRequest = async (requestFn) => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error; // relancer pour que le composant gère
  }
};
