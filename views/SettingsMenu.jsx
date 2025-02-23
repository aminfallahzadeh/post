// IMPORTS
import { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { logout } from "@/api/auth";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import images from "@/constants/images";
import * as SecureStore from "expo-secure-store";

const SettingsMenu = ({ closeHandler }) => {
  // STATES
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");
  const user = useUserStore((state) => state.userData);
  const resetStore = useUserStore((state) => state.resetStore);

  // HANDLE LOGOUT
  const logoutHandler = async () => {
    setIsLogoutLoading(true);
    try {
      await logout();
      resetStore();
    } finally {
      setIsLogoutLoading(false);
    }
  };

  return (
    <Background>
      <SafeAreaView className="h-full">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 90,
          }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-row w-full justify-between items-center">
            <View className="">
              <Text className="font-isansregular text-sm text-grey2">
                نسخه : ۱.۰۱
              </Text>
            </View>

            <TouchableOpacity onPress={closeHandler}>
              <Feather
                name="arrow-right"
                size={25}
                color="#333"
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>

          <Pressable
            className="w-full justify-between items-center flex-row mt-10"
            onPress={() => router.push(`profile/${user?.id}`)}
          >
            <Feather name="edit-2" size={25} color="#333" />

            <View className="justify-center items-center flex-row gap-5">
              <View className="justify-center items-end">
                <Text className="text-black font-isansmedium text-right">
                  {user?.name + " " + user?.lastName}
                </Text>
                <Text className="text-black font-isansregular">
                  {mobile || (
                    <Text className="italic text-red-600 text-sm">
                      ثبت نشده
                    </Text>
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

          <View className="w-full h-[2px] bg-grey3 rounded-lg mt-5" />

          <View className="gap-y-6 mt-5">
            <Pressable
              className="flex-row items-center justify-end w-full"
              onPress={() => {
                router.push("/assistant");
                closeHandler();
              }}
            >
              <View className="flex-row items-center justify-center gap-x-2">
                <View>
                  <Text className="text-black font-isansbold text-[15px]">
                    پشتیبانی
                  </Text>
                </View>

                <Feather name="help-circle" size={25} color="#333" />
              </View>
            </Pressable>

            <Pressable
              className="flex-row items-center justify-end w-full"
              onPress={() => {
                router.push(
                  "https://new.post.ir/fa-IR/shafaf.post/5685/page/%D9%82%D9%88%D8%A7%D9%86%DB%8C%D9%86-%D9%88-%D9%85%D9%82%D8%B1%D8%B1%D8%A7%D8%AA"
                );
              }}
            >
              <View className="flex-row items-center justify-center gap-x-2">
                <View>
                  <Text className="text-black font-isansbold text-[15px]">
                    قوانین و مقررات
                  </Text>
                </View>

                <Feather name="alert-circle" size={25} color="#333" />
              </View>
            </Pressable>

            <View className="flex-row items-center justify-end w-full">
              <Pressable
                className="flex-row items-center justify-center gap-x-2"
                onPress={() => router.push("/contact")}
              >
                <View>
                  <Text className="text-black font-isansbold text-[15px]">
                    تماس با ما
                  </Text>
                </View>

                {/* <Feather name="phone" size={24} color="#333" /> */}
                <Image source={images.contact} className="w-[24px] h-[24px]" />
              </Pressable>
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full absolute bottom-0 z-10 px-4 py-4">
          <View className="items-center justify-center">
            <Image source={images.logo} className="w-[100px] h-[100px]" />
          </View>
          <CustomButton
            title={"خروج"}
            bgColor="bg-red-500"
            titleColor="text-white"
            containerStyles={"mt-10"}
            handlePress={logoutHandler}
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
    // marginLeft: "auto",
    // marginRight: 10,
    // marginTop: 10,
  },
  userIcon: {
    backgroundColor: "#f5f5f5",
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
