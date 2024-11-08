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

export const stepOneEopValidations = (form_data) => [
  {
    check: !form_data.title || !form_data.length === 0,
    message: "عنوان شکایت را وارد کنید",
  },
];

export const stepTwoEopValidation = (form_data) => [
  {
    check: !form_data.serialNo || !form_data.serialNo.length === 0,
    message: "شماره سریال را وارد کنید",
  },
  {
    check: !form_data.complaintType,
    message: "نوع شکایت را انتخاب کنید",
  },
  {
    check: !form_data.serviceId,
    message: "نوع سرویس را انتخاب کنید",
  },
  {
    check: !form_data.to_org_id,
    message: "واحد پستی را انتخاب کنید",
  },
];

export const followComplaintValidation = (form_data) => [
  {
    check: !form_data.publickey || form_data.publickey.length === 0,
    message: "کد پیگیری را وارد کنید",
  },
  {
    check: form_data.publickey.length !== 13,
    message: "کد پیگیری معتبر نیست",
  },
];

export const postalCodeValidation = (form_data) => [
  {
    check: !form_data.postalCode || form_data.postalCode.length !== 10,
    message: "کد پستی معتبر نیست",
  },
];

export const postalCodeListValidation = (data) => [
  {
    check: !data || data.length === 0,
    message: "حداقل یک کد پستی انتخاب کنید",
  },
];

export const orderTrackingValidation = (form_data) => [
  {
    check: !form_data.barcode || form_data.barcode.length < 20,
    message: "کد پیگیری معتبر نیست",
  },
];
