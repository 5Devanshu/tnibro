import React, { useState, memo } from 'react';
import { Dimensions, StyleSheet, View, Image, TouchableOpacity, Linking } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { COLORS, scaleHeight, scaleWidth } from '../../../Constants/enums';

interface BannerItem {
  image: string;
  redirect_url: string;
}

interface BannerCarouselProps {
  bannerData: BannerItem[];
  height: number;
  carouselStyle?: object;
}

interface PaginationProps {
  count: number;
  currentIndex: number;
}

const Pagination = memo(({ count, currentIndex }: PaginationProps) => (
  <View style={styles.pagination}>
    {Array.from({ length: count }).map((_, index) => (
      <View
        key={index}
        style={[styles.dot, currentIndex === index ? styles.activeDot : styles.inactiveDot]}
      />
    ))}
  </View>
));

const BannerCarousel: React.FC<BannerCarouselProps> = ({ bannerData, height, carouselStyle ,background_color }) => {
  const width = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePress = (url: string) => Linking.openURL(url);

  return (
    <View style={carouselStyle}>
      <View style={[styles.carouselWrapper,background_color]}>
        <Carousel
          width={width}
          height={height}
          data={bannerData}
          autoPlay
          pagingEnabled
          scrollAnimationDuration={10000}
          onSnapToItem={setCurrentIndex}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.carouselItem} onPress={() => handlePress(item.redirect_url)}>
              <Image style={styles.img} source={{ uri: item.image }} />
            </TouchableOpacity>
          )}
        />
      </View>
      <Pagination count={bannerData.length} currentIndex={currentIndex} />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselWrapper: {
    marginHorizontal: scaleWidth(20),
    borderRadius: 12,
    overflow: 'hidden',
  },
  carouselItem: {
    width: '100%',
    height: '100%',
    borderRadius:12,
  },
  img: {
    width: '90%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius:12,
    backgroundColor: COLORS.gray,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scaleHeight(10),
  },
  dot: {
    width: scaleWidth(7),
    height: scaleWidth(7),
    borderRadius: 3.5,
    marginHorizontal: scaleWidth(4),
  },
  activeDot: {
    backgroundColor: '#228B22',
  },
  inactiveDot: {
    backgroundColor: '#c4c4c4',
  },
});

export default memo(BannerCarousel);
