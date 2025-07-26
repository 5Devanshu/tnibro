import {StyleSheet} from 'react-native';
import {normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums/Dimensions';
import {Platform} from 'react-native';
import {COLORS} from '../../Constants/enums';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    borderRadius: 16,
    height: '85%',
  },
  mainView: {
    marginTop:2,
    marginHorizontal: scaleWidth(20),
    flex: 1,
    // backgroundColor: 'red',
  },
  symbolName: {
    color: '#333333',
    marginLeft: 15,
    fontSize: normalizeFont(14),
  },
  input: {
    flex: 1,
    color: 'black',
  },
  hitSlop: {
    top: 20,
    bottom: 20,
    left: 50,
    right: 50,
  },
  backButton: {
    height: scaleWidth(30),
    width: scaleWidth(30),
  },
  backButtonContainer: {
    marginTop: Platform.OS === 'ios' ? 0 : 30,
    alignSelf: 'flex-start',
  },
  searchIcon: {
    height: 15,
    resizeMode:'contain',
    width: 15,
    margin: 10,
    tintColor: '#6D7985',
  },
  ActivityIndicatorView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  FlatlistStyle: {
    marginTop: 21,
    marginBottom: 30,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: scaleWidth(25),
    paddingHorizontal: scaleWidth(8),
    paddingVertical: Platform.OS === 'ios' ? scaleHeight(12) : scaleHeight(0),
  },
  touchableView: {
    marginVertical: 2,
    padding: 15,
  },
  noResultView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
export default styles;
