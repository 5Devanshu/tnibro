import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/enums/colorsEnum';
import {normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums';
import {FixedValue} from '../../../Constants/enums/numberEnum';
import FONTS from '../../../Constants/enums/Fonts';

const borderColor = '#C1C0B9';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cell: {
    height: '100%',
    justifyContent: 'center',
    // alignItems:'center',
  },
  tableContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    // borderRadius: 10,
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
  leftCol: {
    width: scaleWidth(125),
  },
  LockIcon: {
    height: '100%',
    width: '100%',
  },
  hideContainer:{
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
  },
  rightCol: {
    // flex: 1,
    backgroundColor: '#F0F0F0',
  },
  blankCell: {
    height: scaleHeight(54), ///// symbol height
    backgroundColor: '#F0F0F0',
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopLeftRadius: scaleWidth(10),
    // elevation: 5,
    // shadowColor: '#2B3F28',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 10.60937,
    borderRadius: scaleWidth(4),
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  tableStyle: {
    borderWidth: 1,
    borderColor,
  },
  slidingTable: {borderWidth: 1, borderColor},
  head: {
    // height: scaleHeight(54),
    // textAlign: 'center',
    // backgroundColor: 'red',//////
  },
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  rowbox: {
    height: scaleHeight(130), //54
    flexDirection: 'row',
    marginTop: scaleHeight(9),
    // backgroundColor: COLORS.PrimaryWhite,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: 'rgba(43, 63, 40, 0.18)',
    //     shadowOffset: {
    //       width: 0,
    //       height: 0,
    //     },
    //     shadowOpacity: 1,
    //     shadowRadius: 10.60937 / 2, // Convert the spread to radius
    //   },
    //   android: {
    //     elevation: 5, // Adjust the elevation value based on the shadow effect you want
    //   },
    // }),
    borderRadius: 4,
  },
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
    // fontFamily: 'Montreal-Light',
  },
  headertxt: {
    color: '#0F1419',
    // textAlign: 'center',
    fontSize: normalizeFont(11),
    // lineHeight: 17,
    marginTop: scaleHeight(5),
    // alignSelf:'center',
    // backgroundColor:'red',
    // width:'50%',
    // justifyContent:'center',
    // alignItems:'center',
    alignSelf: 'center',
  },
  dataWrapper: {
    // marginTop: -1
    marginTop: scaleHeight(6), //early 10
    // marginBottom: scaleHeight(20), //table bottom
  },
  mainScroll: {
    flex: 1,
    // backgroundColor: '#F0F1F0',
    // borderRightWidth: 1,
    // borderColor: 'silver',
    // marginTop: scaleHeight(9), /////toppp-------------------uncomment
    // marginBottom: scaleHeight(20),
  },
  tableHeader: {
    // height: 75,
    height: Platform.OS === 'ios' ? scaleHeight(53) : scaleHeight(55),
    // justifyContent: 'center',
    //flexDirection: 'row',
    // alignItems: 'center',
    //  textAlign: 'center',
    // backgroundColor: 'red', //////
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
    width: scaleWidth(35),
    height: scaleHeight(35),
    resizeMode:'contain'
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
    // position: 'absolute',
    // bottom: 5,
    width: '100%',
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: scaleHeight(8),
  },
  inRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  txtsymbolName: {
    textAlign: 'center',
    color: '#1A1A1A',
    fontSize: normalizeFont(13),
    fontFamily: FONTS.RobotoBold,
    // flex:1
    // marginTop: scaleHeight(10),
    // flex: 1,
    // flexWrap: 'wrap',
    // paddingVertical:scaleHeight(15)
    // fontFamily: 'Montreal-Light',
    // justifyContent:'center',
    // alignContent:'center'
  },
  tabheaderText: {
    // flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    // flex: 1,
  },
  sortIcon2: {
    tintColor: 'black',
    width: scaleWidth(10),
    height: scaleHeight(20),
    marginHorizontal: scaleWidth(5),
  },
});
export default styles;
