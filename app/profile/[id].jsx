// NATIVE IMPORTS
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO
import { useLocalSearchParams, router } from "expo-router";
import { Feather } from "@expo/vector-icons";

// COMPONENTS
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

// ASSETS
import images from "@/constants/images";

const UserProfile = () => {
  const { id } = useLocalSearchParams(id);

  return (
    <SafeAreaView className="w-full h-full bg-white relative justify-between px-5 gap-y-[30px]">
      <Pressable onPress={() => router.back()}>
        <Feather
          name="arrow-left"
          size={25}
          color="#333"
          style={styles.backIcon}
        />
      </Pressable>

      <View className="flex justify-center items-center">
        <View style={styles.imageBg}>
          <Image
            source={images.profile}
            style={styles.image}
            resizeMethod="contain"
          />

          <Pressable style={styles.edit}>
            <Feather name="edit-2" size={15} color="#333" />
          </Pressable>
        </View>
      </View>

      {/* FORM FIELDS */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View className="flex-row justify-between items-center mt-5">
            <View className="flex-1 mr-2">
              <FormField
                title="نام خانوادگی :"
                keyboardType="default"
                type={"text"}
                height={"h-10"}
              />
            </View>
            <View className="flex-1 ml-2">
              <FormField
                title="نام :"
                keyboardType="default"
                type={"text"}
                height={"h-10"}
              />
            </View>
          </View>

          <View className="mt-2">
            <FormField
              title="کد ملی :"
              keyboardType="text"
              type={"text"}
              height={"h-10"}
              style={{ color: "#666666" }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* BOTTOM SECTION */}

      <CustomButton
        title="ذخیره"
        handlePress={() => {}}
        titleColor={"text-white"}
        bgColor={"bg-green-600"}
      />
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  backIcon: {
    marginRight: "auto",
    marginLeft: 10,
    marginTop: 10,
  },
  userIcon: {
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    borderRadius: 200,
    width: 90,
    height: 90,
  },
  imageBg: {
    width: 120,
    height: 120,
    borderRadius: 200,
    backgroundColor: "#d2d2d2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  edit: {
    position: "absolute",
    left: 10,
    bottom: 2,
    backgroundColor: "#e8e8e8",
    borderRadius: 200,
    padding: 10,
  },
});
