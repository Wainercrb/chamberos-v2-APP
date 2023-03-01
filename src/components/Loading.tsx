import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { CONSTANTS } from "../../CONSTANTS";

type TProps = {
  size?: number | "large" | "small" | undefined;
  isFullSize?: boolean;
  message?: string;
};

export function Loading({
  message,
  size = "large",
  isFullSize = true,
}: TProps) {
  return (
    <View style={isFullSize ? styles.container : {}}>
      <ActivityIndicator size={size} color={CONSTANTS.LOADING_COLOR} />
      {message ? (
        <View style={styles.message}>
          <Text>{message}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    marginTop: 16,
  },
});
