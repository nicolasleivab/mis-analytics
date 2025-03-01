import axios from 'axios';
import { TCSRFTokenResponse } from './definitions';

const isProd = process.env.NODE_ENV === 'production';
const prodUrl = 'https://mis-analytics.org/api';
const devUrl = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: isProd ? prodUrl : devUrl,
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
