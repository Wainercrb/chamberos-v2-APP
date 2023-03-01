import AsyncStorage from "@react-native-async-storage/async-storage";

export const persistLocalStorage = async <T,>(key: string, value: T) => {
  return AsyncStorage.setItem(key, JSON.stringify({ ...value }));
};

export const clearLocalStorage = async (key: string) => {
  return AsyncStorage.removeItem(key);
};

export const getLocalStorage = async (key: string) => {
  return AsyncStorage.getItem(key);
};
