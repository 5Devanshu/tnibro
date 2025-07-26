import { ColorValue } from 'react-native';

export type DynamicButtonProps = {
    onPress: () => void;
    text?: string;
    bgColor?: ColorValue;
  };
  