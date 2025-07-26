import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, scaleHeight } from '../../Constants/enums';
import MainContainer from '../../Components/MainContainer';
import SearchInputWithBackBtn from './SearchInputWithBackBtn';
import SearchSectorList from '../../Components/FlatList/SearchSectorList';
import UserGuideModal from '../../Components/Modal/UserGuideModal';
import { getTinymce } from '../../apis/Onboarding/TinymceApi/TinymceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getScreenerData } from '../../apis/Onboarding/dashboardTabDataSlice';
import { goBack } from '../..//Navigation/NavigationService';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import { Loader } from '../../Components/Loader';
import analytics from '../../Services/PushNotification/analytics';

type DataType = { index: string; label: string; value: string };

const CategoriesScreen: React.FC = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;

  const dashboardTabData = useSelector((state: any) => state.dashboardTabData);
  const { isScreenerDataSuccess, isloading } = dashboardTabData;

  const [data, setData] = React.useState<DataType[]>([]); /// use for show all list
  const [searchText, setSearchText] = React.useState<string>('');
  const [ascendingOrder, setAscendingOrder] = React.useState<boolean>(true); // toggle for shorting icon
  const [userGuideModalVisible, setuserGuideModalVisible] = React.useState(false); // show tinymce Modal

  const [tinymcedata, setTinymceData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);

  const getSectoreData = async () => {
    await analytics.logEvent('Sector_Categories_Screen')
    dispatch(getScreenerData());
  };
  React.useEffect(() => {
    if (isFocused) getSectoreData();
  }, [isFocused]);

  useEffect(() => {
    setData(isScreenerDataSuccess?.response?.sector);
  }, [isScreenerDataSuccess]);

  const handleSort = () => {
    const sorted = [...data].sort((a, b) =>
      ascendingOrder ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label),
    );
    setData(sorted);
    setAscendingOrder(!ascendingOrder); // Toggle the order for the next click
  };
  const handleSearch = (text: string) => {
    setSearchText(text);
    const filteredData = isScreenerDataSuccess?.response?.sector.filter(item =>
      item.label.toLowerCase().includes(text.toLowerCase()),
    );
    setData(filteredData);
  };

  const clearSearchText = () => {
    setSearchText('');
    setData(isScreenerDataSuccess?.response?.sector);
  };
  const onPressBack = () => {
    goBack();
  };
  const onSectorSelected = item => {
    navigation.navigate('SectorStocksScreen', { Sector: item });
  };

  const getTinymceData = async () => {
    dispatch(getTinymce({ screen_name: 'categories' }));
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

  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle="Sector/Categories" onPressBackArrow={onPressBack} />
      <View style={styles.mainContainer}>
        {isloading && <Loader />}
        <SearchInputWithBackBtn
          value={searchText}
          onChangeText={handleSearch}
          onPressCross={clearSearchText}
          onSortPress={handleSort}
          ascendingOrder={ascendingOrder} // Pass the sorting order to the component
        />
        <View style={{ flex: 1 }}>
          <SearchSectorList data={data} onSectorSelected={onSectorSelected} />
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
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ActivityIndicator: {
    marginTop: scaleHeight(26),
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default React.memo(CategoriesScreen);
