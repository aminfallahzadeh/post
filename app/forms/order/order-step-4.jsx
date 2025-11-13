// IMPORTS
import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import RadioButtons from "@/components/RadioButtons";
import {
    specialServiceOptions,
    specialServiceOptionsExcluded,
} from "@/data/specialServiceOptions";
import { getPrice } from "@/api/order";
import { Title } from "@/components/Title";
import { CustomModal } from "@/components/CustomModal";
import { separateByThousand } from "@/utils/numberSeparator";
import * as SecureStore from "expo-secure-store";
import { insertRequestPriceOrder } from "@/api/request";
import { convertToEnglishNumber } from "@/helpers/numberHelper";

const OrderStep4 = () => {
    // STATES
    const [isCalculating, setIsCalculating] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [calculateResult, setCalculateResult] = useState(null);
    const [amountModalVisible, setAmountModalVisible] = useState(false);
    const [specialServices, setSpecialServices] = useState([]);
    const [options, setOptions] = useState([]);

    // CONSTS
    const order = useUserStore((state) => state.order);
    const setFactor = useUserStore((state) => state.setFactor);
    const mobile = SecureStore.getItem("mobile");
    const setOrder = useUserStore((state) => state.setOrder);

    // HELPERS
    const checkSpecialService = (data, id) =>
        data.some((item) => item.id === id);

    // HANDLERS
    const onSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await insertRequestPriceOrder({
                mobile,
                typecode:
                    order?.servicetype?.id === 1
                        ? 11
                        : order?.servicetype.id === 5
                          ? 1
                          : order?.servicetype?.id === 2
                            ? 19
                            : order?.servicetype?.id === 4
                              ? 19
                              : 77,
                servicetype:
                    order?.servicetype.id === 4 ? 3 : order?.servicetype.id,
                parceltype: order?.parceltype,
                sourcecode: order?.sourcecode || "",
                destcode: order?.destcode || "",
                sendername:
                    order?.sendername + " " + order?.senderLastname || "",
                receivername:
                    order?.receivername + " " + order?.receiverLastname || "",
                receiverpostalcode: order?.receiverpostalcode || "",
                senderpostalcode: order?.senderpostalcode || "",
                senderid: order?.senderid || "",
                receiverid: order?.receiverid || "",
                sendermobile: order?.sendermobile || "",
                receivermobile: order?.receivermobile || "",
                senderaddress: order?.senderaddress || "",
                receiveraddress: order?.receiveraddress || "",
                weight: parseFloat(convertToEnglishNumber(order?.weight)) || 0,
                insurancetype: order?.insurancetype || 1,
                insuranceamount: parseFloat(order?.insuranceamount) || 0,
                spsdestinationtype: 0,
                // spsreceivertimetype: 0,
                spsparceltype:
                    order?.servicetype?.id !== 3
                        ? 0
                        : order?.parceltype === 1
                          ? 1
                          : order?.parceltype === 3
                            ? 3
                            : 2,
                electworeceiptant: checkSpecialService(specialServices, 2)
                    ? true
                    : false,
                iscot: order?.specialServices
                    ? checkSpecialService(specialServices, 5)
                    : false,
                smsservice: order?.specialServices
                    ? checkSpecialService(specialServices, 8)
                    : false,
                isnonstandard: checkSpecialService(specialServices, 3)
                    ? true
                    : checkSpecialService(specialServices, 4)
                      ? true
                      : checkSpecialService(specialServices, 6)
                        ? true
                        : false,
                contetnts: order?.contetnts || "",
                boxsize: order?.boxsize || 1,
            });
            console.log("INSERT REQUEST PRICE ORDER RESPONSE: ", response.data);
            setOrder({ ...order, ...response.data.itemList[0] });
            setFactor({ ...response.data.itemList[0] });
            router.push(`/forms/order/order-step-5`);
        } finally {
            setIsSubmitting(false);
        }
    };

    //   const specialOptions = specialServiceOptions(order?.parceltype);

    useEffect(() => {
        if (order?.servicetype.id === 3 || order?.servicetype.id === 1) {
            if (order?.parceltype && order?.parceltype === 1) {
                const createdOptions = specialServiceOptionsExcluded(
                    order?.parceltype,
                );
                setOptions(createdOptions);
            } else {
                const createdOptions = specialServiceOptions(order?.parceltype);
                setOptions(createdOptions);
            }
        } else if (order?.servicetype.id === 2) {
            if (order?.parceltype && order?.parceltype === 3) {
                const createdOptions = specialServiceOptionsExcluded(
                    order?.parceltype,
                );
                setOptions(createdOptions);
            } else {
                const createdOptions = specialServiceOptions(order?.parceltype);
                setOptions(createdOptions);
            }
        } else if (order?.servicetype.id === 5) {
            if (order?.parceltype && order?.parceltype === 16) {
                const createdOptions = specialServiceOptionsExcluded(
                    order?.parceltype,
                );
                setOptions(createdOptions);
            } else {
                const createdOptions = specialServiceOptions(order?.parceltype);
                setOptions(createdOptions);
            }
        } else {
            const createdOptions = specialServiceOptions(order?.parceltype);
            setOptions(createdOptions);
        }
    }, [order]);

    const onCalculate = async () => {
        setIsCalculating(true);
        try {
            const response = await getPrice({
                typecode:
                    order.servicetype.id === 1
                        ? 11
                        : order?.servicetype.id === 5
                          ? 1
                          : order.servicetype.id === 2
                            ? 19
                            : order.servicetype.id === 5
                              ? 19 //سرویس امانت همان سرویس سفارشی هست فقط برای 2 کیلو به بالا می باشد
                              : 77,
                servicetype:
                    order.servicetype.id === 4 ? 2 : order.servicetype.id, //سرویس امانت همان سرویس سفارشی هست فقط برای 2 کیلو به بالا می باشد
                parceltype: order.parceltype,
                sourcecode: order.sourcecode,
                destcode: order.destcode,
                weight: parseFloat(order.weight) || 0,
                boxsize: order.boxsize || 1,
            });

            setCalculateResult(response.data.itemList[0].data);
            console.log("PRICE RESPONSE: ", response.data);
            setAmountModalVisible(true);
        } finally {
            setIsCalculating(false);
        }
    };

    // DEBUG
    useEffect(() => {
        console.log("NERKHNAME Step 4: ", order);
        console.log("FORM DATA: ", specialServices);
    }, [order, specialServices]);

    return (
        <>
            <CustomModal
                visible={amountModalVisible}
                closeModal={() => setAmountModalVisible(false)}
                title={"مبلغ قابل پرداخت به ریال"}
                description={`کرایه پستی : ${separateByThousand(
                    calculateResult?.postfare || 0,
                )} \n  حق السهم پستی : ${separateByThousand(
                    calculateResult?.postprice || 0,
                )}\n بیمه : ${separateByThousand(
                    calculateResult?.insuranceprice || 0,
                )}\n  مالیات : ${separateByThousand(
                    calculateResult?.tax || 0,
                )} \n مبلغ کل : ${separateByThousand(
                    calculateResult?.totalprice || 0,
                )}`}
                onConfirm={() => setAmountModalVisible(false)}
            />

            <Background>
                <SafeAreaView className="h-full">
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom: 90,
                        }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        stickyHeaderIndices={[0]}
                    >
                        {/* HEADER SECTION */}
                        <Title
                            title={`${order?.servicetype?.label} : خدمات ویژه`}
                            progress={82}
                        />

                        {/* FORM FIELDS */}
                        <View className="w-full px-5 mt-10">
                            <RadioButtons
                                options={options}
                                title="نوع خدمات ویژه"
                                onChange={setSpecialServices}
                                value={specialServices}
                                isMulti={true}
                                textSize="text-sm"
                                itemsContainerStyle={
                                    "flex-row-reverse w-full flex-wrap justify-between items-center gap-y-3"
                                }
                            />
                        </View>
                    </ScrollView>

                    {/* BOTTOM SECTION */}
                    <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4 flex-row">
                        <View className="flex-1 mr-2">
                            <CustomButton
                                title="محاسبه"
                                handlePress={onCalculate}
                                isLoading={isCalculating}
                                disabled={isSubmitting}
                            />
                        </View>

                        <View className="flex-1 ml-2">
                            <CustomButton
                                title="ثبت سفارش"
                                handlePress={onSubmit}
                                isLoading={isSubmitting}
                                disabled={isCalculating}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </Background>
        </>
    );
};

export default OrderStep4;
