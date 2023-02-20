import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { TAuthStackParamList, THomeStackParamList } from "../../types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Pages
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UserDetailScreen from "../screens/UserDetailScreen";

const Tab = createBottomTabNavigator<TAuthStackParamList>();
const Stack = createStackNavigator<THomeStackParamList>();

function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Map" component={SearchScreen} />
      <Stack.Screen name="UserDetails" component={UserDetailScreen} />
    </Stack.Navigator>
  );
}

export default function AuthLayout() {
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
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
