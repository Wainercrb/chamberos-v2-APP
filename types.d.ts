type TProfessionRole = "FULLTIME" | "TEMPORAL";

export interface IProfession {
  id?: string;
  name: string;
  // type: TProfessionRole;
  isSelected?: boolean;
}

export interface IRole {
  id?: string;
  name: string;
  description: string;
}

export interface IUser {
  id?: string;
  fullName: string;
  email: string;
  username: string;
  password: string;
  professions: IProfession[];
  roles: IRole[];
  isActive: boolean;
  location: {
    x: number;
    y: number;
  };
}

// NAVIGATOR ROUTES

export type THomeStackParamList = {
  Map: undefined;
  MapUserDetails: { user: IUser };
};

export type TAuthStackParamList = {
  Search: undefined;
  SignInUserProfile: undefined;
};

export type TRootStackParamList = {
  SignInScreen: TAuthStackParamList;
  SignUpScreen: TAuthStackParamList;
  HomeStack: THomeStackParamList;
};

// AUTHENTICATE USER

export interface IAuthority {
  authority: string;
}

export interface IAuthenticateUser {
  id: string;
  username: string;
  email: string;
  authorities: Authority[];
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  isInitialized: boolean;
}

// Errors
type TErrorTypes = "TOOLKIT"
type TToolkitError = {
  status?: number;
  type: TErrorTypes,
  data: {
    error: string;
    path: string;
    timestamp: string;
  }
}