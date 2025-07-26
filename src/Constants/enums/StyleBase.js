import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS } from './colorsEnum';
import { scaleHeight, scaleWidth } from './Dimensions';
const { width, height } = Dimensions.get('window');
export const DeviceWidth = width;
export const DeviceHeight = height;

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === X_WIDTH && height === X_HEIGHT) ||
    (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

export const styleBase = StyleSheet.create({
  mainview: {
    backgroundColor: '#fff',
    flex: 1
  },
  bannerCarausel: {
    flex: 1,
    position:'relative',
    marginTop: scaleHeight(15) //29 when button added in category
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flex1: {
    flex: 1,
  },
  justRow: {
    flexDirection: 'row',
  },
  inRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  verticalCenter: {
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  absolutePosition: {
    position: 'absolute',
  },
  alignSelf: {
    alignSelf: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  selfCenter: {
    alignSelf: 'center',
  },
  inrowspaceBetween: {
    padding: 10,
    paddingRight: 18,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ActivityIndicator: {
    // alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  flexrow: {
    flexDirection: 'row',
  },
  starStyle: {
    height: scaleWidth(18),
    width: scaleWidth(18),
    marginLeft: scaleWidth(5),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop:100,
  },
  telegram: {
    marginHorizontal: 20,
    marginTop: 12
  },
  telegramImg: {
    resizeMode: 'contain',
    height: 82,
    width: '100%',
  }
});
