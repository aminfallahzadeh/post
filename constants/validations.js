// HELPERS
import { nationalCodeChekcher } from "@/utils/helpers";

export const userDataValidations = (form_data) => [
  {
    check: !nationalCodeChekcher(form_data.nationalCode),
    message: "کد ملی معتبر نیست",
  },
  {
    check: !form_data.name || form_data.name.length === 0,
    message: "نام را وارد کنید",
  },
  {
    check: !form_data.lastName || form_data.lastName.length === 0,
    message: "نام خانوادگی را وارد کنید",
  },
  {
    check:
      !form_data.day ||
      form_data.day.length === 0 ||
      form_data.day.length > 2 ||
      parseInt(form_data.day) > 31 ||
      parseInt(form_data.day) === 0,
    message: "روز معتبر نیست",
  },
  {
    check:
      !form_data.month ||
      form_data.month.length === 0 ||
      form_data.month.length !== 2 ||
      parseInt(form_data.month) > 12 ||
      parseInt(form_data.month) === 0,
    message: "ماه معتبر نیست",
  },
  {
    check:
      !form_data.year ||
      form_data.year.length === 0 ||
      form_data.year.length !== 4 ||
      parseInt(form_data.year) === 0,
    message: "سال معتبر نیست",
  },
];
