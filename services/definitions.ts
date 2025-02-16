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

export type TCSRF = {
  csrfToken: string;
};
export type TCSRFTokenResponse = {
  data: TCSRF;
};

export type TRawProject = {
  user: TBareUser;
  name: string;
  svgJson: string; // JSON;
  clipPathsJson: string; // JSON;
  data: string; // JSON;
  variableFields: string; // JSON;
  svgThresholds: string; // JSON;
  createdAt: string;
  updatedAt: string;
};

export type TProject = {
  user: TBareUser;
  id?: string;
  name: string;
  svgJson: TSvgPart[];
  clipPathsJson: TClipPath[];
  data: TExcelData;
  variableFields: TVariableField[];
  svgThresholds: TSvgThresholds;
};

export type TStoredProjectRes = {
  data: {
    message: string;
    project: TProject;
  };
};

export type TRemovedProjectRes = {
  message: string;
  id: string;
};
