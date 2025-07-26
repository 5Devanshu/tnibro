import React from 'react';
import {Image, StyleSheet, TouchableOpacity, Platform, View} from 'react-native';
import {scaleWidth, scaleHeight, SCREEN_WIDTH} from '../../Constants/enums';
import {goBack,} from '../../Navigation/NavigationService';
import IMAGES from '../../Constants/enums/ImagesEnum';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(20),
    justifyContent: 'space-between',
    width: SCREEN_WIDTH,
  },
  sideView: {
    width: scaleWidth(20),
    height: scaleWidth(20),
  },
  appIcon: {
    width: scaleWidth(162),
    height: scaleHeight(39),
    resizeMode: 'contain',
  },
  backIcon: {
    height: scaleHeight(42),
    width: scaleWidth(42),
    resizeMode:'contain'
  },
});

function BackWithCenterIcons({additionalAction = () => {}, onlyActionPerform = false}) {
  const goBackAction = () => {
    if (onlyActionPerform) {
      additionalAction();
    } else {
      additionalAction();
      goBack();
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBackAction}>
        <Image source={IMAGES.Back_Icon} style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.sideView} />
    </View>
  );
}

export default React.memo(BackWithCenterIcons);
