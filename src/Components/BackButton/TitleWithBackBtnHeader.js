import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import FONTS from '../../Constants/enums/Fonts';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { scaleWidth, scaleHeight, normalizeFont, COLORS } from '../../Constants/enums';

export default function TitleWithBackBtnHeader({ centerTitle, onPressBackArrow, externalStyleText, headerRight }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.backBtnIcon} onPress={onPressBackArrow}>
          <Image source={IMAGES.Back_Icon} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={[styles.centerText, externalStyleText]} allowFontScaling={false}>
          {centerTitle}
        </Text>
      </View>
      <View style={styles.rightSection}>
        {headerRight || <View style={styles.placeholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '65%',
  },
  centerText: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(20),
    fontFamily: FONTS.RobotoBold,
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '35%',
  },
  placeholder: {
    width: scaleWidth(10),
    height: scaleWidth(5),
  },
  backBtnIcon: {
    paddingHorizontal: scaleWidth(20),
    paddingTop: scaleHeight(5),
    paddingBottom: scaleHeight(10),
  },
  backIcon: {
    height: scaleWidth(42),
    width: scaleWidth(42),
    resizeMode: 'contain',
  },
});
