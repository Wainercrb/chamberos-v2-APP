import { ActivityIndicator, View, StyleSheet } from "react-native";
import { CONSTANTS } from "../../CONSTANTS";

type TProps = {
  size?: number | "large" | "small" | undefined;
  isFullSize?: boolean;
};

export function Loading({ size = "large", isFullSize = true }: TProps) {
  return (
    <View style={isFullSize ? styles.container : {}}>
      <ActivityIndicator size={size} color={CONSTANTS.LOADING_COLOR} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
