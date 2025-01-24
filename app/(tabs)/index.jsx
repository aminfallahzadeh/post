// IMPORTS
import { useState, useEffect } from "react";
import Service from "@/components/Service";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import Background from "@/components/Background";
import CustomModal from "@/components/CustomModal";
import CustomCarousel from "@/components/CustomCarousel";
import CustomButton from "@/components/CustomButton";
import { allData } from "@/data/services";
import Feather from "@expo/vector-icons/Feather";
import { useUserStore } from "@/store";
import { TourGuideZone, useTourGuideController } from "rn-tourguide";
import { useCameraPermissions } from "expo-camera";
import { ScrollView, View, TextInput, Pressable, Text } from "react-native";

const Index = () => {
  // STATES
  const [visible, setVisible] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [permission, requestPermission] = useCameraPermissions();

  // CONSTS
  const { handleSubmit } = useForm();
  const { canStart, start, eventEmitter } = useTourGuideController();
  const setCopilotShouldStart = useUserStore(
    (state) => state.setCopilotShouldStart
  );
  const copilotShouldStart = useUserStore((state) => state.copilotShouldStart);

  // HANDLERS
  const onSubmit = () => {
    if (barcode) {
      router.push({
        pathname: "forms/follow",
        params: {
          barcode,
        },
      });
    }
  };

  const handleBarcodeChange = (barcode) => {
    setBarcode(barcode);
  };

  const handleRemoveField = () => {
    setBarcode("");
  };

  useEffect(() => {
    if (canStart && copilotShouldStart) {
      start();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canStart, copilotShouldStart]);

  useEffect(() => {
    eventEmitter.on("stop", () => {
      setCopilotShouldStart(false);
    });

    return () => {
      eventEmitter.off("stop", () => {
        setCopilotShouldStart(false);
      });
    };
  }, [eventEmitter, setCopilotShouldStart]);

  const handleRequestForPermission = async () => {
    await requestPermission();
    if (Boolean(permission?.granted)) {
      router.push("/scanner");
    }
  };

  return (
    <>
      <CustomModal
        visible={visible}
        closeModal={() => setVisible(false)}
        title="توجه"
        description="شماره ملی شما ثبت نشده است. لطفا از پروفایل کاربری اقدام به ثبت شماره ملی نمایید."
      />
      <Background>
        <View className="h-36">
          <CustomCarousel />
        </View>

        <TourGuideZone
          zone={1}
          shape="rectangle"
          text={"برای پیگیری مرسوله کد رهگیری را وارد کنید"}
          borderRadius={16}
        >
          <View className="w-full flex-row-reverse px-4 bg-white py-4">
            <View className="w-3/4 relative">
              <TextInput
                className="flex-1 w-full bg-white border border-primary rounded-md px-4 text-sm font-isansmedium"
                placeholder="کد رهگیری"
                keyboardType="numeric"
                inputMode="numeric"
                name="barcode"
                textAlignVertical="center"
                textAlign="right"
                value={barcode}
                onChangeText={handleBarcodeChange}
              />
              {barcode && (
                <Pressable
                  onPress={handleRemoveField}
                  className="absolute top-[50%] left-4"
                  style={{
                    transform: [{ translateY: -12 }],
                  }}
                >
                  <Feather name="x-circle" size={24} color={"#AFB4C0"} />
                </Pressable>
              )}
            </View>

            <View className="w-1/4 mr-2 flex-row">
              <View className="w-1/2 mr-1">
                <CustomButton
                  height="h-10"
                  handlePress={handleRequestForPermission}
                >
                  <Feather name="camera" size={24} color="#fff" />
                </CustomButton>
              </View>

              <View className="w-1/2">
                <CustomButton
                  height="h-10"
                  handlePress={handleSubmit(onSubmit)}
                >
                  <Feather name="search" size={24} color="#fff" />
                </CustomButton>
              </View>
            </View>
          </View>
        </TourGuideZone>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 120,
          }}
        >
          <TourGuideZone
            zone={2}
            shape="rectangle"
            text={"خدمات شرکت ملی پست"}
            borderRadius={16}
          >
            <View
              className="flex-row flex-wrap gap-y-2 justify-start items-start px-2 mt-5"
              style={{ transform: [{ scaleX: -1 }] }}
            >
              {allData.map((item, index) => (
                <Service key={index} item={item} />
              ))}
            </View>
          </TourGuideZone>
        </ScrollView>

        {/* <View className="w-full bg-red-400">
          <Text>Test</Text>
        </View> */}
      </Background>
    </>
  );
};

export default Index;
