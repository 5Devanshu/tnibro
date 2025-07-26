import {Platform, StyleSheet} from 'react-native';
import {COLORS, dynamicSize, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: scaleWidth(1),
    borderColor: '#4BD874',
    marginBottom: scaleHeight(10),
    paddingHorizontal: dynamicSize(20),
    paddingVertical:10,
    marginHorizontal:30,
    marginVertical:5,
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: scaleWidth(8),
  },
  TxtTitle: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoBold,
    letterSpacing: 1,
    flex: 1,
    marginRight: scaleWidth(5),
    marginBottom: scaleHeight(2),
  },
  TxtTitle2: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoMedium,
    letterSpacing: 1,
    flex: 1,
    marginRight: scaleWidth(5),
  },
  txtDate: {
    color: '#4A4A4A',
    fontSize: normalizeFont(13),
    fontFamily: FONTS.RobotoLight,
  },
  Description: {
    color: '#4A4A4A',
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
    marginLeft:10,
  },
  view_currentStatue: {
    backgroundColor: COLORS.PrimaryBackGround,
    borderRadius: scaleWidth(6),
    alignSelf: 'flex-start',
  },
  txtCurrentStatue: {
    color: '#228B22',
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
    padding: dynamicSize(10),
  },
});
export default styles;
