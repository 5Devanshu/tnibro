import {StyleSheet, Platform} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth, styleBase} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  flexarea: {
    ...styleBase.flex1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.PrimaryWhite,
    borderTopLeftRadius: scaleWidth(30),
    borderTopRightRadius: scaleWidth(30),
  },
  headerContainer: {
    marginHorizontal: scaleWidth(20),
    marginTop: scaleHeight(30),
  },
  title: {
    fontSize: normalizeFont(18),
    marginBottom: scaleWidth(12),
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoBold,
  },
  StoplossTxt: {
    color: COLORS.BorderColor,
    fontSize: normalizeFont(14),
    fontWeight: '400',
    marginBottom: scaleWidth(10),
    fontFamily: FONTS.RobotoRegular,
  },
  Currentrade: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(16),
    fontWeight: '500',
    marginBottom: scaleWidth(16),
    fontFamily: FONTS.RobotoBold,
  },
  tradeDetailcontainer: {
    backgroundColor: COLORS.PrimaryBackGround,
    borderRadius: 6,
    paddingVertical: scaleHeight(18),
    paddingHorizontal: scaleWidth(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  Datecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(10),
  },
  flexDire: {
    flexDirection: 'row',
  },
  flexDirJustCon: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  LockIcon: {
    height: '100%',
    width: '100%',
  },
  icondetail: {
    height: scaleHeight(18),
    width: scaleWidth(19.57),
    marginRight: scaleWidth(10),
    resizeMode:'contain'
  },
  icondetail2: {
    height: scaleHeight(18),
    width: scaleWidth(18),
    marginRight: scaleWidth(10),
    resizeMode:'contain'
  },
  Profit_LossIcon: {
    height: scaleHeight(18),
    width: scaleWidth(18),
    marginTop:3,
    marginRight: scaleWidth(10),
    resizeMode:'contain'
  },
  Datetext: {
    color: COLORS.PrimaryBlack,
    fontSize: Platform.OS === 'ios' ? normalizeFont(16) : normalizeFont(16),
    fontWeight: '300',
    marginLeft: scaleWidth(5),
    fontFamily: FONTS.RobotoBlack,
  },
  Pricetext: {
    color: COLORS.BorderColor,
    fontSize: Platform.OS === 'ios' ? normalizeFont(16) : normalizeFont(16),
    fontWeight: '400',
    flex: 1,
    textAlign: 'right',
    fontFamily: FONTS.RobotoRegular,
  },
  AlertContainer: {
    borderLeftWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#C8C8C8',
  },
  AlertIcon: {
    marginLeft: scaleWidth(10),
    height: scaleHeight(51),
    width: scaleWidth(51),
    resizeMode:'contain'
  },
  tradeContainer: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(16),
    fontWeight: '500',
    marginTop: scaleHeight(22),
    marginBottom: scaleHeight(22),
    fontFamily: FONTS.RobotoBold,
  },
  Redalertbox: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF4D4F',
    borderRadius: 4,
    paddingVertical: scaleHeight(6),
    paddingHorizontal: scaleWidth(6),
  },
  boxtext: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(10),
    textAlign: 'center',
    letterSpacing: 0.44,
    fontFamily: FONTS.RobotoRegular,
  },
  PrevTradecontainer: {
    borderWidth: 0.5,
    borderColor: '#B2B2B2',
    paddingVertical: scaleHeight(17),
    paddingHorizontal: scaleWidth(20),
    marginBottom: scaleHeight(20),
  },
  profit_lossContainer: {
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(13),
    borderWidth: 0.5,
    borderBottomColor: COLORS.white,
  },
  txt_point: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(16),
    fontWeight: '600',
    fontFamily: FONTS.RobotoRegular,
    textAlign: 'center',
  },
  RedContainer: {
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(13),
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.BorderColor,
    justifyContent: 'center',
    backgroundColor: COLORS.PrimaryBackGround,
  },
  redtextdetail: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(14),
    fontWeight: '400',
    marginTop: scaleHeight(5),
    fontFamily: FONTS.RobotoRegular,
  },
  GreenContainer: {
    backgroundColor: COLORS.PrimaryBackGround,
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(13),
    justifyContent: 'center',
  },
  profitContainer: {
    backgroundColor: COLORS.PrimaryBackGround,
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(13),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
});
export default styles;
