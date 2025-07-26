import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Image, TouchableOpacity, Text, View, FlatList, RefreshControl, Alert, StyleSheet } from 'react-native';
import CreateNewWatchlist from './CreateNewWatchlist';
import styles from './style';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Popover from 'react-native-popover-view'
import { useDispatch, useSelector } from 'react-redux';
import {
  addWatchList,
  deleteWatchlist,
  getWatchlist,
  editWatchList,
} from '../../../apis/Onboarding/watchlistSlice';
import AlertModalPopup from './AlertModal';
import { CONSTANT_TEXT } from '../../../Constants/enums/constantText';
import { useIsFocused } from '@react-navigation/native';
import { normalizeFont, scaleHeight, scaleWidth } from '../../../Constants/enums/Dimensions';
import { COLORS } from '../../../Constants/enums/colorsEnum';
import Toast from 'react-native-toast-message';
import MainComponent from '../../../Components/MainContainer';
import { ToastHandler } from '../../../utils/utils';
import UserGuideModal from '../../../Components/Modal/UserGuideModal';
import { getTinymce } from '../../../apis/Onboarding/TinymceApi/TinymceSlice';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../../Navigation/NavigationService';
import CommonButton from '../../../Components/Button/CommonButton';
import FONTS from '../../../Constants/enums/Fonts';
import AdvertismentComponent from '../../../screens/HomeScreen/AdvertismentComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Loader } from '../../../Components/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign'
import analytics from '../../../Services/PushNotification/analytics';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';
import AudioPlayer from '../../../utils/audioplayer';



