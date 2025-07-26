import React from 'react';
import {Keyboard, KeyboardEvent} from 'react-native';

export const useKeyboard = (): number => {
  const [keyboardHeight, setKeyboardHeight] = React.useState<number>(0);
  
  function onKeyboardDidShow(e: KeyboardEvent) {
    setKeyboardHeight(e.endCoordinates.height);
  }
  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }
  React.useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return keyboardHeight;
};
