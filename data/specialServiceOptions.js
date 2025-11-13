export const specialServiceOptions = (parceltype) => [
    //   { id: 1, label: "آگهی تحویل فیزیکی", disabled: false, type: "physical" },
    {
        id: 2,
        label: "آگهی تحویل الکترونیک",
        disabled: false,
        type: "electronic",
    },
    {
        id: 3,
        label: "اشیا شکستنی",
        disabled: parceltype === 1 ? true : false,
        type: "glasses",
    },
    {
        id: 4,
        label: "خارج از اندازه",
        disabled: parceltype === 1 ? true : false,
        type: "oversize",
    },
    {
        id: 5,
        label: "کرایه در مقصد",
        disabled: false,
        type: "pardakhtDarbeManzel",
    },
    {
        id: 6,
        label: "حاوی مایعات",
        disabled: parceltype === 1 ? true : false,
        type: "watery",
    },
    {
        id: 7,
        label: "رسید الکترونیک",
        disabled: false,
        type: "electronicCode",
    },
    {
        id: 8,
        label: "سرویس SMS",
        disabled: false,
        type: "SMS",
    },
    //   {
    //     id: 11,
    //     label: "تحویل در صندوق شخصی",
    //     disabled: false,
    //     type: "personalSandogh",
    //   },
    {
        id: 12,
        label: "حق مقر",
        disabled: true,
        type: "haghMaghar",
    },
    {
        id: 13,
        label: "رستانت",
        disabled: true,
        type: "restant",
    },
];

export const specialServiceOptionsExcluded = (parceltype) => [
    //   { id: 1, label: "آگهی تحویل فیزیکی", disabled: false, type: "physical" },
    {
        id: 2,
        label: "آگهی تحویل الکترونیک",
        disabled: false,
        type: "electronic",
    },
    {
        id: 5,
        label: "کرایه در مقصد",
        disabled: false,
        type: "pardakhtDarbeManzel",
    },
    {
        id: 7,
        label: "رسید الکترونیک",
        disabled: false,
        type: "electronicCode",
    },
    {
        id: 8,
        label: "سرویس SMS",
        disabled: false,
        type: "SMS",
    },
    //   {
    //     id: 11,
    //     label: "تحویل در صندوق شخصی",
    //     disabled: false,
    //     type: "personalSandogh",
    //   },
    {
        id: 12,
        label: "حق مقر",
        disabled: true,
        type: "haghMaghar",
    },
    {
        id: 13,
        label: "رستانت",
        disabled: true,
        type: "restant",
    },
];

export const selectSpecialServiceOptions = [
    { label: "آگهی تحویل الکترونیک", value: 2 },
    { label: "اشیا شکستنی", value: 3 },
    { label: "خارج از اندازه", value: 4 },
    { label: "کرایه در مقصد", value: 5 },
    { label: "حاوی مایعات", value: 6 },
    { label: "رسید الکترونیک", value: 7 },
    { label: "سرویس SMS", value: 8 },
    { label: "حق مقر", value: 12 },
    { label: "رستانت", value: 13 },
];

export const nerkhnameExcluded = [
    { label: "آگهی تحویل الکترونیک", value: 2 },
    { label: "کرایه در مقصد", value: 5 },
    { label: "رسید الکترونیک", value: 7 },
    { label: "سرویس SMS", value: 8 },
    { label: "حق مقر", value: 12 },
    { label: "رستانت", value: 13 },
];

export const nerkhnameMoreThanFour = [
    { label: "آگهی تحویل الکترونیک", value: 2 },
    { label: "اشیا شکستنی", value: 3 },
    { label: "کرایه در مقصد", value: 5 },
    { label: "حاوی مایعات", value: 6 },
    { label: "رسید الکترونیک", value: 7 },
    { label: "سرویس SMS", value: 8 },
    { label: "حق مقر", value: 12 },
    { label: "رستانت", value: 13 },
];
