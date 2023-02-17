import { Modal, StyleSheet, View } from "react-native";
import { IconButton } from "./IconButton";

type TArgs = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  ChildElement: JSX.Element;
};

export function SimpleModal({
  modalVisible,
  setModalVisible,
  ChildElement,
}: TArgs) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.body}>
          <View style={styles.main}>
            <View style={styles.header}>
              <IconButton
                text=""
                iconName="close"
                size={36}
                handleAction={() => {
                  setModalVisible(!modalVisible);
                }}
              />
            </View>
            {ChildElement}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // height: "30",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  body: {
    width: "100%",
    height: "100%",
    padding: 23,
  },
  main: {
    padding: 16,
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    height: "100%",
  },
});
