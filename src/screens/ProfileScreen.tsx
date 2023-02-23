import { GestureResponderEvent, Text } from "react-native";
import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";
import { IUser } from "../../types";
import { useLocation } from "../hooks/useLocation";
import { useCreateUserMutation } from "../services/chamberosAPI";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [createUser, response] = useCreateUserMutation();
  const [isLoading, setIsLoading] = useState(false);

  const { location, locationError } = useLocation();

  if (locationError) {
    return <Text>{locationError}</Text>;
  }

  if (!location) {
    return <Text>Loading...</Text>;
  }

  const initialValues: IUser = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    professions: [{ name: "", role: "FULLTIME" }],
    location: { x: 0, y: 0 },
  };
  return (
    <Formik
      initialValues={{
        ...initialValues,
        location: { y: location.latitude, x: location.longitude },
      }}
      onSubmit={(values: any) => {
        setIsLoading(true);
        createUser(values)
          .unwrap()
          .then(() => {})
          .then((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <View>
            <Text>Full Name</Text>
            <TextInput
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
            />
          </View>

          <View>
            <Text>Email</Text>
            <TextInput
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
          </View>

          <View>
            <Text>Password</Text>
            <TextInput
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
          </View>

          <View>
            <Text>Latitude</Text>
            <TextInput value={values.location.x.toString()} />
          </View>
          <View>
            <Text>Longitude</Text>
            <TextInput value={values.location.y.toString()} />
          </View>
          <Button
            disabled={isLoading}
            onPress={(e: any) => handleSubmit(e)}
            title="Submit"
          />
          <Button
            title="Go login"
            onPress={() => navigation.navigate("Auth" as never)}
          />
        </View>
      )}
    </Formik>
  );
}
