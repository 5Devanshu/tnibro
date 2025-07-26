import {FixedValue} from '../../Constants/enums/numberEnum';
import {normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums/Dimensions';
import {StyleSheet, Dimensions} from 'react-native';
import { COLORS } from '../../Constants/enums';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image1: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  image2: {
    width: width - 60,
    height: 50,
    resizeMode: 'contain',
    aspectRatio: 7,
  },
  loadingText: {
    marginTop: 10,
    fontFamily:'Roboto-Black',
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
    textAlign: 'center',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom:300,
    left: '50%',
    transform: [{ translateX: -100 }], // Center the progress bar horizontally
    zIndex: 1, // Make sure it appears on top of other elements
  },
  logosplash: {
    height: scaleHeight(FixedValue.CONSTANT_VALUE_300),
    width: scaleWidth(FixedValue.CONSTANT_VALUE_300),
    marginBottom:180,
    resizeMode:'contain'
  },
  version: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(50),
    height: scaleHeight(50),
  },
  infoText: {
    color: COLORS.Black,
    fontSize: normalizeFont(12),
    lineHeight: 17,
    textAlign: 'center',
    marginBottom: scaleHeight(1),
  },
});
export default styles;