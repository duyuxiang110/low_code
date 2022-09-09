export const emptyArray = (arr) => {
  return arr.filter(
    (value) => Object.keys(value).length !== 0
  );
}