import { api, TUserResponse } from '../api';

export async function getUser(): Promise<TUserResponse> {
  try {
    const response: TUserResponse = await api.get('/users/me', {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
