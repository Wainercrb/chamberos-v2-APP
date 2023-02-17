import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type TArgs = {
  iconName: string;
  text: string;
  size?: number;
  handleAction: ((event: GestureResponderEvent) => void) | undefined;
};

export function IconButton({ iconName, text, handleAction, size=24 }: TArgs) {
  return (
    <TouchableOpacity onPress={handleAction}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name={iconName} size={size} />
        <Text style={{ fontSize: 16 }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
