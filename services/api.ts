import axios from 'axios';
import { TUser } from '../model/User/definitions';

export type TError = {
  message: string;
};

export type TUserResponse = {
  data: TUser;
  accessToken: string;
  message: string;
};

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
});

export type TCSRF = {
  csrfToken: string;
};
export type TCSRFTokenResponse = {
  data: TCSRF;
};

export async function fetchCSRFToken(): Promise<TCSRFTokenResponse> {
  try {
    const response = await api.get('/csrf-token');
    return response;
  } catch (error) {
    console.error('Error fetching CSRF token', error);
    throw error;
  }
}
