import { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  View,
  Text,
} from "react-native";
import {
  apiChamberos,
  useLazyGetProfessionsQuery,
} from "../services/chamberosAPI";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { SimpleModal } from "./Modal";
import { CustomInput } from "./CustomInput";
import { ErrorFeedback } from "./ErrorFeedback";
import { IconButton } from "./IconButton";
import { IProfession } from "../../types";
import { CONSTANTS } from "../../CONSTANTS";
import { AppDispatch, RootState } from "../store";
import {
  updateProfessionName,
  setInitialize,
} from "../store/slices/searchProfessionSlice";

type TProps = {
  closeCallbackAction: (professions: IProfession[]) => void;
  buttonLabel?: string;
};

export function ProfessionModal({
  closeCallbackAction,
  buttonLabel = CONSTANTS.COMPONENTS.PROFESSIONAL_MODAL.INPUT_LABEL,
}: TProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [inputClicked, setInputClicked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fetchProfessions, professions] = useLazyGetProfessionsQuery();
  const { professionName } = useSelector(
    (state: RootState) => state.searchProfession
  );

  useEffect(() => {
    if (!inputClicked) return;

    const delayDebounceFn = setTimeout(() => {
      fetchProfessions({ professionName });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [professionName]);

  const setProfessionName = (value: string) => {
    dispatch(updateProfessionName(value));
  };

  const handleMapSearchClick = (_: GestureResponderEvent) => {
    if (!professions.data || !professions.data.length) {
      fetchProfessions({ professionName });
      dispatch(setInitialize(true));
    }
    setModalOpen(true);
  };

  const changeSelectedProfessionState = (
    professions: IProfession[],
    id: string | undefined
  ) => {
    if (!id) return professions;

    return professions.map((profession) => {
      const found = profession.id === id;
      if (found) {
        profession.isSelected = !profession.isSelected;
      }
      return profession;
    });
  };

  const handleClose = () => {
    const selectedProfessions = (professions.data ?? []).filter(
      ({ isSelected }) => isSelected
    );

    setModalOpen(false);
    closeCallbackAction(selectedProfessions);
  };

  const updateQueryData = ({ id }: IProfession) => {
    const parameters = {
      professionName,
    };
    dispatch(
      apiChamberos.util.updateQueryData(
        "getProfessions",
        parameters,
        (professions: IProfession[]) => {
          changeSelectedProfessionState(professions, id);
        }
      )
    );
  };

  return (
    <View>
      <IconButton
        iconName="account-search"
        handleAction={handleMapSearchClick}
        text={buttonLabel}
      />
      <SimpleModal
        setModalVisible={setModalOpen}
        modalVisible={modalOpen}
        childElement={
          <>
            <CustomInput
              iconName="card-search-outline"
              label={CONSTANTS.COMPONENTS.PROFESSIONAL_MODAL.INPUT_LABEL}
              onFocus={() => setInputClicked(true)}
              onChangeText={setProfessionName}
              value={professionName}
            />
            <FlatList
              data={professions.data}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => updateQueryData(item)}
                    style={item.isSelected ? styles.selected : {}}
                  >
                    <View style={styles.resultItem}>
                      <View>
                        <Text>{item.name}</Text>
                      </View>
                      <View>{item.isSelected && <Icon name="check" />}</View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(_, idx) => idx.toString()}
            />
            {professions.error ? (
              <View style={styles.error}>
                <ErrorFeedback error={professions.error} />
              </View>
            ) : null}
            <Button
              title={CONSTANTS.COMPONENTS.PROFESSIONAL_MODAL.INPUT_LABEL}
              onPress={handleClose}
            />
          </>
        }
      />
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
