import axios from 'axios';
import { TCSRFTokenResponse } from './definitions';

const DEFAULT_API_BASE_URL = 'https://mis-analytics-service.duckdns.org/api';

export const api = axios.create({
  baseURL: process.env.API_BASE_URL ?? DEFAULT_API_BASE_URL,
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
