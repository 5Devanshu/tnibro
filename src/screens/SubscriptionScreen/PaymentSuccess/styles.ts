import {StyleSheet} from 'react-native';
import {scaleHeight, scaleWidth, normalizeFont} from '../../../Constants/enums';
import {COLORS} from '../../../Constants/enums/colorsEnum';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentstatueicon: {
    height: scaleHeight(200),
    width: scaleWidth(200),
    resizeMode:'contain'
  },
  paymentstatue: {
    color: '#494949',
    fontSize: normalizeFont(20),
    fontWeight: '800',
    marginTop: scaleHeight(10),
  },
  paymentDesc: {
    color: '#494949',
    fontSize: normalizeFont(14),
    fontWeight: '700',
    marginTop: scaleHeight(10),
    textAlign: 'center',
    marginHorizontal: scaleWidth(30),
  },
  txtDone: {
    color: '#2DBECE',
    marginTop: scaleHeight(20),
    fontSize: normalizeFont(18),
  },
});
export default styles;
