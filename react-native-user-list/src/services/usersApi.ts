const BASE_URL = "https://jsonplaceholder.typicode.com/users";

/**
 * Fetches all users from the API
 */
export const fetchUsersApi = async (): Promise<any[]> => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
