import { StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth, normalizeFont } from '../../../Constants/enums/Dimensions';
import { COLORS } from '../../../Constants/enums/colorsEnum';
import FONTS from '../../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  headerRight: {
    width: 60,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // This aligns text vertically
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.SecondaryGreen,
  },
  keyboardAvoidingView: {
    marginHorizontal: scaleWidth(20),
    flex: 1,
  },
  button: {
    backgroundColor: '#0079FE',
    borderRadius: scaleWidth(22),
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(10),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: normalizeFont(12),
    fontWeight: '500',
    textAlign: 'center',
    marginRight: 5,
    color: '#000',
  },
  buttonText_2: {
    //no use
    color: '#fff',
    fontSize: normalizeFont(20),
    fontWeight: '500',
  },
  container: {
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: scaleWidth(6),
    marginBottom: scaleHeight(21),
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(25),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  watchListName: {
    width: '80%',
    fontSize: normalizeFont(18),
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoBold,
  },
  count: {
    fontSize: normalizeFont(20),
    color: '#000',
    marginRight: scaleWidth(15),
  },
  count2: {
    fontSize: normalizeFont(12),
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '500',
    paddingHorizontal: scaleWidth(4),
    paddingVertical: scaleHeight(2),
  },
  description: {
    fontSize: normalizeFont(10),
    color: '#666666',
  },
  alertType: {
    fontSize: normalizeFont(13),
    color: '#000',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scaleHeight(17),
  },
  alertButton: {
    backgroundColor: '#34C85A',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(8),
    borderRadius: scaleWidth(5),
    justifyContent: 'center',
  },

  backbutton: {
    height: scaleHeight(25),
    width: scaleWidth(25),
  },
  txtWatchlist: {
    color: COLORS.Black,
    fontWeight: 'bold',
    fontSize: normalizeFont(24),
    paddingVertical: scaleHeight(10),
  },
});
export default styles;
