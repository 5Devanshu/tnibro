import {StyleSheet} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    width:'90%',
    paddingVertical: scaleWidth(17),
    paddingHorizontal: scaleWidth(12),
    marginHorizontal: scaleWidth(20),
    borderRadius: 17,
    marginTop: scaleHeight(16), //24
  },
  headerText: {
    color: '#2C362C',
    fontSize: normalizeFont(16),
    marginHorizontal: scaleWidth(25),
    marginBottom: scaleHeight(15),
    fontFamily: FONTS.RobotoBold,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: scaleHeight(15),
  },
  detailContainer: {
    overflow: 'hidden', // Ensures content doesn't spill over during animation
  },
  categoryContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: scaleWidth(48),
    width: scaleWidth(48),
    resizeMode:'contain'
  },
  categoryText: {
    textAlign: 'center',
    color: '#151716',
    fontSize: normalizeFont(11),
    marginTop: scaleHeight(8),
    fontFamily: FONTS.RobotoMedium,
  },
  categoryText2: {
    textAlign: 'center',
    color: '#2C362C',
    fontSize: normalizeFont(11),
    fontFamily: FONTS.RobotoMedium,
  },
});
export default styles;
