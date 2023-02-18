import { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Platform,
  GestureResponderEvent,
} from "react-native";
import {
  useLazyGetUsersQuery,
  useLazyGetProfessionsQuery,
} from "../services/chamberosAPI";
import { Map } from "../components/Map";
import { useLocation } from "../hooks/useLocation";
import { useWatchLocation } from "../hooks/useWatchLocation";
import { IconButton } from "../components/IconButton";
import { SimpleModal } from "../components/Modal";
import { AutocompleteDropdown } from "../components/AutocompleteDropdown";
import { TAutocompleteDropdownData } from "../../types";
import { CONSTANTS } from "../../CONSTANTS";
import Slider from "@react-native-community/slider";

const INIT_SEL_PROFESSION: TAutocompleteDropdownData[] = [];

export default function SearchPage() {
  const { location, locationError } = useWatchLocation();
  const [radius, setRadius] = useState(15);
  const [professionModalOpen, setProfessionModalOpen] = useState(false);
  const [selProfessions, setSelProfessions] = useState(INIT_SEL_PROFESSION);
  const [fetchUsers, users] = useLazyGetUsersQuery();
  const [fetchProfessions, professions] = useLazyGetProfessionsQuery();

  const handleTriggerUserData = (value?: number) => {
    if (!location) return;

    const textProfession = selProfessions.reduce(
      (prev, curr) => prev + `,${curr.id}`,
      ""
    );

    fetchUsers({
      latitude: location.coords.latitude,
      longitude: location.coords.latitude,
      radius: value ?? radius,
      professions: textProfession,
    });
  };

  useEffect(() => {
    handleTriggerUserData();
  }, [location]);

  const handleSelectedSearchItem = (item: TAutocompleteDropdownData) => {
    const itemIsAlreadyStored = selProfessions.find(({ id }) => item.id === id);
    if (!itemIsAlreadyStored) {
      setSelProfessions((prevState) => [...prevState, item]);
      return;
    }
    setSelProfessions(
      selProfessions.filter(({ id }) => itemIsAlreadyStored.id !== id)
    );
  };

  const handleModalSearchClick = (_: GestureResponderEvent) => {
    setProfessionModalOpen(!professionModalOpen);
    handleTriggerUserData();
  };

  const handleMapSearchClick = (_: GestureResponderEvent) => {
    if (!professions.data || !professions.data.length) {
      fetchProfessions({ name: "" });
    }
    setProfessionModalOpen(true);
  };

  return (
    <View style={styles.container}>
      {location?.coords.latitude &&
      location.coords.longitude &&
      Platform.OS !== "web" ? (
        <>
          <Map users={users.data ?? []} location={location} radius={radius} />
        </>
      ) : (
        <></>
      )}
      <View>
        <SimpleModal
          setModalVisible={setProfessionModalOpen}
          modalVisible={professionModalOpen}
          ChildElement={
            <View style={{ flex: 1 }}>
              <AutocompleteDropdown
                title={CONSTANTS.SEARCH_PROFESSION_MODAL}
                selectedItems={selProfessions}
                data={professions.data ?? []}
                error={JSON.stringify(professions.error)}
                isLoading={professions.isFetching}
                labels={["name", "role"]}
                handleItemClick={handleSelectedSearchItem}
              />
              <Button title="Search" onPress={handleModalSearchClick} />
            </View>
          }
        />
      </View>
      <View style={styles.professionButtonContainer}>
        <IconButton
          iconName="account-search"
          text=""
          size={36}
          handleAction={handleMapSearchClick}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Slider
          step={0.1}
          maximumValue={500}
          minimumValue={0.2}
          style={styles.slider}
          value={radius}
          onValueChange={setRadius}
          onSlidingComplete={handleTriggerUserData}
        />
        <Text style={styles.radiusText}>
          {radius.toFixed(0)} KM | Results: {users.data?.length ?? 0}
        </Text>
      </View>

      {users.isFetching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={CONSTANTS.LOADING_COLOR} />
        </View>
      ) : (
        <></>
      )}

      {users.error || locationError ? (
        <View style={styles.professionButtonContainer}>
          <Text>{JSON.stringify(users.error)}</Text>
          <Text>{JSON.stringify(locationError)}</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: "relative",
  },
  professionButtonContainer: {
    position: "absolute",
    left: 8,
    bottom: 92,
    backgroundColor: "white",
    borderRadius: 20,
  },
  sliderContainer: {
    position: "absolute",
    bottom: 8,
    left: 8,
    padding: 4,
  },
  radiusText: {
    backgroundColor: "white",
    opacity: 0.7,
  },
  loadingContainer: {
    position: "absolute",
    top: "40%",
    right: "50%",
  },
  errorContainer: {
    top: 0,
    left: "50%",
  },
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 10,
    backgroundColor: "white",
  },
});
