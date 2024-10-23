// REACT IMPORTS
import { useState } from "react";
import { useForm } from "react-hook-form";

// NATIVE IMPORTS
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Pressable,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// COMPONENTS
import Background from "@/components/Background";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

// LIBRARIES
import LottieView from "lottie-react-native";
import { Chase } from "react-native-animated-spinkit";

// ASSETS
import searchLottie from "@/assets/animations/search-lottie.json";

const FollowOrder = () => {
  // ACCESS HOOK FORM METHODS
  const { control, handleSubmit, watch, reset } = useForm();

  // LOADIN STATE
  const [isLoading, setIsLoading] = useState(false);

  // HANDLERS
  const onSubmit = () => {};
  return (
    <Background>
      <SafeAreaView className="h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 90,
              minHeight: "100%",
            }}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            keyboardShouldPersistTaps="handled"
          >
            {/* HEADER SECTION */}
            <View
              className="flex-col w-full bg-secondary z-10 justify-center items-center relative"
              style={styles.headerContainer}
            >
              <View className="flex-row w-full justify-between items-center">
                <Pressable
                  onPress={() => router.back()}
                  className="absolute left-4"
                >
                  <Feather name="arrow-left" size={25} color="#333" />
                </Pressable>
                <Text className="text-primary font-isansbold text-center text-[20px] py-2 mr-auto ml-auto">
                  پیگیری مرسوله
                </Text>
              </View>
            </View>

            {/* FORM FIELDS */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="w-full px-4">
                <View className="flex-col px-10 w-full">
                  <LottieView
                    source={searchLottie}
                    autoPlay
                    loop
                    className="w-full h-[150px] mt-[50px]"
                  />
                </View>

                <FormField
                  placeholder="شماره پیگیری"
                  keyboardType="default"
                  type={"text"}
                  containerStyle="mt-5"
                  control={control}
                  name="publickey"
                />

                {/* RESPONSE CONTAINER */}
                <View className="mt-10 justify-center items-center w-full px-2 py-1">
                  {isLoading && <Chase size={40} color="#164194" />}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          {/* BOTTOM SECTION */}
          <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
            <CustomButton
              title="جست و جو"
              bgColor="bg-green-700"
              titleColor="text-white"
              handlePress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default FollowOrder;

const styles = StyleSheet.create({
  headerContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
});
