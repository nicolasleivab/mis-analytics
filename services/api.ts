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
