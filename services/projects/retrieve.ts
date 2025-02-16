import { api } from '../api';
import { TStoredProjectRes } from '../definitions';

export async function retrieve(id: string): Promise<TStoredProjectRes> {
  try {
    const response: TStoredProjectRes = await api.get(`/projects/${id}`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.error('Error retrieving project', error);
    throw error;
  }
}
