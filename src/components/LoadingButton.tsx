import {
  GestureResponderEvent,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CONSTANTS } from "../../CONSTANTS";

type TProps = {
  label: string;
  labelLoading?: string;
  isLoading: boolean;
  onPress: (e: GestureResponderEvent) => void;
};

export function LoadingButton({
  labelLoading = CONSTANTS.COMPONENTS.LOADING_BUTTON.TEXT,
  label,
  onPress,
  isLoading,
}: TProps) {
  return (
    <TouchableOpacity disabled={isLoading} onPress={onPress}>
      <View style={styles.button}>
        {isLoading && (
          <ActivityIndicator size="small" color={CONSTANTS.LOADING_COLOR} />
        )}
        <Text style={styles.buttonText}>
          {isLoading ? labelLoading : label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(33, 150, 243)",
    padding: 8,
    borderRadius: 2,
  },
  buttonText: {
    color: "rgb(255, 255, 255)",
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: 14,
    paddingLeft: 6,
    paddingRight: 6,
  },
});
