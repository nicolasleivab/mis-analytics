import { api, fetchCSRFToken, TRegisterResponse } from '../api';

export async function register(
  email: string,
  password: string
): Promise<TRegisterResponse> {
  try {
    const csrfRes = await fetchCSRFToken();

    const response: TRegisterResponse = await api.post(
      '/users/register',
      { email, password },
      {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': csrfRes.data.csrfToken,
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error registering user', error);
    throw error;
  }
}
