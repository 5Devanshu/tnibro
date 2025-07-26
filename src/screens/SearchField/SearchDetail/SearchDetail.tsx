import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../../../Constants/enums/colorsEnum';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import { useDispatch, useSelector } from 'react-redux';
import { CONSTANT_TEXT } from '../../../Constants/enums/constantText';
import PriceAlertPopup from '../../../Components/PriceAlertModal';
import { deleteAlert, getAlert } from '../../../apis/Onboarding/authenticationSlice';
import { postSearchDetail } from '../../../apis/Onboarding/SearchSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { normalizeFont, scaleHeight, scaleWidth } from '../../../Constants/enums/Dimensions';
import styles from './style';
import { handleWebViewLink } from '../../../utils/linkings';
import { navigation, goBack } from '../../../Navigation/NavigationService';
import { ROUTE_NAME, styleBase } from '../../../Constants/enums';
import LinearGradient from 'react-native-linear-gradient';
import FONTS from '../../../Constants/enums/Fonts';
import MainContainer from '../../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import UserGuideModal from '../../../Components/Modal/UserGuideModal';
import { getTinymce } from '../../../apis/Onboarding/TinymceApi/TinymceSlice';
import AdvertismentComponent from '../../../screens/HomeScreen/AdvertismentComponent';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';
import { Loader } from '../../../Components/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import analytics from '../../../Services/PushNotification/analytics';
import { showSubscriptionAlert } from '../../../utils/showSubscriptionAlert';

