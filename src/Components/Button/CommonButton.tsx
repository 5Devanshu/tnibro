import React from 'react';
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

interface CommonButtonProps extends TouchableOpacityProps {
  text: string;
  backgroundColor?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
  borderRadius?: number;
  fontSize?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  color?: string;
  disabled?: boolean;
}
const CommonButton: React.FC<CommonButtonProps> = ({
  text,
  onPress,
  backgroundColor = '#228B22',
  paddingHorizontal = scaleWidth(14),
  paddingVertical = scaleHeight(7),
  borderRadius = 16,
  fontSize = normalizeFont(16),
  marginHorizontal = scaleWidth(0),
  marginVertical = 0,
  color = '#fff',
  disabled = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonDesign,
        {
          backgroundColor: disabled ? '#d3d3d3' : backgroundColor,
          paddingHorizontal,
          paddingVertical,
          borderRadius,
          marginHorizontal,
          marginVertical,
        },
      ]}
      onPress={!disabled ? onPress : undefined}
      disabled={disabled}
      {...props}>
      <Text
        allowFontScaling={false}
        style={[styles.buttonText, {fontSize, color: disabled ? '#000' : color}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonDesign: {
    alignSelf: 'center',
    marginHorizontal: scaleWidth(5),
    marginVertical: 5,
  },
  buttonText: {
    color: COLORS.PrimaryWhite,
    textAlign: 'center',
    fontFamily: FONTS.RobotoMedium,
  },
});

export default React.memo(CommonButton);
