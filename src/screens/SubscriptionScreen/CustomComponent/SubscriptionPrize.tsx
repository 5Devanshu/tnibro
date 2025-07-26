import React, { memo, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import FONTS from '../../../Constants/enums/Fonts';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';

const SubscriptionPrize = ({ item, selectedItem, handleSubscriptionPrize }) => {
  const isSelected = useMemo(() => selectedItem?.plan_code === item.plan_code, [selectedItem?.plan_code, item?.plan_code]);

  // Determine plan type and suffix dynamically
  const planType = item.interval_unit === 'years' ? 'Yearly' : item.interval_unit === 'months' ? 'Monthly' : '';
  const planSuffix = item.interval_unit === 'years' ? 'y' : 'm';

  return (
    <TouchableOpacity style={styles.container} onPress={() => handleSubscriptionPrize?.(item)}>
      {item.price === '849' && (  // 👈 Show "MOST POPULAR"
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>MOST POPULAR</Text>
        </View>
      )}

      <View style={[styles.card, isSelected && styles.selectedCard]}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleSubscriptionPrize?.(item)} style={styles.iconTextRow}>
            <Image source={isSelected ? IMAGES.Checked : IMAGES.UnChecked} style={styles.icon} />
            <Text style={styles.planType}>{planType}</Text>
          </TouchableOpacity>
          <Text style={styles.price}>
            ₹{addCommaToCurrency(item.price)}
            <Text style={styles.priceSuffix}>/{planSuffix}</Text>
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.description}>
            {/* {planType === 'Monthly'
              ? 'Pay monthly, enjoy Stockyaari'
              : planType === 'Yearly'
                ? 'Pay for a full year'
                : 'Pay weekly, enjoy Stockyaari'} */}
                {item.description}
          </Text>
          {(['349', '849', '1799', '179','4499'].includes(item.price)) && (
            <View style={styles.capsule}>
              <Text style={styles.subText}>
                {item.price === '349' && '₹29/month'}
                {item.price === '849' && '₹70/month'}
                {item.price === '1799' && '₹149/month'}
                {item.price === '179' && '₹15/month'}
                {item.price === '4499' && '₹375/month'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(SubscriptionPrize);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  card: {
    borderWidth: 1.5,
    borderColor: '#8E8E8E',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  selectedCard: {
    borderColor: '#228B22',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    left: 18,
    top: -8,
    backgroundColor: '#228B22',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    zIndex: 1,
  },
  popularText: {
    color: '#fff',
    fontFamily: FONTS.RobotoBold,
    fontSize: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 18,
    width: 18,
    marginRight: 6,
    resizeMode: 'contain'
  },
  planType: {
    fontSize: 20,
    fontFamily: FONTS.RobotoMedium,
    color: '#151716',
  },
  price: {
    fontSize: 21,
    fontFamily: FONTS.RobotoBold,
    color: '#151716',
  },
  priceSuffix: {
    color: '#8E8E8E',
    marginLeft: 4,
    fontSize: 16,
  },
  capsule: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  subText: {
    fontSize: 12,
    fontFamily: FONTS.RobotoRegular,
    color: '#fff',
    backgroundColor: '#228B22',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    textAlign: 'center',
  },
  description: {
    marginLeft: 25,
    fontSize: 13,
    fontFamily: FONTS.RobotoRegular,
    color: '#6D6D6D',
  },
});
