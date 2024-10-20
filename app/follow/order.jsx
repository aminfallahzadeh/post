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

const FollowOrder = () => {
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

              <View className="flex-col px-10 w-full"></View>
            </View>

            {/* FORM FIELDS */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="w-full px-4"></View>
            </TouchableWithoutFeedback>
          </ScrollView>
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
