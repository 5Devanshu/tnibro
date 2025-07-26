import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';
import IMAGES from '../../Constants/enums/ImagesEnum';
import {navigation} from '../../Navigation/NavigationService';

const OpenTradeTile = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.symbolContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation('SearchDetailScreen', {
                symbol: item?.symbol_name,
                segment: item?.segment,
              });
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.symbolName} allowFontScaling={false}>
                {item?.symbol_name}
              </Text>
              {item?.is_star && <Image source={IMAGES.STAR_ICON} style={styles.starStyle} />}
            </View>
          </TouchableOpacity>
          <Text style={styles.daysAgo} allowFontScaling={false}>
            {item?.days_ago} Days Ago
          </Text>
          <Text style={styles.signalText} allowFontScaling={false}>
            {item?.recommendation === 'Buy' ? 'Gain' : 'Save'}{' '}
            <Text style={[styles.boldText, {color: COLORS.Binance_green}]}>
              {item?.profit_loss_as_per_high_price || item?.profit_loss_as_per_low_price}%
            </Text>
          </Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.signalText} allowFontScaling={false}>
            Signal Price{' '}
            <Text
              style={[
                styles.boldText,
                {color: item?.recommendation === 'Buy' ? COLORS.Binance_green : COLORS.Binance_red},
              ]}>
              {item?.recommendation_price}
            </Text>{' '}
            ({item?.recommendation_date})
          </Text>
          <Text style={styles.signalText} allowFontScaling={false}>
            {item?.recommendation === 'Buy' ? 'High Price' : 'Low Price'}{' '}
            {item?.max_high_price || item?.min_low_price}
            {'  '}({item?.max_high_price_date || item?.min_low_price_date})
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: scaleWidth(16),
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#E2E2E2',
    borderTopColor: '#E2E2E2',
    backgroundColor: '#FFF',
    paddingHorizontal: scaleWidth(25),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaleHeight(12),
  },
  symbolContainer: {
    width: '40%',
    justifyContent: 'center',
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  starStyle: {
    height: scaleHeight(18),
    width: scaleWidth(18),
    marginLeft: scaleWidth(5),
  },
  symbolName: {
    color: '#2C362C',
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoMedium,
  },
  daysAgo: {
    color: '#2C362C',
    fontSize: normalizeFont(10),
    fontFamily: FONTS.RobotoRegular,
    marginTop: scaleHeight(4),
  },
  signalText: {
    color: '#2C362C',
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
    marginTop: scaleHeight(4),
  },
  boldText: {
    fontFamily: FONTS.RobotoBold,
  },
});

export default React.memo(OpenTradeTile);
