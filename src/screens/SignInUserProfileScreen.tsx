import { GestureResponderEvent, Text, StyleSheet } from "react-native";
import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";
import { IUser } from "../../types";
import { useLocation } from "../hooks/useLocation";
import {
  useCreateUserMutation,
  useGetUserQuery,
} from "../services/chamberosAPI";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { resetUserSession } from "../store/slices/userSessionSlice";
import { clearLocalStorage } from "../utilities/localStorage.utility";
import { CONSTANTS } from "../../CONSTANTS";
import { Loading } from "../components/Loading";

export default function SignInUserProfileScreen() {
  const { id } = useSelector((state: RootState) => state.userSession.user);
  const { data: user, isLoading } = useGetUserQuery({ userId: id });

  if (isLoading) {
    return <Loading isFullSize />;
  }

  if (!user) return <></>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.fullName}</Text>
      <Text style={styles.subtitle}>{user.email}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professions</Text>
        {user.professions.map((profession) => (
          <Text key={profession.id} style={styles.item}>
            {profession.name}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Roles</Text>
        {user.roles.map((role) => (
          <Text key={role.id} style={styles.item}>
            {role.name}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.item}>x: {user.location.x}</Text>
        <Text style={styles.item}>y: {user.location.y}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Is Active</Text>
        <Text style={styles.item}>{user.isActive ? "YES" : "NO"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
});
