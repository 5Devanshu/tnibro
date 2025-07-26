import {COLORS} from '../../../Constants/enums/colorsEnum';
import {Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import {FixedValue, normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    // backgroundColor: '#D0FFDD',
  },
  hitSlop: {
    // top: 20,
    // bottom: 20,
    // left: 50,
    // right: 50,
  },
  backIconContainer: {
    // marginTop: scaleHeight(64),
    // marginHorizontal: scaleWidth(32),
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  backIcon: {
    // height: scaleHeight(42),
    // width: scaleWidth(42),
    // // tintColor: '#339502',
  },
  heardertext: {
    // flex: 1,
    // textAlign: 'center',
    // color: '#051933',
    // fontSize: normalizeFont(21),
    // fontWeight: '600',
  },
  Maincontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(32),
    backgroundColor: '#FFF',
    marginBottom: scaleHeight(FixedValue.CONSTANT_VALUE_12),
    borderColor: '#ADADAD',
    borderWidth: 0.2,
  },
  ActivityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerView: {
    // marginHorizontal: scaleWidth(32),
    // marginTop: scaleHeight(28),
  },
  txtStockDetail: {
    color: COLORS.PrimaryBlack,
    paddingVertical: scaleHeight(21),
    marginLeft: scaleWidth(32),
    fontSize: normalizeFont(17),
    fontFamily: FONTS.RobotoMedium,
  },
  stockDetailContainer: {
    backgroundColor: COLORS.PrimaryWhite,
    paddingBottom: scaleHeight(50),
    paddingTop:20,
  },
  noResultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  TxtNoResult: {
    color: '#000',
    fontSize: normalizeFont(25),
    fontWeight: '500',
  },
  TxtNoResult2: {
    color: COLORS.red,
    fontSize: normalizeFont(20),
    fontWeight: '500',
  },
  SymbolName: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(22),
    fontWeight:'600',
    fontFamily: FONTS.RobotoBold,
    letterSpacing: -0.44,
  },
  lineaGradient: {
    alignSelf: 'flex-start',
    borderRadius: scaleWidth(6),
    marginTop: scaleHeight(20),
    marginBottom:5
  },
  PerformanceContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  performanceIcon: {height: scaleHeight(19), width: scaleWidth(14.68), marginLeft: scaleWidth(5), resizeMode:"contain"},
  TextRecent: {
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(8),
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoMedium,
  },
  backtesting: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(22),
    fontFamily: FONTS.RobotoBold,
    marginTop: scaleHeight(22),
  },
  calendarIcon: {
    width: scaleWidth(35),
    height: scaleHeight(35),
    resizeMode:'contain'
  },
  backtestingcontainer: {
    flexDirection: 'row',
    marginTop: scaleHeight(6),
  },
  backtesingDes: {
    color: COLORS.BorderColor,
    fontSize: normalizeFont(13),
    fontFamily: FONTS.RobotoRegular,
    alignSelf: 'center',
    marginLeft: scaleWidth(14),
    width: '85%',
    paddingBottom: scaleHeight(10),
  },
  BuysignalView: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: scaleHeight(43),
    backgroundColor: COLORS.PrimaryWhite,
    marginHorizontal: scaleWidth(20),
  },

  signalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signalText: {
    marginRight:10,
    fontSize: normalizeFont(13),
    fontWeight: '700',
    color: '#414141',
  },
  signalDate: {
    color: '#414141',
    fontSize: normalizeFont(13),
    fontWeight: '600',
    letterSpacing: -0.191,
  },

  txtBlackColor: {
    color: '#414141',
  },
  txtPrice: {
    fontSize: normalizeFont(14),
    fontWeight: '700',
  },
  LockIcon: {
    height: '100%',
    width: '100%',
  },
  HighLowView: {
    flexDirection: 'row',
    backgroundColor: COLORS.PrimaryBackGround,
    padding: 11,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HighLowText: {
    color: '#414141',
    fontSize: normalizeFont(13),
    fontWeight: '700',
  },
  HighLowPrice: {
    color: '#339502',
    fontSize: normalizeFont(14),
    fontWeight: '700',
  },
  GainSaveText: {
    color: '#414141',
    fontSize: normalizeFont(13),
    fontWeight: '700',
  },
  Percentage: {
    color: '#339502', //green colour
    fontSize: normalizeFont(13),
    fontWeight: '700',
  },
  pctView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: 6,
    paddingVertical: scaleHeight(11),
    paddingHorizontal: scaleWidth(15),
  },
  Reccom_View: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Txtrecommendation_Signal: {
    fontSize: normalizeFont(18),
    fontWeight: '800',
    fontStyle: 'italic',
  },
  txt_SignalSince: {
    color: '#666',
    fontSize: normalizeFont(15),
    fontStyle: 'italic',
  },
  recommendationDate: {
    color: '#000',
    fontSize: normalizeFont(15),
    fontStyle: 'normal',
    fontWeight: '500',
    letterSpacing: -0.16,
    borderColor: '#339502',
    borderWidth: 1,
    padding: 1,
  },

  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textValue: {
    paddingVertical: scaleHeight(6),
    color: '#000',
    fontSize: normalizeFont(14),
    textAlign: 'right',
    // alignSelf:'center',
  },
  DetailText: {
    paddingVertical: scaleHeight(6),
    color: '#666',
    fontSize: normalizeFont(14),
  },
  modalView: {
    margin: 20,
    backgroundColor: '#080516',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scaleWidth(20),
    padding: 35,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scaleHeight(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ////
  tag: {
    backgroundColor: COLORS.PrimaryBackGround,
    borderRadius: scaleWidth(5),
    paddingVertical: scaleHeight(6),
    paddingHorizontal: scaleWidth(8),
    marginRight: scaleWidth(8),
    marginBottom: scaleHeight(8),
  },
  tagText: {
    fontSize: normalizeFont(11),
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoRegular,
    fontWeight:'500',
    letterSpacing: -0.187,
    textTransform: 'uppercase',
  },
  HoldView: {
    marginTop:10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  HoldImage: {
    resizeMode: 'contain',
    height: scaleWidth(50),
    width: scaleWidth(50), 
  },
  ChartIcon: {
    width: scaleWidth(30),
    height: scaleWidth(30),
  },
  txtTitle: {
    color: COLORS.PrimaryBlack,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
    marginTop: scaleHeight(5),
  },
  loaderContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  danger: {
    color: COLORS.PrimaryBlack,
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: normalizeFont(24),
    fontFamily: FONTS.RobotoBold,
  },
  greyContainer: {
    backgroundColor: '#3B3F44',
    borderRadius: scaleWidth(8),
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scaleHeight(7),
  },
  txtgreyarea: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoMedium,
  },
});
export default styles;
