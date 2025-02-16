import { api, fetchCSRFToken } from '../api';
import { TRemovedProjectRes } from '../definitions';

export async function remove(id: string): Promise<TRemovedProjectRes> {
  try {
    const csrfRes = await fetchCSRFToken();

    const response: TRemovedProjectRes = await api.delete(`/projects/${id}`, {
      withCredentials: true,
      headers: {
        'X-CSRF-Token': csrfRes.data.csrfToken,
      },
    });

    return response;
  } catch (error) {
    console.error('Error removing project', error);
    throw error;
  }
}
