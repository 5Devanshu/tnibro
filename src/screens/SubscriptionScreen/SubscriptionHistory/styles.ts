import {Dimensions, Platform, StyleSheet} from 'react-native';
import {scaleHeight, scaleWidth, normalizeFont, dynamicSize} from '../../../Constants/enums';
import {COLORS} from '../../../Constants/enums/colorsEnum';
import FONTS from '../../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  graidentView: {
    alignSelf: 'center',
    // borderRadius: scaleWidth(16),
    // marginTop: scaleHeight(39),
  },

  scrollviewDe: {
    marginHorizontal: scaleWidth(20),
  },
  Header_Text: {
    color: COLORS.Black,
    fontSize: normalizeFont(24),
    fontWeight: 'bold',
    marginBottom: scaleHeight(20),
  },
  cardContainer: {
    backgroundColor: COLORS.PrimaryWhite,
    marginBottom: scaleHeight(18),
    borderRadius: scaleWidth(12),
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(20),
  },
  txtHead: {
    color: COLORS.Black,
    fontFamily: FONTS.RobotoBold,
    fontSize: normalizeFont(18),
  },
  txtamount: {
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoBold,
    fontSize: normalizeFont(20),
  },
  transationNo: {
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoBold,
    fontSize: normalizeFont(12),
  },
  dateno: {
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(14),
    marginTop: scaleHeight(4),
  },
  txtActive: {
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoMedium,
    fontSize: normalizeFont(14),
    marginTop: scaleHeight(4),
  },
  noDataView: {
    alignItems: 'center',
    paddingHorizontal: dynamicSize(20),
    justifyContent: 'center',
    marginBottom: scaleHeight(50),
  },
  noDataTitle: {
    fontSize: normalizeFont(20),
    color: COLORS.Black,
  },
});
export default styles;
