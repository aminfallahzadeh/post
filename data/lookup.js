// HELPERS
import { generateYearsArray, generateDaysArray } from "@/utils/generateArray";

export const complaintTypeLookup = [
  { label: "آسیب دیدگی مرسوله", value: 73 },
  { label: "تاخیر مرسوله", value: 74 },
  { label: "عدم امکان تعیین سرنوشت مرسوله", value: 76 },
  { label: "تحویل مرسوله به گیرنده غیر اصلی", value: 77 },
  { label: "سایر", value: 79 },
  { label: "اضافه دریافتی", value: 80 },
  { label: "رخورد نامناسب", value: 81 },
  { label: "سرویس اجباری", value: 84 },
  { label: "مغایرت کالا با محتوا", value: 95 },
  { label: "عدم راهنمایی و اطلاع رسانی", value: 110 },
];

export const serviceTypeLookup = [
  { label: "امانت", value: 51 },
  { label: "پست ویژه", value: 53 },
  { label: "پیشتاز", value: 55 },
  { label: "سفارشی", value: 60 },
  { label: "عادی", value: 61 },
  { label: "سایر", value: 106 },
];

export const postalRegionLookup = [
  { label: "منطقه پستی جنوب غرب تهران (منطقه ۱۳)", value: 15 },
  { label: "منطقه پستی شمال غرب تهران (منطقه ۱۴)", value: 19 },
  { label: "منطقه پستی شمال تهران (مناطق ۱۵ و ۱۹)", value: 21 },
  { label: "منطقه پستی شمال شرق تهران (منطقه ۱۶)", value: 22 },
  { label: "منطقه پستی جنوب تهران (منطقه ۱۸)", value: 26 },
];

export const days = generateDaysArray(1, 31);

export const months = [
  { label: "فروردین", value: "01" },
  { label: "اردیبهشت", value: "02" },
  { label: "خرداد", value: "03" },
  { label: "تیر", value: "04" },
  { label: "مرداد", value: "05" },
  { label: "شهریور", value: "06" },
  { label: "مهر", value: "07" },
  { label: "آبان", value: "08" },
  { label: "آذر", value: "09" },
  { label: "دی", value: "10" },
  { label: "بهمن", value: "11" },
  { label: "اسفند", value: "12" },
];

export const years = generateYearsArray(1400, 1340);
