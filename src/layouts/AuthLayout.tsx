import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Pages
import SearchPage from "../../src/screens/SearchPage";
import ProfilePage from "../../src/screens/ProfilePage";

const Tab = createBottomTabNavigator();

export default function AuthLayout() {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}
        component={SearchPage}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
}
