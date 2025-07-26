import {COLORS} from '../../Constants/enums/colorsEnum';
import {StyleSheet} from 'react-native';
import {normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: scaleHeight(30),
    backgroundColor: '#fff',
  },
  head: {
    height: scaleHeight(40),
    backgroundColor: '#f1f8ff',
  },
  header: {
    height: scaleHeight(50),
    backgroundColor: '#537791',
  },
  text: {
    textAlign: 'center',
    fontWeight: '100',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: scaleHeight(40),
    backgroundColor: '#E7E6E1',
  },
  tabContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#BFBFBF',
    borderRadius: 7,
    padding: 5,
  },
  tabLabel: {
    color: '#000',
    textTransform: 'capitalize',
    fontFamily: 'Montreal-Light',
  },
  tabItem: {
    marginTop: 5,
    flex: 1,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
  },
  shadowClass: {
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 20,
    backgroundColor: '#fff',
    borderRadius: 7,
    height: 40,
  },
  activeTabStyle: {
    backgroundColor: '#fff',
  },
  activeTabTextStyle: {
    color: '#000',
  },
  spinnerTextStyle: {
    color: 'white',
  },
  loaderContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  danger: {
    color: 'black',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  rightIcon: {
    width: scaleWidth(150),
    height: scaleHeight(150),
    resizeMode:'contain'
  },
  noDataLabel: {
    color: 'black',
    fontFamily: 'Montreal-Light',
    fontSize: normalizeFont(26),
    textAlign: 'center',
    marginHorizontal: scaleWidth(20),
  },
  tableBox: {
    borderWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: '#f5f5f5',
    elevation: 5,
    // marginTop: 10,
    // borderRadius: 10,
    flex: 1,
  },
  rightIcon2: {
    width: scaleWidth(32),
    height: scaleHeight(32),
  },
});
export default styles;
