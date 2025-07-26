import {Platform, Linking} from 'react-native';
import {normalizeFont} from '../Constants/enums/Dimensions';
import {showMessage} from 'react-native-flash-message';
import {COLORS} from '../Constants/enums/colorsEnum';

let isConnected = true;

export const setConnectionStatus = status => (isConnected = status);

export const ToastHandler = (isSuccess, message) => {
  //   if (!isConnected) {
  //     return;
  //   }
  return showMessage({
    message,
    style: {
      backgroundColor: isSuccess ? COLORS.RGB_218_244_222 : COLORS.RGB_252_232_230,
      alignItems: 'center',
    },
    titleStyle: {
      color: isSuccess ? COLORS.RGB_57_195_79 : COLORS.RGB_216_48_37,
      fontSize: normalizeFont(14),
    //   fontFamily: FONTS.WorkSansRegular,
    },
    duration: 5000,
    icon: isSuccess ? 'success' : 'danger',
  });
};
