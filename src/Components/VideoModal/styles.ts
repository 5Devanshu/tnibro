import {Platform, StyleSheet} from 'react-native';
import {
  COLORS,
  FixedValue,
  GlobalStyleValues,
  normalizeFont,
  Percentage,
  scaleHeight,
  scaleWidth,
  styleBase,
} from '../../Constants/enums';

export const styles = StyleSheet.create({
  bottomModal: {
    // height: scaleHeight(300),
    justifyContent: GlobalStyleValues.CENTER,
    marginHorizontal: 0,
  },
  modalContainer: {
    borderTopLeftRadius: scaleWidth(FixedValue.CONSTANT_VALUE_24),
    borderTopRightRadius: scaleWidth(FixedValue.CONSTANT_VALUE_24),
    borderRadius: scaleWidth(FixedValue.CONSTANT_VALUE_24),
    backgroundColor: '#F3FFF6',
    width: Percentage.PRECENTAGE_100,
    // height: scaleHeight(300),
    paddingHorizontal: scaleWidth(FixedValue.CONSTANT_VALUE_30),
  },
  modalClose: {
    height: 4,
    width: scaleWidth(FixedValue.CONSTANT_VALUE_20),
    alignSelf: GlobalStyleValues.CENTER,
    marginTop: scaleHeight(FixedValue.CONSTANT_VALUE_15),
    backgroundColor: COLORS.modalSlider,
    borderRadius: FixedValue.CONSTANT_VALUE_4,
  },
});
