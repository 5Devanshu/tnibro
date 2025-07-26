import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styles from './styles';

interface BannerUrlType {
  screen_url?: string;
  height?: number | string;
}

interface MyComponentProps {
  bannerUrl?: BannerUrlType;
  onPress?: () => void;
}

const AdvertismentComponent: React.FC<MyComponentProps> = ({ bannerUrl, onPress = () => null }) => {
  const imageHeight = bannerUrl?.height ? Number(bannerUrl.height) : 220;
  const imageUri = bannerUrl?.screen_url;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[styles.imagestyle, { height: imageHeight }]}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default React.memo(AdvertismentComponent);
