import React from 'react';
import {StyleSheet, TouchableOpacity, Platform, Image} from 'react-native';
// import IMAGES from '../../Constants/Images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scaleHeight, scaleWidth} from '../../Constants/enums';
import IMAGES from '../../Constants/enums/ImagesEnum';

const styles = props =>
  StyleSheet.create({
    containerView: {
      marginTop: Platform.OS === 'ios' ? scaleHeight(props?.top + 5) : scaleHeight(20),
      right: scaleWidth(20),
      position: 'absolute',
      zIndex: 999,
      height: scaleHeight(35),
      width: scaleWidth(35),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'pink',
    },
  });

export default function MenuButton({onPress, image = IMAGES.Back_Icon}) {
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={styles({top: insets.top}).containerView}
      resizeMode="center">
      <Image source={image} resizeMode="center" />
    </TouchableOpacity>
  );
}
