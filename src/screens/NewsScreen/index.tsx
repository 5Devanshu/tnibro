import {useIsFocused, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getNews} from '../../apis/Onboarding/News_ipo/News_ipoSlice';
import MainContainer from '../../Components/MainContainer';
import BackWithCenterIcons from '../../Components/BackButton/BackWithCenterIcons';
import {
  COLORS,
  CONSTANT_TEXT,
  ROUTE_NAME,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../Constants/enums';
import {goBack, navigation} from '../../Navigation/NavigationService';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import {Loader} from '../../Components/Loader';

interface NewsItem {
  title: string;
  description: string;
  source: string;
  published_hour_ago: string;
  image_url: string;
  url: string;
}
interface NewsScreenProps {
  route: any;
}
const NewsScreen: React.FC<NewsScreenProps> = ({route}) => {
  const {selectedIndex} = route.params || {};

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const listRef = useRef<VirtualizedList<NewsItem>>(null);

  const news_ipoData = useSelector(state => state.news_ipoSlice);
  const {isLoading, isnewsSuccess} = news_ipoData;
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const getNewsData = () => {
    dispatch(getNews());
  };

  useEffect(() => {
    if (isFocused) getNewsData();
  }, [isFocused]); // remove isFocus deeplinking

  // useEffect(() => {
  //   if (isnewsSuccess) {
  //     setNewsData(isnewsSuccess);
  //   }
  // }, [isnewsSuccess]);

  useEffect(() => {
    if (isnewsSuccess) {
      setNewsData(isnewsSuccess);
      if (selectedIndex !== undefined) {
        setTimeout(() => {
          listRef.current?.scrollToIndex({index: selectedIndex, animated: true});
        }, 100); // Adding a small delay to ensure the list is ready
      }
    }
  }, [isnewsSuccess, selectedIndex]);

  const renderNewsItem = ({item}: {item: NewsItem}) => {
    return (
      <View style={styles.newsItemContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation(ROUTE_NAME.WEB_VIEW_PAGE, {
              uri: item?.url,
            });
          }}>
          <Image source={{uri: item?.image_url}} style={styles.newsImage} resizeMode="stretch" />
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item?.title}</Text>
            <Text style={styles.newsDescription}>{item?.description}</Text>
            <Text style={styles.sourceStyle}>{item?.source}</Text>
            <Text style={styles.hourAgo}>{item?.published_hour_ago}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const getItemCount = () => newsData.length;
  const getItem = (data: NewsItem[], index: number) => data[index];

  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle="News" onPressBackArrow={() => goBack()} />
      {/* <View style={{flex: 1}}> */}
      {isLoading ? (
        <Loader />
      ) : (
        <VirtualizedList
          ref={listRef}
          data={newsData}
          renderItem={renderNewsItem}
          keyExtractor={(item, index) => index.toString()}
          getItemCount={getItemCount}
          getItem={getItem}
          initialNumToRender={5} // Adjust this value as needed
          windowSize={5} // Adjust this value as needed
          onViewableItemsChanged={({viewableItems}) => {
            if (viewableItems && viewableItems.length > 0) {
              setCurrentIndex(viewableItems[0].index || 0);
            }
          }}
          viewabilityConfig={{itemVisiblePercentThreshold: 50}}
          ListEmptyComponent={
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={CONSTANT_TEXT.LARGE} color="blue" />
            </View>
          }
        />
      )}
      {/* </View> */}
      <View style={styles.pageIndicatorContainer}>
        <Text style={styles.pageIndicatorText}>{`${currentIndex + 1}/${newsData.length}`}</Text>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  newsItemContainer: {
    backgroundColor: '#EEEEEE',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BFBFBF',
    margin: 10,
  },
  newsContent: {
    marginHorizontal: scaleWidth(20),
    marginTop: scaleHeight(10),
  },
  newsImage: {
    width: '100%',
    height: scaleHeight(250),
    backgroundColor: 'gray',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  newsTitle: {
    fontSize: normalizeFont(20),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: scaleHeight(5),
  },
  newsDescription: {
    fontSize: normalizeFont(16),
    color: '#000',
    marginBottom: scaleHeight(5),
  },
  sourceStyle: {
    fontSize: normalizeFont(12),
    color: '#AAA',
    marginBottom: scaleHeight(5),
  },
  hourAgo: {
    color: '#AAA',
    fontSize: normalizeFont(12),
    marginBottom: scaleHeight(10),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageIndicatorContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    paddingVertical: scaleHeight(5),
    paddingHorizontal: 10,
  },
  pageIndicatorText: {
    color: '#fff',
    fontSize: normalizeFont(16),
  },
});

export default React.memo(NewsScreen);
