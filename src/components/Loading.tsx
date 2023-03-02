import { FC } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { CONSTANTS } from "../../CONSTANTS";

interface IProps {
  size?: number | "large" | "small" | undefined;
  isFullSize?: boolean;
  message?: string;
}

export const Loading: FC<IProps> = ({
  message,
  size = "large",
  isFullSize = true,
}) => (
  <View style={isFullSize ? styles.container : {}}>
    <ActivityIndicator size={size} color={CONSTANTS.LOADING_COLOR} />
    {message ? (
      <View style={styles.message}>
        <Text>{message}</Text>
      </View>
    ) : null}
  </View>
);

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
