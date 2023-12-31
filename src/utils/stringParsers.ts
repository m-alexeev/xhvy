export const camelCase = (
  text: string,
  sep: string = " ",
  joiner: string = " ",
): string => {
  return text.split(sep).map((word) => {
    return word.charAt(0).toLocaleUpperCase() + word.slice(1);
  }).join(joiner);
};

export const formatNumberField = (value?: number): string => {
  if (value === 0 || value === undefined) {
    return "";
  } else {
    return value.toString();
  }
};
