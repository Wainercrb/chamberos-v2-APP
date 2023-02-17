import MapView, { Marker, Circle } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { IUser } from "../../types";
import { LocationObjectCoords } from "expo-location";

type TArgs = {
  users: IUser[];
  location: LocationObjectCoords;
  radius: number;
};

export function Map({ users, location, radius }: TArgs) {
  console.log(radius);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={location} />
        <Circle
          center={location}
          radius={radius * 1000}
          strokeWidth={1}
          strokeColor={"#1a66ff"}
          fillColor={"rgba(230,238,255,0.5)"}
        />
        {users.map(({ location, id }, idx) => (
          <Marker
            key={id}
            coordinate={{ latitude: location.y, longitude: location.x }}
            title={`Marker ${idx + 1}`}
          />
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
