import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Linking, Alert } from 'react-native';
import IMAGES from '../Constants/enums/ImagesEnum';

const SocialMediaContainer = () => {
  const socialLinks = {
    facebook: 'https://www.facebook.com/stockyaari',
    telegram: 'https://t.me/+arTIQ2U2fOllODY1',
    linkedin: 'https://www.linkedin.com/company/stockyaari/',
    instagram: 'https://www.instagram.com/stockyaariofficial/?igsh=bTQwZXZycTEyYmQx',
    youtube: 'https://www.youtube.com/@stockyaariofficial',
  };

  const handlePress = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open this URL.');
      }
    } catch (err) {
      console.error('Error opening URL:', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Facebook */}
      <TouchableOpacity onPress={() => handlePress(socialLinks.facebook)}>
        <Image source={IMAGES.FacebookShare} style={styles.icon} />
      </TouchableOpacity>

      {/* Telegram */}
      <TouchableOpacity onPress={() => Linking.openURL(socialLinks.telegram).catch(() => console.log("Cannot open Telegram"))}>
        <Image source={IMAGES.telegram} style={styles.icon} />
      </TouchableOpacity>

      {/* LinkedIn */}
      <TouchableOpacity onPress={() => handlePress(socialLinks.linkedin)}>
        <Image source={IMAGES.linkedin} style={styles.icon} />
      </TouchableOpacity>

      {/* Instagram */}
      <TouchableOpacity onPress={() => handlePress(socialLinks.instagram)}>
        <Image source={IMAGES.instagram} style={styles.icon} />
      </TouchableOpacity>

      {/* YouTube */}
      <TouchableOpacity onPress={() => handlePress(socialLinks.youtube)}>
        <Image source={IMAGES.YoutubeShare} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal:20,
    marginLeft:12,
    paddingVertical:6,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default SocialMediaContainer;

