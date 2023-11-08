export const capitalizeFirstLetter = (str) => {
  return str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
};
