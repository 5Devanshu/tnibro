import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  ActivityIndicator,
  Alert,
  Platform,
  Linking,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import VersionCheck from 'react-native-version-check';
import SwitchToggle from 'react-native-switch-toggle';
import BackgroundTimer from 'react-native-background-timer';
import BackgroundFetch from 'react-native-background-fetch';

import { uploadFcmToken } from '../../apis/Onboarding/authenticationSlice';
import {
  getDashboardTabData,
  getScreenerData,
  resetDashboardTabData,
} from '../../apis/Onboarding/dashboardTabDataSlice';
import { scaleHeight, scaleWidth } from '../../Constants/enums/Dimensions';
import { CONSTANT_TEXT } from '../../Constants/enums/constantText';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { COLORS, StoreConstants } from '../../Constants/enums';
import DropdownComnComponent from '../../Components/DropdownComponent/DropdownComponent';
import UserGuideModal from '../../Components/Modal/UserGuideModal';
import AnnouncementBanner from './AnnouncementBanner';
import TableComponent from './TableComponent/TableComponent';
import styles from './style';
import { getTinymce } from '../../apis/Onboarding/TinymceApi/TinymceSlice';
import { StoreDataLocally, getDataFomLocalStore } from '../../Helper/DataStorage';
import { active_topup, getSubscriptionPlan } from '../../apis/Onboarding/PaymentApi/CreateSubscSlice';
import analytics from '../../Services/PushNotification/analytics';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';
import LocationBar from '../../Components/BackButton/LocationBar';

interface SelectedDataProps {
  segment?: string;
  recommend_type?: string;
  timeframe?: string;
  sector?: string;
}
interface DropdownItem {
  label1: string;
  value: string;
}
interface Tab {
  text: string;
  onPress: () => void;
}

