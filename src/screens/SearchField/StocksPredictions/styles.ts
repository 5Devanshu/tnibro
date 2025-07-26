import {Platform, StyleSheet} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums';

const styles = StyleSheet.create({
  backcontainer: {
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? scaleHeight(10) : scaleHeight(10),
    marginHorizontal: scaleWidth(25),
    flexDirection: 'row',
  },
  textRecent: {
    color: COLORS.Black,
    fontSize: normalizeFont(16),
    fontWeight: '600',
  },
  description: {
    color: '#5D6166',
    fontSize: normalizeFont(16),
    fontWeight: '600',
  },
  totalproft: {
    color: '#444',
    fontSize: normalizeFont(11),
  },
  tableContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5FFED',
    marginTop: scaleHeight(15),
    marginBottom: 5,
    flex: 1,
  },
  container3: {
    marginLeft: scaleWidth(10),
    marginBottom: Platform.OS === 'ios' ? scaleHeight(20) : scaleHeight(20),
    flex: 1,
  },
  head: {
    height: scaleHeight(80),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f0f0f0',
    backgroundColor: COLORS.white,
    borderWidth: scaleWidth(1),
  },
  headText: {
    color: '#051933',
    fontSize: normalizeFont(12),
    fontWeight: '600',
    textAlign: 'center',
  },
  rowbox: {
    flexDirection: 'row',
    borderRadius: scaleWidth(4),
    borderWidth: scaleWidth(1),
    borderColor: '#f0f0f0',
  },
  cell: {
    justifyContent: 'center',
    borderColor: '#f0f0f0',
    paddingVertical: scaleHeight(21),
    borderWidth: scaleWidth(1),
  },
  text: {
    fontSize: normalizeFont(12),
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
    color: '#07090B',
  },
  textDate: {
    textAlign: 'center',
    color: '#37383A',
    fontSize: normalizeFont(11),
    fontWeight: '400',
    letterSpacing: -0.239,
  },
  loaderContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    width: scaleWidth(50),
    height: scaleHeight(50),
    tintColor: '#000000',
  },
  noDataLabel: {
    color: COLORS.Black,
    fontFamily: 'Montreal-Light',
    fontSize: normalizeFont(26),
    textAlign: 'center',
    marginHorizontal: scaleWidth(20),
  },
});
export default styles;
