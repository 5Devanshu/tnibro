import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/enums/colorsEnum';
import {
  dynamicSize,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../../Constants/enums/Dimensions';
import FONTS from '../../../Constants/enums/Fonts';

export const styles = StyleSheet.create({
  label: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoRegular,
  },
  ListBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(20),
    backgroundColor: COLORS.PrimaryWhite,
    marginBottom: scaleHeight(15),
    borderRadius: 10,
  },
  nameBox: {
    marginLeft: dynamicSize(11),
    alignSelf: 'center',
    width: '80%',
  },
  arrow: {
    height: scaleWidth(32),
    width: scaleWidth(32),
    borderColor: '#9C9C9C',
    borderWidth: 0.5,
    borderRadius: scaleWidth(25),
  },
});