const Dashboard: React.FC<any> = (props: any) => {
  const authenticationData = useSelector((state: any) => state.authentication);
  const dashboardTabData = useSelector((state: any) => state.dashboardTabData);
  const tickData = useSelector((state: any) => state.tickerSlice);
  const [active_PlanCode, setActive_PlanCode] = useState('');
  AsyncStorage.getItem('active_PlanCode').then(value => {
    setActive_PlanCode(value)
  });
  const isEligiblePlan = ["NEWYEAR349", "GOLD849", "ANNUAL_UPGRADE", "NEW349", "ADV4499"].includes(active_PlanCode);
  const HomeScreeneData = useSelector((state: any) => state.HomeScreenSlice);
  const { isAdvertisementBannerSuccess } = HomeScreeneData;
  const currentScreen = 'Dashboard'; // Get the current screen name
  const [bannerUrl, setBannerUrl] = useState(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [selectData, setSelectData] = useState({
    segment: 'nifty500',
    recommend_type: 'Buy',
    timeframe: 'latest',
    sector: 'all',
  });
  const [deviceDetail, setDeviceDetail] = useState({
    getUniqueId: '',
    getDeviceName: '',
    getDeviceType: '',
  });
  const [isrefreshTime, setrefreshTime] = useState({
    refreshtime: isEligiblePlan ? '3' : '15',
  });
  const [isAutoRefreshEnabled, setAutoRefreshEnabled] = useState(true); ///use for autorefreshing
  const [modalVisible, setModalVisible] = React.useState(false);

  const { istickerSuccess } = tickData;
  const { isFcmUploadError } = authenticationData;
  const {
    TabDataErrorMsg,
    isDashboardTabDataSuccess,
    isTabScreenerSaveData,
    isloader,
    noDataFound,
    emptymsg,
    isScreenerDataSuccess,
  } = dashboardTabData;
  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;
  const [TableData, setTableData] = React.useState<any[]>([]);
  const [tinymcedata, setTinymceData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);

  const getTinymceData = async () => {
    await analytics.logEvent('Screener_Screen')
    dispatch(getScreenerData());
    dispatch(getTinymce({ screen_name: 'dashboard' }));
  };
  React.useEffect(() => {
    if (isFocused) getTinymceData();
  }, [isFocused]);

  useEffect(() => {
    if (isTinymceSuccess) {
      setTinymceData(isTinymceSuccess?.response);
    }
  }, [isTinymceSuccess]);

  const timerefresh = [
    { index: '1', value: '3', label: '3-min' },
    { index: '2', value: '5', label: '5-min' },
    { index: '3', value: '15', label: '15-min' },
  ];
  const nonPrimetimerefresh = [{ index: '1', value: '15', label: '15-min' }];

  useEffect(() => {
    if (isTinymceSuccess && isclick) {
      const timer = setTimeout(() => {
        setModalVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTinymceSuccess]);

  useEffect(() => {
    // Filter the banner based on the current screen name
    const banner = isAdvertisementBannerSuccess?.response?.data.find(
      b => b.screen_name === currentScreen,
    );
    if (banner) {
      setBannerUrl(banner.screen_url);
    }
  }, [isAdvertisementBannerSuccess]);

  const userGuidCloseModal = () => {
    setModalVisible(false);
    setIsClick(false);
  };

  const getDeviceInfo = async () => {
    const UniqueId = await DeviceInfo.getUniqueId();
    const deviceName = await DeviceInfo.getDeviceName();
    const DeviceType = await DeviceInfo.getDeviceType();
    setDeviceDetail({
      getUniqueId: UniqueId,
      getDeviceName: deviceName,
      getDeviceType: DeviceType,
    });
  };
  useEffect(() => {
    getDeviceInfo();
  }, []);
  useEffect(() => {
    // Run the storeClickData function whenever the 'data' variable changes
    storeClickData();
  }, [selectData]); //data

  useEffect(() => {
    // Run the fetchSelectedData function only once when the component mounts
    fetchSelectedData();
  }, []);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      let userid = await AsyncStorage.getItem('userId');
      var trackierEvent = new TrackierEvent("AlhvwPKkWN");
      trackierEvent.param1 = isEligiblePlan === true ? 'paid_user' : 'trial_user';
      if (userid) {
        TrackierSDK.setUserId(userid);
      }
      TrackierSDK.trackEvent(trackierEvent);
      if (userid) {
        dispatch(getSubscriptionPlan({ userid: userid }));
      }
    };
    checkSubscriptionStatus();
  }, []);

  const storeClickData = async () => {
    // Function to store the clicked data in AsyncStorage
    try {
      await AsyncStorage.setItem('segment_Detail', JSON.stringify(selectData)); // Store the 'data' variable in AsyncStorage as a string
    } catch (error) { }
  };
  const fetchSelectedData = async () => {
    // Function to fetch the selected data from AsyncStorage
    try {
      const storedData = await AsyncStorage.getItem('segment_Detail'); // Retrieve the stored data from AsyncStorage
      if (storedData) {
        setSelectData(JSON.parse(storedData)); // If the stored data exists, parse it from a string to an object and update the 'data' variable
      }
    } catch (error) { }
  };
  useEffect(() => {
    getRefreshtime();
  }, []);
  const getRefreshtime = async () => {
    try {
      const storeRefresh = await getDataFomLocalStore(StoreConstants.REFRESH_TIME);
      if (storeRefresh) {
        setrefreshTime(JSON.parse(storeRefresh)); // If the stored data exists, parse it from a string to an object and update the 'data' variable
      }
    } catch (error) { }
  };
  const backgroundTask = async () => {
    let payload = {
      segment: selectData?.segment,
      recommend_type: selectData?.recommend_type,
      timeframe: selectData?.timeframe,
      sector: selectData.sector,
    };
    dispatch(getDashboardTabData(payload));
  };
  const getTimemin = (timeInterval: string) => {
    switch (timeInterval) {
      case '3':
        return 3;
      case '5':
        return 5; // 5 minutes in milliseconds
      case '15':
        return 15; // 15 minutes in milliseconds
      default:
        return 0;
    }
  };
  const startBackgroundTask = async () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: getTimemin(isrefreshTime?.refreshtime), // fetch interval in minutes
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
      },
      async taskId => {
        await backgroundTask();
        BackgroundFetch.finish(taskId);
      },
      error => { },
    );
    BackgroundFetch.start()
      .then(status => { })
      .catch(error => { });
  };
  const stopBackgroundTask = async () => {
    BackgroundFetch.stop()
      .then(() => { })
      .catch(error => { });
  };
  useEffect(() => {
    if (isAutoRefreshEnabled) {
      startBackgroundTask();
    } else {
      stopBackgroundTask();
    }
    const gettoggle = async () => {
      try {
        await StoreDataLocally(StoreConstants.REFRESH_TIME, isrefreshTime);
      } catch (error) { }
    };
    gettoggle();
  }, [isAutoRefreshEnabled, isrefreshTime]);
  const handleToggle = async () => {
    // Function to save the switch state in AsyncStorage
    setAutoRefreshEnabled(!isAutoRefreshEnabled);
    if (isAutoRefreshEnabled) {
      startBackgroundTask();
    } else {
      stopBackgroundTask();
    }
  };

  const handleRefresh = async (type: keyof SelectedDataProps, item: string) => {
    setrefreshTime({ refreshtime: item?.value });
  };
  useEffect(() => {
    const getdaataa = async () => {
      try {
        await StoreDataLocally(StoreConstants.REFRESH_TIME, isrefreshTime);
      } catch (error) { }
    };
    getdaataa();
  }, [isrefreshTime]);
  useEffect(() => {
    const loadToggleState = async () => {
      try {
        const storeRefrestState = await AsyncStorage.getItem('autoRefreshEnabled');
        if (storeRefrestState !== null) {
          setAutoRefreshEnabled(JSON.parse(storeRefrestState));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadToggleState();
  }, []);
  const getTimeinmillis = (timeInterval: string) => {
    switch (timeInterval) {
      case '3':
        return 180000;
      case '5':
        return 300000; // 5 minutes in milliseconds
      case '15':
        return 900000; // 15 minutes in milliseconds
      default:
        return 0;
    }
  };
  useEffect(() => {
    if (isAutoRefreshEnabled) {
      const interval = BackgroundTimer.setInterval(() => {
        let payload = {
          segment: selectData?.segment,
          recommend_type: selectData?.recommend_type,
          timeframe: selectData?.timeframe,
          sector: selectData.sector,
        };
        dispatch(getDashboardTabData(payload));
      }, getTimeinmillis(isrefreshTime?.refreshtime)); //9,00,000 15 mint
      return () => {
        BackgroundTimer.clearInterval(interval);
      };
    }
  }, [isAutoRefreshEnabled, selectData, isrefreshTime]);

  useEffect(() => {
    AsyncStorage.getItem('userId').then(userid => {
      let payload = {
        userid: userid,
        segment: selectData?.segment,
        recommend_type: selectData?.recommend_type,
        timeframe: selectData?.timeframe,
        sector: selectData.sector,
      };
      // dispatch(getDashboardTabData(payload)); //comment this
      dispatch(active_topup({ userid: userid }));
    });
    updateFcmToken();
  }, []);

  const updateFcmToken = async () => {
    const userid = await AsyncStorage.getItem('userId');
    const oneSignal_userId = await AsyncStorage.getItem('oneSignal_userId');
    if (
      userid &&
      oneSignal_userId &&
      deviceDetail.getDeviceName &&
      deviceDetail.getDeviceType &&
      deviceDetail.getUniqueId
    ) {
      dispatch(
        uploadFcmToken({
          userid: userid,
          notify_token: oneSignal_userId,
          device_name: deviceDetail.getDeviceName,
          device_type: deviceDetail.getDeviceType,
          device_id: deviceDetail.getUniqueId,
        }),
      );
      // dispatch(getAlert({userid: userid})); //comment this
    }
  };

  let userid, oneSignal_userId;
  useEffect(() => {
    const fcmTokenSS = async () => {
      userid = await AsyncStorage.getItem('userId');
      oneSignal_userId = await AsyncStorage.getItem('oneSignal_userId');

      if (
        userid &&
        oneSignal_userId &&
        deviceDetail.getDeviceName &&
        deviceDetail.getDeviceType &&
        deviceDetail.getUniqueId
      ) {
        dispatch(
          uploadFcmToken({
            userid: userid,
            notify_token: oneSignal_userId,
            device_name: deviceDetail.getDeviceName,
            device_type: deviceDetail.getDeviceType,
            device_id: deviceDetail.getUniqueId,
          }),
        );
      }
    };
    fcmTokenSS();
  }, [userid, oneSignal_userId, deviceDetail]);

  React.useEffect(() => {
    if (isDashboardTabDataSuccess?.status === 'success') {
      let data = isDashboardTabDataSuccess?.response;
      setTableData(data);
    }
  }, [isDashboardTabDataSuccess?.response]);

  const handleSelectedItem = (type: keyof SelectedDataProps, value: string) => {
    dispatch(resetDashboardTabData());
    setSelectData(currentState => {
      return { ...currentState, [type]: value };
    });
  };

  useEffect(() => {
    const checkAppVersion = async () => {
      try {
        let versionConfig = {};
        const currentVersion = VersionCheck.getCurrentVersion();
        const bundleId = 'org.reactjs.native.example.tnibro';
        if (Platform.OS === 'ios') {
          const packageName = await VersionCheck.getPackageName();
          const countryName = await VersionCheck.getCountry();
          versionConfig['provider'] = () =>
            fetch(
              `https://itunes.apple.com/${countryName.toLowerCase()}/lookup?bundleId=${packageName}`,
            )
              .then(r => r.json())
              .then(res => res?.results[0]?.version || currentVersion);
        }

        const latestVersion =
          Platform.OS === 'ios'
            ? await VersionCheck.getLatestVersion(versionConfig)
            : await VersionCheck.getLatestVersion({
              provider: 'playStore',
              packageName: 'com.tnibro',
              ignoreErrors: true,
            });

        if (latestVersion > currentVersion) {
          Alert.alert(
            'Update Required',
            'A new version of the app is available. Please update to continue using the app.',
            [
              {
                text: 'Update now',
                style: 'default',
                onPress: () => {
                  Linking.openURL(
                    Platform.OS === 'ios'
                      ?
                      'https://apps.apple.com/in/app/stockyaari/id1664406057'
                      : VersionCheck.getPlayStoreUrl({ packageName: 'com.tnibro' })['_j'],
                  );
                },
              },
              {
                text: 'Cancel',
                onPress: () => {
                  // Optional: Add any actions you want to perform when the user cancels the update
                },
                style: 'cancel',
              },
            ],
            { cancelable: false, onDismiss: () => { } },
          );
        } else {
          // App is up-to-date; proceed with the app
        }
      } catch (error) {
        // Handle error while checking app version
        console.error('Error checking app version:', error);
      }
    };
    checkAppVersion();
  }, []);
  useEffect(() => {
    AsyncStorage.getItem('userId').then(userid => {
      let payload = {
        userid: userid,
        segment: selectData?.segment,
        recommend_type: selectData?.recommend_type,
        timeframe: selectData?.timeframe,
        sector: selectData.sector,
      };
      dispatch(getDashboardTabData(payload));
    });
  }, [selectData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF', marginTop: Platform.OS === 'android' ? scaleHeight(10) : 0, }} >
      <LocationBar showBackIcon showAudio audioUrl={"https://stock-help.s3.ap-south-1.amazonaws.com/screenar++audio.mp3"} />
      {isEligiblePlan
        ? null
        : bannerUrl && (
          <Image
            source={{ uri: bannerUrl }}
            style={{ height: 95, width: '100%', marginTop: 8 }}
            resizeMode="cover"
          />
        )}
      <View style={{ backgroundColor: '#FFF', marginTop: 15, flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#FFF',
            paddingHorizontal: scaleWidth(30),
          }}>
          <DropdownComnComponent
            title="Segment"
            data={isEligiblePlan ? isScreenerDataSuccess?.response?.segment : isScreenerDataSuccess?.response?.segment.filter(seg => seg.value !== "mcx")}
            Value={selectData.segment}
            defaultValue="nifty500"
            height={300}
            onSelect={(segment: DropdownItem) => {
              handleSelectedItem('segment', segment?.value);
            }}
          />
          <DropdownComnComponent
            title="Sector/Category"
            height={350}
            data={isScreenerDataSuccess?.response?.sector}
            Value={selectData.sector}
            defaultValue="all"
            onSelect={(sector: DropdownItem) => {
              handleSelectedItem('sector', sector?.value);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#FFF',
            paddingHorizontal: scaleWidth(30),
            marginTop: 22,
          }}>
          <DropdownComnComponent
            title="Screener"
            height={550}
            Value={selectData.recommend_type}
            data={isScreenerDataSuccess?.response?.recommend_type}
            defaultValue="all"
            onSelect={(Recommended: DropdownItem) => {
              handleSelectedItem('recommend_type', Recommended?.value);
            }}
          />
          <DropdownComnComponent
            title="Day"
            height={550}
            Value={selectData.timeframe}
            data={isScreenerDataSuccess?.response?.timeframe}
            defaultValue="all"
            onSelect={(timeframe: DropdownItem) => {
              handleSelectedItem('timeframe', timeframe?.value);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FFF',
            paddingHorizontal: scaleWidth(30),
            marginTop: 22,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <DropdownComnComponent
            title="Screen Refresh"
            height={550}
            disable={isAutoRefreshEnabled === true ? false : true}
            Value={isrefreshTime?.refreshtime}
            data={isEligiblePlan ? timerefresh : nonPrimetimerefresh}
            defaultValue="all"
            onSelect={(Recommended: DropdownItem) => {
              handleRefresh('refreshtime', Recommended);
            }}
          />
          <View style={{ marginLeft: 15, position: 'relative', bottom: 10 }}>
            <Text style={{ marginLeft: 3, fontSize: 10, color: '#000', fontWeight: '700', padding: 3 }}>Refreshing</Text>
            <SwitchToggle
              switchOn={isAutoRefreshEnabled}
              onPress={handleToggle}
              circleColorOn="white"
              circleColorOff="white"
              backgroundColorOn={COLORS.PrimaryGreen}
              backgroundColorOff="lightgray"
              containerStyle={{
                width: scaleWidth(56),
                height: scaleHeight(28),
                borderRadius: scaleWidth(28),
                padding: 5,
              }}
              circleStyle={{
                width: scaleWidth(20),
                height: scaleHeight(20),
                borderRadius: scaleWidth(10),
              }}
            />
            <Text style={[{ marginLeft: 10, fontSize: 14, fontWeight: 'bold', position: 'absolute', color: '#FFF', marginTop: 25 }, isAutoRefreshEnabled ? { marginRight: 8 } : { marginLeft: 30 }]}>
              {isAutoRefreshEnabled ? 'ON' : 'OFF'}
            </Text>
          </View>
        </View>
        {istickerSuccess[0] && <AnnouncementBanner istickerSuccess={istickerSuccess} />}

        <View
          style={[
            styles.tableBox,
            {
              marginTop: scaleHeight(10),
              paddingLeft: scaleWidth(10),
            },
          ]}>
          {isloader ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size={CONSTANT_TEXT.LARGE} color={COLORS.LOADER_COLOR} />
              <Text style={{ color: COLORS.LOADER_COLOR, marginTop: scaleHeight(10) }}>
                Refreshing Data
              </Text>
            </View>
          ) : TabDataErrorMsg ? (
            <View style={styles.loaderContainer}>
              <Text allowFontScaling={false} style={styles.danger}>
                {TabDataErrorMsg}
              </Text>
            </View>
          ) : noDataFound ? (
            <View style={styles.loaderContainer}>
              <Image source={IMAGES.noRecord1} style={styles.rightIcon} />
              <Text allowFontScaling={false} style={styles.noDataLabel}>
                {emptymsg}
              </Text>
            </View>
          ) : (
            <TableComponent
              isdashboardScreenerSuccess={isDashboardTabDataSuccess?.response}
              isScreenerSaveData={isTabScreenerSaveData?.response}
              tableStocksData={TableData}
              setTableStockeData={setTableData}
              noDataFound={noDataFound}
              selectData={selectData}
            />
          )}
        </View>
      </View>

      {tinymcedata && tinymcedata[0]?.screen_content && <UserGuideModal
        visible={modalVisible}
        onClose={userGuidCloseModal}
        text_content={tinymcedata && tinymcedata[0]?.screen_content}
      />}
    </SafeAreaView>
  );
};

export default Dashboard;
