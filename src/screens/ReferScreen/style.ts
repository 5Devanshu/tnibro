import { Dimensions, Platform, StyleSheet } from 'react-native';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/enums';
import { COLORS } from '../../Constants/enums/colorsEnum';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(20),
    fontFamily: FONTS.RobotoBold,
    paddingVertical: scaleHeight(20),
  },
  referalImage: {
    marginTop: 40,
    height: scaleHeight(184),
    width: scaleWidth(358),
    alignSelf: 'center',
    resizeMode: 'contain',
    marginHorizontal: 20
  },
  copyIconstyle: {
    height: scaleHeight(20),
    width: scaleWidth(20),
    resizeMode:'contain'
  },
  textShare: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(23),
    fontFamily: FONTS.RobotoBold,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: scaleHeight(30),
  },
  textdesc: {
    color: COLORS.BorderColor,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoRegular,
    textAlign: 'center',
    marginTop: scaleHeight(12),
    marginHorizontal: scaleWidth(20),
  },
  borderline: {
    height: scaleHeight(20),
    width: scaleWidth(1),
    backgroundColor: '#15294B',
  },
  codeContainer: {
    backgroundColor: COLORS.PrimaryWhite,
    marginHorizontal: scaleWidth(20),
    borderRadius: 30,
    paddingVertical: scaleHeight(16),
    paddingHorizontal: scaleWidth(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleHeight(30),
  },
  invitefrndcontainer: {
    backgroundColor: '#228B22',
    paddingVertical: scaleHeight(16),
    paddingHorizontal: scaleWidth(90),
    borderRadius: scaleWidth(26),
    marginHorizontal: scaleWidth(26),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeight(16),
    alignSelf: 'center',
  },
  referalCode: {
    color: COLORS.borderGray,
    fontSize: normalizeFont(18),
    fontFamily: FONTS.RobotoRegular,
  },
  textShareyoucode: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(17),
    fontFamily: FONTS.RobotoMedium,
  },
  socialmediaContainer: {
    flexDirection: 'row',
    marginTop: scaleHeight(16),
    alignSelf: 'center',
  },

  telegramContainer: {
    marginHorizontal: scaleWidth(10),
  },
  socialmediaIcon: {
    height: scaleWidth(35),
    width: scaleWidth(35),
    resizeMode: 'contain'
  },
  Countcontainer: {
    backgroundColor: COLORS.PrimaryWhite,
    marginTop: scaleHeight(30),
    borderWidth: 0.5,
    borderColor: COLORS.BorderColor,
    borderRadius: scaleWidth(4),
    marginBottom: scaleHeight(50),
    marginHorizontal: scaleWidth(20),
  },
  ReferCount: {
    marginTop: scaleHeight(29),
    marginLeft: scaleWidth(15),
  },
  countNumber: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(20),
    marginTop: scaleHeight(5),
    marginBottom: scaleHeight(10),
    fontFamily: FONTS.RobotoBold,
  },
  txtCount: {
    color: '#8F8F8F',
    fontSize: normalizeFont(12.18),
    fontWeight: '600',
  },
  referImage: {
    height: scaleHeight(177),
    width: scaleWidth(230),
    resizeMode:'contain',
    position:'absolute',
    right:2,
  },
  copyContainer: {
    width: '100%', // Match parent
    alignItems: 'center',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%', // Or match codeContainer's width
    paddingVertical: 10,
  },
  
  copyText: {
    color: '#01D4E8',
    marginLeft: 8,
    fontSize: 14,
  },
});
export default styles;
