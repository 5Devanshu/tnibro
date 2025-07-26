import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import IMAGES from '../../../Constants/enums/ImagesEnum';

const SearchSectorTile = React.memo((props: any) => {
  const {item, index, onSectorSelected} = props;

  return (
    <TouchableOpacity onPress={() => onSectorSelected(item)} style={[styles.ListBox]}>
      <View style={styles.nameBox}>
        <Text style={styles.label} numberOfLines={1} allowFontScaling={false}>
          {item?.label}
        </Text>
      </View>
      <Image source={IMAGES.arrowforward} style={styles.arrow} />
    </TouchableOpacity>
  );
});

export default React.memo(SearchSectorTile);
