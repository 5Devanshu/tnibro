import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/enums/colorsEnum';
import {normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums';
import {FixedValue} from '../../../Constants/enums/numberEnum';

const borderColor = '#C1C0B9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cell: {
    height: '100%',
    justifyContent: 'center',
  },
  tableContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
  },
  sortIcon: {
    width: 25,
    height: scaleHeight(25),
    marginHorizontal: 5,
  },
  paginationNavIcon: {
    width: 20,
    height: scaleHeight(20),
    tintColor: 'blue',
  },
  leftCol: {
    width: scaleWidth(130),
  },
  rightCol: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  blankCell: {
    height: scaleHeight(54),
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: scaleWidth(10),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  tableStyle: {
    borderColor,
  },
  slidingTable: {borderWidth: 1, borderColor},
  head: {
    borderWidth:0
  },
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  rowbox: {
    height: scaleHeight(54),
    flexDirection: 'row',
    marginTop: scaleHeight(9),
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    color: '#1A1A1A',
    fontSize: normalizeFont(12),
  },
  headertxt: {
    color: '#0F1419',
    paddingTop:7,
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
    alignSelf:'center'
  },
  dataWrapper: {
    marginTop: scaleHeight(6),
    marginBottom: scaleHeight(20),
  },
  mainScroll: {
    flex: 1,
    marginBottom: scaleHeight(20),
  },
  tableHeader: {
    height: Platform.OS === 'ios' ? scaleHeight(60) : scaleHeight(55),
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
    width: 30,
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
    marginLeft:2,
    width: scaleWidth(22),
    height: scaleHeight(22),
    resizeMode:'contain'
  },
  ArrowIcon: {
    width: 10,
    height: scaleHeight(10),
    marginHorizontal: 5,
  },
  rightIcon: {
    width: 50,
    height: scaleHeight(50),
    tintColor: '#CCC',
    resizeMode:'contain'
  },
  noDataLabel: {
    color: '#000',
    fontSize: 16,
  },
  ItemContainer: {
    height: scaleHeight(50),
    padding: 15,
  },
  searchInputs: {
    width: '90%',
    height: scaleHeight(40),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: scaleWidth(15),
    color: 'black',
    fontSize: 15,
  },
  nodataView: {width: '100%', alignItems: 'center', height: '100%'},
  patternView: {
    width: '70%',
    height: '50%',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  flatListStyle: {backgroundColor: '#fff', width: '100%'},
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
    position: 'absolute',
    bottom: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtsymbolName: {
    textAlign: 'center',
    color: '#1A1A1A',
    fontSize: normalizeFont(12),
    marginTop: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  tabheaderText: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    flex: 1,
  },
  sortIcon2: {
    tintColor: 'black',
    width: 10,
    height: scaleHeight(20),
    marginHorizontal: 5,
  },
});
export default styles;
