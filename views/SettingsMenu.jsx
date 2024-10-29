// REACT IMPORTS
import { useState } from "react";

// NATIVE IMPORTS
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// STORE
import { useUserStore } from "@/store";

// EXPO IMPORTS
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// APIs
import { logout } from "@/api/auth";

// COMPONSNETS
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";

// ASSETS
import images from "@/constants/images";

const SettingsMenu = ({ closeHandler }) => {
  // ACCESS GLOBAL STATES
  const mobile = useUserStore((state) => state.mobile);
  const user = useUserStore((state) => state.userData);

  // LOADING STATE
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  // HANDLE LOGOUT
  const handleLogout = async () => {
    setIsLogoutLoading(true);
    try {
      await logout();
    } finally {
      setIsLogoutLoading(false);
    }
  };

  return (
    <Background>
      <SafeAreaView className="w-full h-fullrelative px-2 gap-y-[30px]">
        <TouchableOpacity onPress={closeHandler}>
          <Feather
            name="arrow-right"
            size={25}
            color="#333"
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Pressable
          className="w-full justify-between items-center flex-row"
          onPress={() => router.push(`profile/${user.id}`)}
        >
          <Feather name="edit-2" size={25} color="#333" />

          <View className="justify-center items-center flex-row gap-5">
            <View>
              <Text className="text-black font-isansmedium text-right">
                نام کاربری
              </Text>
              <Text className="text-black font-isansregular">
                {mobile || (
                  <Text className="italic text-red-600 text-sm">ثبت نشده</Text>
                )}
              </Text>
            </View>

            <Feather
              name="user"
              size={30}
              color="#333"
              style={styles.userIcon}
            />
          </View>
        </Pressable>

        <View className="w-full h-[2px] bg-grey3 rounded-lg" />

        <View className="gap-y-6">
          <View className="flex-row items-center justify-between w-full">
            <Text className="text-grey5 font-isansmedium text-[12px]">
              ویرایش آدرس ها
            </Text>

            <View className="flex-row items-center justify-center gap-x-2">
              <View>
                <Text className="text-black font-isansbold text-[15px] text-right">
                  آدرس ها
                </Text>
                <Text className="text-grey5 font-isansmedium text-[12px]">
                  آدرس های ثبت شده
                </Text>
              </View>

              <Feather name="map" size={25} color="#333" />
            </View>
          </View>

          <View className="flex-row items-center justify-between w-full">
            <Text className="text-grey5 font-isansmedium text-[12px]">
              دریافت اطلاعات مراکز
            </Text>

            <View className="flex-row items-center justify-center gap-x-2">
              <View>
                <Text className="text-black font-isansbold text-[15px] text-right">
                  مراکز پستی
                </Text>
                <Text className="text-grey5 font-isansmedium text-[12px]">
                  دریافت اطلاعات مراکز
                </Text>
              </View>

              <Feather name="mail" size={25} color="#333" />
            </View>
          </View>

          <View className="w-full h-[2px] bg-grey3 rounded-lg" />

          <View className="flex-row items-center justify-end w-full">
            <View className="flex-row items-center justify-center gap-x-2">
              <View>
                <Text className="text-black font-isansbold text-[15px]">
                  پشتیبانی
                </Text>
              </View>

              <Feather name="help-circle" size={25} color="#333" />
            </View>
          </View>

          <View className="flex-row items-center justify-end w-full">
            <View className="flex-row items-center justify-center gap-x-2">
              <View>
                <Text className="text-black font-isansbold text-[15px]">
                  شرایط و قوانین
                </Text>
              </View>

              <Feather name="alert-circle" size={25} color="#333" />
            </View>
          </View>

          <View className="flex-row items-center justify-end w-full">
            <View className="flex-row items-center justify-center gap-x-2">
              <View>
                <Text className="text-black font-isansbold text-[15px]">
                  تماس با ما
                </Text>
              </View>

              <Feather name="phone" size={24} color="#333" />
            </View>
          </View>

          <View className="items-center justify-center">
            <Image source={images.logo} className="w-[100px] h-[100px]" />
          </View>

          <CustomButton
            title={"خروج"}
            bgColor="bg-red-500"
            titleColor="text-white"
            containerStyles={"mt-10"}
            handlePress={handleLogout}
            isLoading={isLogoutLoading}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default SettingsMenu;

const styles = StyleSheet.create({
  backIcon: {
    marginLeft: "auto",
    marginRight: 10,
    marginTop: 10,
  },
  userIcon: {
    backgroundColor: "#f5f5f5",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
