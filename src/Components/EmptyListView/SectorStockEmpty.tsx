import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../Constants/enums/colorsEnum';
import { dynamicSize, normalizeFont } from '../../Constants/enums/Dimensions';
import IMAGES from '../../Constants/enums/ImagesEnum';
interface SectorStockEmptyProps { }

const styles = StyleSheet.create({
  noDataView: {
    alignItems: 'center',
    marginTop: dynamicSize(30),
    paddingHorizontal: dynamicSize(20),
  },
  noDataTitle: {
    marginTop: dynamicSize(25),
    fontSize: normalizeFont(20),
    color: COLORS.Black,
  },
});

const SectorStockEmpty: React.FC<SectorStockEmptyProps> = () => {
  return (
    <View style={styles.noDataView}>
      <Image source={IMAGES.noRecord2} style={{ marginTop: 100, resizeMode: 'contain', height: 200, width: 200 }} />
      <Text style={styles.noDataTitle}>No Stocks found</Text>
    </View>
  );
};
export default SectorStockEmpty;
