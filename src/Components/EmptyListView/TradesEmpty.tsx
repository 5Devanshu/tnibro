import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../Constants/enums/colorsEnum';
import {dynamicSize, normalizeFont} from '../../Constants/enums/Dimensions';

interface TradesEmptyProps {}

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

const TradesEmpty: React.FC<TradesEmptyProps> = () => {
  return (
    <View style={styles.noDataView}>
      <Text style={styles.noDataTitle}>No Trade Found</Text>
    </View>
  );
};
export default TradesEmpty;
