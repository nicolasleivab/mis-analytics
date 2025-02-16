export type TUserProject = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TUser = {
  id: string;
  email: string;
  projects: TUserProject[];
};

export type TBareUser = {
  id: string;
  email: string;
};
