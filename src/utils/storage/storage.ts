import EncryptedStorage from 'react-native-encrypted-storage';

// secured storage data
export const saveToSecureStorage = async (
  key: string,
  value: string,
  isString = false,
) => {
  try {
    await EncryptedStorage.setItem(
      key,
      isString ? value : JSON.stringify(value),
    );
  } catch (error) {
    // There was an error on the native side
  }
};

// retriveing the value from secured storage
export const fetchFromEncryptedStorage = (key: string) => {
  return EncryptedStorage.getItem(key);
};

export const removeFromEncryptedStorage = async (key: string) => {
  await EncryptedStorage.removeItem(key);
};
