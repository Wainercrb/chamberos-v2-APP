import { useEffect, useState, type FC } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { Formik } from 'formik'
import { CustomInput } from '../components/CustomInput'
import { LoadingButton } from '../components/LoadingButton'
import { ErrorFeedback } from '../components/ErrorFeedback'
import { persistLocalStorage } from '../utilities/asyncLocalStorage'
import { getErrorMessage } from '../utilities/catchError'
import { useSignInMutation } from '../services/chamberosAPI'
import { createUserSession } from '../store/slices/userSessionSlice'
import { useAppDispatch } from '../store'
import { CONSTANTS } from '../../CONSTANTS'
import { SIGN_IN_USER_VALIDATION_SCHEMA } from '../utilities/schema-validations/signIn'
import { type IAuthenticateUser } from '../../types'
import { type ISignInScreenProps } from '../layouts'

const SignInScreen: FC<ISignInScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const [persistDataError, setPersistDataError] = useState('')
  const [signInUser, response] = useSignInMutation()

  const persistData = async (user: IAuthenticateUser | undefined): Promise<void> => {
    if (user == null) return
    try {
      await persistLocalStorage(CONSTANTS.LOCAL_STORAGE_KEY, response.data)
      dispatch(createUserSession(user))
      navigation.dispatch(StackActions.replace('PrivateStack'))
    } catch (error) {
      setPersistDataError(getErrorMessage(error))
    }
  }

  useEffect(() => {
    void persistData(response.data)
  }, [response.data])

  return (
    <View style={styles.container}>
      <View style={styles.formBody}>
        <Formik
          validationSchema={SIGN_IN_USER_VALIDATION_SCHEMA}
          initialValues={{
            username: '',
            password: ''
          }}
          onSubmit={signInUser}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched
          }) => (
            <View>
              <CustomInput
                keyboardType="default"
                label="Username"
                iconName="account"
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                error={(touched.password ?? false) ? errors.username : undefined}
              />

              <CustomInput
                secureTextEntry={true}
                label="Password"
                iconName="key-chain"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={(touched.password ?? false) ? errors.password : undefined}
              />

              <View style={styles.saveButtonContainer}>
                <LoadingButton
                  isLoading={response.isLoading}
                  label={CONSTANTS.SCREENS.SIGN_IN.BUTTON_SIGN_IN}
                  onPress={() => { handleSubmit() }}
                />
                {(response.error != null)
                  ? <ErrorFeedback error={response.error} />
                  : null}
                {(persistDataError.length > 0)
                  ? <ErrorFeedback error={persistDataError} />
                  : null}
              </View>
            </View>
          )}
        </Formik>
      </View>
      <View>
        <Button
          title={CONSTANTS.SCREENS.SIGN_IN.BUTTON_GO_TO_SIGN_UP}
          onPress={() => { navigation.navigate('SignUpScreen') }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  formBody: {
    flex: 1,
    marginTop: 64
  },
  saveButtonContainer: {
    marginTop: 28
  },
  professionContainer: {
    marginTop: 14
  },
  professionTextError: {
    color: 'red',
    marginTop: 6
  }
})

export default SignInScreen
