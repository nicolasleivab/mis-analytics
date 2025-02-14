import { api } from '../api';
import { TProject } from '../definitions';

export async function retrieve(id: string): Promise<TProject> {
  try {
    const response: TProject = await api.get(`/projects/${id}`, {
      withCredentials: true,
    });

    console.log(response);

    return response;
  } catch (error) {
    console.error('Error retrieving project', error);
    throw error;
  }
}
