export const deleteEmptyStringKeys = (data: object) => {
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ""));
};
