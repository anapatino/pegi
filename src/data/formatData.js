export const FormatDate = () => {
  const date = new Date();
  const utcDate = date.toISOString();
  return utcDate;
};

export const FormatDateInitial = (dat) => {
  const date = new Date(dat);
  const utcDate = date.toISOString();
  return utcDate;
};

export const FormatDateView = (dat) => {
  const date = new Date(DataView);
  const utcDate = date.toISOString().split("T")[0];
  return utcDate;
};
