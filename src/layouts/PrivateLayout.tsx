import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { TAuthStackParamList, THomeStackParamList } from "../../types";
import { CONSTANTS } from "../../CONSTANTS";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Screens
import SearchScreen from "../screens/SearchScreen";
import SignInUserProfileScreen from "../screens/SignInUserProfileScreen";
import MapUserDetailScreen from "../screens/MapUserDetailScreen";

const Tab = createBottomTabNavigator<TAuthStackParamList>();
const Stack = createStackNavigator<THomeStackParamList>();

function SearchStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={SearchScreen} />
      <Stack.Screen name="MapUserDetails" component={MapUserDetailScreen} />
    </Stack.Navigator>
  );
}

export default function PrivateLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search"
        options={{
          headerShown: false,
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}
        component={SearchStackScreen}
      />
      <Tab.Screen
        name="SignInUserProfile"
        options={{
          tabBarLabel: "Profile",
          title: CONSTANTS.SCREENS.SIGN_IN_USER_PROFILE.TITLE,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        component={SignInUserProfileScreen}
      />
    </Tab.Navigator>
  );
}
