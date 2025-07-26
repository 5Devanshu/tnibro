import { StyleSheet, Platform } from 'react-native';
import { COLORS, normalizeFont, scaleHeight, scaleWidth, styleBase } from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  flexarea: {
    ...styleBase.flex1,
  },
  noteContainer: {
    marginTop: 10,
    margin: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FBB142',
    backgroundColor: '#FFF7EB',
    borderRadius: 6,
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#323C47',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#323C47',
    textAlign: 'justify',
    lineHeight: 18,
  },
  bold: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.PrimaryWhite,
    borderTopLeftRadius: scaleWidth(30),
    borderTopRightRadius: scaleWidth(30),
    paddingTop: 10,
  },
  headerContainer: {
    // marginHorizontal: scaleWidth(30),
  },
  title: {
    fontSize: normalizeFont(22),
    fontWeight: 'bold',
    marginBottom: scaleWidth(16),
    color: COLORS.Black,
  },
  shadowContainer: {
    backgroundColor: COLORS.PrimaryBackGround,
    borderRadius: scaleWidth(11),
    marginBottom: scaleHeight(24),
    marginHorizontal: scaleWidth(20),
    marginTop: 5
  },
  mainContainer: {
    paddingVertical: scaleHeight(28),
    paddingLeft: scaleWidth(16),
  },
  SymbolName: {
    color: COLORS.SecondaryBlack,
    fontSize: normalizeFont(20),
    fontWeight: '600',
    fontFamily: FONTS.RobotoBold,
  },
  intraView: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  Intradaycontainer: {
    backgroundColor: COLORS.PrimaryWhite,
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(15),
    borderColor: '#228B22',
    borderWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    alignItems: 'center',
  },
  TextIntraday: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(14),
    fontWeight: '500',
    fontFamily: FONTS.RobotoRegular,
    flex: 1,
  },
  timeframeText: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(14),
    fontWeight: '700',
    backgroundColor: '#228B22',
    paddingVertical: scaleHeight(7),
    paddingHorizontal: scaleWidth(16),
  },
  swingContainer: {
    backgroundColor: COLORS.PrimaryWhite,
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(15),
    borderColor: '#228B22',
    borderWidth: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
  },
});
export default styles;
