import { NavigationProp } from "@react-navigation/native";

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
  professions: TListOfProfessions;
  roles: TListOfRoles;
  isActive: boolean;
  location: {
    x: number;
    y: number;
  };
}

export type TListOfUsers = IUser[]

export type TListOfProfessions = IProfession[]

export type TListOfRoles = IRole[]


// NAVIGATOR ROUTES
export type TMapStackParamList = {
  Map: undefined;
  MapUserDetails: { user: IUser };
};

export type TPrivateStackParamList = {
  Search: IMapStackParamList;
  SignInUserProfile: undefined;
};

export type TRootStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
  PrivateStack: IPrivateStackParamList;
};

export type TSearchStackNavigationProps = NavigationProp<IMapStackParamList>;

export type TRootStackNavigationProps = NavigationProp<IRootStackParamList>;



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