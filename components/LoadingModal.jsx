// IMPORTS
import { View, StyleSheet, Dimensions, Modal } from "react-native";
import Background from "@/components/Background";
import { Chase } from "react-native-animated-spinkit";

const { width, height } = Dimensions.get("screen");

export const LoadingModal = ({ visible }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      statusBarTranslucent={true}
    >
      <Background>
        <View style={styles.content}>
          <Chase size={50} color="#164194" />
        </View>
      </Background>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
});
