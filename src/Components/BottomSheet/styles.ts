import {StyleSheet, Platform} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  boxContainer: bgColor => ({
    backgroundColor: bgColor,
    width: Platform.OS === 'android' ? scaleWidth(340) : scaleWidth(358),
    marginHorizontal: scaleWidth(8),
    borderRadius: scaleWidth(14),
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 2.8,
    shadowRadius: 2,
    alignSelf: 'center',
    position: 'absolute',
  }),
  text_one: {
    fontSize: normalizeFont(13),
    lineHeight: scaleHeight(18),
    letterSpacing: -0.08,
    color: COLORS.text_color_gray,
    opacity: 0.6,
  },
  text_two: {
    fontSize: normalizeFont(20),
    lineHeight: scaleHeight(25),
    letterSpacing: 0.38,
    color: COLORS.blue_color,
  },
  text_three: {
    fontSize: normalizeFont(20),
    lineHeight: scaleHeight(25),
    letterSpacing: 0.38,
    color: COLORS.red_color,
  },
  setText: {
    fontSize: normalizeFont(15),
    fontWeight: '500',
    color: COLORS.white,
  },
  optionContainer: {
    bottom: Platform.OS === 'android' ? scaleHeight(66) : scaleHeight(90),
  },
  cancelField: {
    bottom: Platform.OS === 'android' ? scaleHeight(0) : scaleHeight(25),
    height: scaleHeight(57),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtStyle: (showBorder, height) => ({
    width: '100%',
    height: scaleHeight(height),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.border_line,
    borderBottomWidth: showBorder ? 0.6 : 0,
  }),
});
