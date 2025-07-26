import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
  COLORS,
  CONSTANT_TEXT,
  normalizeFont,
  scaleHeight,
  scaleWidth,
  styleBase,
} from '../../../Constants/enums';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import FONTS from '../../../Constants/enums/Fonts';
import { navigation } from '../../../Navigation/NavigationService';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';

interface IndexData {
  item: any;
  index: number;
}
interface MyComponentProps {
  topTrending: any;
}
const TrendingStockCard: React.FC<IndexData> = props => {
  const { item, index } = props;
  return (
    <View style={styles.cardContainer} key={index.toString()}>
      <TouchableOpacity
        onPress={() => {
          navigation('SearchDetailScreen', {
            symbol: item?.symbol,
            segment: item?.segment,
          });
        }}
        activeOpacity={1}>
        <View style={[styleBase.inrowspaceBetween, { paddingHorizontal: scaleWidth(12) }]}>
          <View style={[styleBase.inRow]}>
            <View>
              <View style={styleBase.inRow}>
                <Text style={styles.stockname} allowFontScaling={false}>
                  {item?.symbol}
                </Text>
                {item?.isStar === true && (
                  <Image
                    source={IMAGES.STAR_ICON}
                    style={{
                      height: scaleHeight(18),
                      width: scaleWidth(18),
                      marginLeft: scaleWidth(5),
                    }}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.stocksignal,
                  { color: item?.recommendation === 'Buy' ? '#228B22' : '#FF4D4F' },
                ]}>
                {item?.recommendation === 'Buy' ? 'GREEN SIGNAL' : 'RED ALERT'}
              </Text>
            </View>
          </View>
          <View style={{ marginLeft: scaleWidth(25) }}>
            <Text
              style={[
                styles.closePrice,
                { color: item?.pChange >= 0 ? COLORS.PrimaryGreen : COLORS.Binance_red },
              ]}
              allowFontScaling={false}>
              ₹{addCommaToCurrency(item?.close)}
              {' '}
              <Text style={{ fontSize: normalizeFont(11), fontFamily: FONTS.RobotoRegular }}>
                ({item?.pChange}%)
              </Text>
            </Text>
          </View>
        </View>
        <View
          style={[
            {
              backgroundColor: COLORS.PrimaryBackGround,
              paddingHorizontal: scaleWidth(12),
              paddingVertical: scaleHeight(5),
              marginHorizontal: 1,
              marginTop: scaleHeight(10),
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8
            },
          ]}>
          <View style={styleBase.inrowspaceBetween}>
            <Text style={styles.Txtvolume} allowFontScaling={false}>
              VOLUME
            </Text>
            <Text style={styles.volumeValue}>{item?.volumne}</Text>
          </View>
          <View style={styleBase.inrowspaceBetween}>
            <Text style={styles.Txtvolume} allowFontScaling={false}>
              52W High
            </Text>
            <Text style={styles.volumeValue} allowFontScaling={false}>
              {item?.year_high}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const TrendingStock: React.FC<MyComponentProps> = props => {
  const { topTrending } = props;
  const handlePress = () => {
    navigation('AllTrendingStockList', { ishowGainer: 'trending' });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inrows}>
        <View style={styleBase.inRow}>
          <Text style={styles.headerText} allowFontScaling={false}>
            Top Trending
          </Text>
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.txtSeeall} allowFontScaling={false}>
            {CONSTANT_TEXT.SEE_ALL}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.docsScrollView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topTrending &&
            topTrending.map((item: any, index: number) => (
              <TrendingStockCard item={item} index={index} key={index.toString()} />
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:-15
  },
  inrows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(20),
    backgroundColor: '#fff',
    paddingVertical: scaleHeight(25),
  },
  headerText: {
    color: '#010F07',
    fontSize: normalizeFont(20),
    fontWeight: '600',
    fontFamily: FONTS.RobotoBold,
    marginLeft: scaleWidth(5),
  },
  txtSeeall: {
    color: '#22A45D',
    fontSize: normalizeFont(14),
    fontWeight: '600',
    fontFamily: FONTS.RobotoRegular,
  },

  docsScrollView: {
    paddingLeft: scaleWidth(10),
    backgroundColor: COLORS.PrimaryWhite,
  },
  cardContainer: {
    backgroundColor: COLORS.PrimaryWhite,
    marginHorizontal: scaleWidth(10),
    paddingTop: scaleHeight(15),
    borderWidth: 0.5,
    borderColor: COLORS.BorderColor,
    borderRadius: scaleWidth(9),
  },
  straightline: {
    borderWidth: 0.5,
    borderColor: '#777',
    marginVertical: scaleHeight(8),
  },
  volumecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0F2FF',
    paddingHorizontal: scaleWidth(18),
    paddingVertical: scaleHeight(10),
  },
  weekcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0FAFF',
    paddingHorizontal: scaleWidth(18),
    marginTop: scaleHeight(5),
    paddingVertical: scaleHeight(10),
  },
  stockname: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(15),
    fontFamily: FONTS.RobotoBold,
    fontWeight: '700',
    marginLeft: scaleWidth(8),
  },
  stocksignal: {
    fontSize: normalizeFont(11),
    fontFamily: FONTS.RobotoRegular,
    marginLeft: scaleWidth(8),
  },
  closePrice: {
    fontSize: normalizeFont(15),
    fontFamily: FONTS.RobotoMedium,
  },
  txtCMP: {
    color: COLORS.BorderColor,
    fontSize: normalizeFont(10),
    fontFamily: FONTS.RobotoRegular,
    textAlign: 'right',
    fontWeight: '400',
  },
  Txtvolume: {
    color: "#000",
    fontSize: normalizeFont(13),
    fontFamily: FONTS.RobotoMedium,
    letterSpacing:.5,
  },
  volumeValue: {
    color: "#000",
    fontSize: normalizeFont(13),
    letterSpacing:.5,
    fontWeight: '700',
    fontFamily: FONTS.RobotoMedium,
  },
});

export default memo(TrendingStock);
