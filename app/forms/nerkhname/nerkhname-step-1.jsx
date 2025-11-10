// IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import { requiredRule, nerkhnameValidations } from "@/constants/validations";
import { useUserStore } from "@/store";
import { Title } from "@/components/Title";
import CustomSelect from "@/components/CustomSelect";
import CustomMultiSelect from "@/components/CustomMultiSelect";
import {
    selectSpecialServiceOptions,
    nerkhnameExcluded,
} from "@/data/specialServiceOptions";
import { getPrice } from "@/api/order";
import { parcelOptions } from "@/data/parcelOptions";
import { boxsizeOptions } from "@/data/boxsizeOptions";
import { getProvince, getCity } from "@/api/order";
import { optionsGenerator } from "@/helpers/selectHelper";
import { CustomModal } from "@/components/CustomModal";
import { separateByThousand } from "@/utils/numberSeparator";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CustomTextInput } from "@/components/CustomTextInput";

const NerkhnameStep1 = () => {
    // STATES
    const [isLoading, setIsLoading] = useState(false);
    const [provinceOptions, setProvinceOptions] = useState([]);
    const [sourceCityOptions, setSourceCityOptions] = useState([]);
    const [destCityOptions, setDestCityOptions] = useState([]);
    const [isDestCityLoading, setIsDestCityLoading] = useState(false);
    const [isCityLoading, setIsCityLoading] = useState(false);
    const [isProvinceLoading, setIsProvinceLoading] = useState(false);
    const [weightRules, setWeightRules] = useState({});
    const [amountModalVisible, setAmountModalVisible] = useState(false);
    const [weightHelpModalVisible, setWeightHelpModalVisible] = useState(false);
    const [shouldExclude, setShouldExclude] = useState(false);

    // CONSTS
    const nerkhname = useUserStore((state) => state.nerkhname);
    const setNerkhname = useUserStore((state) => state.setNerkhname);
    const {
        watch,
        handleSubmit,
        control,
        formState: { errors },
        unregister,
        setValue,
    } = useForm({
        defaultValues: {
            ...nerkhname,
        },
    });
    const form_data = watch();

    // HELPERS
    const checkSpecialService = (data, id) => data.includes(id);

    // HANDLERS
    const fetchProvince = async () => {
        setIsProvinceLoading(true);
        try {
            const response = await getProvince();
            console.log("PROVINCE RESPONSE: ", response.data);
            const options = optionsGenerator(
                response.data.itemList,
                "provinceCode",
                "provinceName",
            );
            setProvinceOptions(options);
        } finally {
            setIsProvinceLoading(false);
        }
    };

    const fetchCity = async (provinceID = null) => {
        setIsCityLoading(true);
        try {
            const response = await getCity(provinceID);
            console.log("CITY RESPONSE: ", response.data);
            const options = optionsGenerator(
                response.data.itemList,
                "cityCode",
                "cityName",
            );
            setSourceCityOptions(options);
        } finally {
            setIsCityLoading(false);
        }
    };

    const fetchDestCity = async (provinceID = null) => {
        setIsDestCityLoading(true);
        try {
            const response = await getCity(provinceID);
            console.log("CITY RESPONSE: ", response.data);
            const options = optionsGenerator(
                response.data.itemList,
                "cityCode",
                "cityName",
            );
            setDestCityOptions(options);
        } finally {
            setIsDestCityLoading(false);
        }
    };

    useEffect(() => {
        fetchProvince();
    }, []);

    // DEBUG
    useEffect(() => {
        console.log("form_data:", form_data);
    }, [form_data]);

    useEffect(() => {
        console.log("FORM DATA Step 1: ", form_data);
    }, [form_data]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await getPrice({
                typecode:
                    nerkhname.servicetype.id === 1
                        ? 11
                        : nerkhname.servicetype.id === 5
                          ? 1
                          : nerkhname.servicetype.id === 2
                            ? 19
                            : nerkhname.servicetype.id === 4
                              ? 19 //سرویس امانت همان سرویس سفارشی هست فقط برای 2 کیلو به بالا می باشد
                              : 77,
                servicetype:
                    nerkhname.servicetype.id === 4
                        ? 2
                        : nerkhname.servicetype.id, //سرویس امانت همان سرویس سفارشی هست فقط برای 2 کیلو به بالا می باشد
                parceltype: form_data.parceltype,
                sourcecode: form_data.sourcecode,
                destcode: form_data.destcode,
                weight: parseFloat(form_data.weight) || 0,
                iscot: checkSpecialService(data.special, 5),
                // boxsize: form_data.boxsize === undefined ? 1 : form_data.boxsize,
                boxsize: form_data.boxsize || 1,

                isnonstandard: checkSpecialService(data.special, 3)
                    ? true
                    : checkSpecialService(data.special, 4)
                      ? true
                      : checkSpecialService(data.special, 6)
                        ? true
                        : false,
                smsservice: checkSpecialService(data.special, 8),
                electworeceiptant: checkSpecialService(data.special, 2),
            });

            console.log("PRICE RESPONSE: ", response.data.itemList[0].data);

            await setNerkhname({
                ...nerkhname,
                ...response.data.itemList[0].data,
            });
            setAmountModalVisible(true);
            //   router.push("forms/nerkhname/nerkhname-step-2");
        } finally {
            setIsLoading(false);
        }
    };

    // EFFECTS
    useEffect(() => {
        if (form_data?.parceltype === 3) {
            setWeightRules(nerkhnameValidations.weight.underOneKilo);
        } else if (form_data?.parceltype === 1) {
            setWeightRules(nerkhnameValidations.weight.underTwoKilo);
        } else {
            setWeightRules(nerkhnameValidations.weight.other);
        }
    }, [form_data?.parceltype]);

    useEffect(() => {
        if (
            form_data?.parceltype &&
            [1, 14, 3, 15].includes(form_data.parceltype)
        ) {
            console.log("Unregistering BoxSize");
            unregister("boxsize");
        }
    }, [form_data?.parceltype, unregister]);

    useEffect(() => {
        if (
            form_data?.servicetype.id === 3 ||
            form_data?.servicetype.id === 1
        ) {
            if (form_data?.parceltype && form_data?.parceltype === 1) {
                setShouldExclude(true);
                setValue("special", "");
            } else {
                setShouldExclude(false);
            }
        } else if (form_data?.servicetype.id === 2) {
            if (form_data?.parceltype && form_data?.parceltype === 3) {
                setShouldExclude(true);
                setValue("special", "");
            } else {
                setShouldExclude(false);
            }
        } else if (form_data?.servicetype.id === 5) {
            if (form_data?.parceltype && form_data?.parceltype === 16) {
                setShouldExclude(true);
                setValue("special", "");
            } else {
                setShouldExclude(false);
            }
        } else {
            setShouldExclude(false);
        }
    }, [form_data?.servicetype, form_data?.parceltype, setValue]);

    return (
        <>
            <CustomModal
                visible={amountModalVisible}
                closeModal={() => setAmountModalVisible(false)}
                title={"مبلغ قابل پرداخت به ریال"}
                description={`کرایه پستی : ${separateByThousand(
                    nerkhname?.postfare || 0,
                )} \n  حق السهم پستی : ${separateByThousand(
                    nerkhname?.postprice || 0,
                )}\n بیمه : ${separateByThousand(
                    nerkhname?.insuranceprice || 0,
                )}\n  مالیات : ${separateByThousand(
                    nerkhname?.tax || 0,
                )} \n مبلغ کل : ${separateByThousand(nerkhname?.totalprice || 0)}`}
                onConfirm={() => setAmountModalVisible(false)}
            />

            <CustomModal
                visible={weightHelpModalVisible}
                closeModal={() => setWeightHelpModalVisible(false)}
                title={"راهنمای وزن"}
                description={
                    "پاکت تا ۵۰۰ گرم \n پاکت جوف تا ۲۰۰۰ گرم \n بسته از حداکثر ۳۰۰۰۰ گرم"
                }
            />

            <Background>
                <SafeAreaView className="h-full">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        style={{ flex: 1 }}
                    >
                        <View className="flex-1">
                            {/* HEADER SECTION */}
                            <Title
                                title={`${nerkhname?.servicetype?.label} : نرخ نامه`}
                                home={true}
                            />

                            <ScrollView
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingBottom: 90,
                                }}
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                                //   stickyHeaderIndices={[0]}
                            >
                                {/* FORM FIELDS */}
                                <View className="w-full px-5">
                                    <View className="mt-5">
                                        <CustomSelect
                                            name="parceltype"
                                            control={control}
                                            rules={
                                                nerkhnameValidations.parceltype
                                            }
                                            data={
                                                nerkhname?.servicetype?.id === 2
                                                    ? parcelOptions.sefareshi
                                                    : nerkhname?.servicetype
                                                            ?.id === 4
                                                      ? parcelOptions.amanat
                                                      : nerkhname?.servicetype
                                                              ?.id === 3
                                                        ? parcelOptions.vijhe
                                                        : nerkhname?.servicetype
                                                                ?.id === 5
                                                          ? parcelOptions.express
                                                          : parcelOptions.pishtaz
                                            }
                                            label="* نوع مرسوله"
                                            errors={errors}
                                            setValue={setValue}
                                        />
                                    </View>

                                    <View className="flex-row-reverse justify-center items-center">
                                        <View className="flex-1 ml-2">
                                            <CustomTextInput
                                                placeholder="وزن مرسوله (گرم)"
                                                keyboardType="numeric"
                                                inputMode="numeric"
                                                containerStyle="mt-5"
                                                control={control}
                                                rules={{
                                                    ...requiredRule,
                                                    ...weightRules,
                                                }}
                                                name="weight"
                                            />
                                        </View>

                                        <View className="flex-row justify-center items-center pt-5 gap-2">
                                            <Pressable
                                                onPress={() =>
                                                    setWeightHelpModalVisible(
                                                        true,
                                                    )
                                                }
                                            >
                                                <AntDesign
                                                    name="question"
                                                    size={28}
                                                    color="#164194"
                                                />
                                            </Pressable>
                                        </View>
                                    </View>

                                    {![1, 14, 3, 15, 16, 17].includes(
                                        form_data?.parceltype,
                                    ) && (
                                        <View className="mt-5">
                                            <CustomSelect
                                                name="boxsize"
                                                control={control}
                                                rules={requiredRule}
                                                data={boxsizeOptions}
                                                label="* سایز کارتن"
                                                errors={errors}
                                                setValue={setValue}
                                            />
                                        </View>
                                    )}

                                    <View className="mt-5">
                                        <CustomSelect
                                            name="provinceIDSource"
                                            control={control}
                                            rules={requiredRule}
                                            data={provinceOptions}
                                            label="* استان مبدا"
                                            errors={errors}
                                            search={true}
                                            setValue={setValue}
                                            isLoading={isProvinceLoading}
                                            onValueChange={(val) => {
                                                if (val) {
                                                    fetchCity(val);
                                                } else {
                                                    setSourceCityOptions([]);
                                                }
                                            }}
                                            onClear={() => {
                                                setValue(
                                                    "senderProvinceID",
                                                    null,
                                                );
                                                setValue("sourcecode", null);
                                                setSourceCityOptions([]);
                                            }}
                                        />
                                    </View>

                                    <View className="mt-5">
                                        <CustomSelect
                                            name="sourcecode"
                                            control={control}
                                            rules={requiredRule}
                                            data={sourceCityOptions}
                                            label="* شهر مبدا"
                                            errors={errors}
                                            search={true}
                                            setValue={setValue}
                                            isLoading={isCityLoading}
                                        />
                                    </View>

                                    <View className="mt-5">
                                        <CustomSelect
                                            name="provinceIDDest"
                                            control={control}
                                            rules={requiredRule}
                                            data={provinceOptions}
                                            label="* استان مقصد"
                                            errors={errors}
                                            search={true}
                                            setValue={setValue}
                                            isLoading={isProvinceLoading}
                                            onValueChange={(val) => {
                                                if (val) {
                                                    fetchDestCity(val);
                                                } else {
                                                    setDestCityOptions([]);
                                                }
                                            }}
                                            onClear={() => {
                                                setValue(
                                                    "senderProvinceID",
                                                    null,
                                                );
                                                setValue("destcode", null);
                                                setDestCityOptions([]);
                                            }}
                                        />
                                    </View>

                                    <View className="mt-5">
                                        <CustomSelect
                                            name="destcode"
                                            control={control}
                                            rules={requiredRule}
                                            data={destCityOptions}
                                            search={true}
                                            label="* شهر مقصد"
                                            errors={errors}
                                            setValue={setValue}
                                            isLoading={isDestCityLoading}
                                        />
                                    </View>

                                    <View className="mt-5">
                                        <CustomMultiSelect
                                            name="special"
                                            control={control}
                                            data={
                                                shouldExclude
                                                    ? nerkhnameExcluded
                                                    : selectSpecialServiceOptions
                                            }
                                            search={true}
                                            label="خدمات ویژه"
                                            errors={errors}
                                            setValue={setValue}
                                            excludeItems={[
                                                {
                                                    label: "سرویس SMS",
                                                    value: 8,
                                                },
                                            ]}
                                        />
                                    </View>
                                </View>
                            </ScrollView>

                            {/* BOTTOM SECTION */}
                            <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
                                <CustomButton
                                    title="محاسبه"
                                    isLoading={isLoading}
                                    handlePress={handleSubmit(onSubmit)}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Background>
        </>
    );
};

export default NerkhnameStep1;
