import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import {
  COLORS,
  ROUTE_NAME,
  normalizeFont,
  scaleHeight,
  scaleWidth,
  CONSTANT_TEXT,
} from '../../../Constants/enums';
import {navigation} from '../../../Navigation/NavigationService';

const SearchHeader = () => {
  const onPress = () => {
    navigation(ROUTE_NAME.SEARCH_SCREEN);
  };
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={{flex: 1,height:30,marginTop:-10}}>
      <View style={styles.searchBar}>
        <Image style={styles.imageStyle} source={IMAGES.searchnew} />
        <Text style={styles.searchText} allowFontScaling={false}>
          {CONSTANT_TEXT.SEARCH_ANY_STOCKS}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    padding: scaleHeight(10),
    backgroundColor:'#F4F5F7',
    borderRadius: scaleWidth(20),
    marginLeft: scaleWidth(8),
    alignItems: 'center',
    height:40
  },
  imageStyle: {
    height: scaleHeight(22),
    width: scaleWidth(22),
    resizeMode:'contain'
  },
  searchText: {
    fontSize: normalizeFont(11),
    color: '#4A4A4A',
    fontWeight: '400',
    left: scaleWidth(5),
  },
  inRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
export default memo(SearchHeader);
