import { api, fetchCSRFToken } from '../api';
import { TProject, TStoredProjectRes } from '../definitions';

export async function create(
  projectData: TProject
): Promise<TStoredProjectRes> {
  try {
    const csrfRes = await fetchCSRFToken();

    const response: TStoredProjectRes = await api.post(
      '/projects',
      { ...projectData },
      {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': csrfRes.data.csrfToken,
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error storing project', error);
    throw error;
  }
}
