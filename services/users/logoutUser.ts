import { api } from '../api';

export async function logoutUser(): Promise<void> {
  try {
    await api.post('/users/logout', { withCredentials: true });
  } catch (error) {
    console.error('Error logging out user', error);
    throw error;
  }
}
