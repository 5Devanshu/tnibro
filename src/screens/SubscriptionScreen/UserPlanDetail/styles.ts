import { StyleSheet } from 'react-native';
import { scaleHeight, scaleWidth, normalizeFont } from '../../../Constants/enums';
import { COLORS } from '../../../Constants/enums/colorsEnum';
import FONTS from '../../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  scrollviewDe: {
    marginHorizontal: scaleWidth(18),
  },
  Header_Text: {
    color: COLORS.Black,
    fontSize: normalizeFont(18),
    fontFamily: FONTS.RobotoBold,
    textAlign: 'center',
    flex: 1,
  },
  historyicon: {
    height: scaleHeight(22),
    width: scaleWidth(22),
    resizeMode: 'contain'
  },
  flatlistcontainer: {
    marginTop: scaleHeight(20),
    paddingBottom: 20
  },
  bottomContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: scaleWidth(18),
    borderTopWidth: 0.3,
  },
  mainstyle: {
    borderRadius: scaleWidth(9),
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(8),
  },
  textStyle: {
    fontSize: normalizeFont(15),
    fontFamily: FONTS.RobotoBold,
  },
  userInfoBox: {
    marginHorizontal: 20,
    marginVertical: 5,
    marginBottom:0,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: .5,
    borderRadius: 8,
    borderColor: '#FBB142',
    backgroundColor: '#FFF7EB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
export default styles;
