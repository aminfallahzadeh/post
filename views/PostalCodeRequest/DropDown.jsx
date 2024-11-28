import React from "react";
import { Controller } from "react-hook-form";
import SelectInput from "@/components/SelectInput";

const Dropdown = ({ name, options, control, isLoading }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <SelectInput {...field} options={options} isLoading={isLoading} />
    )}
  />
);

export default Dropdown;
