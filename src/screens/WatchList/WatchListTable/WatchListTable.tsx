import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import { useDispatch, useSelector } from 'react-redux';
import { getSymbolList, getWatchlistTable } from '../../../apis/Onboarding/watchlistSlice';
import { CONSTANT_TEXT } from '../../../Constants/enums/constantText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WatchTableComponent from '../../Dashboard/TableComponent/WatchlistTable';
import { scaleHeight, scaleWidth } from '../../../Constants/enums';
import SymbolPopup from './ModalComponent';
import styles from './style';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../../Navigation/NavigationService';
import Popover from 'react-native-popover-view';
import AntDesign from 'react-native-vector-icons/AntDesign'

interface WatchListProps {
  navigation: any;
  route: any;
}
const WatchListTable: React.FC<WatchListProps> = ({ navigation, route }) => {
  const { watchlist_id, name, description } = route.params;
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [WatchListData, setWatchListData] = useState();
  const [originalData, setOriginalData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const watchListData = useSelector((state: any) => state.totalWatchlist);
  const {
    isWatchlistTableSuccess,
    isWatchlistTable,
    tableloading,
    isDataFailure,
    noTabClickData,
    isWatchlistTableError,
  } = watchListData;

  useEffect(() => {
    getWatchListTable();
  }, []);
  const getWatchListTable = async () => {
    // user to show the total stocks table insinde the
    const userid = await AsyncStorage.getItem('userId');
    if (userid) {
      dispatch(
        getWatchlistTable({
          watchlist_id: watchlist_id,
          userid: userid,
        }),
      );
      dispatch(getSymbolList({ userid: userid }));
    }
  };
  useEffect(() => {
    if (isWatchlistTableSuccess) {
      setWatchListData(isWatchlistTableSuccess);
      setOriginalData(isWatchlistTableSuccess);
    }
  }, [isWatchlistTableSuccess]);
  useEffect(() => {
    if (searchQuery) {
      const filteredData = originalData.filter(item =>
        item?.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setWatchListData(filteredData);
    } else {
      setWatchListData(originalData);
    }
  }, [searchQuery, originalData]);

  const onAddWatchlistPress = () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const headerRight = () => {
    if (!originalData?.length) return null;
  
    return (
      <View style={styles.headerRight}>
        <Text style={[styles.buttonText, { fontWeight: '700' }]}>
          {`${originalData.length} / 200`}
        </Text>
        <Popover
          from={
            <TouchableOpacity>
              <AntDesign
                name="infocirlce"
                size={15}
                color="#000"
              />
            </TouchableOpacity>
          }
          popoverStyle={styles.popUpStyle}
        >
          <Text style={styles.interText}>{'Add up to 200 stocks to your Watchlist'}</Text>
        </Popover>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.backgroundcolor}>
      <TitleWithBackBtnHeader
        externalStyleText={{ alignSelf: 'center', marginRight: 50 }}
        centerTitle={name}
        onPressBackArrow={() => goBack()}
        headerRight={headerRight()}
      />
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>

          {!noTabClickData && <View style={styles.searchBox}>
            <Image
              style={styles.searchIcon}
              source={IMAGES.BOTTOM_TAB_ICON.HomeSearch}
            />
            <TextInput
              allowFontScaling={false}
              style={[styles.searchInput]}
              onChangeText={text => setSearchQuery(text)}
              value={searchQuery}
              placeholder={CONSTANT_TEXT.SEARCH_WATCHLIST_STOCKS}
              placeholderTextColor="gray"
              keyboardType="default"
            />
          </View>}
          <SymbolPopup
            visible={modalVisible}
            onClose={onCloseModal}
            watchlistid={watchlist_id}
          />
        </View>
      </View>
      <View
        style={[
          styles.tableContainer,
          {
            marginTop: scaleHeight(10),
            paddingLeft: scaleWidth(10),
          },
        ]}>
        {tableloading ? (
          isWatchlistTableError ? (
            <View style={styles.loaderContainer}>
              <Text>Somthing went wrong </Text>
            </View>
          ) : (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size={CONSTANT_TEXT.LARGE} color="blue" />
            </View>
          )
        ) : noTabClickData ? (
          <View style={styles.nodataContainer}>
            <Image source={IMAGES.noRecord1} style={styles.imageNodata} />
            <Text allowFontScaling={false} style={styles.textNoData}>
              {CONSTANT_TEXT.NO_DATA_FOUNG}
            </Text>
          </View>
        ) : isDataFailure ? (
          <View style={styles.loaderContainer}>
            <Text allowFontScaling={false} style={styles.textError}>
              {isDataFailure}
            </Text>
          </View>
        ) : (
          <WatchTableComponent
            isdashboardScreenerSuccess={WatchListData && WatchListData}
            isScreenerSaveData={isWatchlistTable}
            watchlist_id={watchlist_id}
            getWatchListTable={getWatchListTable}
          />
        )}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 0 }}>
        <TouchableOpacity onPress={onAddWatchlistPress} >
          <Image source={IMAGES.BOTTOM_TAB_ICON.addWatchlist} style={{ height: 100, width: 100, resizeMode: 'contain', alignItems: 'center' }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default WatchListTable;
