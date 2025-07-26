import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, dynamicSize, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import IMAGES from '../../Constants/enums/ImagesEnum';

interface NewListingHeaderProps {
  onPressBackArrow: () => void;
}
const NewListingHeader: React.FC<NewListingHeaderProps> = ({onPressBackArrow}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPressBackArrow}
        hitSlop={styles.hitSlop}
        style={styles.backIconstyle}>
        <Image source={IMAGES.Back_Icon} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.DataTitle} allowFontScaling={false}>New Listing</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: scaleWidth(30),
  },
  DataTitle: {
    marginTop: dynamicSize(28),
    fontSize: normalizeFont(24),
    color: COLORS.Black,
    fontWeight: '700',
    marginBottom: scaleHeight(39),
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
  },
});
export default  React.memo(NewListingHeader);
