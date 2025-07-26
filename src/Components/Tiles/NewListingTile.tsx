import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, dynamicSize, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import IMAGES from '../../Constants/enums/ImagesEnum';
import moment from 'moment';
import FONTS from '../../Constants/enums/Fonts';

const NewListingTile: React.FC = (props: any) => {
  const {item, onSelectStock} = props;

  function formatDate(date: string): string {
    return moment(date).format('MMM D,YYYY');
  }
  return (
    <TouchableOpacity
      onPress={() => onSelectStock(item)}
      style={[styles.ListBox, {backgroundColor: '#FFF'}]}>
      <View
        style={{
          marginLeft: dynamicSize(11),
          alignSelf: 'center',
          width: '80%',
        }}>
        <Text style={styles.label} allowFontScaling={false}>
          {item.symbol}
        </Text>
        {item?.timeframe && (
          <Text style={styles.timeframe} allowFontScaling={false}>
            {formatDate(item?.timeframe)}
          </Text>
        )}
      </View>
      <Image source={IMAGES.arrowforward} style={styles.arrorImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ListBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(13),
    marginBottom: scaleHeight(24),
    borderRadius: 8,
  },
  label: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoMedium,
  },
  arrorImage: {
    height: scaleHeight(32),
    width: scaleWidth(32),
  },
  timeframe: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoRegular,
  },
});
export default React.memo(NewListingTile);
