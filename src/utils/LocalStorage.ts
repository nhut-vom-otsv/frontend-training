type LocalStorageType = {
  key: string;
  value?: any;
};

const initLocalStorage = (key: string) => {
  localStorage.setItem(key, "{}");
};

const getLocalStorageValue = (data: LocalStorageType) => {
  const value = localStorage.getItem(data.key);
  if (value === null) initLocalStorage(data.key);
  return JSON.parse(value ?? "{}");
};

const updateLocalStorageValue = (data: LocalStorageType) => {
  const value = JSON.stringify(data.value);
  localStorage.setItem(data.key, value);
};

const removeLocalStorageValue = (data: LocalStorageType) => {
  localStorage.removeItem(data.key);
};

const clearAllLocalStorageValues = () => {
  localStorage.clear();
};

export {
  initLocalStorage,
  getLocalStorageValue,
  updateLocalStorageValue,
  removeLocalStorageValue,
  clearAllLocalStorageValues,
};
