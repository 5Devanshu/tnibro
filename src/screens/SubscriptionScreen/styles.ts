import {Dimensions, Platform, StyleSheet} from 'react-native';
import {scaleHeight, scaleWidth, normalizeFont} from '../../Constants/enums';
import {COLORS} from '../../Constants/enums/colorsEnum';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  historyicon: {
    height: scaleWidth(22),
    width: scaleWidth(22),
  },
  scrollviewDe: {
    marginHorizontal: scaleWidth(20), 
     marginBottom: scaleWidth(20)
  },
  backIcon: {
    height: scaleHeight(42),
    width: scaleWidth(42),
  },
  Header_Text: {
    color: COLORS.Black,
    fontSize: normalizeFont(24),
    fontWeight: 'bold',
    marginLeft:30,
    flex: 1,
  },
  couponContainer: {
    backgroundColor: '#fff',
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(14),
    paddingHorizontal: scaleWidth(23),
    marginTop: scaleHeight(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: .7,
    borderColor: '#4A4A4A',
  },
  couponIcon: {
    height: scaleHeight(30),
    width: scaleWidth(30),
    marginRight: scaleWidth(19),
  },
  textApplyCoupon: {
    color: '#4A4A4A',
    fontWeight:'600',
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoRegular,
  },
  textRemove: {
    fontSize: normalizeFont(12),
    color: COLORS.gray,
    fontFamily: FONTS.RobotoRegular,
  },
  graidentView: {
    marginTop: scaleHeight(10),
    marginBottom: 10,
  },
  gradientStyle: {
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(80),
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoMedium,
  },
  bottominnercontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    alignSelf: 'center',
    borderRadius: scaleWidth(4),
    padding: 8,
    marginTop: scaleHeight(10),
  },
  bottomContainer: {
    paddingTop:3,
    backgroundColor: '#fff',
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(10),
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
    zIndex: 1000,
  },
  iconTick: {
    height: scaleHeight(20),
    width: scaleWidth(20),
    resizeMode:'contain',
    marginRight:5
  },
});
export default styles;
