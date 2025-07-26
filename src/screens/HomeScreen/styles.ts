import {Platform, StyleSheet} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  Container: {
    marginTop: Platform.OS === 'android' ? scaleHeight(10) : 0,
  },
  sebitxt: {
    textAlign: 'center',
    marginHorizontal: scaleWidth(20),
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoRegular,
    marginTop:50,
    marginBottom: scaleHeight(25),
    fontSize: normalizeFont(13),
    textTransform: 'uppercase',
  },
});
export default styles;
