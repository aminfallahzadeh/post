// IMPORTS
import { PostalCodeRequest } from "@/views/PostalCodeRequest/PostalCodeRequest";

const Index = () => {
  return <PostalCodeRequest />;
  // STATES
  // const [isUrban, setIsUrban] = useState(true);
  // const [isProvinceLoading, setIsProvinceLoading] = useState(false);
  // const [isCountyLoading, setIsCountyLoading] = useState(false);
  // const [isZoneLoading, setIsZoneLoading] = useState(false);
  // const [isRuralCityLoading, setIsRuralCityLoading] = useState(false);
  // const [isVillageLoading, setIsVillageLoading] = useState(false);

  // const [provinceOptions, setProvinceOptions] = useState([]);
  // const [countyOptions, setCountyOptions] = useState([]);
  // const [zoneOptions, setZoneOptions] = useState([]);
  // const [ruralCityOptions, setRuralCityOptions] = useState([]);
  // const [villageOptions, setVillageOptions] = useState([]);

  // // CONSTS
  // const { control, handleSubmit, watch, setValue } = useForm();
  // const form_data = watch();

  // // HANDLERS
  // const changeModeHandler = () => {
  //   setIsUrban((prev) => !prev);
  // };

  // // FETCH FUNCTIONS
  // const fetchProvince = useCallback(async (id, term) => {
  //   setIsProvinceLoading(true);
  //   const response = await getProvince({ id, term });
  //   if (response.data.noneobject.length === 3) {
  //     setIsProvinceLoading(false);
  //     return;
  //   }
  //   const data = JSON.parse(response.data.noneobject).value;
  //   setProvinceOptions(optionsGenerator(data, "id", "name"));
  //   setIsProvinceLoading(false);
  // }, []);

  // const fetchCounties = useCallback(async (id, provinceID, term) => {
  //   setIsCountyLoading(true);
  //   const response = await getCounty({ id, provinceID, term });
  //   if (response.data.noneobject.length === 3) {
  //     setIsProvinceLoading(false);
  //     return;
  //   }
  //   const data = JSON.parse(response.data.noneobject).value;

  //   setCountyOptions(optionsGenerator(data, "id", "name"));
  //   setIsCountyLoading(false);
  // }, []);

  // const fetchZones = useCallback(async (id, term, provinceID, countyID) => {
  //   setIsZoneLoading(true);
  //   const response = await getZone({
  //     id,
  //     term,
  //     provinceID,
  //     countyID,
  //   });
  //   const data = JSON.parse(response.data.noneobject).value;
  //   setZoneOptions(optionsGenerator(data, "id", "name"));
  //   setIsZoneLoading(false);
  // }, []);

  // const fetchRuralCity = useCallback(
  //   async ({
  //     id = null,
  //     term = null,
  //     provinceID = null,
  //     countyID = null,
  //     zoneID = null,
  //     village = "false",
  //   } = {}) => {
  //     setIsRuralCityLoading(true);
  //     const response = await getRuralCity({
  //       id,
  //       term,
  //       provinceID,
  //       countyID,
  //       zoneID,
  //       village,
  //     });

  //     if (response.data.noneobject.length === 3) {
  //       setIsRuralCityLoading(false);
  //       console.log("LENGTH:", response.data.noneobject.length === 3);
  //       return;
  //     }
  //     const data = JSON.parse(response.data.noneobject).value;
  //     setRuralCityOptions(optionsGenerator(data, "id", "name"));
  //     setIsRuralCityLoading(false);
  //   },
  //   []
  // );

  // const fetchVillage = useCallback(
  //   async ({
  //     id = null,
  //     term = null,
  //     provinceID = null,
  //     countyID = null,
  //     ruralID = null,
  //     zoneID = null,
  //   } = {}) => {
  //     setIsVillageLoading(true);
  //     const response = await getVillge({
  //       id,
  //       term,
  //       provinceID,
  //       countyID,
  //       zoneID,
  //       ruralID,
  //     });
  //     const data = JSON.parse(response.data.noneobject).value;
  //     setVillageOptions(optionsGenerator(data, "id", "name"));
  //     setIsVillageLoading(false);
  //   },
  //   []
  // );

  // // GET DATA
  // useEffect(() => {
  //   fetchProvince();
  //   fetchCounties();
  // }, [fetchProvince, fetchCounties]);

  // useEffect(() => {
  //   if (isUrban) {
  //     fetchRuralCity({
  //       provinceID: form_data.provinceID || null,
  //     });
  //   } else {
  //     fetchZones({ provinceID: form_data.provinceID || null });
  //     fetchRuralCity({ village: "true" });
  //     fetchVillage({ provinceID: form_data.provinceID || null });
  //   }
  // }, [isUrban, fetchRuralCity, fetchZones, fetchVillage, form_data.provinceID]);

  // useEffect(() => {
  //   if (form_data.countyID) {
  //     fetchZones();
  //   }
  // }, [fetchZones, form_data.countyID]);

  // const onSubmit = () => {};

  // return (
  //   <Background>
  //     <SafeAreaView className="h-full">
  //       <ScrollView
  //         contentContainerStyle={{
  //           flexGrow: 1,
  //           paddingBottom: 30,
  //         }}
  //         showsVerticalScrollIndicator={false}
  //         stickyHeaderIndices={[0]}
  //         keyboardShouldPersistTaps="handled"
  //       >
  //         {/* HEADER SECTION */}
  //         <View
  //           className="flex-col w-full bg-secondary z-10 justify-center items-center relative"
  //           style={styles.headerContainer}
  //         >
  //           <View className="flex-row w-full justify-between items-center">
  //             <Pressable
  //               onPress={() => router.back()}
  //               className="absolute left-4"
  //             >
  //               <Feather name="arrow-left" size={25} color="#333" />
  //             </Pressable>
  //             <Text className="text-primary font-isansbold text-center text-[20px] py-2 mr-auto ml-auto">
  //               درخواست کد پستی
  //             </Text>
  //           </View>

  //           <View className="flex-col px-10 w-full pb-2">
  //             <ProgressBar progress={33} />
  //           </View>
  //         </View>

  //         {/* FORM FIELDS */}
  //         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  //           <View className="w-full px-5">
  //             <View className="mt-5">
  //               <Controller
  //                 name="provinceID"
  //                 control={control}
  //                 render={({ field: { onChange } }) => (
  //                   <SelectInput
  //                     placeholder={
  //                       isProvinceLoading ? LOADING_MESSAGE : PROVINCE
  //                     }
  //                     disabled={isProvinceLoading}
  //                     options={provinceOptions}
  //                     onValueChange={(val) => {
  //                       setValue("countyID", null);
  //                       setValue("zoneID", null);
  //                       fetchCounties(undefined, val);
  //                       if (isUrban) {
  //                         fetchRuralCity({ provinceID: val, village: "false" });
  //                       } else {
  //                         fetchZones({ provinceID: val });
  //                         fetchRuralCity({ provinceID: val, village: "true" });
  //                         fetchVillage({ provinceID: val });
  //                       }
  //                       return onChange(val);
  //                     }}
  //                     primaryColor="#164194"
  //                     selectedValue={
  //                       provinceOptions.find(
  //                         (c) => c.value === form_data?.provinceID
  //                       )?.value
  //                     }
  //                   />
  //                 )}
  //               />
  //             </View>
  //             <View className="mt-5">
  //               <Controller
  //                 name="countyID"
  //                 control={control}
  //                 render={({ field: { onChange } }) => (
  //                   <SelectInput
  //                     placeholder={isCountyLoading ? LOADING_MESSAGE : COUNTY}
  //                     disabled={isCountyLoading}
  //                     options={countyOptions}
  //                     onValueChange={(val) => onChange(val)}
  //                     primaryColor="#164194"
  //                     selectedValue={
  //                       countyOptions.find(
  //                         (c) => c.value === form_data?.countyID
  //                       )?.value
  //                     }
  //                   />
  //                 )}
  //               />
  //             </View>

  //             <View className="mt-5 flex-row-reverse items-center justify-start ">
  //               <Text
  //                 className={`text-center self-center font-isansdemibold text-lg ${
  //                   isUrban ? "text-primary" : "text-gray-400"
  //                 }`}
  //               >
  //                 شهری
  //               </Text>

  //               <SwitchInput
  //                 onValueChange={changeModeHandler}
  //                 value={isUrban}
  //               />

  //               <Text
  //                 className={`text-center self-center font-isansdemibold text-lg ${
  //                   !isUrban ? "text-primary" : "text-gray-400"
  //                 }`}
  //               >
  //                 روستایی
  //               </Text>
  //             </View>

  //             {isUrban ? (
  //               <View className="mt-5">
  //                 <Controller
  //                   name="zoneID"
  //                   control={control}
  //                   render={({ field: { onChange } }) => (
  //                     <SelectInput
  //                       placeholder={
  //                         isRuralCityLoading ? LOADING_MESSAGE : CITY
  //                       }
  //                       disabled={isRuralCityLoading}
  //                       options={ruralCityOptions}
  //                       onValueChange={(val) => onChange(val)}
  //                       primaryColor="#164194"
  //                       selectedValue={
  //                         ruralCityOptions.find(
  //                           (c) => c.value === form_data?.zoneID
  //                         )?.value
  //                       }
  //                     />
  //                   )}
  //                 />
  //               </View>
  //             ) : (
  //               <>
  //                 <View className="mt-5">
  //                   <Controller
  //                     name="zoneID"
  //                     control={control}
  //                     render={({ field: { onChange } }) => (
  //                       <SelectInput
  //                         placeholder={isZoneLoading ? LOADING_MESSAGE : ZONE}
  //                         disabled={isZoneLoading}
  //                         options={zoneOptions}
  //                         onValueChange={(val) => onChange(val)}
  //                         primaryColor="#164194"
  //                         selectedValue={
  //                           zoneOptions.find(
  //                             (c) => c.value === form_data?.zoneID
  //                           )?.value
  //                         }
  //                       />
  //                     )}
  //                   />
  //                 </View>

  //                 <View className="mt-5">
  //                   <Controller
  //                     name="zoneID"
  //                     control={control}
  //                     render={({ field: { onChange } }) => (
  //                       <SelectInput
  //                         placeholder={
  //                           isRuralCityLoading ? LOADING_MESSAGE : DEH
  //                         }
  //                         disabled={isRuralCityLoading}
  //                         options={ruralCityOptions}
  //                         onValueChange={(val) => onChange(val)}
  //                         primaryColor="#164194"
  //                         selectedValue={
  //                           ruralCityOptions.find(
  //                             (c) => c.value === form_data?.zoneID
  //                           )?.value
  //                         }
  //                       />
  //                     )}
  //                   />
  //                 </View>

  //                 <View className="mt-5">
  //                   <Controller
  //                     name="villageID"
  //                     control={control}
  //                     render={({ field: { onChange } }) => (
  //                       <SelectInput
  //                         placeholder={
  //                           isVillageLoading ? LOADING_MESSAGE : VILLAGE
  //                         }
  //                         disabled={isVillageLoading}
  //                         options={villageOptions}
  //                         onValueChange={(val) => onChange(val)}
  //                         primaryColor="#164194"
  //                         selectedValue={
  //                           villageOptions.find(
  //                             (c) => c.value === form_data?.zoneID
  //                           )?.value
  //                         }
  //                       />
  //                     )}
  //                   />
  //                 </View>
  //               </>
  //             )}
  //           </View>
  //         </TouchableWithoutFeedback>
  //       </ScrollView>

  //       {/* BOTTOM SECTION */}
  //       <View className="w-full z-10 px-4 bg-gray-100 py-4">
  //         <CustomButton
  //           title="ادامه"
  //           handlePress={handleSubmit(onSubmit)}
  //           isLoading={isProvinceLoading || isCountyLoading}
  //         />
  //       </View>
  //     </SafeAreaView>
  //   </Background>
  // );
};

export default Index;

// const styles = StyleSheet.create({
//   inputContainer: {
//     columnGap: 10,
//   },
//   headerContainer: {
//     shadowColor: "black",
//     shadowOpacity: 0.26,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 10,
//     elevation: 3,
//     backgroundColor: "white",
//   },
//   disabledPlus: {
//     color: "gray",
//   },
//   postalCodeContaiers: {
//     shadowColor: "black",
//     shadowOpacity: 0.26,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 10,
//     elevation: 3,
//     backgroundColor: "white",
//     minHeight: 100,
//   },
//   postalCodesItemContainer: {
//     gap: 10,
//   },
// });
