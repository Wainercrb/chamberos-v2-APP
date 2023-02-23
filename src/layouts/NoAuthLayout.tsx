import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TRootStackParamList } from "../../types";
// Pages
import SighInScreen from "../screens/SignInScreen";
import SighUpScreen from "../screens/SignUpScreen";
// Layouts
import AuthLayout from "./AuthLayout";
import { CONSTANTS } from "../../CONSTANTS";

const Stack = createStackNavigator<TRootStackParamList>();

export default function NoAuthLayout() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="SignInScreen"
        options={{ title: CONSTANTS.SIGN_IN_SCREEN_TITLE }}
        component={SighInScreen}
      />
      <Stack.Screen
        name="SignUpScreen"
        options={{ title: CONSTANTS.SIGN_UP_SCREEN_TITLE }}
        component={SighUpScreen}
      /> */}
      <Stack.Screen
        name="HomeStack"
        options={{ headerShown: false }}
        component={AuthLayout}
      />
    </Stack.Navigator>
  );
}
