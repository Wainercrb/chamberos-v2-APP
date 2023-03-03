import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { CONSTANTS } from '../../CONSTANTS'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  type IPrivateStackParamList,
  type IMapStackParamList
} from './index'

// Screens
import SearchScreen from '../screens/SearchScreen'
import SignInUserProfileScreen from '../screens/SignInUserProfileScreen'
import MapUserDetailScreen from '../screens/MapUserDetailScreen'

const Tab = createBottomTabNavigator<IPrivateStackParamList>()
const Stack = createStackNavigator<IMapStackParamList>()

function SearchStackScreen (): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        options={{ title: CONSTANTS.SCREENS.MAP.TITLE }}
        component={SearchScreen}
      />
      <Stack.Screen
        name="MapUserDetails"
        initialParams={{ user: undefined }}
        options={{ title: CONSTANTS.SCREENS.MAP_USER_DETAILS.TITLE }}
        component={MapUserDetailScreen}
      />
    </Stack.Navigator>
  )
}

export default function PrivateLayout (): JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search"
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          )
        }}
        component={SearchStackScreen}
      />
      <Tab.Screen
        name="SignInUserProfile"
        options={{
          tabBarLabel: 'Profile',
          title: CONSTANTS.SCREENS.SIGN_IN_USER_PROFILE.TITLE,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          )
        }}
        component={SignInUserProfileScreen}
      />
    </Tab.Navigator>
  )
}