interface WatchListProps {
  navigation: any;
}
const CreateWatchListScreen: React.FC<WatchListProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const watchListData = useSelector(state => state.totalWatchlist);
  const {
    isloader,
    isWatchlistSuccess,
    iswatchlistlength,
    isWatchlistError,
    isdeleteWatchlistSuccess,
    isaddWatchlistSuccess,
    iseditWatchListSuccess,
    isAlertWatchListError,
    isAlertWatchListSuccess,
    isSymbolSuccess, //when user add symbol
    isdeleteSymbolSuccess, // when user delete symbol
    isaddWatchlistError,
  } = watchListData;
  const actionSheet = useRef();

  const errorMsg = isAlertWatchListError?.response; ///use to show tost msg error
  const [watchlistData, setWatchListData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [watchlistId, setWatchListId] = useState<number>();
  const [refreshing, setRefreshing] = useState(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertWatchlistId, setAlertID] = useState<number>();
  const [alertName, setAlertName] = useState<string>('');
  const [alerStatus, setAlertStatus] = useState({ Buy_Alert: null, Sell_Alert: null });
  const [watchlistdetail, setWatchListDetail] = useState({ Name: '', Desc: '' });
  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;
  const [userGuideModalVisible, setuserGuideModalVisible] = React.useState(false);

  const [tinymcedata, setTinymceData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);

  const HomeScreeneData = useSelector((state: any) => state.HomeScreenSlice);
  const { isAdvertisementBannerSuccess } = HomeScreeneData;
  const paymentData = useSelector((state: any) => state.CreateSubscSlice);
  const { isPremiumUser } = paymentData;
  const [topBannerUrl, setTopBannerUrl] = React.useState(null);
  const BannerScreenName = 'watchlistscreen';

  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isWatchlistSuccess) {
      // use to set the all watchlist in state
      setWatchListData(isWatchlistSuccess?.response);
    } else if (isWatchlistError) {
      ToastHandler(false, isWatchlistError?.data?.detail);
    } else {
    }
  }, [isWatchlistSuccess, isWatchlistError]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const onRefresh = useCallback(() => {
    ///onrefresh show the updated watchlist
    setRefreshing(true);
    AsyncStorage.getItem('userId').then(userid => {
      dispatch(getWatchlist({ userid: userid }));
    });
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const closeEditModal = () => {
    setEditModalVisible(false);
  };
  const handleSaveWatchList = async (title, Description) => {
    const userid = await AsyncStorage.getItem('userId');
    dispatch(
      addWatchList({
        description: 'Description',
        name: title,
        userid: userid,
      }),
    );
  };
  const getWatchList = async () => {
    await analytics.logEvent('Watchlist_Screen')
    //use to show all the listing
    let userid = await AsyncStorage.getItem('userId');
    var trackierEvent = new TrackierEvent("nvj7h4JaZQ");
    trackierEvent.param1 = isPremiumUser === true ? 'paid_user' : 'trial_user';
    if(userid){
    TrackierSDK.setUserId(userid);
    }
    TrackierSDK.trackEvent(trackierEvent);
    if (userid) {
      dispatch(getWatchlist({ userid: userid }));
    }
  };
  useEffect(() => {
    // call the function show all the watchlist
    if (isFocused) getWatchList();
  }, [isFocused]);

  const updateWatchlist = async () => {
    //when user delete || edit || add  the watchlist to show updated list
    let userid = await AsyncStorage.getItem('userId');
    if (userid) {
      dispatch(getWatchlist({ userid: userid }));
    }
  };

  const getTinymceData = async () => {
    dispatch(getTinymce({ screen_name: 'watchlistscreen' }));
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

  useEffect(() => {
    //when we add a new watch list then this code will exexute to show the updated list
    if (isaddWatchlistSuccess) {
      updateWatchlist();
    }
  }, [isaddWatchlistSuccess]);
  useEffect(() => {
    //when use delete the list from the screen the update the list and show the updates watchlist
    if (isdeleteWatchlistSuccess) {
      updateWatchlist();
    }
  }, [isdeleteWatchlistSuccess]);
  useEffect(() => {
    /// when we add or remove any alert the use to show the updated watchlist folder
    if (isAlertWatchListSuccess) {
      updateWatchlist();
    }
  }, [isAlertWatchListSuccess]);

  const handleDelete = async (id: number) => {
    const userid = await AsyncStorage.getItem('userId');
    dispatch(deleteWatchlist({ watchlist_id: id, userid: userid }));
  };
  const handleEdit = (id: number, name: string, desc: string) => {
    setWatchListDetail({ Name: name, Desc: desc });
    setWatchListId(id);
    setEditModalVisible(true);
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
  const handleEditWatchList = (title: string, Description: string) => {
    if (title === '') {
      dispatch(
        editWatchList({
          watchlist_id: watchlistId,
          description: Description,
          name: watchlistdetail?.Name,
        }),
      );
    } else {
      dispatch(editWatchList({ watchlist_id: watchlistId, description: Description, name: title }));
    }
  };
  useEffect(() => {
    if (iseditWatchListSuccess) {
      updateWatchlist();
    }
  }, [iseditWatchListSuccess]);
  const handleAlert = (id: number, name: string, sell, buy) => {
    setAlertVisible(true);
    setAlertID(id);
    setAlertName(name);
    setAlertStatus({ Buy_Alert: buy, Sell_Alert: sell });
  };
  const closeAlertModal = () => {
    setAlertVisible(false);
  };
  useEffect(() => {
    if (isaddWatchlistError) {
      Toast.show({
        position: 'top',
        type: 'error',
        text1: 'Watchlist Msg',
        text2: isaddWatchlistError?.data?.response,
        autoHide: true,
        visibilityTime: 4000,
      });
    }
  }, [isaddWatchlistError]);

  const WatchListUI = (props: any) => {
    const { item } = props;
    return (
      <View style={[styles.container, { position: 'relative' }]} >
        <View style={styles.header}>
          <Text allowFontScaling={false} style={styles.watchListName} numberOfLines={2}>
            {item?.name}
          </Text>
          <View style={{ alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row', width: 50, }}>
            <Menu>
              <MenuTrigger customStyles={{ triggerWrapper: { width: 50, flexDirection: 'row', justifyContent: 'flex-end' } }} >
                <FontAwesome5 name={'ellipsis-v'}
                  size={20}
                  color={'#000'} />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={style.menuOptions}>
                <MenuOption style={style.menuItem} value={2} onSelect={() => handleEdit(item?.id, item?.name, item?.description)}>
                  <View style={style.menuRow}>
                    <Image source={IMAGES.BOTTOM_TAB_ICON.edit_watchlist} style={style.menuIcon} />
                    <Text style={style.menuText}>Edit Watchlist</Text>
                  </View>
                </MenuOption>
                <MenuOption style={style.menuItem} value={3} onSelect={() => {
                  Alert.alert(
                    'Delete this Watchlist',
                    'Are you sure you want to delete this watchlist? All your data will be removed.',
                    [
                      { text: CONSTANT_TEXT.YES_DELETE, onPress: () => handleDelete(item?.id), style: 'destructive' },
                      { text: CONSTANT_TEXT.NOT_NOW },
                    ]
                  );
                }}>
                  <View style={style.menuRow}>
                    <Image source={IMAGES.BOTTOM_TAB_ICON.delete_watchlist} style={style.menuIcon} />
                    <Text style={style.menuText}>Delete Watchlist</Text>
                  </View>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity disabled>
              <Text allowFontScaling={false} style={styles.buttonText}>
                {item?.symbol?.length} Stocks
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={style.arrowContainer}
            onPress={() =>
              navigation.navigate('WatchListTable', {
                watchlist_id: item?.id,
                name: item?.name,
                description: item?.description,
              })
            }>
            <AntDesign name="arrowright" style={style.arrowIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ position: 'absolute', width: '95%', height: '80%' }}
          onPress={() =>
            navigation.navigate('WatchListTable', {
              watchlist_id: item?.id,
              name: item?.name,
              description: item?.description,
            })
          } />

      </View>
    );
  };

  const WatchlistHeader = () => {
    return (
      <>
        <View
          style={{
            position: 'absolute',
            bottom: scaleHeight(50),
            alignSelf: 'center',
          }}>
          {iswatchlistlength > 0 ? (
            <></>
          ) : (
            <View>
              <TouchableOpacity onPress={handleOpenModal}>
                <Image
                  source={IMAGES.Empty_watchList}
                  style={{ height: scaleHeight(246), width: scaleWidth(260.82), resizeMode: 'contain' }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: COLORS.PrimaryBlack,
                  textAlign: 'center',
                  fontFamily: FONTS.RobotoBold,
                  fontSize: normalizeFont(22),
                  marginBottom: scaleHeight(22),
                  marginTop: scaleHeight(132),
                }}>
                Your Watchlist Is Empty
              </Text>
              <Text
                style={{
                  color: COLORS.BorderColor,
                  textAlign: 'center',
                  fontFamily: FONTS.RobotoRegular,
                  fontSize: normalizeFont(14),
                  marginBottom: scaleHeight(55),
                }}>
                Your watchlist helps you stay updated.{'\n'}Add stocks to begin tracking.
              </Text>
            </View>
          )}
          <CommonButton
            text="Create Watchlist"
            onPress={handleOpenModal}
            paddingVertical={scaleHeight(16)}
            paddingHorizontal={scaleWidth(70)}
            borderRadius={scaleWidth(26)}
          />
        </View>
      </>
    );
  };
  const renderEmpty = () => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text allowFontScaling={false} style={{ color: COLORS.Black }}>
          No Watchlist Present...
        </Text>
      </View>
    );
  };
  const onGoBack = () => {
    goBack();
  };

  const headerRight = () => {
    if (!watchlistData?.length) return null;

    return (
      <View style={{ flexDirection: 'row', marginRight: 20, backgroundColor: '#FFF', borderRadius: 18, }}>
        <View style={style.audioWrapper}>
          <AudioPlayer audioUrl={"https://stock-help.s3.ap-south-1.amazonaws.com/wachlist+audio.mp3"} />
        </View>
        <View style={styles.headerRight}>
          <Text style={[styles.buttonText, { fontWeight: '700',marginLeft:-7,marginTop:3 }]}>
            {`${watchlistData.length} / 100`}
          </Text>
          <Popover
            from={
              <TouchableOpacity style={{marginTop:3}}>
                <AntDesign
                  name="infocirlce"
                  size={15}
                  color="#000"
                />
              </TouchableOpacity>
            }
            popoverStyle={style.popUpStyle}
          >
            <Text style={style.interText}>{'Add up to 100 Watchlist'}</Text>
          </Popover>
        </View>
      </View>

    );
  };

  return (
    <MainComponent>
      <TitleWithBackBtnHeader centerTitle="Watchlist" onPressBackArrow={onGoBack} externalStyleText={{ left: -25 }} headerRight={headerRight()} />
      {topBannerUrl && <AdvertismentComponent bannerUrl={topBannerUrl} />}
      {isloader ? (
        <Loader />
      ) : (
        <View style={styles.keyboardAvoidingView}>
          {/* <WatchlistHeader /> */}
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={watchlistData}
            renderItem={({ item }) => <WatchListUI item={item} />}
            keyExtractor={item => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#000"
                colors={['#000']}
              />
            }
          />
          <WatchlistHeader />
        </View>
      )}
      <CreateNewWatchlist //creat new watchlist modal
        isVisible={modalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveWatchList}
      />
      {!!watchlistdetail?.Name && (
        <CreateNewWatchlist //edit watchlist modal
          isVisible={editModalVisible}
          onClose={closeEditModal}
          onSave={handleEditWatchList}
          textHeader={'Edit watchlist name and description'}
          watchlistdetail={watchlistdetail}
        />
      )}
      <AlertModalPopup //add or remove alert
        isVisible={alertVisible}
        onClose={closeAlertModal}
        alertWatchlistId={alertWatchlistId}
        alertName={alertName}
        alerStatus={alerStatus}
      />
      {/* </View> */}
      {tinymcedata[0]?.screen_content && <UserGuideModal
        visible={userGuideModalVisible}
        onClose={userGuidCloseModal}
        text_content={tinymcedata[0]?.screen_content}
      />}
    </MainComponent>
  );
};
export default CreateWatchListScreen;

const style = StyleSheet.create({
  menuOptions: {
    padding: 10,
    elevation: 7,
    borderRadius: 4,
    borderColor: '#228B22'
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  audioWrapper: {
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginRight: 5
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#000'
  },
  arrowContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 2.5,
    backgroundColor: '#228B22',
  },
  arrowIcon: {
    height: 18,
    width: 18,
    borderRadius: 9,
    alignSelf: 'center',
    marginTop: 4,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  popUpStyle: {
    backgroundColor: 'black',
  },
  interText: {
    fontFamily: 'Lato-Bold',
    fontSize: 12,
    color: '#FFFFFF',
    padding: 10,
    paddingHorizontal: 20,
  },
});
