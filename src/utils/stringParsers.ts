
export const camelCase = (text: string, sep: string = " ", joiner: string = " "): string => {
  return text.split(sep).map(word => {
    return word.charAt(0).toLocaleUpperCase() + word.slice(1)
  }).join(joiner);
};


