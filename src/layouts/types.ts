/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { type RouteProp } from '@react-navigation/native'
import { type StackNavigationProp } from '@react-navigation/stack'
import { type IUser } from '../../types'

export type IMapStackParamList = {
  Map: undefined
  MapUserDetails: { user: IUser }
}

export type IPrivateStackParamList = {
  Search: IMapStackParamList
  SignInUserProfile: undefined
}

export type TRootStackParamList = {
  SignInScreen: undefined
  SignUpScreen: undefined
  PrivateStack: IPrivateStackParamList
}

type TMapScreenNavigationProp = StackNavigationProp<IMapStackParamList, 'Map'>
type TMapScreenRouteProp = RouteProp<IMapStackParamList, 'Map'>

type TMapUserDetailScreenNavigationProp = StackNavigationProp<IMapStackParamList, 'MapUserDetails'>
type TMapUserDetailScreenRouteProp = RouteProp<IMapStackParamList, 'MapUserDetails'>

type TSearchScreenNavigationProp = StackNavigationProp<IPrivateStackParamList, 'Search'>
type TSearchScreenRouteProp = RouteProp<IPrivateStackParamList, 'Search'>

type TSignInUserProfileScreenNavigationProp = StackNavigationProp<IPrivateStackParamList, 'SignInUserProfile'>
type TSignInUserProfileScreenRouteProp = RouteProp<IPrivateStackParamList, 'SignInUserProfile'>

type TSignInScreenNavigationProp = StackNavigationProp<TRootStackParamList, 'SignInScreen'>
type TSignInScreenRouteProp = RouteProp<TRootStackParamList, 'SignInScreen'>

type TSignUpScreenNavigationProp = StackNavigationProp<TRootStackParamList, 'SignUpScreen'>
type TSignUpScreenRouteProp = RouteProp<TRootStackParamList, 'SignUpScreen'>

type TPrivateScreenNavigationProp = StackNavigationProp<TRootStackParamList, 'PrivateStack'>
type TPrivateScreenRouteProp = RouteProp<TRootStackParamList, 'PrivateStack'>

export interface IMapScreenProps {
  navigation: TMapScreenNavigationProp
  route: TMapScreenRouteProp
}

export interface IMapUserDetailScreenProps {
  navigation: TMapUserDetailScreenNavigationProp
  route: TMapUserDetailScreenRouteProp
}

export interface ISearchScreenProps {
  navigation: TSearchScreenNavigationProp
  route: TSearchScreenRouteProp
}

export interface ISignInUserProfileScreenProps {
  navigation: TSignInUserProfileScreenNavigationProp
  route: TSignInUserProfileScreenRouteProp
}

export interface ISignInScreenProps {
  navigation: TSignInScreenNavigationProp
  route: TSignInScreenRouteProp
}

export interface ISignUpScreenProps {
  navigation: TSignUpScreenNavigationProp
  route: TSignUpScreenRouteProp
}

export interface IPrivateScreenProps {
  navigation: TPrivateScreenNavigationProp
  route: TPrivateScreenRouteProp
  Component: () => JSX.Element
  allowedRoles: string[]
  redirectTo: keyof TRootStackParamList
}
