import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// Pages
AuthPage;
import { AuthPage } from "../screens/AuthPage";
// Layouts
import AuthLayout from "./AuthLayout";

const Stack = createStackNavigator();

export default function NoAuthLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={AuthPage} />
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
        component={AuthLayout}
      />
    </Stack.Navigator>
  );
}
