// HELPERS
import { generateYearsArray, generateDaysArray } from "@/utils/generateArray";

export const complaintTypeLookup = [
  { label: "آسیب دیدگی مرسوله", value: 73 },
  { label: "تاخیر مرسوله", value: 74 },
  { label: "عدم امکان تعیین سرنوشت مرسوله", value: 76 },
  { label: "تحویل مرسوله به گیرنده غیر اصلی", value: 77 },
  { label: "سایر", value: 79 },
  { label: "اضافه دریافتی", value: 80 },
  { label: "برخورد نامناسب", value: 81 },
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
  { value: 37, label: "آذربایجان غربی" },
  { value: 41, label: "اردبیل" },
  { value: 43, label: "اصفهان" },
  { value: 44, label: "البرز" },
  { value: 53, label: "ایالم" },
  { value: 58, label: "چهارمحال و بختیاری" },
  { value: 74, label: "خوزستان" },
  { value: 75, label: "زنجان" },
  { value: 76, label: "سمنان" },
  { value: 77, label: "سیستان و بلوچستان" },
  { value: 78, label: "فارس" },
  { value: 79, label: "قزوین" },
  { value: 80, label: "قم" },
  { value: 81, label: "کردستان" },
  { value: 82, label: "کرمان" },
  { value: 83, label: "کرمانشاه" },
  { value: 84, label: "کهگیلویه و بویراحمد" },
  { value: 85, label: "گلستان" },
  { value: 86, label: "گیالن" },
  { value: 87, label: "لرستان" },
  { value: 88, label: "مازندران" },
  { value: 89, label: "مرکزی )اراک(" },
  { value: 90, label: "هرمزگان" },
  { value: 91, label: "همدان" },
  { value: 92, label: "یزد" },
  { value: 126, label: "منطقه پستی جنوب شرق تهران )مناطق 11 و 17(" },
  { value: 127, label: "بوشهر" },
  { value: 128, label: "خراسان شمالی" },
  { value: 129, label: "خراسان رضوی" },
  { value: 130, label: "خراسان جنوبی" },
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
