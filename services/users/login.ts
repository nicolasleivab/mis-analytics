import { api, fetchCSRFToken, TUserResponse } from '../api';

export async function login(
  email: string,
  password: string
): Promise<TUserResponse> {
  try {
    const csrfRes = await fetchCSRFToken();

    const response: TUserResponse = await api.post(
      '/users/login',
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
    console.error('Error logging in user', error);
    throw error;
  }
}
