import { StyleSheet } from 'react-native';
import { scaleHeight } from '../../../Constants/enums';

const styles = StyleSheet.create({
  container: {
    marginTop: 0
  },
  imagestyle: {
    height: scaleHeight(223),
    width: '100%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});

export default styles;
