import axios from 'axios';
import { TBareUser, TUser } from '../model/User/definitions';
import {
  TClipPath,
  TSvgPart,
  TSvgThresholds,
} from '../model/Project/definitions';
import { TExcelData, TVariableField } from '../model';

export type TError = {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
};

export type TUserResponse = {
  data: TUser;
  accessToken: string;
  message: string;
};

export type TRegisterResponse = {
  data: TUser;
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

export type TRawProject = {
  user: TBareUser;
  name: string;
  svgJson: JSON;
  clipPathsJson: JSON;
  data: JSON;
  variableFields: JSON;
  svgThresholds: JSON;
  createdAt: string;
  updatedAt: string;
};

export type TProject = {
  user: TBareUser;
  name: string;
  svgJson: TSvgPart[];
  clipPathsJson: TClipPath[];
  data: TExcelData;
  variableFields: TVariableField[];
  svgThresholds: TSvgThresholds;
  createdAt: string;
  updatedAt: string;
};
