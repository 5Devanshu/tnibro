import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { normalizeFont, scaleHeight, scaleWidth } from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';

const { height } = Dimensions.get('window');

const BillRow = ({ label, value, isBold = false }) => (
  <View style={styles.row}>
    <Text style={[styles.label, isBold && styles.boldText]} allowFontScaling={false}>
      {label}
    </Text>
    <Text style={[styles.value, isBold && styles.boldValue]} allowFontScaling={false}>
      {value}
    </Text>
  </View>
);

const BillContainer = ({ selectedItem = {}, couponcode = {}, NET_PAYABLE_AMOUNT = 0 }) => {
  const itemTotal = useMemo(() => addCommaToCurrency(selectedItem?.price || 0), [selectedItem?.price]);
  const discountAmount = useMemo(() => addCommaToCurrency(couponcode?.final_report?.discount || 0), [couponcode?.final_report?.discount]);
  const payableAmount = useMemo(() => addCommaToCurrency(NET_PAYABLE_AMOUNT || 0), [NET_PAYABLE_AMOUNT]);

  const hasAppliedDiscount = !!couponcode?.final_report?.discount;

  return (
    <View style={styles.container}>
      <BillRow label="Item Total:" value={`₹ ${itemTotal}`} />
      <BillRow label="Apply Coupon:" value={hasAppliedDiscount ? `- ₹ ${discountAmount}` : '--------'} />

      <View style={styles.separator} />

      <BillRow label="To pay" value={`₹ ${payableAmount}`} isBold />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: scaleWidth(8),
    paddingVertical: scaleHeight(14),
    marginTop: scaleHeight(18),
    borderWidth: 0.75,
    borderColor: '#4A4A4A',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(25),
    alignItems: 'center',
    marginBottom: scaleHeight(8),
  },
  label: {
    color: '#4A4A4A',
    fontSize: normalizeFont(16),
    fontWeight: '500',
    fontFamily: FONTS.RobotoRegular,
  },
  value: {
    color: '#2C362C',
    fontSize: normalizeFont(19),
    fontFamily: FONTS.RobotoRegular,
  },
  boldText: {
    fontFamily: FONTS.RobotoBold,
  },
  boldValue: {
    fontFamily: FONTS.RobotoBold,
  },
  separator: {
    borderWidth: 1,
    borderColor: '#8B8B8B',
    borderStyle: 'dashed',
    marginVertical: scaleHeight(15),
    width: '90%',
    alignSelf: 'center',
  },
});

export default memo(BillContainer);
