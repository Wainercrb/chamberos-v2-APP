import AsyncStorage from '@react-native-async-storage/async-storage'

export const persistLocalStorage = async <T,>(key: string, value: T): Promise<void> => {
  await AsyncStorage.setItem(key, JSON.stringify({ ...value }))
}

export const clearLocalStorage = async (key: string): Promise<void> => {
  await AsyncStorage.removeItem(key)
}

export const getLocalStorage = async (key: string): Promise<string | null> => {
  return await AsyncStorage.getItem(key)
}
