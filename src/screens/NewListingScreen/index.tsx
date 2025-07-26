import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { COLORS, scaleHeight, scaleWidth, styleBase } from '../../Constants/enums';
import { styles } from './styles';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainContainer from '../../Components/MainContainer';
import NewListingHeader from '../../Components/Headers/NewListingHeader';
import NewListingList from '../../Components/FlatList/NewListingList';
import { getNewListing } from '../../apis/Onboarding/NewListingApi/NewListingSlice';
import UserGuideModal from '../../Components/Modal/UserGuideModal';
import { getTinymce } from '../../apis/Onboarding/TinymceApi/TinymceSlice';
import { Loader } from '../../Components/Loader';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../Navigation/NavigationService';
import analytics from '../../Services/PushNotification/analytics';

const NewListingScreen: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [listingData, setListingData] = React.useState([]);

  const { isnewListedSuccess, isnewListedError, isLoading } = useSelector(
    (state: any) => state.NewListingSlice,
  );

  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;
  const [userGuideModalVisible, setuserGuideModalVisible] = React.useState(false);

  const [tinymcedata, setTinymceData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);

  const searchDate = new Date();
  const formattedDate = moment(searchDate).format('YYYY-MM-DDTHH:mm:ss');

  const getNewListingData = async () => {
    let userid = await AsyncStorage.getItem('userId');
    if (userid) {
      dispatch(getNewListing({ userid: userid }));
    }
  };
  React.useEffect(() => {
    if (isFocused) {
      getNewListingData();
    }
  }, [isFocused]);
  useEffect(() => {
    if (isnewListedSuccess) {
      setListingData(isnewListedSuccess);
    }
  }, [isnewListedSuccess]);

  const onPressBack = () => {
    goBack();
  };

  const getTinymceData = async () => {
    await analytics.logEvent('New_Listing_Screen')
    dispatch(getTinymce({ screen_name: 'new_listing' }));
  };
  React.useEffect(() => {
    if (isFocused) getTinymceData();
  }, [isFocused]);
  useEffect(() => {
    if (isTinymceSuccess) {
      setTinymceData(isTinymceSuccess?.response);
    }
  }, [isTinymceSuccess]);
  useEffect(() => {
    if (isTinymceSuccess && isclick) {
      const timer = setTimeout(() => {
        setuserGuideModalVisible(true);
      }, 500); // 5000 milliseconds = 5 seconds
      return () => clearTimeout(timer); // Cleanup function to clear the timer
    }
  }, [isTinymceSuccess]);
  const userGuidCloseModal = () => {
    setuserGuideModalVisible(false);
    setIsClick(false);
  };

  const onSelectStock = item => {
    navigation.navigate('SearchDetailScreen', {
      symbol: item?.symbol,
      segment: item?.segment,
    });
  };
  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle="New Listing" onPressBackArrow={onPressBack} />

      <View style={styles.mainContainer}>
        <View style={{ flex: 1, marginBottom: scaleHeight(10) }}>
          {isLoading ? (
            <Loader />
          ) : (
            <NewListingList newlistingList={listingData} onSelectStock={onSelectStock} /> //flatlist
          )}
        </View>
      </View>
      {tinymcedata[0]?.screen_content && <UserGuideModal
        visible={userGuideModalVisible}
        onClose={userGuidCloseModal}
        text_content={tinymcedata[0]?.screen_content}
      />}
    </MainContainer>
  );
};
export default NewListingScreen;
