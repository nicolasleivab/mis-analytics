import axios from 'axios';
import { TCSRFTokenResponse } from './definitions';

// const DEFAULT_API_BASE_URL = '/api';

export const api = axios.create({
  baseURL: 'https://mis-analytics-service.duckdns.org/api',
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
