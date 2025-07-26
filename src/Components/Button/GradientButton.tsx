import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {dynamicSize, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

interface CommonButtonProps {
  onPress: () => void;
  text: string;
  gradientColors?: string[];
  style?: ViewStyle;
  mainstyle?: ViewStyle;
  textStyle?: TextStyle;
  isLoading?: boolean;
}

const GradientButton: React.FC<CommonButtonProps> = ({
  onPress,
  text,
  style,
  textStyle,
  isLoading,
  mainstyle,
}) => {
  return (
    <View style={[styles.gradientView, mainstyle]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, style]}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={[styles.buttonText, textStyle]} allowFontScaling={false}>
              {text}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientView: {
    alignSelf: 'center',
    borderRadius: scaleWidth(11),
    marginTop: scaleHeight(25),
    backgroundColor:'#228B22'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(25),
    paddingVertical: scaleHeight(15),
  },
  buttonText: {
    color: '#fff',
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoMedium,
  },
});

export default React.memo(GradientButton);
