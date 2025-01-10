// IMPORTS
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "@/components/CustomButton";
import Feather from "@expo/vector-icons/Feather";
import FormField from "@/components/FormField";
import { useForm, Controller } from "react-hook-form";
import RadioButtons from "@/components/RadioButtons";
import { buildingTypeOptions } from "@/data/buildingType";
import Card from "./Card";

export const BuildingDetailInput = ({ items, setItems, onDeleteItem }) => {
  const [addMode, setAddMode] = useState(false);

  const { control, watch } = useForm();
  const form_data = watch();

  // HANDLERS
  const handelToggleMode = () => {
    setAddMode(!addMode);
  };

  const addBuildingTypeHandler = () => {
    const text = `طبقه ${form_data.floor || "--"} ٬ واحد ${
      form_data.section || "--"
    }٬ ${form_data.buildingType?.label || "--"}`;

    setItems((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        floorNo: parseInt(form_data.floor),
        sideFloor: form_data.section,
        landUse: 0,
        text,
      },
    ]);
    setAddMode(false);
  };

  return (
    <View
      className="w-full rounded-md items-center py-2 px-2 bg-white min-h-[150px]"
      style={styles.container}
    >
      <View className="w-full relative">
        <Text className="text-gray-400 font-isansdemibold text-sm absolute -top-4 right-2 bg-white rounded-md px-2">
          * واحدها
        </Text>

        {addMode && (
          <Text className="w-full text-center absolute mr-5 text-sm font-isansregular">
            {`طبقه ${form_data.floor || "--"} ٬ واحد ${
              form_data.section || "--"
            }٬ ${form_data.buildingType?.label || "--"}`}
          </Text>
        )}
      </View>

      <View className="w-full flex-row justify-between items-center">
        <TouchableOpacity onPress={handelToggleMode}>
          {addMode ? (
            <Feather name="chevron-left" size={24} color="black" />
          ) : (
            <Feather name="plus" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>

      <View className="w-full h-[1px] bg-gray-400 mt-2" />

      {addMode ? (
        <View className="flex-col justify-center items-center w-full px-2">
          <View className="w-full flex-row-reverse px-4 bg-white py-4">
            <View className="w-2/5">
              <FormField
                placeholder="طبقه"
                keyboardType="default"
                type={"text"}
                containerStyle="mt-5"
                control={control}
                name="floor"
                height="h-10"
                animate={false}
              />
            </View>

            <View className="w-3/5 mr-2">
              <FormField
                placeholder="واحد / سمت"
                keyboardType="default"
                type={"text"}
                containerStyle="mt-5"
                control={control}
                name="section"
                height="h-10"
                animate={false}
              />
            </View>
          </View>

          <View className="mt-5 relative border w-full px-2 py-1 rounded-md border-gray-400">
            <Text className="text-gray-400 font-isansdemibold text-sm absolute -top-4 right-2 bg-white rounded-md px-2">
              کاربری
            </Text>

            <View>
              <Controller
                name="buildingType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioButtons
                    options={buildingTypeOptions}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </View>

          <View className="mt-2 w-full">
            <CustomButton
              title="تایید"
              bgColor="bg-blue-500"
              height="h-10"
              titleColor="text-white"
              handlePress={addBuildingTypeHandler}
            />
          </View>
        </View>
      ) : (
        <View
          className="mt-2 justify-center items-center px-5"
          style={{ rowGap: 10 }}
        >
          {items.map((item) => (
            <Card
              id={item.id}
              key={item.id}
              text={item.text}
              onDelete={onDeleteItem}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
});
