import React, { useState, useRef, useEffect, LegacyRef } from "react";
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
  const mapViewRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (mapViewRef.current) {
      setRegion((prevState) => ({
        ...prevState,
        latitudeDelta: 2.0922,
        longitudeDelta: 2.0421,
      }));
      mapViewRef.current?.animateToRegion(region, 1000);
    }
  }, [radius]);

  return (
    <View style={styles.container}>
      <MapView ref={mapViewRef} style={styles.map} initialRegion={region}>
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
            onPress={() => {
              setRegion((prevState) => ({
                latitude: location.y,
                longitude: location.x,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }));

              mapViewRef.current?.animateToRegion(region, 1000);
            }}
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
