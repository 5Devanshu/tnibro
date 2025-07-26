import {StyleSheet, Platform} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  bottomContainer: {
    marginTop: scaleHeight(15),
    marginHorizontal: scaleWidth(20),
  },
  FAQcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textanswer: {
    color: COLORS.BorderColor,
    fontSize: normalizeFont(14),
    lineHeight: scaleHeight(20),
    letterSpacing: -0.16,
    marginTop: scaleHeight(10),
    fontFamily: FONTS.RobotoRegular,
  },
  textanswer2: {
    color: COLORS.SecondaryBlack,
    fontSize: normalizeFont(15),
    fontWeight: '900',
    letterSpacing: -0.16,
    fontFamily: FONTS.RobotoRegular,
  },
  backbtnView: {
    marginHorizontal: scaleWidth(20),
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(15),
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: scaleWidth(15),
  },
  FaqContainer: {
    marginBottom: scaleHeight(10),
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(20),
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: scaleWidth(5),
  },
  txtquestion: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(16),
    letterSpacing: -0.297,
    fontFamily: FONTS.RobotoMedium,
    flex: 1,
  },
  txtHelp: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoBold,
  },
  txtDescription: {
    color: COLORS.BorderColor,
    fontSize: normalizeFont(15),
    fontFamily: FONTS.RobotoRegular,
    marginTop: scaleHeight(20),
  },
  DisclaimerView: {
    marginTop:20,
    marginHorizontal: scaleWidth(30),
    marginBottom: Platform.OS === 'ios' ? scaleHeight(20) : scaleHeight(50),
  },
  disclaimerText: {
    fontFamily: FONTS.RobotoBold,
    fontSize: normalizeFont(18),
    color: '#6E6D6D',
  },
  DisclaimerDes: {
    letterSpacing: 0.5,
    color: COLORS.Black,
    marginTop: scaleHeight(12),
    fontSize: normalizeFont(14),
   textAlign: 'justify',
    fontFamily: FONTS.RobotoRegular,
  },
  Termandcondition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleHeight(20),
  },
  txtDisclamer: {
    color: COLORS.Black,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoRegular,
  },
});
export default styles;
