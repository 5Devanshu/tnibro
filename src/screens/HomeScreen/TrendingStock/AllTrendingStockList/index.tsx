import React, { memo, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TextInput,
  Image,
  RefreshControl,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  COLORS,
  CONSTANT_TEXT,
  normalizeFont,
  scaleWidth,
  styleBase,
} from '../../../../Constants/enums';
import { Loader } from '../../../../Components/Loader';
import MainContainer from '../../../../Components/MainContainer';
import LocationBar from '../../../../Components/BackButton/LocationBar';
import { market_trends } from '../../../../apis/Onboarding/HomeScreenApi/HomeScreenSlice';
import { useDispatch, useSelector } from 'react-redux';
import GainerLooserTile from '../../../../Components/Tiles/GainerLooserTile';
import IMAGES from '../../../../Constants/enums/ImagesEnum';
import styles from './styles';
import TrendingStockTile from '../../../../Components/Tiles/TrendingStockTile';
import TitleWithBackBtnHeader from '../../../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../../../Navigation/NavigationService';
import UserGuideModal from '../../../../Components/Modal/UserGuideModal';
import { getTinymce } from '../../../../apis/Onboarding/TinymceApi/TinymceSlice';
import AdvertismentComponent from '../../AdvertismentComponent';
import analytics from '../../../../Services/PushNotification/analytics';

interface MyComponentProps {
  route?: any;
}
const AllTrendingStockList: React.FC<MyComponentProps> = ({ route }) => {
  const { ishowGainer } = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const HomeScreeneData = useSelector((state: any) => state.HomeScreenSlice);
  const { isLoad, ismarket_trendsSuccess, isAdvertisementBannerSuccess } = HomeScreeneData;
  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;

  const [originalData, setOriginalData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setRefreshing] = React.useState(false);
  const [userGuideModaVisible, setUserGuideModalVisible] = React.useState(false);
  const [tinymcePopUpdata, setTinymcePopUpData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);

  const [topBannerUrl, setTopBannerUrl] = React.useState(null);
  const BannerScreenName = 'toptrendingscreen';
  const getScreenData = async () => {
    let userid = await AsyncStorage.getItem('userId');
    if (userid) {
      dispatch(market_trends({ userid: userid, type: ishowGainer }));
    }
  };
  React.useEffect(() => {
    if (isFocused) {
      getScreenData();
    }
  }, [isFocused]);

  const getTinymceData = async () => {
    await analytics.logEvent('Top_Trending_Screen')
    dispatch(getTinymce({ screen_name: 'toptrendingscreen' }));
  };
  useEffect(() => {
    getTinymceData(); //Pop up message in modal
  }, []);
  useEffect(() => {
    if (isTinymceSuccess) {
      setTinymcePopUpData(isTinymceSuccess?.response);
    }
  }, [isTinymceSuccess]);
  useEffect(() => {
    if (isTinymceSuccess && isclick) {
      const timer = setTimeout(() => {
        setUserGuideModalVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTinymceSuccess]);

  const userGuidCloseModal = () => {
    setUserGuideModalVisible(false);
    setIsClick(false);
  };

  useEffect(() => {
    if (ismarket_trendsSuccess?.response) {
      setMarketData(ismarket_trendsSuccess?.response?.[0]?.data);
      setOriginalData(ismarket_trendsSuccess?.response?.[0]?.data);
      setRefreshing(false);
    }
  }, [ismarket_trendsSuccess?.response]);

  const fetchAllData = React.useCallback(async () => {
    let userid = await AsyncStorage.getItem('userId');
    dispatch(market_trends({ userid: userid, type: ishowGainer }));
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filteredData = originalData.filter(item =>
        item?.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setMarketData(filteredData);
    } else {
      setMarketData(originalData);
    }
  }, [searchQuery, originalData]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAllData();
  }, []);

  const onPressBack = () => {
    goBack();
  };
  React.useEffect(() => {
    // Filter the banner based on the current screen name
    const banner = isAdvertisementBannerSuccess?.response?.data.find(
      b => b.screen_name === BannerScreenName,
    );
    if (banner) {
      setTopBannerUrl(banner);
    }
  }, [isAdvertisementBannerSuccess]);
  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <View style={styles.Container}>
        {/* <LocationBar showBackIcon /> */}
        <TitleWithBackBtnHeader centerTitle="Top Trending" onPressBackArrow={onPressBack} />
      </View>
      {isLoad ? (
        <Loader />
      ) : (
        <View
          style={[
            styleBase.flex1,
            {
              backgroundColor: COLORS.PrimaryWhite,
              borderTopRightRadius: scaleWidth(30),
              borderTopLeftRadius: scaleWidth(30),
            },
          ]}>
          {topBannerUrl && <AdvertismentComponent bannerUrl={topBannerUrl} />}

          <View style={styles.searchBox}>
            <Image
              alt=""
              resizeMode="contain"
              style={styles.searchIcon}
              source={IMAGES.BOTTOM_TAB_ICON.HomeSearch}
            />
            <TextInput
              allowFontScaling={false}
              style={[
                styles.searchInput,
                { fontSize: searchQuery ? normalizeFont(12) : normalizeFont(12) },
              ]}
              onChangeText={text => setSearchQuery(text)}
              value={searchQuery}
              placeholder={'Search any stocks'}
              placeholderTextColor="#4A4A4A"
              keyboardType="default"
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={marketData}
            renderItem={({ item, index }) => <TrendingStockTile item={item} index={index} />}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <>
                <Image source={IMAGES.noRecord2} style={{ marginTop: 100, resizeMode: 'contain', height: 200, width: 200, alignSelf: 'center' }} />
                <Text style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: '#000',
                }}>No Records Found.</Text>
              </>
            }
            contentContainerStyle={styles.cardContainer}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor={COLORS.blue}
                progressViewOffset={50}
              />
            }
          />
          {tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content && <UserGuideModal
            visible={userGuideModaVisible}
            onClose={userGuidCloseModal}
            text_content={tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content}
          />}
        </View>
      )}
    </MainContainer>
  );
};

export default memo(AllTrendingStockList);
