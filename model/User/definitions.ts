export type TUserProject = {
  id: string;
  name: string;
};

export type TUser = {
  id: string;
  email: string;
  projects: TUserProject[];
};
