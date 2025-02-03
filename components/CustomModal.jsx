// IMPORTS
import { View, Text, StyleSheet, Dimensions, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "./CustomButton";

const { width, height } = Dimensions.get("screen");

export const CustomModal = ({
  visible,
  closeModal,
  title,
  description,
  onConfirm,
  children,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text className="text-primary text-center font-isansdemibold text-[20px] mt-5">
            {title}
          </Text>

          <LinearGradient
            colors={["transparent", "#a8a8a8", "transparent"]}
            style={styles.gradientLineHorizontal}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />

          <Text className="text-gray2 text-center font-isansbold text-[17px] mt-5 px-4">
            {description}
          </Text>

          {children}

          {/* BOTTOM SECTION */}
          <View className="w-full z-10 px-4 py-4">
            <CustomButton
              title="تایید"
              handlePress={onConfirm ? onConfirm : closeModal}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    width: "80%",
    minHeight: 200,
    borderRadius: 4,
    paddingVertical: 10,
  },
  gradientLineHorizontal: {
    height: 2,
    width: "100%",
  },
});
