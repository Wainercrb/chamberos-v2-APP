type TProfessionRole = "FULLTIME" | "TEMPORAL";

export interface IProfession {
  id?: string;
  name: string;
  role: TProfessionRole;
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

export interface ICustomProfession extends IProfession {
  isSelected: boolean;
}

export type TAutocompleteDropdownData = IProfession;
