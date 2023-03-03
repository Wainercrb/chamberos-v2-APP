import { type FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StackActions } from '@react-navigation/native'
import { type RootState } from '../store'
import { type IPrivateScreenProps } from '../layouts'

const ProtectedScreen: FC<IPrivateScreenProps> = ({
  Component,
  navigation,
  allowedRoles,
  redirectTo
}) => {
  const { user } = useSelector(({ userSession }: RootState) => userSession)

  const userHasAccess = (): boolean => {
    const authorities = Array.isArray(user.authorities) ? user.authorities : []
    const flatRoles = authorities.flatMap(({ authority }) => authority)
    return allowedRoles.every((role) => flatRoles.includes(role))
  }

  useEffect(() => {
    if (!userHasAccess()) {
      navigation.dispatch(StackActions.replace(redirectTo))
    }
  }, [user])

  return <Component />
}

export default ProtectedScreen
