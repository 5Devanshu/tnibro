import {StyleSheet} from 'react-native';
import {scaleHeight, scaleWidth, normalizeFont} from '../../../Constants/enums';
import {COLORS} from '../../../Constants/enums/colorsEnum';

const styles = StyleSheet.create({
  scrollviewDe: {
    marginHorizontal: scaleWidth(30),
  },
  Header_Text: {
    color: COLORS.Black,
    fontSize: normalizeFont(24),
    fontWeight: 'bold',
    marginTop: scaleHeight(5),
    marginBottom: scaleHeight(32),
  },

  graidentView: {
    alignSelf: 'center',
    borderRadius: scaleWidth(16),
    marginTop: scaleHeight(10),
    marginBottom: 20,
  },
  gradientStyle: {
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(72),
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    alignSelf:'center',
    justifyContent:'center',
    alignContent:'center',
    fontSize: normalizeFont(16),
  },
  bottomContainer: {
  },
});
export default styles;
