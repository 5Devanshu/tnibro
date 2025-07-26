import {StyleSheet} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  txtHelp: {
    color: '#151716',
    fontSize: normalizeFont(22),
    fontFamily: FONTS.RobotoBold,
  },
  txttitle: {
    color: '#4A4A4A',
    fontSize: normalizeFont(14),
    marginTop: scaleHeight(18),
    fontFamily: FONTS.RobotoRegular,
  },
  subTitle: {
    marginTop: scaleHeight(22),
    color: '#151716',
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
  },
  deactivateIcon: {
    height: scaleWidth(228),
    width: scaleWidth(342),
    alignSelf: 'center',
    marginTop: scaleHeight(10),
  },
  mainContainer: {
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: scaleWidth(20),
    marginHorizontal: scaleWidth(13),
    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleHeight(22),
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(200),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 21,
  },
  numberContainer: {
    borderWidth: scaleWidth(1),
    borderColor: '#4BD874',
    borderRadius: scaleWidth(12),
    backgroundColor: COLORS.PrimaryBackGround,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(10),
  },
  countryPicker: {
    marginRight: scaleWidth(8),
    alignItems: 'center',
  },
  checkbox: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    borderRadius: scaleWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scaleWidth(10),
    backgroundColor: '#EEE',
    marginLeft: scaleWidth(13),
    borderColor: '#339502',
    borderWidth: 1,
  },
  checkmark: {
    color: '#339502',
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: normalizeFont(11),
    color: '#5D6166',
    fontFamily: FONTS.RobotoRegular,
  },
  input: {
    fontWeight: '500',
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(14),
    marginLeft: scaleWidth(10),
    color: '#4A4A4A',
    height: scaleHeight(50),
    width: '65%',
    borderWidth: 1,
    borderColor: '#4BD874',
    borderRadius: scaleWidth(12),
    backgroundColor: COLORS.PrimaryBackGround,
    paddingHorizontal: scaleWidth(10),
  },
  LoginBtn: {
    backgroundColor: '#228B22',
    borderRadius: scaleWidth(26),
    alignSelf: 'center',
    marginTop: scaleHeight(22),
    paddingVertical: scaleHeight(16),
    paddingHorizontal: scaleWidth(50),
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: normalizeFont(16),
    color: COLORS.PrimaryWhite,
    fontFamily: FONTS.RobotoRegular,
  },
  Checkboxcontainer: {
    backgroundColor: COLORS.PrimaryBackGround,
    marginTop: scaleHeight(22),
    paddingTop: scaleHeight(15),
    borderRadius: scaleWidth(12),
  },
  phoneno: {
    color: '#151716',
    fontSize: normalizeFont(12),
    marginTop: scaleHeight(22),
    marginBottom: scaleHeight(10),
    fontFamily: FONTS.RobotoRegular,
    textAlign: 'center',
  },
  errorMsg: {
    color: 'red',
    textAlign: 'center',
  },
});
export default styles;
