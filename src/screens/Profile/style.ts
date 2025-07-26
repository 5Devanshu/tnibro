import {StyleSheet} from 'react-native';
import {normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums/Dimensions';
import {COLORS} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  rightContainer: {
    // flex: 1,
    // backgroundColor: COLORS.red,
  },
  keyboardAvoidingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: scaleWidth(20),
  },
  settingsHeader: {
    marginTop: scaleHeight(40),
  },
  // settingsHeaderTitle: {
  //   color: '#2B5B1E',
  //   fontWeight: '400',
  //   fontSize: normalizeFont(30),
  //   fontFamily: FONTS.RobotoRegular,
  // },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  settingsItemText: {
    color: '#000',
    fontSize: 16,
  },
  settingIcon: {
    width: 20,
    height: 20,
    margin: 10,
  },
  avatar: {
    width: 100,
  },
  rightIcon: {
    width: scaleWidth(25),
    height: scaleWidth(25),
  },
  formAction: {
    marginVertical: 20,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(20),
    borderWidth: 1,
    backgroundColor: 'green',
    borderColor: 'green',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#fff',
    fontFamily: 'Montreal-Light',
  },
  profileText: {
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoRegular,
    paddingVertical: scaleHeight(14),
    paddingHorizontal: scaleWidth(16),
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: scaleWidth(12),
    marginTop: scaleHeight(8),
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: scaleWidth(16),
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
});
export default styles;
