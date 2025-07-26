import {Dimensions, Platform, StyleSheet} from 'react-native';
const {height} = Dimensions.get('window');
import {scaleHeight, scaleWidth, normalizeFont} from '../../Constants/enums';
import {COLORS} from '../../Constants/enums/colorsEnum';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  RefundExpireImage: {
    height: scaleHeight(298),
    width: scaleWidth(193),
    alignSelf: 'center',
    marginTop: scaleHeight(40),
  },
  txtpleaseNote: {
    color: '#716C6C',
    fontFamily: FONTS.RobotoBold,
    fontSize: normalizeFont(18),
    textAlign: 'center',
    marginTop: scaleHeight(80),
  },
  txtDesc: {
    color: '#716C6C',
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(18),
    textAlign: 'center',
    marginTop: scaleHeight(10),
    marginHorizontal: scaleWidth(20),
    marginBottom: scaleHeight(20),
  },
  applogo: {
    width: scaleWidth(69),
    height: scaleWidth(69),
    alignSelf: 'center',
  },
  txthead: {
    color: '#4B4B4B',
    fontFamily: FONTS.RobotoMedium,
    fontSize: normalizeFont(28),
    alignSelf: 'center',
  },
  txtamount: {
    color: '#333',
    fontFamily: FONTS.RobotoBold,
    fontSize: normalizeFont(20),
    alignSelf: 'center',
    marginTop: scaleHeight(26),
  },
  purchaseDate: {
    color: '#575757',
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(19),
    alignSelf: 'center',
    marginTop: scaleHeight(26),
  },
  Refundvalid: {
    color: '#575757',
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(19),
    alignSelf: 'center',
  },
  txtReason: {
    color: '#5D6166',
    fontFamily: FONTS.RobotoMedium,
    fontSize: normalizeFont(14),
    marginLeft: scaleWidth(10),
    marginTop: scaleHeight(60),
    marginBottom: scaleHeight(7),
  },
  contectContainer: {
    backgroundColor: '#F4FFF2',
    borderRadius: 19,
    borderWidth: 0.5,
    borderColor: '#E4E4E4',
  },
  itemContainer: {
    paddingLeft: 10,
    borderBottomWidth: 0.5,
    borderColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingVertical: scaleHeight(11),
    fontSize: normalizeFont(15),
    color: '#717171',
    fontFamily: FONTS.RobotoRegular,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: '#EEE',
    marginLeft: 13,
  },
  checkmark: {
    color: '#339502',
  },
  labelContainer: {
    flex: 1,
  },
  offerView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scaleHeight(16),
  },
  offertxt: {
    color: '#fff',
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoBold,
  },
  refundcontainer: {
    marginTop: scaleHeight(40),
    padding: 2,
  },
  graidentcontainer: {
    borderRadius: scaleWidth(10),
    padding: 1,
  },
  refundInnerContainer: {
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: scaleWidth(10),
    paddingHorizontal: scaleWidth(17),
  },
  Txt_yourefund: {
    color: '#2C362C',
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoBold,
    marginBottom: scaleHeight(26),
    marginTop: scaleHeight(34),
  },
  refundtxt: {
    color: '#2C362C',
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoRegular,
    marginVertical: scaleHeight(2),
  },
  refundDes: {
    color: '#777',
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoRegular,
    marginBottom: scaleHeight(33),
  },
});
export default styles;
