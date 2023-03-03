type TProfessionRole = 'FULLTIME' | 'TEMPORAL'

export interface IProfession {
  id?: string
  name: string
  // type: TProfessionRole;
  isSelected?: boolean
}

export interface IRole {
  id?: string
  name: string
  description: string
}

export interface IUser {
  id?: string
  fullName: string
  email: string
  username: string
  password: string
  professions: TListOfProfessions
  roles: TListOfRoles
  isActive: boolean
  location: {
    x: number
    y: number
  }
}

export type TListOfUsers = IUser[]

export type TListOfProfessions = IProfession[]

export type TListOfRoles = IRole[]
// AUTHENTICATE USER

export interface IAuthority {
  authority: string
}

export type ListOfAuthority = IAuthority[]

export interface IAuthenticateUser {
  id: string
  username: string
  email: string
  authorities: ListOfAuthority
  enabled: boolean
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  isInitialized: boolean
}
