import { api, fetchCSRFToken } from '../api';
import { TProject, TStoredProjectRes } from '../definitions';

export async function update(
  projectData: TProject
): Promise<TStoredProjectRes> {
  try {
    const csrfRes = await fetchCSRFToken();

    const response: TStoredProjectRes = await api.put(
      `/projects/${projectData.id}`,
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
    console.error('Error updating project', error);
    throw error;
  }
}
