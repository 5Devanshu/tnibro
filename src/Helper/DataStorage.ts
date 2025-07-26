import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreDataLocally = async (key: string, data: object | string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {}
};

export const getDataFomLocalStore = async (key: string) => {
  try {
    const result = await AsyncStorage.getItem(key);
    // return result != null ? JSON.parse(result) : null;
    return result;
  } catch (error) {}
};

export const RemoveLocallyData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};
export const removeAllData = async (isNotNavigate?: boolean): Promise<void> => {
  const allKeys = await AsyncStorage.getAllKeys();
  await AsyncStorage.multiRemove(allKeys);
};
