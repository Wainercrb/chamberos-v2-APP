import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Platform,
  View,
  Text,
} from "react-native";
import { useWatchLocation } from "../hooks/useWatchLocation";
import Slider from "@react-native-community/slider";
import { Map } from "../components/Map";
import { ProfessionModal } from "../components/ProfessionModal";
import { useLazyGetUsersQuery } from "../services/chamberosAPI";
import { IProfession } from "../../types";
import { CONSTANTS } from "../../CONSTANTS";

export default function SearchScreen() {
  const { location, locationError, locationMounted } = useWatchLocation();
  const [radius, setRadius] = useState(15);
  const [fetchUsers, users] = useLazyGetUsersQuery();

  const handleTriggerUserData = (
    customRadius?: number,
    professions?: IProfession[]
  ) => {
    if (!location) return;

    fetchUsers(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        radius: customRadius ?? radius,
        professions: getProfessionIds(professions),
      },
      true
    );
  };

  const getProfessionIds = (professions: IProfession[] | undefined) => {
    if (!professions) return users.originalArgs?.professions ?? '';
    return professions.reduce((prev, curr) => (prev += `,${curr.id}`), "");
  };

  useEffect(() => {
    if (!locationMounted) return;

    handleTriggerUserData();
  }, [location]);

  return (
    <View style={styles.container}>
      {location && Platform.OS !== "web" ? (
        <>
          {/* <Map users={users.data ?? []} location={location} radius={radius} /> */}
        </>
      ) : null}
      <View style={styles.professionButtonContainer}>
        <ProfessionModal
          closeCallbackAction={(professions) =>
            handleTriggerUserData(undefined, professions)
          }
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
      ) : null}

      {users.error || locationError ? (
        <View style={styles.errorContainer}>
          <Text>{JSON.stringify(users.error)}</Text>
          <Text>{JSON.stringify(locationError)}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
