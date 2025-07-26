import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, normalizeFont, scaleHeight, scaleWidth, styleBase } from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';
import { navigation } from '../../Navigation/NavigationService';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { addCommaToCurrency } from '../../utils/digitCommaSeparator';

const GainerLooserTile: React.FC = ({ item, ishowGainer, index }: any) => {
  const backgroundColor = index % 2 === 0 ? '#fff' : COLORS.PrimaryBackGround;
  const valueColor = ishowGainer === 'gain' ? '#228B22' : '#FD3730';

  const handlePress = () => {
    navigation('SearchDetailScreen', {
      symbol: item?.symbol,
      segment: item?.segment,
    });
  };

  return (
    <View style={[styles.viewContainer, { backgroundColor }]}>  
      <TouchableOpacity onPress={handlePress} activeOpacity={1}>
        <View style={[styleBase.inRow, styleBase.spaceBetween]}>
          <View style={styles.rowStyle}>
            <Text style={styles.symbolName} allowFontScaling={false}>
              {item.symbol}
            </Text>
            {item?.isStar && (
              <Image source={IMAGES.STAR_ICON} style={styles.starStyle} />
            )}
          </View>
          <Text style={styles.currentPrice} allowFontScaling={false}>
            ₹{addCommaToCurrency(item.close)}
          </Text>
        </View>

        <View style={[styleBase.inRow, styleBase.spaceBetween]}>
          <Text style={styles.companyName} allowFontScaling={false}>
            {item?.company_name}
          </Text>
          <Text style={[styles.valuePct, { color: valueColor }]} allowFontScaling={false}>
            {item.valueChange}{' '}
            <Text style={styles.boldText} allowFontScaling={false}>
              ({item?.pChange})
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    borderWidth: 1,
    borderColor: '#D6D6D6',
    paddingHorizontal: scaleWidth(25),
    paddingVertical: scaleHeight(13),
  },
  rowStyle: {
    flexDirection: 'row',
  },
  symbolName: {
    color: '#2C362C',
    fontSize: normalizeFont(18),
    fontFamily: FONTS.RobotoMedium,
  },
  starStyle: {
    height: scaleHeight(18),
    width: scaleWidth(18),
    marginLeft: scaleWidth(5),
  },
  currentPrice: {
    color: '#2C362C',
    fontSize: normalizeFont(22),
    fontFamily: FONTS.RobotoMedium,
  },
  valuePct: {
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
    alignSelf: 'flex-end',
  },
  boldText: {
    fontFamily: FONTS.RobotoBold,
  },
  companyName: {
    fontSize: normalizeFont(10),
    fontFamily: FONTS.RobotoRegular,
    color: '#878787',
  },
});

export default React.memo(GainerLooserTile);