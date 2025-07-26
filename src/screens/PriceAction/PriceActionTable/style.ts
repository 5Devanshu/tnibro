import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/enums/colorsEnum';
import {normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums';
import {FixedValue} from '../../../Constants/enums/numberEnum';

const borderColor = '#C1C0B9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  leftCol: {
    //symbol box
    width: scaleWidth(110),
  },
  blankCell: {
    height: scaleHeight(54), ///// symbol height
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  mainScroll: {
    flex: 1,
    // marginBottom: scaleHeight(20), ///bottom width of left symbol
  },
  rowbox: {
    height: scaleHeight(100), //54 symbol name height
    flexDirection: 'row',
    marginBottom: scaleHeight(2),
    backgroundColor: COLORS.PrimaryWhite,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  txtsymbolName: {
    textAlign: 'center',
    color: '#1A1A1A',
    fontSize: normalizeFont(12),
    fontWeight:'500'
  },
  rightCol: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  tableHeader: {
    // height: Platform.OS === 'ios' ? scaleHeight(53) : scaleHeight(55),
    // borderWidth: 1,
    height: scaleHeight(59),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  // tabheaderText: {
  //   width: '100%',
  //   justifyContent: 'center',
  // },
  headertxt: {
    color: '#4A5568',
    fontSize: normalizeFont(14),
    fontWeight: '400',
  },
  dataWrapper: {
    // marginTop: scaleHeight(6), //early 10
    // marginBottom: scaleHeight(20), //table bottom right side
    // backgroundColor: 'blue',
  },

  cell: {
    height: '100%',
    justifyContent: 'center',
  },
  sortIcon: {
    width: scaleWidth(25),
    height: scaleHeight(25),
    marginHorizontal: scaleWidth(5),
  },
  paginationNavIcon: {
    width: 20,
    height: scaleHeight(20),
    tintColor: 'blue',
  },

  tableStyle: {
    borderWidth: 1,
    borderColor,
  },
  slidingTable: {borderWidth: 1, borderColor},
  head: {
    // height: scaleHeight(54),
  },
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},

  recView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: scaleWidth(15),
    marginTop: scaleHeight(4),
  },
  text: {
    textAlign: 'center',
    color: '#1A1A1A',
    fontSize: normalizeFont(12),
  },

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  paginationSet: {
    flexDirection: 'row',
  },
  paginationItemBox: {
    height: scaleHeight(30),
    width: scaleWidth(30),
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerTextStyle: {
    color: 'white',
  },
  alertIcon: {
    width: scaleWidth(30),
    height: scaleHeight(30),
  },
  ArrowIcon: {
    width: scaleWidth(10),
    height: scaleHeight(10),
    marginHorizontal: scaleWidth(5),
  },
  rightIcon: {
    width: scaleWidth(50),
    height: scaleHeight(50),
    tintColor: '#CCCCCC',
  },
  noDataLabel: {
    color: 'black',
    fontFamily: 'Montreal-Light',
    fontSize: normalizeFont(16),
  },
  ItemContainer: {
    height: scaleHeight(50),
    padding: 15,
  },
  searchInputs: {
    width: '90%',
    height: scaleHeight(40),
    borderRadius: 5,
    borderWidth: scaleWidth(1),
    borderColor: 'gray',
    alignSelf: 'center',
    marginTop: scaleHeight(20),
    paddingLeft: scaleWidth(15),
    color: 'black',
    fontSize: normalizeFont(15),
  },
  ///new table
  nodataView: {width: '100%', alignItems: 'center', height: '100%'},
  patternView: {
    width: '70%',
    height: '50%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  flatListStyle: {
    backgroundColor: '#fff',
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  candlestick: {
    width: '100%',
    borderColor: COLORS.gray,
    borderWidth: FixedValue.CONSTANT_VALUE_1,
    paddingLeft: scaleWidth(FixedValue.CONSTANT_VALUE_8),
    backgroundColor: COLORS.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: scaleHeight(8),
  },

  sortIcon2: {
    tintColor: 'black',
    width: scaleWidth(10),
    height: scaleHeight(20),
    marginHorizontal: scaleWidth(5),
  },
});
export default styles;
