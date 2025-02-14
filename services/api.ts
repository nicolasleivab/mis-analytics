import axios from 'axios';
import { TCSRFTokenResponse } from './definitions';

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
});

export async function fetchCSRFToken(): Promise<TCSRFTokenResponse> {
  try {
    const response = await api.get('/csrf-token');
    return response;
  } catch (error) {
    console.error('Error fetching CSRF token', error);
    throw error;
  }
}
