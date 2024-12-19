/**
 * Generates an array of options for dropdowns or selects by mapping through the input data.
 *
 * @function
 * @param {Array<Object>} data - The array of objects to be transformed into options.
 * @param {string} valueKey - The key in each object whose value will be used as the `value` in the generated options.
 * @param {string} labelKey - The key in each object whose value will be used as the `label` in the generated options.
 *
 * @returns {Array<{ value: any, label: any }>} An array of objects formatted as `{ value, label }`.
 *
 * @example
 * const data = [
 *   { id: 1, name: "Option 1" },
 *   { id: 2, name: "Option 2" },
 * ];
 * const options = optionsGenerator(data, 'id', 'name');
 * // Output: [
 * //   { value: 1, label: "Option 1" },
 * //   { value: 2, label: "Option 2" }
 * // ]
 */
export const optionsGenerator = (data, valueKey, labelKey) => {
  return data?.map((item) => ({
    value: item[valueKey],
    label: item[labelKey],
  }));
};
