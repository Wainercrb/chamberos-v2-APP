import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './src/store'
import 'react-native-gesture-handler'
// Layouts
import PublicLayout from './src/layouts/PublicLayout'
import { Suspense } from 'react'

export default function App (): JSX.Element {
  return (
    <Suspense fallback={<>Loading</>}>
      <Provider store={store}>
        {/* <NavigationContainer onReady={() => {console.log("ready")}}> */}
          <PublicLayout />
        {/* </NavigationContainer> */}
      </Provider>
    </Suspense>
  )
}
