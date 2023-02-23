import * as Yup from "yup";
import { Alert, View, Text, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import { CustomInput } from "../components/CustomInput";
import { LoadingButton } from "../components/LoadingButton";
import { useSignInMutation } from "../services/chamberosAPI";
import { CONSTANTS } from "../../CONSTANTS";
import { IUser, THomeStackParamList, TRootStackParamList } from "../../types";

type TAuthScreenNavigationProp = NavigationProp<
  TRootStackParamList,
  "SignInScreen"
>;

const USER_SCHEMA: Yup.Schema<Pick<IUser, "username" | "password">> =
  Yup.object().shape({
    username: Yup.string().required("Full name is required"),
    password: Yup.string().required("Password is required"),
  });

export default function SignInScreen() {
  const [signInUser, response] = useSignInMutation();

  const navigation = useNavigation<TAuthScreenNavigationProp>();

  const handleSubmit = async (user: Pick<IUser, "username" | "password">) => {
    signInUser(user).then(() => {
      navigation.navigate("HomeStack", {} as THomeStackParamList);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {response.error ? <Text>{JSON.stringify(response.error)}</Text> : null}
      </View>
      <Formik
        validationSchema={USER_SCHEMA}
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <CustomInput
              keyboardType="default"
              label="Username"
              iconName="account"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              error={touched.password ? errors.username : undefined}
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

            <View style={styles.saveButtonContainer}>
              <LoadingButton
                isLoading={response.isLoading}
                label={CONSTANTS.SIGN_IN_BUTTON}
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
