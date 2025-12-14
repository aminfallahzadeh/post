// IMPORTS
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { generateOTP } from "@/api/auth";
import { useUserStore } from "@/store";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import { mobilePhoneValidation } from "@/constants/validations";
import login from "@/assets/images/login.png";
import * as SecureStore from "expo-secure-store";
import { CustomTextInput } from "@/components/CustomTextInput";
import { getThreeRandomNumbers } from "@/utils/getThreeRandomNumbers";
import * as Crypto from "expo-crypto";
import {
    View,
    Animated,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";

const Login = () => {
    // STATES
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(null);

    // CONSTS
    const setMobile = useUserStore((state) => state.setMobile);
    const { control, handleSubmit, watch } = useForm();
    const form_data = watch();

    // HANDLERS
    // const toggleSwitch = () => {
    //   reset();
    //   setIsEnabled((previousState) => !previousState);
    // };

    async function securePhone(phone) {
        const prefix = getThreeRandomNumbers(); // salt 1
        const suffix = getThreeRandomNumbers(); // salt 2

        const hash = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            phone,
        );

        const salted = `${prefix}${hash}${suffix}`;

        console.log("HASH:", salted);
        console.log("PREFIX:", prefix);
        console.log("SUFFIX:", suffix);

        // return { hash, prefix, suffix };
        return salted;
    }

    const onSubmit = async () => {
        setIsLoading(true);
        const salted = await securePhone(form_data.mobile);
        try {
            const response = await generateOTP(
                form_data.mobile,
                "true",
                salted,
            );
            //   const response = await generateOTP("09123345493", isEnabled);

            setMobile(response.data.itemList[0].mobile);
            await SecureStore.setItemAsync(
                "mobile",
                response.data.itemList[0].mobile,
            );
            //   router.push("/otp");
            router.push({
                pathname: "/otp",
                params: {
                    isMobile: "true",
                    key: salted,
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    // ANIMATIONS
    const imageOpacity = useRef(new Animated.Value(0)).current;
    const imageTranslateY = useRef(new Animated.Value(100)).current;

    useEffect(() => {
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
        ]).start();
    }, [imageOpacity, imageTranslateY]);

    return (
        <Background>
            <SafeAreaView className="h-full">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    style={{ flex: 1 }}
                >
                    <View className="flex-1">
                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom: 90,
                            }}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                            //   stickyHeaderIndices={[0]}
                        >
                            <View className="w-full px-5">
                                <Animated.Image
                                    source={login}
                                    className="w-full h-[250px] mt-10 mb-5"
                                    resizeMode="contain"
                                    style={{
                                        opacity: imageOpacity,
                                        transform: [
                                            { translateY: imageTranslateY },
                                        ],
                                    }}
                                />

                                <CustomTextInput
                                    placeholder={"شماره همراه"}
                                    value={phoneNumber}
                                    handleChange={setPhoneNumber}
                                    keyboardType="numeric"
                                    inputMode="numeric"
                                    max={11}
                                    containerStyle="mt-5"
                                    control={control}
                                    name="mobile"
                                    rules={mobilePhoneValidation}
                                />
                            </View>
                        </ScrollView>

                        <CustomButton
                            title="ادامه"
                            handlePress={handleSubmit(onSubmit)}
                            isLoading={isLoading}
                        />
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Background>
    );
};

export default Login;
