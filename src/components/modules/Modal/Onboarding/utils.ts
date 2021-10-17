export const MONTH_DICT = [
  { key: "1", value: "Januari" },
  { key: "2", value: "Februari" },
  { key: "3", value: "Maret" },
  { key: "4", value: "April" },
  { key: "5", value: "Mei" },
  { key: "6", value: "Juni" },
  { key: "7", value: "Juli" },
  { key: "8", value: "Agustus" },
  { key: "9", value: "September" },
  { key: "10", value: "Oktober" },
  { key: "11", value: "November" },
  { key: "12", value: "Desember" },
];

export const DATE_DICT = () => {
  const date = [];

  for (let i = 0; i < 31; i += 1) {
    date.push({
      key: (i + 1).toString(),
      value: (i + 1).toString(),
    });
  }

  return date;
};

export const YEAR_DICT = () => {
  const year = [];
  const now = new Date();

  for (let i = 1900; i <= now.getFullYear(); i += 1) {
    year.push({
      key: i.toString(),
      value: i.toString(),
    });
  }

  return year;
};