interface SearchDetailProps {
  // navigation: any;
  route: any;
}
const SearchDetailScreen: React.FC<SearchDetailProps> = ({ route }) => {
  const { segment, symbol } = route.params;
  const dispatch = useDispatch();
  const searchDetailData = useSelector(state => state.searchfield);
  const { isSearchDetailSuccess, isloader, isSearchDetailError } = searchDetailData;
  const SearchData = isSearchDetailSuccess?.response?.data;
  const parsedObject1 = SearchData && JSON.parse(SearchData?.week_volume_compare);
  const parsedObject = SearchData && JSON.parse(SearchData?.year_low);
  const parsedObject3 = SearchData && JSON.parse(SearchData?.year_high);
  const authenticationData = useSelector((state: any) => state.authentication);
  const { isGetAlertSuccess, isdeleteAlertSuccess } = authenticationData;
  const [stockDetail, setStockDetail] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [activeSymbol, setActiveSymbol] = useState<string>('');
  const [activePrice, setActivePrice] = useState<any>('');
  const [symbolId, setSymbolId] = useState<number>();
  const [showPriceDialog, setShowPriceDialog] = useState<boolean>(false);
  const [defaultData, setDefaultData] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [showbackTesting, setShowBackTesting] = useState(false);
  const today = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState(today); /// use for selected date
  const [startedDate, setStartedDate] = useState(today); //startDate// use to show current date and
  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;
  const [userGuideModaVisible, setUserGuideModalVisible] = React.useState(false);
  const [tinymcePopUpdata, setTinymcePopUpData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);
  const HomeScreeneData = useSelector((state: any) => state.HomeScreenSlice);
  const { isAdvertisementBannerSuccess } = HomeScreeneData;
  const [topBannerUrl, setTopBannerUrl] = React.useState(null);
  const BannerScreenName = 'detailpage';
  const [active_PlanCode, setActive_PlanCode] = useState('');
  AsyncStorage.getItem('active_PlanCode').then(value => {
    setActive_PlanCode(value)
  });
  const isEligiblePlan = ["NEWYEAR349", "GOLD849", "ANNUAL_UPGRADE", "NEW349", "BASIC179", "ADV4499"].includes(active_PlanCode);

  useEffect(() => {
    handleSearchData();
  }, []);

  const handleSearchData = () => {
    dispatch(postSearchDetail({ symbol: symbol, segment: segment, timeframe: formattedDate }));
  };

  const getTinymceData = async () => {
    await analytics.logEvent('Detail_page_Screen')
    dispatch(getTinymce({ screen_name: 'detailpage' }));
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
  React.useEffect(() => {
    // Filter the banner based on the current screen name
    const banner = isAdvertisementBannerSuccess?.response?.data.find(
      b => b.screen_name === BannerScreenName,
    );
    if (banner) {
      setTopBannerUrl(banner);
    }
  }, [isAdvertisementBannerSuccess]);

  const handleOnPressStartDate = () => {
    ///open the calender
    setOpen(true);
  };
  const searchDate = new Date();
  const formattedDate = moment(searchDate).format('YYYY-MM-DDTHH:mm:ss');

  React.useEffect(() => {
    if (isSearchDetailSuccess) {
      setStockDetail(isSearchDetailSuccess?.response?.data);
    }
  }, [isSearchDetailSuccess]);

  const handleCloseModal = date => {
    const newFORMATTED_DATE = moment(date, 'YYYY/MM/DD').format('YYYY-MM-DDTHH:mm:ss');
    // on close date calendar
    dispatch(postSearchDetail({ symbol: symbol, segment: segment, timeframe: newFORMATTED_DATE })); //date dispatch
  };
  const updateAlerts = async () => {
    const userid = await AsyncStorage.getItem('userId');
    if (userid) {
      dispatch(getAlert({ userid: userid }));
    }
  };
  function formatdDate(date: string): string {
    return moment(date).format('MMM D,YYYY');
  }
  useEffect(() => {
    //use this for showing alerts when the page is load
    AsyncStorage.getItem('userId').then(userid => {
      dispatch(getAlert({ userid }));
    });
  }, [getAlert]);

  useEffect(() => {
    if (isdeleteAlertSuccess === 'alert successfully deleted') {
      updateAlerts();
      setDefaultData(null);
    }
  }, [isdeleteAlertSuccess]);
  const handleAlertSubscribe = (data: any, symbol_id: number) => {
    setActivePrice(SearchData?.CMP);
    setActiveSymbol(data);
    setSymbolId(symbol_id);
    setShowPriceDialog(true);
  };
  const onCancelAlert = () => {
    setShowPriceDialog(false);
  };
  const showAlertIcon = isGetAlertSuccess
    .map((item: any) => item.symbol_id)
    .includes(SearchData?.symbol_id);

  const handleDeleteAlert = () => {
    const handledelete = isGetAlertSuccess.find(
      (item: any) => item.symbol_id == SearchData?.symbol_id,
    );
    setActiveSymbol(SearchData?.symbol_id);
    onRefresh();
    dispatch(deleteAlert({ id: handledelete?.id }));
  };

  const handleAlertEdit = () => {
    const handleEdit = isGetAlertSuccess.find(
      (item: any) => item.symbol_id == SearchData?.symbol_id,
    );
    setActiveSymbol(SearchData?.symbol);
    setDefaultData(handleEdit);
    setShowPriceDialog(true);
  };
  const onRefresh = useCallback(() => {
    const newFORMATTED_DATE = moment(startedDate, 'YYYY/MM/DD').format('YYYY-MM-DDTHH:mm:ss');
    setRefreshing(true);
    dispatch(postSearchDetail({ symbol: symbol, segment: segment, timeframe: newFORMATTED_DATE }));
    AsyncStorage.getItem('userId').then(userid => {
      dispatch(getAlert({ userid }));
    });
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulating a 1-second delay for demonstration purposes
  }, []);

  const formatDateTime = (dateString) => {
    if (!dateString) return "--"; // Handle null or undefined cases
    const [year, month, day] = dateString.split("-"); // Split by "-"
    return `${day}-${month}-${year}`; // Rearrange to DD-MM-YYYY
  };

  function formatDate(date: string): string {
    return moment(date, 'YYYY/MM/DD').format('dddd, MMM D, YYYY');
  }

  const HeaderCard = ({ item }) => {

    const CategoryCard = item => {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {item?.item?.category_indices
            ?.filter(cat => cat != 'all')
            ?.map(category => (
              <View style={styles.tag}>
                <Text style={styles.tagText} allowFontScaling={false}>
                  {category}
                </Text>
              </View>
            ))}
        </View>
      );
    };

    const data = [
      {
        id: 1,
        text: ` ${item?.recommended?.recommendation_signal === 'Buy' ? 'Green Signal' : 'Red Alert'} given on \n ${formatDateTime(item?.recommended?.date)} at `,
        image: item?.recommended?.recommendation_signal === 'Buy' ? IMAGES.Notification : IMAGES.RedNotification,
        value: `${addCommaToCurrency(item?.recommended?.buyprice) || addCommaToCurrency(item?.recommended?.sellprice) || '--'}`,
        color:
          item?.recommended?.recommendation_signal === 'Buy'
            ? COLORS.Binance_green
            : COLORS.Binance_red,
      },
      {
        id: 2,
        text: ` ${item?.recommended?.recommendation_signal === 'Buy' ? 'High' : 'Low'} made after \n our ${item?.recommended?.recommendation_signal === 'Buy' ? 'Green Signal' : 'Red Alert'}`,
        image: item?.recommended?.recommendation_signal === 'Buy' ? IMAGES.Swap : IMAGES.SwapDown,
        value: `${addCommaToCurrency(item?.recommended?.low) || addCommaToCurrency(item?.recommended?.high) || '--'}`,
        color: COLORS.Binance_green
      },
      {
        id: 3,
        text: ` GAIN / SAVE`,
        image: IMAGES.Chart,
        value: `${item?.recommended?.pct || '--'}`,
        color: COLORS.Binance_green,
        tintcolor: item?.recommended?.recommendation_signal === 'Buy'
          ? COLORS.Binance_green
          : COLORS.Binance_red,
        tintimage: item?.recommended?.color === "red"
          ? IMAGES.Down_Arrow
          : IMAGES.Up_Arrow
      }
    ];

    return (
      <SafeAreaView>
        <View
          style={{
            marginTop: 20,
            backgroundColor: COLORS.PrimaryWhite,
            marginHorizontal: scaleWidth(20),
            borderRadius: 16,
            paddingVertical: scaleHeight(12),
            paddingHorizontal: scaleWidth(13),
            borderWidth: 0.5,
            borderColor: '#228B22'
          }}>
          {/* Symbol Name */}
          <View style={[styleBase.inRow, { justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Text allowFontScaling={false} style={styles.SymbolName}>
                {item?.symbol.replace('%26', '&')}
              </Text>
              {isSearchDetailSuccess?.response?.isStar && (
                <Image
                  source={IMAGES.STAR_ICON}
                  style={{ height: scaleHeight(18), width: scaleWidth(18), marginLeft: scaleWidth(5), resizeMode: 'contain' }}
                />
              )}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() => handleWebViewLink(stockDetail?.symbol)}
                style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <AntDesign
                  name={'barschart'}
                  size={22}
                  color={'#000'}
                />
              </TouchableOpacity>
              {isEligiblePlan && <Menu>
                <MenuTrigger >
                  <Image
                    source={IMAGES.BOTTOM_TAB_ICON.AlertIcon}
                    style={{ resizeMode: 'contain', height: 24, width: 22, marginRight: 10 }}
                  />
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={style.menuOptions}>
                  {!showAlertIcon && <MenuOption style={style.menuItem} value={1} onSelect={() => handleAlertSubscribe(stockDetail?.symbol, stockDetail?.symbol_id)}>
                    <View style={style.menuRow}>
                      <Image source={IMAGES.Addalert} style={style.menuIcon} />
                      <Text style={style.menuText}>Add Alerts</Text>
                    </View>
                  </MenuOption>}
                  {showAlertIcon && <MenuOption style={style.menuItem} value={2} onSelect={() => handleAlertEdit()}>
                    <View style={style.menuRow}>
                      <Image source={IMAGES.Edit_Notification} style={style.menuIcon} />
                      <Text style={style.menuText}>Edit Alerts</Text>
                    </View>
                  </MenuOption>}
                  {showAlertIcon && <MenuOption style={style.menuItem} value={3} onSelect={() => handleDeleteAlert()}>
                    <View style={style.menuRow}>
                      <Image source={IMAGES.Kill_Notification} style={style.menuIcon} />
                      <Text style={style.menuText}>Delete Alerts</Text>
                    </View>
                  </MenuOption>}
                </MenuOptions>
              </Menu>}
            </View>
          </View>
          {/* Company Name */}
          <Text
            style={{
              marginTop: scaleHeight(5),
              fontSize: normalizeFont(13),
              color: COLORS.BorderColor,
              fontWeight: '700',
              fontFamily: FONTS.RobotoRegular,
            }}
            allowFontScaling={false}>
            {item?.company_name}
          </Text>
          {/* Recent Performance */}
          <LinearGradient colors={['#4BD874', '#2E8447']} style={styles.lineaGradient}>
            <TouchableOpacity
              style={styles.PerformanceContainer}
              onPress={() =>
                navigation(ROUTE_NAME.STOCK_PREDICTIONS, {
                  symbol_id: isSearchDetailSuccess?.response?.data?.symbol_id,
                  symbol: symbol,
                })
              }>
              <Image source={IMAGES.RecentperIcon} style={styles.performanceIcon} />
              <Text style={styles.TextRecent} allowFontScaling={false}>
                Recent Performance Of Green Signal
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Sectors */}
          <View style={styles.HoldView}>
            <View style={{ width: Boolean(item?.recommended?.hold) ? '80%' : '100%' }}>
              <CategoryCard item={item} />
            </View>
            {item?.recommended?.hold === 'true' && (
              <View>
                <Image resizeMode="contain" style={styles.HoldImage} source={IMAGES.Hold_Icon} />
              </View>
            )}
          </View>
          {/* Gray Area */}
          {Boolean(isSearchDetailSuccess?.response?.is_grey) && (
            <View style={styles.greyContainer}>
              <Text style={styles.txtgreyarea} allowFontScaling={false}>
                Gray Signal : {isSearchDetailSuccess?.response?.gray_text}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: COLORS.PrimaryWhite,
            paddingHorizontal: scaleWidth(20),
            paddingVertical: scaleHeight(14),
            paddingBottom: 0,
          }}
        >
          {data.map((item) => {
            return (
              <View
                key={item.id}
                style={{
                  backgroundColor: COLORS.PrimaryBackGround,
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                  borderRadius: 8,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={item.image}
                    style={{ height: 20, width: 20, resizeMode: "contain" }}
                  />
                  <Text
                    style={{
                      paddingLeft: 10,
                      fontSize: 13,
                      color: "#000",
                      fontWeight: "700",
                    }}
                  >
                    {item.text}
                  </Text>
                </View>
                {!isEligiblePlan ? <View>
                  <TouchableOpacity onPress={() => {
                    showSubscriptionAlert();
                  }}>
                    <Image
                      style={{ resizeMode: 'contain', height: 50, width: 98 }}
                      source={IMAGES.SUBSCRIPTION_LOCK.LOCKICON_RECTANGLE}
                    />
                  </TouchableOpacity>
                </View> :
                  <View style={{
                    backgroundColor: COLORS.PrimaryWhite,
                    borderRadius: 6,
                    paddingVertical: scaleHeight(11),
                    paddingHorizontal: scaleWidth(15),
                    maxWidth: 150
                  }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      {item.id == 3 &&
                        (
                          <Image
                            source={item?.tintimage}
                            style={{
                              width: 10,
                              height: 10,
                              marginTop: 3,
                              marginRight: 3,
                              resizeMode: 'contain',
                              tintColor: item.tintcolor,
                            }}
                          />
                        )}
                      <Text
                        style={{
                          color: item.color,
                          fontSize: normalizeFont(14),
                          fontWeight: "700",
                        }}
                      >
                        {item?.value}
                      </Text>
                    </View>
                  </View>}
              </View>
            );
          })}
        </View>

        {/* Back Testing */}
        <View style={{ marginHorizontal: scaleWidth(30) }}>
          <Text allowFontScaling={false} style={styles.backtesting}>
            Back Testing
          </Text>
          <View style={styles.backtestingcontainer}>
            <TouchableWithoutFeedback onPress={handleOnPressStartDate}>
              <Image
                alt=""
                style={styles.calendarIcon}
                source={IMAGES.calendar}
              />
            </TouchableWithoutFeedback>
            <Text allowFontScaling={false} style={styles.backtesingDes}>
              {CONSTANT_TEXT.BACK_TESING_DEC}
            </Text>
          </View>
          {showbackTesting && (
            <View
              style={{
                marginTop: scaleHeight(20),
              }}>
              <View style={styles.Reccom_View}>
                <Text allowFontScaling={false} style={styles.txt_SignalSince}>
                  Our Signal On{' '}
                </Text>
                <Text allowFontScaling={false} style={styles.recommendationDate}>
                  {formatDate(selectedStartDate)}
                </Text>
              </View>
              <View style={styles.Reccom_View}>
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.Txtrecommendation_Signal,
                    {
                      color:
                        isSearchDetailSuccess?.response?.recommendation?.recommendation_signal ===
                          'Buy'
                          ? '#339502'
                          : COLORS.Binance_red,
                    },
                  ]}>
                  {'  '}
                  {isSearchDetailSuccess?.response?.recommendation?.recommendation_signal === 'Buy'
                    ? 'Green Signal'
                    : 'Red Alert'}
                </Text>
                <Text> {'  '}</Text>
              </View>
            </View>
          )}
          {showbackTesting && (
            <View style={{ marginTop: scaleHeight(8), marginBottom: scaleHeight(10) }}>
              <Text allowFontScaling={false} style={styles.txt_SignalSince}>
                We're giving{' '}
                <Text
                  allowFontScaling={false}
                  style={[
                    styles.Txtrecommendation_Signal,
                    {
                      color:
                        isSearchDetailSuccess?.response?.recommendation?.recommendation_signal ===
                          'Buy'
                          ? '#339502'
                          : COLORS.Binance_red,
                    },
                  ]}>
                  {isSearchDetailSuccess?.response?.recommendation?.recommendation_signal === 'Buy'
                    ? 'Green Signal'
                    : 'Red Alert'}
                </Text>
              </Text>
              <View style={styles.Reccom_View}>
                <Text allowFontScaling={false} style={styles.txt_SignalSince}>
                  since:
                </Text>
                {isSearchDetailError ? (
                  <Text style={[styles.TxtNoResult2]}>Date is out of range</Text>
                ) : (
                  <View style={styles.Reccom_View}>
                    <Text allowFontScaling={false} style={styles.recommendationDate}>
                      {' '}
                      {formatDate(isSearchDetailSuccess?.response?.recommendation?.date)}
                    </Text>
                    <Text style={styles.txt_SignalSince}>
                      {'  '}at{' '}
                      {isSearchDetailSuccess?.response?.recommendation?.buyprice ||
                        isSearchDetailSuccess?.response?.recommendation?.sellprice}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  };

  const ContentDetail: React.FC<{
    Detail: string;
    Value: string | number;
    check: boolean | string;
    percent: number;
    colors?: string;
  }> = ({ Detail, Value, check, percent, colors = '' }) => {
    return (
      <>
        <View style={styles.Maincontainer}>
          <Text allowFontScaling={false} style={styles.DetailText}>
            {Detail}
          </Text>
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text allowFontScaling={false} style={styles.textValue}>
                {Value}
              </Text>
              {check && (
                <Text
                  allowFontScaling={false}
                  style={{
                    paddingVertical: scaleHeight(6),
                    color: colors,
                    fontSize: normalizeFont(14),
                  }}>
                  {'  '}
                  {percent}%
                </Text>
              )}
            </View>
            {check === 'high' && (
              <>
                <Text
                  allowFontScaling={false}
                  style={{ fontSize: normalizeFont(11), fontStyle: 'italic', color: '#000' }}>
                  {parsedObject3?.year_high_gap_pcnt}
                  {parsedObject3?.year_high_gap_pcnt > 0 && '%'} Away from 52 Weeks High
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    textAlign: 'right',
                    fontSize: normalizeFont(14),
                    color: '#000',
                    letterSpacing: -0.28,
                    fontWeight: '500',
                  }}>
                  {' '}
                  0-{parsedObject3?.year_high_day_ago}
                  {parsedObject3?.year_high_day_ago >= 0
                    ? CONSTANT_TEXT.DAYS_AGO
                    : CONSTANT_TEXT.BLANK_FIELD}
                </Text>
              </>
            )}
            {check === 'low' && (
              <>
                <Text
                  allowFontScaling={false}
                  style={{ fontSize: 11, fontStyle: 'italic', color: '#000' }}>
                  {parsedObject?.year_low_gap_pcnt}
                  {parsedObject?.year_low_gap_pcnt && '%'} Away from 52 Weeks Low
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    textAlign: 'right',
                    fontSize: 14,
                    color: '#000',
                    letterSpacing: -0.28,
                    fontWeight: '500',
                  }}>
                  {' '}
                  0-{parsedObject?.year_low_day_ago}
                  {parsedObject?.year_low_day_ago >= 0
                    ? CONSTANT_TEXT.DAYS_AGO
                    : CONSTANT_TEXT.BLANK_FIELD}
                </Text>
              </>
            )}
          </View>
        </View>
      </>
    );
  };
  const GoBack = () => {
    goBack();
  };
  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle="Details" onPressBackArrow={GoBack} />

      {isloader ? (
        <View style={styles.ActivityIndicator}>
          <Loader />
        </View>
      ) : isSearchDetailError ? (
        <View style={styles.loaderContainer}>
          <Text allowFontScaling={false} style={styles.danger}>
            No results found
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#000"
              colors={['#000']}
            />
          }>
          <View style={styles.container}>
            {topBannerUrl && <AdvertismentComponent bannerUrl={topBannerUrl} />}
            <HeaderCard item={stockDetail} />
            <View style={styles.stockDetailContainer}>
              {/* <ContentDetail Detail={'CURRENT PRICE'} Value={stockDetail?.CMP} /> */}
              <ContentDetail
                Detail={'% CHANGE'}
                check={true}
                percent={stockDetail?.pChange}
                colors={stockDetail?.pChange >= 0 ? COLORS.Binance_green : COLORS.Binance_red}
              />
              <ContentDetail
                Detail={'VOL %'}
                Value={[addCommaToCurrency(stockDetail?.volume)]}
                check={true}
                percent={stockDetail?.pvolumeChange}
                colors={stockDetail?.pvolumeChange >= 0 ? COLORS.Binance_green : COLORS.Binance_red}
              />
              <ContentDetail
                Detail={' 7 DAYS AVG VOL %'}
                Value={[addCommaToCurrency(parsedObject1?.volume)]}
                check={true}
                percent={parsedObject1?.volume_pcnt}
                colors={parsedObject1?.volume_pcnt >= 0 ? COLORS.Binance_green : COLORS.Binance_red}
              />
              <ContentDetail
                Detail={'10 DAYS AVG\nVOL %'}
                Value={[addCommaToCurrency(stockDetail?.ten_days_avgVolume)]}
                check={true}
                percent={stockDetail?.ten_days_avg_pChange}
                colors={
                  stockDetail?.ten_days_avg_pChange >= 0 ? COLORS.Binance_green : COLORS.Binance_red
                }
              />
              <ContentDetail
                Detail={'VOL GREATEST'}
                Value={[
                  stockDetail?.volume_greatest,
                  stockDetail?.volume_greatest > 0 ? CONSTANT_TEXT.DAYS_AGO : CONSTANT_TEXT.DAY_AGO,
                ]}
              />
              <ContentDetail
                Detail={'PREVIOUS DAY\nCANDLESTICK PATTERN'}
                Value={[stockDetail?.previous_pattern]}
              />
              <ContentDetail
                Detail={'CURRENT CANDLESTICK\nPATTERN'}
                Value={[stockDetail?.pattern]}
              />
              <ContentDetail Detail={'OPEN'} Value={[addCommaToCurrency(stockDetail?.open)]} />
              <ContentDetail Detail={'HIGH'} Value={[addCommaToCurrency(stockDetail?.high)]} />
              <ContentDetail Detail={'LOW'} Value={[addCommaToCurrency(stockDetail?.low)]} />
              <ContentDetail Detail={'PREV CLOSE'} Value={[addCommaToCurrency(stockDetail?.previous_close)]} />
              <ContentDetail
                Detail={`52 Weeks High\nmade ${parsedObject3?.year_high_day_ago} days ago.`}
                Value={[addCommaToCurrency(parsedObject3?.year_high) || CONSTANT_TEXT.BLANK_FIELD]}
                check="high"
              />
              <ContentDetail
                Detail={`52 Weeks Low\nmade ${parsedObject?.year_low_day_ago} days ago.`}
                Value={[addCommaToCurrency(parsedObject?.year_low) || '---']}
                check="low"
              />
            </View>
            {showPriceDialog ? ( // open modal when we click on bell icon
              <PriceAlertPopup
                isVisible={showPriceDialog} //// show modal
                onCancel={onCancelAlert}
                symbol={activeSymbol} //send symbol
                defaultPrice={activePrice} //send cmp current market price
                defaultData={defaultData}
                symbolId={symbolId} // send symbol id
                ischeck={true}
                onRefresh={onRefresh}
              />
            ) : null}
            <DatePicker
              mode="date"
              modal
              open={open}
              maximumDate={new Date()}
              date={startedDate}
              onConfirm={date => {
                setOpen(false);
                setSelectedStartDate(date);
                handleCloseModal(date);
                setShowBackTesting(true);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
        </ScrollView>
      )}
      {tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content && <UserGuideModal
        visible={userGuideModaVisible}
        onClose={userGuidCloseModal}
        text_content={tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content}
      />}
    </MainContainer>
  );
};

export default SearchDetailScreen;

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
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#000'
  },
});
