import { useEffect, useState } from "react";
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
import { useGetProfessionsQuery } from "../services/chamberosAPI";
import { IProfession } from "../../types";
import { CONSTANTS } from "../../CONSTANTS";

type TArgs = {
  handleItemClick: (professions: IProfession[]) => void;
  placeholder?: string;
  title?: string;
};

export function AutocompleteDropdown({
  handleItemClick,
  placeholder = "Search",
  title,
}: TArgs) {
  const [search, setSearch] = useState("");
  const [selectedItems, setSelectedItems] = useState<IProfession[]>([]);
  const { data, refetch, isFetching, error } = useGetProfessionsQuery({
    name: search,
  });

  useEffect(() => {
    if (isFetching) return;

    const delayDebounceFn = setTimeout(refetch, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSelectItem = (item: IProfession) => {
    const itemIsAlreadyStored = selectedItems.find(({ id }) => id === item.id);
    if (itemIsAlreadyStored) {
      setSelectedItems((prevState) =>
        prevState.filter(({ id }) => id !== item.id)
      );
      return;
    }
    setSelectedItems((prevState) => [...prevState, item]);
    handleItemClick(selectedItems);
  };

  return (
    <View style={styles.container}>
      {title && <Text>Filter By</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          onChangeText={setSearch}
          value={search}
        />
      </View>
      {isFetching && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={CONSTANTS.LOADING_COLOR} />
        </View>
      )}
      <FlatList
        data={data}
        renderItem={({ item }) => {
          const isSelected = selectedItems.find(({ id }) => item.id === id);
          return (
            <TouchableOpacity
              onPress={() => handleSelectItem(item)}
              style={isSelected ? styles.selected : {}}
            >
              <View style={styles.resultItem}>
                <View>
                  <Text>{item.name}</Text>
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
