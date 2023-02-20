import * as Yup from "yup";
import { Alert, View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { ProfessionModal } from "../components/ProfessionModal";
import { CustomInput } from "../components/CustomInput";
import { Loading } from "../components/Loading";
import { LoadingButton } from "../components/LoadingButton";
import { useLocation } from "../hooks/useLocation";
import { useCreateUserMutation } from "../services/chamberosAPI";
import { CONSTANTS } from "../../CONSTANTS";
import { IUser, THomeStackParamList, TRootStackParamList } from "../../types";

type TAuthScreenNavigationProp = NavigationProp<TRootStackParamList, "Auth">;

const validationSchema: Yup.Schema<IUser> = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  professions: Yup.array()
    .required()
    .of(
      Yup.object()
        .shape({
          name: Yup.string().required("Profession name is required"),
          role: Yup.string()
            .oneOf(["FULLTIME", "TEMPORAL"], "Invalid profession role")
            .required("Profession role is required"),
        })
        .nullable()
        .required()
    ),
  location: Yup.object().shape({
    x: Yup.number().required("Location x is required"),
    y: Yup.number().required("Location y is required"),
  }),
});

export default function SignInScreen() {
  const { location, locationError } = useLocation();
  const [createUser, response] = useCreateUserMutation();

  const navigation = useNavigation<TAuthScreenNavigationProp>();

  const handleSubmit = async (user: IUser) => {
    await createUser(user);
    Alert.alert(
      CONSTANTS.SIGH_IN_SUCCESS_FETCH_ALERT_TITLE,
      CONSTANTS.SIGH_IN_SUCCESS_FETCH_ALERT_DESC,
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home", {} as THomeStackParamList),
        },
      ]
    );
  };

  return (
    <>
      <View>
        {response.error ? <Text>{JSON.stringify(response.error)}</Text> : null}
        {locationError ? <Text>{JSON.stringify(locationError)}</Text> : null}
      </View>

      {!location ? (
        <Loading isFullSize={true} />
      ) : (
        <ScrollView style={styles.container}>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              professions: [{ name: "", role: "FULLTIME" }],
              location: {
                x: location?.longitude ?? 0,
                y: location?.latitude ?? 0,
              },
            }}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldValue,
              touched,
            }) => (
              <View>
                <CustomInput
                  keyboardType="default"
                  label="Full Name"
                  iconName="account"
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                  error={touched.fullName ? errors.fullName : undefined}
                />

                <CustomInput
                  keyboardType="email-address"
                  label="Email"
                  iconName="email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  error={touched.email ? errors.email : undefined}
                />

                <CustomInput
                  secureTextEntry={true}
                  label="Password"
                  iconName="key-chain"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  error={touched.password ? errors.password : undefined}
                />

                <CustomInput
                  keyboardType="numeric"
                  label="Latitude"
                  iconName="map-marker"
                  onChangeText={handleChange("location.y")}
                  onBlur={handleBlur("location.y")}
                  value={values.location.y.toString()}
                  error={touched.location?.y ? errors.location?.y : undefined}
                />

                <CustomInput
                  keyboardType="numeric"
                  label="Longitude"
                  iconName="map-marker"
                  onChangeText={handleChange("location.x")}
                  onBlur={handleBlur("location.x")}
                  value={values.location.x.toString()}
                  error={touched.location?.x ? errors.location?.x : undefined}
                />

                <View style={styles.professionContainer}>
                  <ProfessionModal
                    handleClose={(professions) => {
                      setFieldValue("professions", professions);
                    }}
                  />

                  {errors.professions ? (
                    <Text style={styles.professionTextError}>
                      {CONSTANTS.SIGH_IN_PROFESSION_ERROR}
                    </Text>
                  ) : null}
                </View>

                <View style={styles.saveButtonContainer}>
                  <LoadingButton
                    isLoading={!response.isLoading}
                    label="Save"
                    onPress={() => handleSubmit()}
                  />
                </View>

                {/* <Button
              title="Go login"
              onPress={() => navigation.navigate("Home" as never)}
            /> */}
              </View>
            )}
          </Formik>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  saveButtonContainer: {
    marginTop: 38,
    marginBottom: 38,
  },
  professionContainer: {
    marginTop: 14,
  },
  professionTextError: {
    color: "red",
    marginTop: 6,
  },
});
