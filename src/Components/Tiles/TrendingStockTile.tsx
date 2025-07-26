import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, normalizeFont, scaleHeight, scaleWidth, styleBase } from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';
import { navigation } from '../../Navigation/NavigationService';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { addCommaToCurrency } from '../../utils/digitCommaSeparator';

interface IndexData {
  item: any;
  index: number;
}

const TrendingStockTile: React.FC<IndexData> = ({ item }) => {
  const isBuy = item?.recommendation === 'Buy';

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation('SearchDetailScreen', {
            symbol: item?.symbol,
            segment: item?.segment,
          })
        }
        activeOpacity={1}
      >
        <View style={styles.rowBetweenCenter}>
          {/* Left Section */}
          <View style={styleBase.inRow}>
            {/* <Image
              source={isBuy ? IMAGES.HOME_SCREEN_ICON.GREEN_FLAG : IMAGES.HOME_SCREEN_ICON.RED_FLAG}
              style={styles.flagIcon}
            /> */}
            <View>
              <View style={styleBase.inRow}>
                <Text style={styles.stockName} allowFontScaling={false}>
                  {item?.symbol}
                </Text>
                {item?.isStar && <Image source={IMAGES.STAR_ICON} style={styles.starStyle} />}
              </View>
              <Text
                style={[styles.stockSignal, { color: isBuy ? COLORS.PrimaryGreen : COLORS.Binance_red }]}
              >
                {isBuy ? 'GREEN SIGNAL' : 'RED ALERT'}
              </Text>
            </View>
          </View>
          {/* Right Section */}
          <View>
            <Text
              style={[
                styles.closePrice,
                { color: item?.pChange >= 0 ? COLORS.PrimaryGreen : COLORS.Binance_red },
              ]}
              allowFontScaling={false}
            >
              ₹{addCommaToCurrency(item?.close)}{' '}
              <Text style={styles.priceChange} allowFontScaling={false}>
                ({item?.pChange}%)
              </Text>
            </Text>
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <View style={styles.rowSpaceBetween}>
            <Text style={styles.infoLabel} allowFontScaling={false}>
              VOLUME
            </Text>
            <Text style={styles.infoValue} allowFontScaling={false}>
              {item?.volumne}
            </Text>
          </View>
          <View style={styles.rowSpaceBetween}>
            <Text style={styles.infoLabel} allowFontScaling={false}>
              52W HIGH
            </Text>
            <Text style={styles.infoValue} allowFontScaling={false}>
              {item?.year_high}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.PrimaryBackGround,
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(10),
    borderColor: COLORS.BorderColor,
    marginBottom: scaleHeight(20),
    marginHorizontal: scaleWidth(20),
    borderRadius: scaleWidth(12),
  },
  rowBetweenCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flagIcon: {
    height: scaleWidth(33),
    width: scaleWidth(33),
  },
  stockName: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(18),
    fontFamily: FONTS.RobotoBold,
    marginLeft: scaleWidth(8),
  },
  stockSignal: {
    fontSize: normalizeFont(10),
    fontFamily: FONTS.RobotoRegular,
    marginLeft: scaleWidth(8),
  },
  starStyle: {
    height: scaleHeight(18),
    width: scaleWidth(18),
    marginLeft: scaleWidth(5),
  },
  closePrice: {
    fontSize: normalizeFont(18),
    fontFamily: FONTS.RobotoMedium,
  },
  priceChange: {
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
  },
  infoContainer: {
    marginTop: scaleHeight(15),
    paddingHorizontal: scaleWidth(10),
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    color: COLORS.BorderColor,
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
  },
  infoValue: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoMedium,
    letterSpacing: 0.042,
    marginTop: scaleHeight(2),
  },
});

export default React.memo(TrendingStockTile);
