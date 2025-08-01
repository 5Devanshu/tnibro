import {Platform, StyleSheet} from 'react-native';
import {normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums/Dimensions';
import {COLORS} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // backgroundColor: '#fff',
    flex: 1,
    backgroundColor: COLORS.PrimaryBackGround,
  },
  container: {
    // backgroundColor: '#fff',
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 40 : 0
  },
  loginlogo: {
    alignSelf: 'center',
    height: scaleWidth(173.99),
    width: scaleWidth(173.99),
    marginTop: scaleHeight(20),
    resizeMode:'contain'
  },
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  form: {
    // flexGrow: 1,
    // flexShrink: 1,
    // flexBasis: 0,
    marginBottom: scaleHeight(24),
    marginTop: scaleHeight(24),
  },
  input: {
    marginBottom: scaleHeight(16),
    backgroundColor: COLORS.PrimaryWhite,
    marginHorizontal: scaleWidth(20),
    borderRadius: scaleWidth(20),
    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleHeight(22),
  },
  maintitle: {
    color: '#151716',
    fontSize: normalizeFont(22),
    fontFamily: FONTS.RobotoBold,
    marginBottom: scaleHeight(18),
  },
  subtitle: {
    color: COLORS.BorderColor,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoRegular,
    marginBottom: scaleHeight(22),
  },
  inputLabel: {
    fontSize: normalizeFont(12),
    color: '#151716',
    marginBottom: scaleHeight(12),
    fontFamily: FONTS.RobotoRegular,
  },
  numberContainer: {
    borderWidth: scaleWidth(1),
    borderRadius: 12,
    borderColor: COLORS.PrimaryGreen,
    backgroundColor: COLORS.PrimaryBackGround,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryPicker: {
    marginRight: 8,
    alignItems: 'center',
    paddingHorizontal: scaleWidth(8),
  },
  inputControl: {
    height: scaleHeight(44),
    borderRadius: scaleWidth(12),
    fontSize: normalizeFont(15),
    fontWeight: '500',
    color: '#222',
  },
  inputfiield: {
    height: scaleHeight(50),
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.PrimaryGreen,
    borderRadius: scaleWidth(12),
    backgroundColor: COLORS.PrimaryBackGround,
    paddingHorizontal: scaleWidth(10),
  },
  referalcontainer: {
    height: scaleHeight(50),
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.PrimaryGreen,
    borderRadius: scaleWidth(12),
    backgroundColor: COLORS.PrimaryBackGround,
    paddingHorizontal: scaleWidth(16),
    color: COLORS.BorderColor,
  },
  inputtxt: {
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(14),
    marginLeft: scaleWidth(10),
    color: COLORS.BorderColor,
  },
  formAction: {
    marginTop: scaleHeight(22),
  },
  formFooter: {
    fontSize: normalizeFont(16),
    fontWeight: '500',
    color: COLORS.BorderColor,
    textAlign: 'center',
    letterSpacing: 0.15,
    fontFamily: FONTS.RobotoRegular,
  },
  separator: {
    width: '30%', // Width of the separator (80% of the screen width)
    height: 1, // Thickness of the separator
    borderColor: COLORS.BorderColor,
    borderWidth: 0.5,
    backgroundColor: COLORS.BorderColor,
  },
  referralText: {
    fontSize: normalizeFont(12),
    color: COLORS.BorderColor,
    fontFamily: FONTS.RobotoRegular,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(20),
    borderWidth: 1,
    backgroundColor: 'green',
    borderColor: 'green',
  },
  btnText: {
    fontSize: normalizeFont(16),
    lineHeight: 26,
    fontWeight: '600',
    color: COLORS.PrimaryWhite,
    fontFamily: FONTS.RobotoBold,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(20),
    borderWidth: 1,
    backgroundColor: COLORS.PrimaryGreen,
    borderColor: COLORS.PrimaryGreen,
  },
  disablebtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(20),
    borderWidth: 1,
    backgroundColor: COLORS.PrimaryBackGround,
    borderColor: COLORS.PrimaryBackGround,
  },
  danger: {
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  tncWrapper: {
    marginTop: scaleHeight(21),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tncTxtWrapper: {
    color: COLORS.BorderColor,
    marginLeft: 10,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoRegular,
  },
  tncLink: {
    color: COLORS.PrimaryGreen,
  },
  textDesc: {
    color: COLORS.BorderColor,
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
    marginVertical: scaleHeight(10),
    textAlign: 'center',
  },
  image1: {
    width: '100%',
    height: 70,
    resizeMode: 'contain',
  },
  selectBtnTxt: {
    color: '#000',
    fontWeight: '400',
    fontSize: 20,
    fontFamily: 'Montreal-Light',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
});
export default styles;
