export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
  }`;
};

export const nationalCodeChekcher = (code) => {
  if (code && code.length > 0) {
    if (code.length !== 10 || /(\d)(\1){9}/.test(code)) return false;

    let sum = 0,
      chars = code.split(""),
      lastDigit,
      remainder;

    for (let i = 0; i < 9; i++) sum += +chars[i] * (10 - i);

    remainder = sum % 11;
    lastDigit = remainder < 2 ? remainder : 11 - remainder;

    return +chars[9] === lastDigit;
  }

  return true;
};

export const generateYearsArray = (start, end) => {
  const years = [];
  for (let year = start; year >= end; year--) {
    years.push({ label: year.toString(), value: year.toString() });
  }
  return years;
};

export const generateDaysArray = (start, end) => {
  const days = [];
  for (let day = start; day <= end; day++) {
    days.push({
      label: day < 10 ? `0${day}` : day.toString(),
      value: day < 10 ? `0${day}` : day.toString(),
    });
  }
  return days;
};

export const seperateByThousand = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
