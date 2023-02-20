type TProfessionRole = "FULLTIME" | "TEMPORAL";

export interface IProfession {
  id?: string;
  name: string;
  role: TProfessionRole;
  isSelected?: boolean;
}

export interface IUser {
  id?: string;
  fullName: string;
  email: string;
  password: string;
  professions: IProfession[];
  location: {
    x: number;
    y: number;
  };
}

export type THomeStackParamList = {
  Map: undefined;
  UserDetails: { user: IUser};
};


export type TAuthStackParamList = {
  Search: undefined;
  Profile: undefined;
};

export type TRootStackParamList = {
  Auth: TAuthStackParamList;
  Home: THomeStackParamList;
};