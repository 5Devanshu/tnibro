import {StyleSheet} from 'react-native';
import {normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums/Dimensions';
import {COLORS} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  mainCon: {
    flex: 1,
    marginBottom: scaleHeight(250),
    backgroundColor: COLORS.PrimaryBackGround,
  },
  loginlogo: {
    alignSelf: 'center',
    height: scaleWidth(173.99),
    width: scaleWidth(173.99),
    marginTop: scaleHeight(30),
  },
  input: {
    marginBottom: scaleHeight(16),
    backgroundColor: COLORS.PrimaryWhite,
    marginHorizontal: scaleWidth(20),
    borderRadius: scaleWidth(20),
    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleHeight(22),
    marginTop: scaleHeight(60),
  },
  maintitle: {
    color: '#4A4A4A',
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoRegular,
    marginBottom: scaleHeight(20),
    textAlign: 'center',
  },
  registerLbl: {
    color: '#4A4A4A',
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(16),
    textAlign: 'center',
  },
  underlineStyleBase: {
    width: scaleWidth(45),
    height: scaleHeight(45),
    color: '#228B22',
    fontFamily: FONTS.RobotoBold,
    backgroundColor: COLORS.PrimaryBackGround,
    borderRadius: scaleWidth(40),
    fontSize: normalizeFont(18),
  },
  underlineStyleHighLighted: {
    borderColor: '#228B22',
  },
  btn: {
    alignItems: 'center',
    borderRadius: scaleWidth(26),
    paddingVertical: scaleHeight(14),
    borderWidth: 1,
    backgroundColor: '#228B22',
    borderColor: '#228B22',
    marginTop: scaleHeight(21),
  },
  btnText: {
    fontSize: normalizeFont(16),
    lineHeight: 26,
    fontWeight: '600',
    color: COLORS.PrimaryWhite,
    fontFamily: FONTS.RobotoRegular,
  },
  danger: {
    color: 'red',
    textAlign: 'center',
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(14),
    marginBottom: scaleHeight(10),
  },
});
export default styles;
