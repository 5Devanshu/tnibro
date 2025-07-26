import {StyleSheet} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  container: {
    // marginTop: scaleHeight(15),
    backgroundColor: COLORS.PrimaryWhite,
  },
  inrows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(20),
    backgroundColor: '#fff',
    paddingVertical: scaleHeight(12),
  },
  headerText: {
    color: '#010F07',
    fontSize: normalizeFont(20),
    fontWeight: '600',
    fontFamily: FONTS.RobotoBold,
    marginLeft: scaleWidth(5),
  },
  txtSeeall: {
    color: '#22A45D',
    fontSize: normalizeFont(14),
    fontWeight: '600',
    fontFamily: FONTS.RobotoRegular,
  },
  docsScrollView: {
    marginLeft: scaleWidth(10),
    paddingVertical:10,
  },
  scrollView: {
    // paddingTop: scaleHeight(18),
    // backgroundColor: COLORS.PrimaryWhite,
  },
  cardContainer: {
    backgroundColor: COLORS.PrimaryWhite,
    marginHorizontal: scaleWidth(8),
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(12),
    borderWidth: 0.5,
    borderColor: COLORS.BorderColor,
    borderRadius: scaleWidth(16),
  },
  inrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: scaleWidth(26),
    width: scaleWidth(26),
    backgroundColor: 'gray',
    borderRadius: scaleWidth(50),
  },
  headerTxt: {
    color: '#2C362C',
    fontSize: normalizeFont(14),
    fontWeight: '600',
  },
  starStyle: {
    height: scaleHeight(18),
    width: scaleWidth(18),
    marginLeft: scaleWidth(5),
  },
  graphIcon: {
    height: scaleHeight(24),
    width: scaleWidth(50),
    marginLeft: scaleWidth(15),
  },
  inrow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleHeight(32),
  },
  txtPrice: {
    color: '#2C362C',
    fontSize: normalizeFont(14),
    fontWeight: '700',
  },
  txtPercentage: {
    color: COLORS.PrimaryGreen,
    fontSize: normalizeFont(14),
    fontWeight: '400',
  },
});

export default styles;
