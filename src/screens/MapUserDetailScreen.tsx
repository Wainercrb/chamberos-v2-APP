import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { type TMapStackParamList } from "../../types";
import { CONSTANTS } from "../../CONSTANTS";

interface IProps {
  route: RouteProp<Pick<TMapStackParamList, "MapUserDetails">>;
}

const MapUserDefaultScreen: FC<IProps> = ({ route }) => {
  const { user } = route.params;

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>
          {CONSTANTS.SCREENS.MAP_USER_DETAILS.ERROR_GETTING_THE_USER_PROP}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.fullName}>{user.fullName}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.professionsContainer}>
          <Text style={styles.sectionTitle}>Professions:</Text>
          {user.professions.map((profession) => (
            <View key={profession.id} style={styles.professionContainer}>
              <Text style={styles.professionName}>{profession.name}</Text>
              {/* <Text style={styles.professionRole}>{profession.role}</Text> */}
            </View>
          ))}
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.sectionTitle}>Location:</Text>
          <Text style={styles.locationText}>
            {user.location.x}, {user.location.y}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  content: {
    flex: 1,
  },
  professionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  professionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  professionName: {
    fontSize: 16,
    marginRight: 10,
  },
  professionRole: {
    fontSize: 16,
    color: "#666",
  },
  locationContainer: {
    marginTop: 20,
  },
  locationText: {
    fontSize: 16,
    color: "#666",
  },
});

export default MapUserDefaultScreen;
