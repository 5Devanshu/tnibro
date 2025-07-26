import {Platform, StyleSheet} from 'react-native';
import {normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums/Dimensions';
import {COLORS} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: COLORS.PrimaryBackGround,
  },
  container: {
    flex: 1,
  },
  loginlogo: {
    alignSelf: 'center',
    height: scaleWidth(173.99),
    width: scaleWidth(173.99),
    marginTop: scaleHeight(30),
    resizeMode:'contain'
  },
  form: {
    marginBottom: scaleHeight(24),
    marginTop: scaleHeight(60),
    // backgroundColor:'red'
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
    marginBottom: scaleHeight(14),
  },
  subtitle: {
    color: '#4A4A4A',
    fontSize: normalizeFont(15),
    fontFamily: FONTS.RobotoRegular,
    marginBottom: scaleHeight(22),
  },
  inputLabel: {
    fontSize: normalizeFont(12),
    color: '#000',
    marginBottom: scaleHeight(12),
    fontFamily: FONTS.RobotoRegular,
  },
  numberContainer: {
    borderWidth: scaleWidth(1),
    borderColor: COLORS.PrimaryGreen,
    borderRadius: 12,
    backgroundColor: COLORS.PrimaryBackGround,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryPicker: {
    marginRight: scaleWidth(8),
    alignItems: 'center',
    paddingHorizontal: scaleWidth(8),
  },
  inputControl: {
    height: scaleHeight(44),
    borderRadius: scaleWidth(12),
    fontSize: normalizeFont(15),
    color: '#222',
    fontFamily: FONTS.RobotoRegular,
  },
  inputfiield: {
    height: scaleHeight(50),
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: COLORS.PrimaryGreen,
    borderRadius: scaleWidth(12),
    borderBottomColor: COLORS.PrimaryGreen,
    backgroundColor: COLORS.PrimaryBackGround,
    paddingHorizontal: scaleWidth(10),
  },
  inputtxt: {
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(14),
    marginLeft: scaleWidth(10),
    color: '#4A4A4A',
  },
  danger: {
    color: 'red',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: normalizeFont(15),
    fontFamily: FONTS.RobotoRegular,
  },
  formAction: {
    marginVertical: scaleHeight(24),
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleWidth(25),
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
    borderRadius: scaleWidth(25),
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(20),
    borderWidth: 1,
    backgroundColor: COLORS.PrimaryBackGround,
    borderColor: COLORS.PrimaryBackGround,
  },
  btnText: {
    fontSize: normalizeFont(16),
    lineHeight: 26,
    fontWeight: '700',
    fontFamily: FONTS.RobotoRegular,
  },
  formFooter: {
    fontSize: normalizeFont(16),
    fontWeight: '500',
    color: '#4A4A4A',
    textAlign: 'center',
    letterSpacing: 0.15,
    fontFamily: FONTS.RobotoRegular,
  },
});
export default styles;
