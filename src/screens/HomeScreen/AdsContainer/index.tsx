import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, normalizeFont, scaleHeight, scaleWidth, styleBase } from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import { navigation } from '../../../Navigation/NavigationService';

const AdsContainer: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`Update Prime Now 🎉\nStay Ahead In The Market !`}</Text>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation('SubscriptionScreen')} style={styles.button}>
          <Text style={styles.buttonText}>Go Premium</Text>
        </TouchableOpacity>
        <Image source={IMAGES.HOME_SCREEN_ICON.PREMIUM_Icon} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PrimaryWhite,
    marginTop:10,
    marginBottom: -15,
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(5),
    height: 222,
  },
  title: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(20),
    fontFamily: FONTS.RobotoBold,
    fontWeight: '700',
    marginLeft: scaleWidth(20),
  },
  contentContainer: {
    ...styleBase.inRow,
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    height: 35,
    width: 140,
    backgroundColor: '#228B22',
    paddingTop: 8,
    borderRadius: scaleWidth(5),
    marginLeft: scaleWidth(20),
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(13),
    fontFamily: FONTS.RobotoBold,
  },
  image: {
    height: 180,
    width: 225,
    resizeMode: 'contain',
    position: 'absolute',
    top: -40,
    right: -25
  },
});

export default React.memo(AdsContainer);