import { useEffect, type FC } from 'react'
import { Alert, View, Text, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import { ProfessionModal } from '../components/ProfessionModal'
import { CustomInput } from '../components/CustomInput'
import { ErrorFeedback } from '../components/ErrorFeedback'
import { Loading } from '../components/Loading'
import { LoadingButton } from '../components/LoadingButton'
import { useLocation } from '../hooks/useLocation'
import { useCreateUserMutation } from '../services/chamberosAPI'
import { CONSTANTS } from '../../CONSTANTS'
import { SIGN_UP_VALIDATION_SCHEMA } from '../utilities/schema-validations/signUp'
import { type ISignUpScreenProps } from '../layouts'

const SignInScreen: FC<ISignUpScreenProps> = ({ navigation }) => {
  const { location, locationError } = useLocation()
  const [createUser, userResponse] = useCreateUserMutation()

  useEffect(() => {
    if ((userResponse.data != null) && !userResponse.isError) {
      Alert.alert(
        CONSTANTS.ALERTS.SUCCESS.TITLE,
        CONSTANTS.ALERTS.SUCCESS.DESCRIPTION,
        [
          {
            text: CONSTANTS.ALERTS.SUCCESS.BUTTON_OK,
            onPress: () => { navigation.navigate('SignInScreen') }
          }
        ]
      )
    }
  }, [userResponse.data, userResponse.isError])

  if ((location === null) && (locationError === null)) {
    return (
      <Loading
        message={CONSTANTS.SCREENS.SIGN_UP.LOADING_LOCATION_FEEDBACK}
        isFullSize
      />
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Formik
        validationSchema={SIGN_UP_VALIDATION_SCHEMA}
        initialValues={{
          fullName: '',
          password: '',
          username: '',
          email: '',
          isActive: true,
          roles: [{ name: 'ROLE_USER', description: 'User Access' }],
          professions: [],
          location: {
            x: location?.longitude ?? 0,
            y: location?.latitude ?? 0
          }
        }}
        onSubmit={createUser}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
          setFieldTouched,
          touched
        }) => (
          <View>
            <CustomInput
              keyboardType="default"
              label="Full Name"
              iconName="account"
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
              error={(touched.fullName ?? false) ? errors.fullName : undefined}
            />

            <CustomInput
              keyboardType="email-address"
              label="Email"
              iconName="email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              error={(touched.email ?? false) ? errors.email : undefined}
            />

            <CustomInput
              keyboardType="default"
              label="Username"
              iconName="account"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              error={(touched.username ?? false) ? errors.username : undefined}
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

            <CustomInput
              keyboardType="numeric"
              label="Latitude"
              iconName="map-marker"
              editable={locationError === null}
              onChangeText={handleChange('location.y')}
              onBlur={handleBlur('location.y')}
              value={values.location.y.toString()}
              error={((touched.location?.y) ?? false) ? errors.location?.y : undefined}
            />

            <CustomInput
              keyboardType="numeric"
              label="Longitude"
              iconName="map-marker"
              editable={locationError === null}
              onChangeText={handleChange('location.x')}
              onBlur={handleBlur('location.x')}
              value={values.location.x.toString()}
              error={((touched.location?.x) ?? false) ? errors.location?.x : undefined}
            />

            <View style={styles.professionContainer}>
              <ProfessionModal
                closeCallbackAction={(professions) => {
                  setFieldTouched('professions', true)
                  setFieldValue('professions', [...professions])
                }}
              />

              {(errors.professions !== null) && (touched.professions != null)
                ? (
                <Text style={styles.professionTextError}>
                  {CONSTANTS.YUP.USER.PROFESSIONS.MIN_1}
                </Text>
                  )
                : null}
            </View>

            <View style={styles.saveButtonContainer}>
              <LoadingButton
                isLoading={userResponse.isLoading}
                label={CONSTANTS.SCREENS.SIGN_UP.BUTTON_SIGN_UP}
                onPress={() => { handleSubmit() }}
              />
              {(userResponse.error != null)
                ? (
                <ErrorFeedback error={userResponse.error} />
                  )
                : null}
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  saveButtonContainer: {
    marginTop: 38,
    marginBottom: 38
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
