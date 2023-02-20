import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type TProps = {
  label: string;
  error?: string;
  iconName?: string;
} & TextInputProps;

export function CustomInput({ label, error, iconName, ...rest }: TProps) {
  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={[styles.inputContainer, error ? styles.inputError : {}]}>
        {iconName && <Icon name={iconName} size={24} color="#999" />}
        <TextInput style={styles.input} {...rest} />
      </View>
      {error && <Text style={styles.textError}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 4,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 24,
    color: "#222",
  },
  inputLabel: {
    marginTop: 6,
    fontSize: 16,
    lineHeight: 24,
    color: "#999",
  },
  inputError: {
    borderColor: "red",
    borderRadius: 2,
    borderWidth: 2,
  },
  textError: {
    color: 'red'
  }
});
