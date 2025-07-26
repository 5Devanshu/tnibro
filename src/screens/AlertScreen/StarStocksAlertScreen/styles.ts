import {StyleSheet, Platform} from 'react-native';
import {normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  switch: {
    transform:
      Platform.OS === 'ios' ? [{scaleX: 0.7}, {scaleY: 0.7}] : [{scaleX: 1.5}, {scaleY: 1.5}],
    marginRight: scaleWidth(20),
    alignSelf: 'center',
  },
  container: {
    backgroundColor: '#F8FFEF',
    paddingVertical: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#23A047',
    paddingHorizontal: 20,
    marginTop: 13,
  },
  symbolText: {
    fontSize: 18,
    fontFamily: FONTS.RobotoBold,
    color: '#181818',
    marginLeft: 10,
  },
  symbolValue: {
    fontSize: 14,
    color: '#4E4E4E',
    fontFamily: FONTS.RobotoRegular,
    marginLeft: 18,
  },
  starStyle: {
    height: scaleHeight(18),
    width: scaleWidth(18),
    marginLeft: scaleWidth(5),
  },
  headerText: {
    color: '#303030',
    fontSize: normalizeFont(15),
    fontFamily: FONTS.RobotoLight,
  },
  triggeredStocksButton: {
    backgroundColor: '#197C5D',
    padding: 10,
    borderRadius: 8,
  },
  triggeredStocksText: {
    fontSize: normalizeFont(10),
    color: '#fff',
    fontFamily: FONTS.RobotoBold,
    letterSpacing: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleHeight(100),
  },
  emptyTitle: {
    color: '#2C362C',
    fontSize: normalizeFont(24),
    fontFamily: FONTS.RobotoRegular,
  },
  emptyDescription: {
    color: '#777',
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoRegular,
    textAlign: 'center',
    marginTop: scaleHeight(12),
  },
  note: {
    color: '#777',
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoMediumItalic,
    textAlign: 'center',
    marginTop: scaleHeight(12),
    letterSpacing: 2,
  },
  emptyNote: {
    color: '#2C362C',
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoBold,
    textAlign: 'center',
    marginTop: scaleHeight(12),
  },
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 25,
  },
});
export default styles;
