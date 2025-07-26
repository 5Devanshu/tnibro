import {StyleSheet} from 'react-native';
import {COLORS, HEADER_TITLE, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: COLORS.PrimaryWhite,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scaleWidth(18),
    marginTop: scaleHeight(15),
    marginLeft: scaleWidth(35),
  },
  txtTitle: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(15),
    fontFamily: FONTS.RobotoRegular,
  },
  innerContainer: {
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(30),
    borderRadius: scaleWidth(18),
    marginRight: scaleWidth(14),
  },
  dashedBorder: {
    borderTopWidth: 1,
    borderTopColor: '#E3E3E3', // you can adjust the color
    borderStyle: 'dashed',
    marginTop: 20, // to give spacing between the border and content
  },
  activeBackground: {
    backgroundColor: COLORS.PrimaryGreen,
  },
  inActiveBackground: {
    backgroundColor: COLORS.PrimaryBackGround,
  },
  activeTxt: {
    color: COLORS.PrimaryWhite,
  },
  inactiveTxt: {
    color: COLORS.BorderColor,
  },

  ////Card Styling
  mainContainer: {
    backgroundColor: COLORS.PrimaryBackGround,
    marginHorizontal: scaleWidth(20),
    borderRadius: scaleWidth(17),
    paddingTop: scaleHeight(11),
    paddingBottom: scaleHeight(15),
    paddingHorizontal: scaleWidth(11),
    marginBottom: scaleHeight(22),
  },
  whiteContainer: {
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: scaleWidth(31),
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 20,
    borderColor: '#4BD874',
    borderWidth: .7,
  },
  postedOnContainer: {
    backgroundColor: COLORS.PrimaryGreen,
    alignSelf: 'center',
    flexDirection:'row',
    borderRadius: 17,
    position: 'absolute',
    marginTop: -8,
  },
  postedOnText: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(10),
    fontFamily: FONTS.RobotoMedium,
    padding: 8,
  },
  expandIconContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -10,
  },
  expandIcon: {
    height: scaleHeight(18),
    width: scaleWidth(18),
    resizeMode:'contain'
  },
  stockName: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(20),
    fontFamily: FONTS.RobotoBold,
  },
  segmentContainer: {
    borderWidth: 1,
    borderRadius: 14,
    borderColor: COLORS.PrimaryGreen,
    paddingVertical: scaleHeight(5),
    paddingHorizontal: scaleWidth(10),
    backgroundColor: COLORS.PrimaryBackGround,
  },
  segmentText: {
    color: COLORS.PrimaryGreen,
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoMedium,
  },
  lotSizeTxt: {
    color: COLORS.PrimaryGreen,
    fontSize: normalizeFont(12),
    textAlign: 'right',
    fontFamily: FONTS.RobotoMedium,
    marginTop: scaleHeight(10),
  },
  netGainContainer: {
    marginTop: scaleHeight(15),
  },
  netGainLabel: {
    fontSize: normalizeFont(12),
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoMedium,
    letterSpacing: 0.4,
  },
  gainIcon: {
    height: scaleHeight(10),
    width: scaleWidth(10),
    resizeMode:'contain'
  },
  netGainBox: {
    // backgroundColor: COLORS.PrimaryGreen,
    paddingVertical: scaleHeight(5),
    paddingHorizontal: scaleWidth(7),
    borderRadius: 4,

    ////

    flexDirection: 'row',
    backgroundColor: '#007424',
    alignItems: 'center',
    // paddingHorizontal: scaleWidth(2),
    // paddingVertical: scaleHeight(2),
    // borderRadius: scaleWidth(3),
  },
  netGainText: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
  },
  tradeTypeContainer: {
    backgroundColor: COLORS.PrimaryGreen,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: scaleHeight(12),
  },
  tradeTypeText: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoMedium,
    paddingVertical: scaleHeight(9),
  },
  entryPriceContainer: {
    backgroundColor: '#265B26',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: scaleHeight(12),
  },
  entryPriceText: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoMedium,
    paddingVertical: scaleHeight(9),
    textAlign: 'center',
  },
  targetPriceContainer: {
    borderColor: COLORS.PrimaryGreen,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: scaleHeight(12),
  },
  targetPriceText: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoMedium,
    paddingVertical: scaleHeight(9),
    textAlign: 'center',
  },
  stopLossContainer: {
    borderColor: COLORS.PrimaryGreen,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    marginTop: scaleHeight(12),
  },
  stopLossText: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoMedium,
    paddingVertical: scaleHeight(9),
  },
  //close trade
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(20),
  },
  calenderImage: {
    height: scaleHeight(20),
    width: scaleWidth(20),
  },
  txtCloseTrade: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoRegular,
    marginLeft: scaleWidth(5),
    fontWeight:'bold'
  },
  //download
  pdfContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingVertical: scaleHeight(7),
    paddingHorizontal: scaleWidth(10),
    borderColor: '#D3D3D3',
    borderWidth: 0.5,
    borderRadius: scaleWidth(65),
    marginBottom: scaleHeight(12),
    marginTop: scaleHeight(14),
  },
  pdfButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pdfIcon: {
    width: scaleWidth(26),
    height: scaleHeight(26),
    marginRight: scaleWidth(10),
    resizeMode:'contain',
  },
  pdfText: {
    fontSize: normalizeFont(11),
    color: '#1C1C1C',
    fontFamily: FONTS.RobotoRegular,
    width: '75%',
  },
  shareIcon: {
    width: scaleWidth(27.345),
    height: scaleHeight(16.127),
    resizeMode: 'contain',
  },
  ///////////
});

export default styles;
