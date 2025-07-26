import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { COLORS } from '../../Constants/enums/colorsEnum';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  dynamicSize,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../Constants/enums/Dimensions';
import FONTS from '../../Constants/enums/Fonts';

interface SectorStockHeaderProps {
  onPressBackArrow: () => void;
  Sector: any;
  onSortPress: () => void;
  ascendingOrder: boolean;
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: scaleWidth(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'center',
  },
  DataTitle: {
    fontSize: normalizeFont(18),
    color: COLORS.Black,
    fontFamily: FONTS.RobotoBold,
  },
  hitSlop: {
    top: 20,
    bottom: 20,
    left: 50,
    right: 50,
  },
  backIconstyle: {
    alignSelf: 'flex-start',
  },
  backIcon: {
    height: scaleHeight(42),
    width: scaleWidth(42),
    resizeMode: 'contain'
  },
  sorting_container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scaleWidth(8),
    borderColor: '#E5E6ED',
    borderWidth: 1,
    justifyContent: 'space-between',
    padding: scaleWidth(8),
    backgroundColor: '#fff',
  },
  sortIcon: {
    width: scaleWidth(30),
    height: scaleHeight(30),
  },
});

const SectorStockHeader: React.FC<SectorStockHeaderProps> = ({
  onPressBackArrow,
  Sector,
  onSortPress,
  ascendingOrder,
}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressBackArrow}
        hitSlop={styles.hitSlop}
        style={styles.backIconstyle}>
        <Image source={IMAGES.Back_Icon} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.DataTitle} allowFontScaling={false}>
        {Sector.label}
      </Text>
      <TouchableOpacity activeOpacity={1} onPress={onSortPress} style={styles.sorting_container}>
        <FontAwesome5 name="filter" size={16} color="#228B22" />
      </TouchableOpacity>
    </View>
  );
};
export default React.memo(SectorStockHeader);
