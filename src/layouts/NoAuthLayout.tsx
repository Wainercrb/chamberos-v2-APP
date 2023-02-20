import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TRootStackParamList } from "../../types";
// Pages
import SighInScreen from "../screens/SignInScreen";
// Layouts
import AuthLayout from "./AuthLayout";

const Stack = createStackNavigator<TRootStackParamList>();

export default function NoAuthLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={SighInScreen} />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={AuthLayout}
      />
    </Stack.Navigator>
  );
}
