import MapView, { Marker, Circle, LatLng } from "react-native-maps";
import { useRef, useEffect } from "react";
import { StyleSheet, View, Platform, Dimensions } from "react-native";
import { IUser, THomeStackParamList } from "../../types";
import { LocationObject } from "expo-location";
import { UserMarker } from "./UserMarkert";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type TArgs = {
  users: IUser[];
  location: LocationObject;
  radius: number;
};

type THomeScreenNavigationProp = NavigationProp<THomeStackParamList, "Map">;

export function Map({ users, location, radius }: TArgs) {
  const mapViewRef = useRef<MapView>(null);
  const navigation = useNavigation<THomeScreenNavigationProp>();

  useEffect(() => {
    if (mapViewRef.current) {
      const { latitude, longitude } = location.coords;
      const center = handleCenterMap({ latitude, longitude }, radius);
      mapViewRef.current?.animateToRegion(center, 1000);
    }
  }, [radius]);

  const handleMarkerPress = (user: IUser) => {
    const { location } = user;
    handleCenterMap({ latitude: location.y, longitude: location.x }, radius);
    navigation.navigate("UserDetails", { user });
  };

  const handleCenterMap = (center: LatLng, radiusInKilometers: number) => {
    const { width, height } = Dimensions.get("window");
    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = Platform.OS === "ios" ? 1.5 : 0.5;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    return {
      ...center,
      latitudeDelta: LATITUDE_DELTA * Number(radiusInKilometers / 15),
      longitudeDelta: LONGITUDE_DELTA * Number(radiusInKilometers / 15),
    };
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={handleCenterMap({ ...location.coords }, radius)}
      >
        <UserMarker location={location.coords} />
        <Circle
          center={location.coords}
          radius={radius * 1000}
          strokeWidth={1}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(230,238,255,0.5)"}
        />
        {users.map((user, idx) => (
          <Marker
            onPress={() => handleMarkerPress(user)}
            key={user.id}
            coordinate={{
              latitude: user.location.y,
              longitude: user.location.x,
            }}
            title={user.fullName}
          ></Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
