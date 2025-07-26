import {Platform, StyleSheet} from 'react-native';
import {FixedValue} from '../../Constants/enums/numberEnum';
import {GlobalStyleValues} from '../../Constants/enums/globalStyleEnum';
import {COLORS} from '../../Constants/enums/colorsEnum';
import FONTS from '../../Constants/enums/Fonts';
import { scaleHeight, scaleWidth } from '../../Constants/enums';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF', 
  },
  dropdown: {
    height: scaleHeight(FixedValue.CONSTANT_VALUE_33),
    width: scaleWidth(FixedValue.CONSTANT_VALUE_144),
    // borderColor: COLORS.pink,
    borderColor: COLORS.PrimaryGreen,
    borderWidth: FixedValue.CONSTANT_VALUE_1,
    borderRadius: 10,
    // padding: FixedValue.CONSTANT_VALUE_16,

    paddingLeft: scaleWidth(FixedValue.CONSTANT_VALUE_8),
    color: COLORS.Black,
  },
  // icon: {
  //    // marginRight: FixedValue.CONSTANT_VALUE_5,
  // },
  label: {
    position: GlobalStyleValues.ABSOLUTE,
    backgroundColor: '#FFF',
    fontSize: FixedValue.CONSTANT_VALUE_12,
    color: '#303030',
    // fontFamily:FONTS.OpenSansSemiBold,
    left: FixedValue.CONSTANT_VALUE_13,
    top: -10,
    zIndex: FixedValue.CONSTANT_VALUE_999,
    paddingHorizontal: scaleWidth(FixedValue.CONSTANT_VALUE_5),
  },
  placeholderStyle: {
    fontSize: FixedValue.CONSTANT_VALUE_12,
    color: Platform.OS === 'ios' ? '#525151' : '#525151',
  },
  selectedTextStyle: {
    fontSize: FixedValue.CONSTANT_VALUE_12,
    color: Platform.OS === 'ios' ? '#525151' : '#525151',
  },
  iconStyle: {
    width: scaleWidth(FixedValue.CONSTANT_VALUE_29),
    height: scaleHeight(FixedValue.CONSTANT_VALUE_33),
    backgroundColor: COLORS.PrimaryGreen,
    borderRadius: 10,
  },
  inputSearchStyle: {
    height: FixedValue.CONSTANT_VALUE_40,
    fontSize: FixedValue.CONSTANT_VALUE_16,
  },
});
export default styles;
