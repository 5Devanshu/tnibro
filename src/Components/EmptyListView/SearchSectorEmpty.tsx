import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../Constants/enums/colorsEnum';
import { dynamicSize, normalizeFont } from '../../Constants/enums/Dimensions';
import IMAGES from '../../Constants/enums/ImagesEnum';
interface SearchSectorEmptyProps { }

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

const SearchSectorEmpty: React.FC<SearchSectorEmptyProps> = () => {
  return (
    <View style={styles.noDataView}>
      <Image source={IMAGES.noRecord1} style={{ marginTop: 100, resizeMode: 'contain', height: 200, width: 200 }} />
      <Text style={styles.noDataTitle}>No Sector Found</Text>
    </View>
  );
};
export default React.memo(SearchSectorEmpty);
