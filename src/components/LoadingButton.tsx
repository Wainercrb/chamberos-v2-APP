import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { CONSTANTS } from "../../CONSTANTS";

type TProps = {
  label: string;
  labelLoading?: string;
  isLoading: boolean;
  onPress: (e: GestureResponderEvent) => void;
};

export function LoadingButton({
  labelLoading = CONSTANTS.LOADING_BUTTON_LABEL,
  label,
  onPress,
  isLoading,
}: TProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={isLoading}
        onPress={(e) => {
          onPress(e);
        }}
      >
        <View
          style={styles.button}
        >
          {isLoading && <ActivityIndicator size="small" color={CONSTANTS.LOADING_COLOR} />}
          <Text style={styles.buttonText}>
            {isLoading ? labelLoading : label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(33, 150, 243)",
    padding: 8,
    borderRadius: 2
  },
  buttonText: {
    color: "rgb(255, 255, 255)",
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: 14,
    paddingLeft: 6,
    paddingRight: 6
  },
});
