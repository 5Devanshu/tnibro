import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { scaleHeight } from '../../Constants/enums';
import { Marquee } from '@animatereactnative/marquee';
import MarqueeView from 'react-native-marquee-view';

const AnnouncementBanner = ({ istickerSuccess = [] }) => {
  const announcement = istickerSuccess[0]?.announcement_description;

  if (!announcement) return null;

  return (
    <View style={styles.bannerWrapper}>
      <MarqueeComponent announcement={announcement} />
    </View>
  );
};

const MarqueeComponent = ({ announcement }) => {
  return Platform.OS === 'ios' ? (
    <MarqueeView style={styles.marqueeContainer}>
      <Text style={styles.marqueeText}>{announcement}</Text>
    </MarqueeView>
  ) : (
    <Marquee
      spacing={20}
      speed={0.3}
      style={[styles.marqueeContainer, styles.androidSpacing]}>
      <Text style={styles.marqueeText}>{announcement}</Text>
    </Marquee>
  );
};

const styles = StyleSheet.create({
  bannerWrapper: {
    marginTop:3,
    paddingBottom: scaleHeight(3),
  },
  marqueeContainer: {
    marginTop:8,
    backgroundColor: '#228B22', // Light green for subtle highlight
    paddingVertical: scaleHeight(5),
    width: '100%',
  },
  marqueeText: {
    color: '#FFF', // Better contrast than #5d5d5d
    fontWeight: '600',
  },
  androidSpacing: {
    marginVertical: 10,
    marginBottom: 5,
  },
});

export default React.memo(AnnouncementBanner);
