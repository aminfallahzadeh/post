// // REACT IMPORTS
// import { useState } from "react";

// // NATIVE IMPORTS
// import { View, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// // EXPO IMPORTS
// import Feather from "@expo/vector-icons/Feather";
// import { router } from "expo-router";

// // COMPONENTS
// import CustomButton from "@/components/CustomButton";
// import FormField from "@/components/FormField";

// const Step2 = () => {
//   return (
//     <SafeAreaView className="bg-grey1 h-full px-5">
//       {/* Top Section */}
//       <View className="w-full items-center mt-14 mb-4">
//         <View className="flex-row items-center w-[350px] h-[5px] bg-grey5 rounded relative">
//           <View className="absolute top-0 left-0 w-[63%] h-full bg-primary rounded"></View>
//         </View>
//         <Text className="text-primary font-isansbold text-center text-[20px] mt-4">
//           اطلاعات فرستنده
//         </Text>
//       </View>

//       {/* Form Fields */}
//       <View className="flex-col w-full flex-1 justify-between">
//         {/* First Row */}
//         <View className="flex-row justify-between">
//           <View className="flex-1 mr-2">
//             <FormField
//               title="نام خانوادگی :"
//               keyboardType="text"
//               type={"text"}
//             />
//           </View>
//           <View className="flex-1 ml-2">
//             <FormField title="نام :" keyboardType="text" type={"text"} />
//           </View>
//         </View>

//         {/* Second Row */}
//         <View className="flex-row justify-between">
//           <View className="flex-1 mr-2">
//             <FormField title="کد پستی :" keyboardType="text" type={"text"} />
//           </View>
//           <View className="flex-1 ml-2">
//             <FormField title="کد ملی :" keyboardType="text" type={"text"} />
//           </View>
//         </View>

//         {/* Third Row */}
//         <View className="flex-row justify-between ">
//           <View className="flex-1 mr-2">
//             <FormField title="تلفن همراه :" keyboardType="text" type={"text"} />
//           </View>
//           <View className="flex-1 ml-2">
//             <FormField title="تلفن ثابت :" keyboardType="text" type={"text"} />
//           </View>
//         </View>

//         {/* Address Field */}
//         <View>
//           <FormField title="آدرس :" keyboardType="text" type={"text"} />
//         </View>

//         {/* Buttons Section */}
//         <View className="flex-col gap-3 w-full items-center mb-6">
//           <View className="w-full">
//             <CustomButton
//               title="ادامه"
//               isLoading={true}
//               handlePress={() => {}}
//             />
//           </View>
//           <View className="w-full">
//             <CustomButton
//               title={<Feather name="arrow-left" size={24} color="black" />}
//               handlePress={() => router.back()}
//             />
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Step2;

// REACT IMPORTS
import { useState } from "react";

// NATIVE IMPORTS
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

// COMPONENTS
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";

const Step2 = () => {
  return (
    <SafeAreaView className="bg-grey1 h-full px-5">
      {/* Top Section */}
      <View className="w-full items-center mt-24 mb-4">
        <View className="flex-row items-center w-[350px] h-[5px] bg-grey5 rounded relative">
          <View className="absolute top-0 left-0 w-[63%] h-full bg-primary rounded"></View>
        </View>
        <Text className="text-primary font-isansbold text-center text-[20px] mt-4">
          اطلاعات فرستنده
        </Text>
      </View>

      {/* Form Fields */}
      <View className="flex-col w-full justify-between">
        {/* First Row */}
        <View className="flex-row justify-between mb-2">
          <View className="flex-1 mr-2">
            <FormField
              title="نام خانوادگی :"
              keyboardType="text"
              type={"text"}
            />
          </View>
          <View className="flex-1 ml-2">
            <FormField title="نام :" keyboardType="text" type={"text"} />
          </View>
        </View>

        {/* Second Row */}
        <View className="flex-row justify-between mb-2">
          <View className="flex-1 mr-2">
            <FormField title="کد پستی :" keyboardType="text" type={"text"} />
          </View>
          <View className="flex-1 ml-2">
            <FormField title="کد ملی :" keyboardType="text" type={"text"} />
          </View>
        </View>

        {/* Third Row */}
        <View className="flex-row justify-between mb-2">
          <View className="flex-1 mr-2">
            <FormField title="تلفن همراه :" keyboardType="text" type={"text"} />
          </View>
          <View className="flex-1 ml-2">
            <FormField title="تلفن ثابت :" keyboardType="text" type={"text"} />
          </View>
        </View>

        {/* Address Field */}
        <View className="mb-2">
          <FormField title="آدرس :" keyboardType="text" type={"text"} />
        </View>

        {/* Buttons Section */}
        <View className="flex-col gap-y-3 w-full items-center mb-6 mt-2">
          <View className="w-full">
            <CustomButton
              title="ادامه"
              isLoading={true}
              handlePress={() => {}}
            />
          </View>
          <View className="w-full">
            <CustomButton
              title={<Feather name="arrow-left" size={24} color="black" />}
              handlePress={() => router.back()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Step2;
