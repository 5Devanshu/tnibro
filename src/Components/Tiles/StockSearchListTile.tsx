import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {dynamicSize, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';

const StockSearchListTile: React.FC = (props: any) => {
  const {item, onSelectStock, searchText} = props;

  return (
    <View>
      <TouchableHighlight
        style={styles.touchableView}
        onPress={() => onSelectStock(item)}
        underlayColor="#BFF1B2">
        <View>
          <Text allowFontScaling={false} style={styles.symbolName}>
            {item?.name.replace('%26', '&')}
          </Text>
          <Text style={styles.company_name} allowFontScaling={false}>
            {item?.company_name.replace('%26', '&')}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  touchableView: {
    marginVertical: scaleHeight(2),
    padding: 15,
  },
  symbolName: {
    color: '#333333',
    marginLeft: scaleWidth(15),
    fontSize: normalizeFont(14),
  },
  company_name: {
    color: '#333333',
    marginLeft: scaleWidth(15),
    fontSize: normalizeFont(11),
  },
});
export default React.memo(StockSearchListTile);
