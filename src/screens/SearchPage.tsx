import { useEffect, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { Map } from "../components/Map";
import { useLocation } from "../hooks/useLocation";
import { useLazyGetUsersQuery } from "../services/chamberosAPI";
import { IconButton } from "../components/IconButton";
import { SimpleModal } from "../components/Modal";
import { AutocompleteDropdown } from "../components/AutocompleteDropdown";
import { IProfession } from "../../types";
import { CONSTANTS } from "../../CONSTANTS";
import Slider from "@react-native-community/slider";

export default function SearchPage() {
  const [radius, setRadius] = useState(15);
  const [professionMV, setProfessionMV] = useState(false);
  const [selectedProfessions, setSelectedProfessions] = useState("");
  const { location, locationError } = useLocation();
  const [trigger, result] = useLazyGetUsersQuery();

  const handleTriggerUserData = () => {
    if (location) {
      trigger({
        latitude: location.latitude,
        longitude: location.longitude,
        radius: radius,
        professions: selectedProfessions,
      });
    }
  };

  useEffect(() => {
    handleTriggerUserData();
  }, [location]);

  useEffect(() => {
    if (locationError) {
      Alert.alert("Error getting the your position");
      return;
    }
    if (result.error) {
      Alert.alert("Error fetching the data");
    }
  }, [locationError, result.error]);

  return (
    <View style={styles.container}>
      {location?.latitude && location.longitude && Platform.OS !== "web" ? (
        <>
          <Map users={result.data ?? []} location={location} radius={radius} />
        </>
      ) : (
        <></>
      )}
      <View>
        <SimpleModal
          setModalVisible={setProfessionMV}
          modalVisible={professionMV}
          ChildElement={
            <View style={{ flex: 1 }}>
              <AutocompleteDropdown
                handleItemClick={(professions: IProfession[]) => {
                  const professionsIds = professions.reduce(
                    (prevValue, currValue) => {
                      return (prevValue += currValue.id);
                    },
                    ""
                  );
                  setSelectedProfessions(professionsIds);
                }}
              />
              <Button
                title="Search"
                onPress={() => {
                  setProfessionMV(!professionMV);
                  handleTriggerUserData();
                }}
              />
            </View>
          }
        />
      </View>
      <View style={styles.professionBtn}>
        <IconButton
          iconName="account-search"
          text=""
          size={36}
          handleAction={() => {
            setProfessionMV(true);
          }}
        />
      </View>

      <View style={styles.radiusSlider}>
        <Slider
          step={0.1}
          maximumValue={500}
          minimumValue={0.2}
          style={styles.slider}
          value={radius}
          onValueChange={(value) => {
            setRadius(value);
          }}
          onSlidingComplete={(value) => {
            handleTriggerUserData();
          }}
        />
        <Text style={styles.radiusText}>{radius.toFixed(0)} KM | Results: {result.data?.length ?? 0}</Text>
      </View>

      <View style={styles.loading}>
        {result.isFetching && (
          <ActivityIndicator size="large" color={CONSTANTS.LOADING_COLOR} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  professionBtn: {
    position: "absolute",
    left: 8,
    bottom: 92,
    backgroundColor: "white",
    borderRadius: 20,
  },
  radiusSlider: {
    position: "absolute",
    bottom: 8,
    left: 8,
    padding: 4,
  },
  radiusText: {
    backgroundColor: "white",
    opacity: 0.7,
  },
  loading: {
    position: "absolute",
    top: "50%",
    right: "50%",
  },
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 10,
    backgroundColor: "white",
  },
});
