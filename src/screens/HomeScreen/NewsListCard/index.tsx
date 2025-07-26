import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import IMAGES from '../../../Constants/enums/ImagesEnum';
import {
  COLORS,
  CONSTANT_TEXT,
  ROUTE_NAME,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../../Constants/enums';
import {navigation} from '../../../Navigation/NavigationService';
import FONTS from '../../../Constants/enums/Fonts';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface NewsItem {
  id: number;
  title: string;
  image_url: string;
  url: string;
}

interface NewsListCardProps {
  newsData: NewsItem[];
}

const NewsCard: React.FC<{ newsItem: NewsItem; index: number; cardWidth: number }> = React.memo(
  ({ newsItem, index, cardWidth }) => {
    const sourceDomain = newsItem.url ? newsItem.url.split('/')[2] : 'Unknown';

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation(ROUTE_NAME.NEWS_SCREEN, { selectedIndex: index })}
        style={[styles.cardContainer, { width: cardWidth - 100, backgroundColor: '#F4F5F6' }]}
      >
        <Image source={{ uri: newsItem.image_url }} style={styles.image} resizeMode="cover" />
        <View style={styles.textOverlay}>
          <Image source={IMAGES.HOME_SCREEN_ICON.NEWS_SHADOW} style={styles.imageShadow} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.newsText}>{newsItem.title}</Text>
          <Text style={styles.sourceText}>Source: {sourceDomain}</Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const NewsListCard: React.FC<NewsListCardProps> = ({ newsData }) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>News</Text>
      <TouchableOpacity onPress={() => navigation(ROUTE_NAME.NEWS_SCREEN)}>
        <Text style={styles.seeAllText}>{CONSTANT_TEXT.SEE_ALL}</Text>
      </TouchableOpacity>
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {newsData.map((item, index) => (
        <NewsCard key={item.id} newsItem={item} index={index} cardWidth={SCREEN_WIDTH} />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(24),
  },
  headerText: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(20),
    fontFamily: FONTS.RobotoBold,
  },
  seeAllText: {
    color: '#22A45D',
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoRegular,
  },
  scrollViewContent: {
    paddingHorizontal: scaleWidth(10),
  },
  cardContainer: {
    borderRadius: scaleWidth(8),
    marginHorizontal: scaleWidth(10),
    marginBottom: scaleHeight(17),
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: scaleWidth(96),
    width: scaleWidth(96),
    borderRadius: scaleWidth(8),
  },
  textOverlay: {
    position: 'absolute',
    padding: 8,
  },
  imageShadow: {
    height: scaleWidth(96),
    width: scaleWidth(96),
    borderRadius: scaleWidth(8),
  },
  textContainer: {
    flex: 1,
    marginLeft: scaleWidth(15),
    justifyContent: 'center',
  },
  newsText: {
    color: '#151716',
    fontSize: normalizeFont(12),
    lineHeight: normalizeFont(16),
    fontFamily: FONTS.RobotoRegular,
  },
  sourceText: {
    fontSize: normalizeFont(10),
    color: COLORS.GrayDark || '#888',
    marginTop: 4,
  },
});

export default React.memo(NewsListCard);
