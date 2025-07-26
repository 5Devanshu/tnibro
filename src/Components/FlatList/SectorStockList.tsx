import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  dynamicSize,
  normalizeFont,
  scaleHeight,
  scaleWidth,
  styleBase,
} from '../../Constants/enums';
import IMAGES from '../../Constants/enums/ImagesEnum';
import SectorStockEmpty from '../EmptyListView/SectorStockEmpty';
import FONTS from '../../Constants/enums/Fonts';
import { addCommaToCurrency } from '../../utils/digitCommaSeparator';

interface SectorStockListProps {
  stockList: Array<{index: number}>;
  onSelectStock: (index: number) => void;
}

const SectorStockList: React.FC<SectorStockListProps> = ({stockList, onSelectStock}) => {
  const SectorStockTile: React.FC = (props: any) => {
    const {item, onSelectStock} = props;
    return (
      <TouchableOpacity
        onPress={() => onSelectStock(item)}
        style={[styles.ListBox]}
        activeOpacity={1}>
        <View style={styles.inRow}>
          <View style={styleBase.inRow}>
            <Text style={styles.label} allowFontScaling={false}>
              {item?.name}
            </Text>
            {item?.isStar === true && <Image source={IMAGES.STAR_ICON} style={styles.starStyle} />}
          </View>
          <Text style={styles.currentPrice} allowFontScaling={false}>
            ₹ {addCommaToCurrency(item?.close)}
          </Text>
        </View>
        <View style={[styleBase.inRow, styleBase.spaceBetween]}>
          <Text style={styles.Companyname} allowFontScaling={false}>
            {item?.company_name}
          </Text>
          <Text
            allowFontScaling={false}
            style={[
              styles.valuePct,
              {color: parseFloat(item?.pChange) >= 0 ? '#228B22' : '#FF4D4F'},
            ]}>
            {item?.pChange}%
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={stockList}
        style={{
          marginHorizontal: scaleWidth(20),
        }}
        contentContainerStyle={{paddingBottom:200}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <SectorStockEmpty />}
        renderItem={({item}) => <SectorStockTile item={item} onSelectStock={onSelectStock} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ListBox: {
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(10),
    marginBottom: scaleHeight(15),
    borderRadius: scaleWidth(10),
    backgroundColor: COLORS.PrimaryWhite,
  },
  valuePct: {
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoRegular,
  },
  label: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(15),
    marginLeft: dynamicSize(11),
    fontFamily: FONTS.RobotoRegular,
  },
  starStyle: {
    height: scaleHeight(18),
    width: scaleWidth(18),
    marginLeft: scaleWidth(5),
  },
  currentPrice: {
    color: COLORS.SecondaryBlack,
    fontSize: normalizeFont(15),
    fontFamily: FONTS.RobotoMedium,
  },
  Companyname: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(11),
    fontWeight: '400',
    marginLeft: dynamicSize(11),
    fontFamily: FONTS.RobotoRegular,
  },
});
export default React.memo(SectorStockList);
