import { api, TUserResponse } from '../api';

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
        await api.post('/users/refresh'); // With refreshToken cookie

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
