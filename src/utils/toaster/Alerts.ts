import Toast from 'react-native-toast-message';

const showErrorToast = title => {
  return Toast.show({
    type: 'error',
    text1: 'Error',
    text2: title?.message,
  });
};

const showSuccessToast = title => {
  return Toast.show({
    type: 'success',
    text1: title?.subTitle || 'Success',
    text2: title?.message,
  });
};

export {showErrorToast, showSuccessToast};
