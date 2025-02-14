import { api, fetchCSRFToken } from '../api';

export async function logout(): Promise<void> {
  try {
    const csrfRes = await fetchCSRFToken();

    await api.post(
      '/users/logout',
      {},
      {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': csrfRes.data.csrfToken,
        },
      }
    );
  } catch (error) {
    console.error('Error logging out user', error);
    throw error;
  }
}
