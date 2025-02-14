import { api, fetchCSRFToken, TProject } from '../api';

export async function retrieve(
  email: string,
  password: string
): Promise<TProject> {
  try {
    const csrfRes = await fetchCSRFToken();

    const response: TProject = await api.post(
      '/users/login',
      { email, password },
      {
        withCredentials: true,
        headers: {
          'X-CSRF-Token': csrfRes.data.csrfToken,
        },
      }
    );

    console.log(response);

    return response;
  } catch (error) {
    console.error('Error logging in user', error);
    throw error;
  }
}
