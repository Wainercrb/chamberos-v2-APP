import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { type TRootStackParamList } from "../../types";
// Pages
import SighInScreen from "../screens/SignInScreen";
import SighUpScreen from "../screens/SignUpScreen";
// Layouts
import PrivateLayout from "./PrivateLayout";
import AuthGuard from "../guards/auth.guard";
// CONSTANTS
import { CONSTANTS } from "../../CONSTANTS";
import { getLocalStorage } from "../utilities/localStorage.utility";
import { useAppDispatch } from "../store";
import { initializeUserSession } from "../store/slices/userSessionSlice";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator<TRootStackParamList>();

export default function PublicLayout() {
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const [navigatorIsReady, setNavigatorIsReady] = useState(false);

  useEffect(() => {
    const buildUserData = async () => {
      try {
        const storedUser = await getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEY);
        if (!storedUser) return;

        dispatch(initializeUserSession(JSON.parse(storedUser)));
      } catch (error) {
      } finally {
        setIsMounted(true);
      }
    };

    buildUserData();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <NavigationContainer onReady={() => setNavigatorIsReady(true)}>
      <Stack.Navigator>
        <Stack.Screen name={"PrivateStack"} options={{ headerShown: false }}>
          {(props) => {
            if (navigatorIsReady) {
              return (
                <AuthGuard
                  Component={PrivateLayout}
                  allowedRoles={["ROLE_ADMIN"]}
                  navigation={props.navigation}
                  redirectTo="SignInScreen"
                />
              );
            }
          }}
        </Stack.Screen>
        <Stack.Screen
          name="SignInScreen"
          options={{ title: CONSTANTS.SCREENS.SIGN_IN.TITLE }}
          component={SighInScreen}
        />
        <Stack.Screen
          name="SignUpScreen"
          options={{ title: CONSTANTS.SCREENS.SIGN_UP.TITLE }}
          component={SighUpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
