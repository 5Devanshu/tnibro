import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../Constants/enums';
import {normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: scaleHeight(15),
    marginLeft: scaleWidth(10),
    marginBottom: scaleHeight(10),
  },
  loaderContainer: {
    height: scaleHeight(650),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMsg: {fontSize: normalizeFont(25), color: '#000'},
});
export default styles;
