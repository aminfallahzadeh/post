// IMPORTS
import { useEffect, useRef, useState, useCallback } from "react";
import { View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../components/CustomButton";
import Background from "@/components/Background";
import { Chase } from "react-native-animated-spinkit";
import { isLoginValid } from "@/utils/authUtils";
import useGetUserData from "@/hooks/useGetUserData";
import * as SecureStore from "expo-secure-store";
// import { I18nManager } from "react-native";
import Constants from "expo-constants";
import welcome from "@/assets/images/welcome.png";
import { useUserStore } from "@/store";
import { getVersion } from "@/api/version";
import { CustomModal } from "@/components/CustomModal";

// Lock the layout direction to LTR
// I18nManager.allowRTL(false);
// I18nManager.forceRTL(false);

// try {
//   I18nManager.allowRTL(false);
//   I18nManager.forceRTL(false);
//   console.log("RTL LOCKED");
// } catch (e) {
//   console.log(e);
// }

const Index = () => {
    // STATES
    const [loading, setLoading] = useState(true);
    const [updateModalVisible, setShowUpdateModal] = useState(false);

    // CONSTS
    const mobile = SecureStore.getItem("mobile");
    const { fetchCustomerData } = useGetUserData(mobile);
    const imageOpacity = useRef(new Animated.Value(0)).current;
    const imageTranslateY = useRef(new Animated.Value(100)).current;
    const textOpacity = useRef(new Animated.Value(0)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;
    const setCanStartTour = useUserStore((state) => state.setCanStartTour);

    // HANDLERS
    const handlePress = () => {
        router.push("/(auth)");
    };

    const compareVersions = (server, local) => {
        const s = server.split(".").map(Number);
        const l = local.split(".").map(Number);
        for (let i = 0; i < s.length; i++) {
            if (s[i] > l[i]) return true;
            if (s[i] < l[i]) return false;
        }
        return false;
    };

    const runLoginCheck = useCallback(async () => {
        const isValid = await isLoginValid();

        if (isValid) {
            await fetchCustomerData(mobile);
            setCanStartTour(false);
            router.replace("/(tabs)");
        } else {
            setLoading(false);
        }
    }, [fetchCustomerData, mobile, setCanStartTour]);

    // CHECK VERSION
    useEffect(() => {
        const checkVersion = async () => {
            try {
                const localVersion = Constants.expoConfig.version;
                console.log("LOCAL VERSION:", localVersion);

                const versionData = await getVersion();
                const serverVersion = versionData.data.itemList[0].versionID;
                console.log("Server version is:", serverVersion);

                // if (!serverVersion) {
                //     console.log(
                //         "Skipping update check — invalid server version:",
                //         serverVersion,
                //     );
                //     runLoginCheck();
                //     return;
                // }

                const shouldUpdate = compareVersions(
                    serverVersion,
                    localVersion,
                );

                if (shouldUpdate) {
                    console.log(shouldUpdate);
                    setShowUpdateModal(true);
                    return; // Wait for user to confirm
                }

                // Continue normal logic
                runLoginCheck();
            } catch (e) {
                console.log("Version check error:", e);
                runLoginCheck(); // fallback if API fails
            }
        };

        checkVersion();
    }, [runLoginCheck]);

    useEffect(() => {
        if (!loading) {
            // ANIMATE IMAGE
            Animated.parallel([
                Animated.timing(imageOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.spring(imageTranslateY, {
                    toValue: 0,
                    useNativeDriver: true,
                }),
                // ANIMATE TEXT
                Animated.timing(textOpacity, {
                    toValue: 1,
                    delay: 800,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                // ANIMATE BUTTON
                Animated.timing(buttonOpacity, {
                    toValue: 1,
                    delay: 1600,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [loading, imageOpacity, imageTranslateY, textOpacity, buttonOpacity]);

    if (loading && !updateModalVisible) {
        return (
            <Background>
                <SafeAreaView className="h-full w-full justify-center items-center">
                    <Chase size={50} color="#164194" />
                </SafeAreaView>
            </Background>
        );
    }

    return (
        <>
            <CustomModal
                visible={updateModalVisible}
                title={"نسخه جدید موجود است"}
                description={
                    "نسخه جدید اپلیکیشن روی سرور موجود است. لطفاً قبل از ادامه، اپ را به‌روزرسانی کنید."
                }
                onConfirm={() => {
                    setShowUpdateModal(false);
                    runLoginCheck();
                }}
            />
            <Background>
                <SafeAreaView className="h-full">
                    <View className="flex-1 w-full justify-between items-center">
                        <Animated.Image
                            source={welcome}
                            className="w-full h-[350px] mt-10"
                            resizeMode="contain"
                            style={{
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslateY }],
                            }}
                        />

                        <View className="w-full px-7 mb-16">
                            <Animated.Text
                                className="text-primary font-isansbold text-lg text-center w-full"
                                style={{ opacity: textOpacity }}
                            >
                                به پستخونه خوش آمدید ...
                            </Animated.Text>

                            <Animated.Text
                                className="text-grey2 font-isansregular text-[17px] mt-10 text-center w-full px-10"
                                style={{ opacity: textOpacity }}
                            >
                                فردا؛ دیر است...
                            </Animated.Text>

                            <Animated.View
                                style={{
                                    opacity: buttonOpacity,
                                    width: "100%",
                                }}
                            >
                                <CustomButton
                                    title={"وارد شوید"}
                                    handlePress={handlePress}
                                    containerStyles="w-full mt-7"
                                />
                            </Animated.View>
                        </View>
                    </View>
                </SafeAreaView>
            </Background>
        </>
    );
};

export default Index;
