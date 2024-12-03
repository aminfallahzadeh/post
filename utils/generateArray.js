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
