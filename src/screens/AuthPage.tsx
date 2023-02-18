import {
  Text,
  Button,
  View,
  TextInput,
  Alert,
  StyleSheet,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import { IUser, TAutocompleteDropdownData } from "../../types";
import { useLocation } from "../hooks/useLocation";
import {
  useCreateUserMutation,
  useLazyGetProfessionsQuery,
} from "../services/chamberosAPI";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CustomInput } from "../components/CustomInput";
import { SimpleModal } from "../components/Modal";
import { AutocompleteDropdown } from "../components/AutocompleteDropdown";
import { CONSTANTS } from "../../CONSTANTS";
import { IconButton } from "../components/IconButton";

const INIT_SEL_PROFESSION: TAutocompleteDropdownData[] = [];

export function AuthPage() {
  const { location, locationError } = useLocation();
  const [createUser, response] = useCreateUserMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [professionModalOpen, setProfessionModalOpen] = useState(false);
  const [selProfessions, setSelProfessions] = useState(INIT_SEL_PROFESSION);
  const [fetchProfessions, professions] = useLazyGetProfessionsQuery();

  const navigation = useNavigation();

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
  };

  const handleMapSearchClick = (_: GestureResponderEvent) => {
    if (!professions.data || !professions.data.length) {
      fetchProfessions({ name: "" });
    }
    setProfessionModalOpen(true);
  };

  console.log("location", location);

  return (
    <View style={styles.container}>
      {!location && !locationError ? (
        <>
          <ActivityIndicator size="large" color={CONSTANTS.LOADING_COLOR} />
        </>
      ) : (
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            password: "",
            professions: [{ name: "", role: "FULLTIME" }],
            location: {
              x: location?.longitude ?? 0,
              y: location?.latitude ?? 0,
            },
          }}
          onSubmit={(values: any) => {
            const newUser = {
                ...values,
                professions: selProfessions
            }
            setIsLoading(true);
            createUser(newUser)
              .unwrap()
              .then(() => {})
              .then((error) => {
                console.log(error);
                Alert.alert("New use added successfully")
              })
              .finally(() => {
                setIsLoading(false);
              });
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
              <CustomInput
                label="Full Name"
                iconName="account"
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
                error={errors.fullName}
              />

              <CustomInput
                label="Email"
                iconName="email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                error={errors.email}
              />

              <CustomInput
                label="Password"
                iconName="key-chain"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                error={errors.password}
              />

              <CustomInput
                label="Latitude"
                iconName="map-marker"
                onChangeText={handleChange("location.y")}
                onBlur={handleBlur("location.y")}
                value={values.location.y.toString()}
                error={errors.location?.y}
              />

              <CustomInput
                label="Longitude"
                iconName="map-marker"
                onChangeText={handleChange("location.x")}
                onBlur={handleBlur("location.x")}
                value={values.location.x.toString()}
                error={errors.location?.x}
              />

              <View>
                <IconButton
                  iconName="account-search"
                  text={CONSTANTS.SEARCH_PROFESSION_MODAL}
                  size={36}
                  handleAction={handleMapSearchClick}
                />
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

              <Button
                disabled={isLoading}
                onPress={(e: any) => handleSubmit(e)}
                title="Submit"
              />
              <Button
                title="Go login"
                onPress={() => navigation.navigate("Home" as never)}
              />
            </View>
          )}
        </Formik>
      )}
    </View>
  );
  //   return (
  //     <>
  //       <Text>Home page</Text>
  //       <Button
  //         title="Go to Jane's profile"
  //         onPress={() => navigation.navigate("Home" as never)}
  //       />
  //     </>
  //   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  //   inputContainer1: {
  //     backgroundColor: "red",
  //     marginBottom: 6,
  //   },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 24,
    color: "#222",
  },
  inputLabel: {
    fontSize: 16,
    lineHeight: 24,
    color: "#999",
    marginBottom: 8,
  },
  inputError: {
    color: "red",
  },
});
