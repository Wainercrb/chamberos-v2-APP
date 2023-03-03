import { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { useGetUserQuery } from '../services/chamberosAPI'
import { useSelector } from 'react-redux'
import { type RootState, useAppDispatch } from '../store'
import { Loading } from '../components/Loading'
import { LoadingButton } from '../components/LoadingButton'
import { CONSTANTS } from '../../CONSTANTS'
import { clearLocalStorage } from '../utilities/asyncLocalStorage'
import {
  resetUserSession
} from '../store/slices/userSessionSlice'

export default function SignInUserProfileScreen (): JSX.Element {
  const { id } = useSelector((state: RootState) => state.userSession.user)
  const { data: user, isLoading } = useGetUserQuery({ userId: id })
  const [signOutIsLoading, setSignOutIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  const handleSignOut = async (): Promise<void> => {
    try {
      setSignOutIsLoading(true)
      dispatch(resetUserSession())
      await clearLocalStorage(CONSTANTS.LOCAL_STORAGE_KEY)
    } catch (error) {
    } finally {
      setSignOutIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loading isFullSize />
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {(user == null)
          ? (
          <Text style={styles.title}>
            {CONSTANTS.SCREENS.SIGN_UP.USER_NOT_FOUND}
          </Text>
            )
          : (
          <>
            <Text style={styles.title}>{user.fullName}</Text>
            <Text style={styles.subtitle}>{user.email}</Text>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professions</Text>
              {user.professions.map((profession) => (
                <Text key={profession.id} style={styles.item}>
                  {profession.name}
                </Text>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Roles</Text>
              {user.roles.map((role) => (
                <Text key={role.id} style={styles.item}>
                  {role.name}
                </Text>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Location</Text>
              <Text style={styles.item}>x: {user.location.x}</Text>
              <Text style={styles.item}>y: {user.location.y}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Is Active</Text>
              <Text style={styles.item}>{user.isActive ? 'YES' : 'NO'}</Text>
            </View>
          </>
            )}
      </View>
      <View>
        <LoadingButton
          isLoading={signOutIsLoading}
          label={CONSTANTS.SCREENS.SIGN_UP.BUTTON_LOG_OUT}
          onPress={() => {
            void handleSignOut()
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1
  },
  body: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  item: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5
  }
})
