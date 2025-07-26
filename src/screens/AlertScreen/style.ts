import {StyleSheet} from 'react-native';
import {
  FixedValue,
  GlobalStyleValues,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../Constants/enums';
import {COLORS} from '../../Constants/enums/colorsEnum';
import FONTS from '../../Constants/enums/Fonts';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  back_button: {
    height: scaleHeight(30),
    width: scaleWidth(30),
  },
  header_text: {
    color: COLORS.Black,
    fontWeight: '600',
    fontSize: normalizeFont(35),
  },
  loader_Container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list_Container: {
    marginHorizontal: scaleWidth(30),
    flex: 1,
  },
  item_Container: {
    padding: 5,
    marginBottom: scaleHeight(15),
    borderLeftWidth: scaleWidth(4),
  },
  item_Content: {
    flexDirection: GlobalStyleValues.ROW,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Alertactive_container: {
    flexDirection: GlobalStyleValues.ROW,
    alignItems: 'center',
  },
  text_alert_Active: {
    color: COLORS.Black,
    fontWeight: 'bold',
  },
  image_EllipseGreen: {
    height: scaleHeight(8),
    width: scaleWidth(8),
    marginHorizontal: scaleWidth(5),
  },
  Text_Edit: {
    backgroundColor: '#36B0F4',
    padding: 5,
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(12),
  },
  Text_Delete: {
    backgroundColor: '#F44336',
    padding: 5,
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(12),
    marginLeft: scaleWidth(5),
  },
  symbol_name: {
    fontSize: normalizeFont(14),
    color: COLORS.Black,
    lineHeight: 20,
    marginHorizontal: scaleWidth(19),
  },
  AlertPrice_container: {
    flexDirection: 'row',
    marginHorizontal: scaleWidth(19),
    marginTop: scaleHeight(5),
  },
  AlertPrice_Content: {
    borderWidth: FixedValue.CONSTANT_VALUE_1,
    padding: 5,
    borderRadius: scaleWidth(5),
    marginRight: scaleWidth(10),
  },
  alertPrice: {
    color: COLORS.Black,
    fontSize: normalizeFont(12),
    fontWeight: 'bold',
  },
  txt_Price: {
    color: COLORS.Black,
    fontSize: normalizeFont(12),
    textAlign: 'center',
    marginTop: scaleHeight(3),
  },
  text_AlertSet: {
    color: '#4E4E4E',
    fontSize: normalizeFont(12),
    fontWeight: '300',
    lineHeight: 20,
    marginHorizontal: scaleWidth(19),
    marginTop: scaleHeight(5),
  },
  text_alertTime: {
    color: '#424242',
    fontWeight: '500',
    fontSize: normalizeFont(12),
  },
  emptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  triggeredStocksButton: {
    backgroundColor: '#197C5D',
    padding: 10,
    alignSelf: 'flex-start',
    marginVertical: scaleHeight(16),
    borderRadius: 8,
  },
  triggeredStocksText: {
    fontSize: normalizeFont(10),
    color: '#fff',
    fontFamily: FONTS.RobotoMedium,
    letterSpacing: 1,
  },
});
export default styles;
