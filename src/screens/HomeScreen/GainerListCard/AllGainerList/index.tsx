import React, { memo, useEffect, useState, useCallback } from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, normalizeFont, ROUTE_NAME, styleBase } from '../../../../Constants/enums';
import { Loader } from '../../../../Components/Loader';
import MainContainer from '../../../../Components/MainContainer';
import { market_trends } from '../../../../apis/Onboarding/HomeScreenApi/HomeScreenSlice';
import { useDispatch, useSelector } from 'react-redux';
import GainerLooserTile from '../../../../Components/Tiles/GainerLooserTile';
import IMAGES from '../../../../Constants/enums/ImagesEnum';
import styles from './styles';
import TitleWithBackBtnHeader from '../../../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack, navigation } from '../../../../Navigation/NavigationService';

interface MyComponentProps {
  route?: any;
}

const AllGainerList: React.FC<MyComponentProps> = ({ route }) => {
  const { ishowGainer } = route.params;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { isLoad, ismarket_trendsSuccess } = useSelector((state: any) => state.HomeScreenSlice);

  const [originalData, setOriginalData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setRefreshing] = useState(false);

  const fetchScreenData = useCallback(async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (userId) {
      dispatch(market_trends({ userid: userId, type: ishowGainer }));
    }
  }, [dispatch, ishowGainer]);

  useEffect(() => {
    fetchScreenData();
  }, [fetchScreenData]);

  useEffect(() => {
    if (ismarket_trendsSuccess?.response) {
      const data = ismarket_trendsSuccess?.response?.[0]?.data || [];
      setMarketData(data);
      setOriginalData(data);
      setRefreshing(false);
    }
  }, [ismarket_trendsSuccess]);

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchScreenData();
  }, [fetchScreenData]);

  const onPressBack = () => {
    goBack();
  };

  return (
    <MainContainer bgColor={'#fff'}>
      <TitleWithBackBtnHeader
        centerTitle={ishowGainer === 'gain' ? 'Top Gainers' : 'Top Losers'}
        onPressBackArrow={onPressBack}
      />
      <View style={styles.Container}>
        <View style={styles.searchBox}>
          <Image
            alt="search"
            resizeMode="contain"
            style={styles.searchIcon}
            source={IMAGES.BOTTOM_TAB_ICON.HomeSearch}
          />
          <TextInput
            allowFontScaling={false}
            style={styles.searchInput}
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="Search any stock"
            placeholderTextColor="#4A4A4A"
          />
        </View>
        {/* <View style={[styles.inRow, styles.iconView]}>
          <View style={style.circle}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation(ROUTE_NAME.VIDEO_PLAYER_SCREEN)}>
              <Image source={IMAGES.BOTTOM_TAB_ICON.YoutubeIcon} style={[styles.YoutubeIcon]} />
            </TouchableOpacity>
          </View>
          <View style={style.circle}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => navigation(ROUTE_NAME.ALERT_SCREEN)}
              style={styles.alertIconContainer}>
              <Image source={IMAGES.BOTTOM_TAB_ICON.AlertIcon} style={styles.notificationIcon} />
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
      {isLoad ? (
        <Loader />
      ) : (
        <View style={[styleBase.flex1, { backgroundColor: COLORS.PrimaryWhite }]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={marketData}
            renderItem={({ item, index }) => (
              <GainerLooserTile item={item} ishowGainer={ishowGainer} index={index} />
            )}
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
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor={COLORS.blue}
                progressViewOffset={50}
              />
            }
          />
        </View>
      )}
    </MainContainer>
  );
};

export default memo(AllGainerList);

const style = StyleSheet.create({
  firstLetter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  circle: {
    height: 37,
    width: 37,
    borderRadius: 18.5,
    backgroundColor: '#F4F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
});
