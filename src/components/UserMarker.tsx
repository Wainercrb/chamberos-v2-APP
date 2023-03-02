import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Marker, LatLng } from "react-native-maps";

interface IProps {
  location: LatLng | null;
}

export const UserMarker: FC<IProps> = ({ location }) => {
  if (!location) return null;

  return (
    <Marker coordinate={location} anchor={{ x: 0.5, y: 0.5 }}>
      <View style={styles.container}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle} />
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 255, 0.5)",
    backgroundColor: "rgba(0, 0, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 255, 0.5)",
  },
});
