import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';

import IMAGES from '../../Constants/enums/ImagesEnum';
import { normalizeFont } from '../../Constants/enums/Dimensions';
import { CONSTANT_TEXT } from '../../Constants/enums/constantText';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText, getSearch } from '../../apis/Onboarding/SearchSlice';
import moment from 'moment';
import styles from './style';
import StockSearchListTile from '../../Components/Tiles/StockSearchListTile';
import { navigation } from '../../Navigation/NavigationService';
import MainContainer from '../../Components/MainContainer';
import { COLORS } from '../../Constants/enums';
import BackWithCenterIcons from '../../Components/BackButton/BackWithCenterIcons';

interface SearchScreenProps {
  // navigation: any;
}

const SearchScreen: React.FC<SearchScreenProps> = () => {
  const textInputRef = useRef<TextInput | null>(null); // Specify the type of ref
  const dispatch = useDispatch();
  const searchResultsData = useSelector(state => state.searchfield);
  const { searchText, searchResults, loader } = searchResultsData;
  const paymentData = useSelector((state: any) => state.CreateSubscSlice);
  const { isPremiumUser } = paymentData;
  const searchDate = new Date();
  const formattedDate = moment(searchDate).format('YYYY-MM-DDTHH:mm:ss');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getSearch(searchText));
    var trackierEvent = new TrackierEvent("mH6sqU7t6u");
    trackierEvent.param1 = isPremiumUser === true ? 'paid_user' : 'trial_user';
    TrackierSDK.trackEvent(trackierEvent);
  }, [dispatch, searchText]);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);
  const handleOnPress = item => {
    navigation('SearchDetailScreen', {
      symbol: item?.name,
      segment: item?.segment,
    });
  };
  useEffect(() => {
    const handleonChange = () => {
      dispatch(setSearchText(searchQuery));
    };
    handleonChange();
  }, [searchQuery]);

  const clearText = () => {
    setSearchQuery('');
    // Focus on the text input after clearing
    textInputRef.current.focus();
  };
  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}
      <BackWithCenterIcons />
      <View style={styles.mainView}>
        <View style={styles.searchBox}>
          <Image alt="" resizeMode="contain" style={styles.searchIcon} source={IMAGES.SearchIcon} />
          <TextInput
            ref={textInputRef}
            allowFontScaling={false}
            style={[styles.input, { fontSize: searchText ? normalizeFont(16) : normalizeFont(12) }]}
            onChangeText={text => setSearchQuery(text)}
            value={searchText}
            placeholder={CONSTANT_TEXT.SEARCH_ANY_STOCKS}
            placeholderTextColor={COLORS.SecondaryBlack}
            keyboardType="default"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={clearText} hitSlop={styles.hitSlop}>
            <Image
              alt=""
              resizeMode="contain"
              style={styles.searchIcon}
              source={IMAGES.ErrorSign}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {loader ? (
            <View style={styles.ActivityIndicatorView}>
              <ActivityIndicator size={CONSTANT_TEXT.LARGE} color="blue" />
            </View>
          ) : searchResults?.response && searchResults?.response.length > 0 ? (
            <FlatList
              style={styles.FlatlistStyle}
              showsVerticalScrollIndicator={false}
              data={searchResults?.response}
              keyExtractor={item => item?.id}
              renderItem={({ item }) => (
                <StockSearchListTile
                  item={item}
                  onSelectStock={handleOnPress}
                  searchText={searchText}
                />
              )}
            />
          ) : (
            <View style={styles.noResultView}>
              <Image source={IMAGES.noRecord1} style={{ resizeMode: 'contain', height: 200, width: 200 }} />
              <Text allowFontScaling={false} style={{ color: 'black' }}>
                No results Found !
              </Text>
            </View>
          )}
        </View>
      </View>
    </MainContainer>
  );
};

export default SearchScreen;
