import { api, fetchCSRFToken, TUserResponse } from '../api';

export async function getUser(): Promise<TUserResponse> {
  try {
    const response: TUserResponse = await api.get('/users/me', {
      withCredentials: true,
    });

    return response;
  } catch (error: unknown) {
    const typedError = error as { response: { status: number } };
    if (typedError.response && typedError.response.status === 401) {
      try {
        const csrfRes = await fetchCSRFToken();

        await api.post(
          '/users/refresh',
          {},
          {
            withCredentials: true,
            headers: {
              'X-CSRF-Token': csrfRes.data.csrfToken,
            },
          }
        ); // With refreshToken cookie and csrf token

        const retryResponse: TUserResponse = await api.get('/users/me');
        return retryResponse;
      } catch (refreshError) {
        console.error('Error refreshing token', refreshError);
        throw error;
      }
    }
    console.error('Error getting user', error);
    throw error;
  }
}
