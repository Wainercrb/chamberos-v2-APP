import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store";
import "react-native-gesture-handler";
// Layouts
import NoAuthLayout from "./src/layouts/NoAuthLayout";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <NoAuthLayout />
      </Provider>
    </NavigationContainer>
  );
}
