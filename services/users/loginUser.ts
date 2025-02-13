import { api, TUserResponse } from '../api';

export async function loginUser(
  email: string,
  password: string
): Promise<TUserResponse> {
  try {
    const response: TUserResponse = await api.post(
      '/users/login',
      { email, password },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    console.error('Error logging in user', error);
    throw error;
  }
}
