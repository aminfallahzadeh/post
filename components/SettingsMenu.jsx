// NATIVE IMPORTS
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import {
  AntDesign,
  Feather,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

// LIBRARY IMPOIRT

const SettingsMenu = ({ closeHandler }) => {
  return (
    <SafeAreaView className="w-full h-full bg-white relative px-2 gap-y-[30px]">
      <TouchableOpacity onPress={closeHandler}>
        <AntDesign
          name="arrowright"
          size={24}
          color="#333"
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View className="w-full justify-between items-center flex-row">
        <Feather name="edit-2" size={24} color="#333" />

        <View className="justify-center items-center flex-row gap-5">
          <View>
            <Text className="text-black font-isansmedium">نام کاربری</Text>
            <Text className="text-black font-isansregular">09123333333</Text>
          </View>

          <Feather name="user" size={34} color="#333" style={styles.userIcon} />
        </View>
      </View>

      <View className="w-full h-[2px] bg-grey3 rounded-lg" />

      <View className="gap-y-6">
        <View className="flex-row items-center justify-between w-full">
          <Text className="text-grey5 font-isansmedium text-[12px]">
            خرید اشتراک
          </Text>

          <View className="flex-row items-center justify-center gap-x-2">
            <View>
              <Text className="text-black font-isansbold text-[15px]">
                پست پرو
              </Text>
              <Text className="text-grey5 font-isansmedium text-[12px]">
                اشتراک ویژه پست ایران
              </Text>
            </View>

            <MaterialIcons name="workspace-premium" size={28} color="#333" />
          </View>
        </View>

        <View className="flex-row items-center justify-between w-full">
          <Text className="text-grey5 font-isansmedium text-[12px]">
            اعمال کد تخفیف
          </Text>

          <View className="flex-row items-center justify-center gap-x-2">
            <View>
              <Text className="text-black font-isansbold text-[15px]">
                تخقیف ها
              </Text>
              <Text className="text-grey5 font-isansmedium text-[12px]">
                تخفیف ها و جوایز
              </Text>
            </View>

            <MaterialIcons name="discount" size={28} color="#333" />
          </View>
        </View>

        <View className="w-full h-[2px] bg-grey3 rounded-lg" />

        <View className="flex-row items- justify-end w-full">
          <View className="flex-row items-center justify-center gap-x-2">
            <View>
              <Text className="text-black font-isansbold text-[15px]">
                پیام ها
              </Text>
            </View>

            <Feather name="message-square" size={24} color="#333" />
          </View>
        </View>

        <View className="flex-row items- justify-end w-full">
          <View className="flex-row items-center justify-center gap-x-2">
            <View>
              <Text className="text-black font-isansbold text-[15px]">
                کیف پول
              </Text>
            </View>

            <AntDesign name="wallet" size={24} color="#333" />
          </View>
        </View>

        <View className="w-full h-[2px] bg-grey3 rounded-lg" />

        <View className="flex-row items- justify-end w-full">
          <View className="flex-row items-center justify-center gap-x-2">
            <View>
              <Text className="text-black font-isansbold text-[15px]">
                تنظیمات
              </Text>
            </View>

            <Feather name="settings" size={24} color="#333" />
          </View>
        </View>

        <View className="flex-row items- justify-end w-full">
          <View className="flex-row items-center justify-center gap-x-2">
            <View>
              <Text className="text-black font-isansbold text-[15px]">
                درباره پست ایران
              </Text>
            </View>

            <AntDesign name="exclamationcircleo" size={24} color="#333" />
          </View>
        </View>

        <View className="flex-row items- justify-end w-full">
          <View className="flex-row items-center justify-center gap-x-2">
            <View>
              <Text className="text-black font-isansbold text-[15px]">
                شرایط و قوانین
              </Text>
            </View>

            <MaterialIcons name="playlist-add-check" size={24} color="#333" />
          </View>
        </View>

        <View className="flex-row items- justify-end w-full">
          <View className="flex-row items-center justify-center gap-x-2">
            <View>
              <Text className="text-black font-isansbold text-[15px]">
                تماس با ما
              </Text>
            </View>

            <SimpleLineIcons name="call-end" size={24} color="#333" />
          </View>
        </View>
      </View>
    </SafeAreaView>
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
