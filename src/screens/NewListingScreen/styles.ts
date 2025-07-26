import {StyleSheet} from 'react-native';
import {scaleHeight} from '../../Constants/enums';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // paddingTop: scaleHeight(17),
  },
  ActivityIndicator: {
    marginTop: scaleHeight(26),
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
