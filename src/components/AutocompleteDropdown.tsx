import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { CONSTANTS } from "../../CONSTANTS";
import { TAutocompleteDropdownData } from "../../types";

type TArgs = {
  handleItemClick: (item: TAutocompleteDropdownData) => void;
  placeholder?: string;
  title?: string;
  selectedItems: TAutocompleteDropdownData[];
  data: TAutocompleteDropdownData[];
  labels: string[];
  error?: string;
  isLoading: boolean;
};

export function AutocompleteDropdown({
  data,
  error,
  title,
  labels,
  isLoading,
  placeholder = CONSTANTS.AUTOCOMPLETE_DROPDOWN_PLACEHOLDER,
  selectedItems,
  handleItemClick,
}: TArgs) {
  const [search, setSearch] = useState("");

  const getItemText = (item: TAutocompleteDropdownData): string => {
    if (!labels.length) return "";

    return labels.reduce((prevValue, currValue) => {
      const newText = ` ${item[currValue as keyof TAutocompleteDropdownData]}`;
      return prevValue + newText;
    }, "");
  };

  return (
    <View style={styles.container}>
      {title && <Text>{title}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          onChangeText={setSearch}
          value={search}
        />
      </View>
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={CONSTANTS.LOADING_COLOR} />
        </View>
      )}
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const isSelected = selectedItems.find(({ id }) => item.id === id);
          const text = getItemText(item);
          return (
            <TouchableOpacity
              onPress={() => handleItemClick(item as any)}
              style={isSelected ? styles.selected : {}}
            >
              <View style={styles.resultItem}>
                <View>
                  <Text>{text}</Text>
                </View>
                <View>{isSelected && <Icon name="check" />}</View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(_, idx) => idx.toString()}
      />
      <View style={styles.error}>
        {error && (
          <>
            <Text>Error fetching the data: {JSON.stringify(error)}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    marginTop: 12,
    marginBottom: 12,
  },
  error: {
    marginTop: 12,
    marginBottom: 12,
  },
  inputContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 4,
    paddingRight: 4,
  },
  resultItem: {
    padding: 6,
    marginBottom: 4,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginLeft: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selected: {
    opacity: 0.5,
  },
});
