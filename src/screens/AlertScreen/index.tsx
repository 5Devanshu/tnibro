import { useDispatch, useSelector } from 'react-redux';
import { Alert, FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';

import { COLORS } from '../../Constants/enums/colorsEnum';
import { normalizeFont, scaleHeight } from '../../Constants/enums/Dimensions';
import IMAGES from '../../Constants/enums/ImagesEnum';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  getTotalAlert,
  deleteAlertList,
  deleteAlert,
} from '../../apis/Onboarding/totalAlertSlice';
import AlertModalPopup from './EditModal';
import { ActivityIndicator } from 'react-native';
import { CONSTANT_TEXT } from '../../Constants/enums/constantText';
import styles from './style';
import UserGuideModal from '../../Components/Modal/UserGuideModal';
import { getTinymce } from '../../apis/Onboarding/TinymceApi/TinymceSlice';
import FONTS from '../../Constants/enums/Fonts';
import { navigation } from '../../Navigation/NavigationService';
import { ROUTE_NAME, styleBase } from '../../Constants/enums';
import analytics from '../../Services/PushNotification/analytics';
import { formatDateNew } from '../../utils/dateConverter';
import { addCommaToCurrency } from '../../utils/digitCommaSeparator';


interface AlertItem {
  id: number;
  alert_active: boolean;
  symbol_id: { name: string };
  price: string;
  alert_type: string;
  timeframe: string;
  set_alert_time: string;
  triggered_alert_time: string;
}
interface RootState {
  totalalert: {
    isTotalAlertSuccess: AlertItem[];
    totalPages: number;
    moreLoading: boolean;
    isLoading: boolean;
    isTotalAlertError: boolean;
  };
  TinymceSlice: {
    isTinymceSuccess: { response: any[] };
  };
}
const AlertScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [alertData, setAlertData] = React.useState<AlertItem[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [alertId, setAlertId] = useState<number | null>(null); // use to store the edit alert id
  const [alertPrice, setAlertPrice] = useState<string>('');
  const [alertType, setAlertType] = useState<string>('');
  const [defaulTimeframe, setDefaulTimeframe] = useState<string>('');
  const [userGuideModalVisible, setuserGuideModalVisible] = React.useState<boolean>(false);
  const [tinymcedata, setTinymceData] = React.useState<any>([]);
  const [isclick, setIsClick] = React.useState<boolean>(true);

  const totalalertData = useSelector((state: any) => state.totalalert);
  const { isTotalAlertSuccess, totalPages, isLoading } = totalalertData;
  const isStarStocksScreen = useSelector((state: any) => state.HomeScreenSlice?.isStarStocksScreen);
    const paymentData = useSelector((state: any) => state.CreateSubscSlice);
    const { isPremiumUser } = paymentData;
  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;

  const getAlertList = () => {
    dispatch(getTotalAlert());
  };
  useEffect(() => {
    if (isFocused) {
      getAlertList();
    }
  }, [isFocused]);


  const getTinymceData = async () => {
    await analytics.logEvent('Alert_Screen')
    var trackierEvent = new TrackierEvent("a9sWQZrNXR");
    trackierEvent.param1 = isPremiumUser === true ? 'paid_user' : 'trial_user';
    TrackierSDK.trackEvent(trackierEvent);
    dispatch(getTinymce({ screen_name: 'alert' }));
  };
  useEffect(() => {
    getTinymceData();
  }, []);
  React.useEffect(() => {
    if (isTotalAlertSuccess) {
      setAlertData(isTotalAlertSuccess);
    }
  }, [isTotalAlertSuccess]);

  useEffect(() => {
    if (isTinymceSuccess) {
      setTinymceData(isTinymceSuccess?.response);
    }
  }, [isTinymceSuccess]);

  useEffect(() => {
    if (isTinymceSuccess && isclick) {
      const timer = setTimeout(() => {
        setuserGuideModalVisible(true);
      }, 500);
      return () => clearTimeout(timer); // Cleanup function to clear the timer
    }
  }, [isTinymceSuccess]);

  const userGuidCloseModal = () => {
    setuserGuideModalVisible(false);
    setIsClick(false);
  };
  const handleDelete = (id: number) => {
    dispatch(deleteAlertList({ alert_id: id }));
    dispatch(deleteAlert({ response: id }));
  };
  const handleEditAlert = (id: number, price: string, alert_type: string, timeframe: string) => {
    setModalVisible(true);
    setAlertId(id);
    setAlertPrice(price);
    setAlertType(alert_type);
    setDefaulTimeframe(timeframe);
  };

  const closeEditModal = () => {
    setModalVisible(false);
  };

  function formatAlertPrice(alert_type, alert_price, alert_active) {
    if (!alert_price) {
      return '-';
    }

    if (alert_type === 'Price Alert') {
      return  addCommaToCurrency(alert_price);
    }

    if ((alert_type === 'Sell Alert' || alert_type === 'Buy Alert') && alert_active) {
      return '-';
    } else {
      return alert_price;
    }
  }
  const Header = () => {
    return (
      <View>
        <View style={styleBase.inrowspaceBetween}>
          <TouchableOpacity
            onPress={() => navigation(ROUTE_NAME.USER_TRIGGER_ALERT)}
            style={{ alignSelf: 'flex-end' }}>
            <View style={styles.triggeredStocksButton}>
              <Text style={styles.triggeredStocksText}>ALL Triggered Alerts</Text>
            </View>
          </TouchableOpacity>
          {isStarStocksScreen && (
            <TouchableOpacity onPress={() => navigation(ROUTE_NAME.STAR_ALERT_TRIGGER_SCREEN)}>
              <View style={styles.triggeredStocksButton}>
                <Text style={styles.triggeredStocksText} allowFontScaling={false}>
                  Star Stocks Triggered Alerts
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <Text
          style={{
            color: '#2C362C',
            fontFamily: FONTS.RobotoRegular,
            marginBottom: 16,
            fontSize: normalizeFont(15),
          }}>
          {CONSTANT_TEXT.TOTAL_ALERTS} : {totalPages}
        </Text>
      </View>
    );
  };
  const AlertCart = React.memo((props: any) => {
    const { item } = props;
    return (
      <>
        <View
          style={[
            styles.item_Container,
            {
              backgroundColor: item?.alert_active === true ? '#F8FFEF' : '#fff6f8',
              borderLeftColor: item?.alert_active === true ? COLORS.PrimaryGreen : '#f35a4d',
            },
          ]}>
          <View style={styles.item_Content}>
            <View style={styles.Alertactive_container}>
              <Image
                source={item?.alert_active === true ? IMAGES.EllipseGreen : IMAGES.EllipseRed}
                style={styles.image_EllipseGreen}
              />
              <Text allowFontScaling={false} style={styles.text_alert_Active}>
                {item?.alert_active === true ? 'Alert Active' : 'Alert Trigerred'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              {item?.alert_active && (
                <TouchableOpacity style={{ marginRight: 5 }}
                  onPress={() => {
                    handleEditAlert(item?.id, item?.price, item?.alert_type, item?.timeframe); ///working on this
                  }}>
                  <Icon name="edit" size={20} color="#4CAF50" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Delete this Alert',
                    'Are you sure you want to delete this alert? All your data will be removed.',
                    [
                      {
                        text: CONSTANT_TEXT.YES_DELETE,
                        onPress: () => handleDelete(item?.id),
                        style: 'destructive',
                      },
                      {
                        text: CONSTANT_TEXT.NOT_NOW,
                      },
                    ],
                  );
                }}>
                <Icon name="delete" size={20} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>

          <Text allowFontScaling={false} style={styles.symbol_name}>
            {item?.symbol_id?.name}
          </Text>
          <View style={styles.AlertPrice_container}>
            <View
              style={[
                styles.AlertPrice_Content,
                {
                  borderColor: item?.alert_active === true ? COLORS.PrimaryGreen : '#f35a4d',
                },
              ]}>
              <Text allowFontScaling={false} style={styles.alertPrice}>
                Alert Price
              </Text>
              <Text allowFontScaling={false} style={styles.txt_Price}>
                {formatAlertPrice(item.alert_type, item.price, item.alert_active)}
              </Text>
            </View>

            <View
              style={[
                styles.AlertPrice_Content,
                {
                  borderColor: item?.alert_active === true ? COLORS.PrimaryGreen : '#f35a4d',
                },
              ]}>
              <Text allowFontScaling={false} style={styles.alertPrice}>
                Alert Type
              </Text>
              <Text allowFontScaling={false} style={styles.txt_Price}>
                {item?.alert_type && item?.alert_type === 'Sell Alert' ? 'Red Alert' : ''}
                {item?.alert_type && item?.alert_type === 'Buy Alert' ? 'Green Signal' : ''}
                {item?.alert_type && item?.alert_type === 'Price Alert' ? 'Price Alert' : ''}
              </Text>
            </View>
          </View>
          <Text allowFontScaling={false} style={styles.text_AlertSet}>
            Alert Set On:{'  '}
            <Text allowFontScaling={false} style={styles.text_alertTime}>
              {item?.set_alert_time ? formatDateNew(item?.set_alert_time) : '-'}
            </Text>
          </Text>
          {!item?.alert_active && (
            <Text allowFontScaling={false} style={styles.text_AlertSet}>
              Alert Triggered On:
              <Text allowFontScaling={false} style={styles.text_alertTime}>
                {item?.triggered_alert_time}
              </Text>
            </Text>
          )}
        </View>
      </>
    );
  });

  const renderEmpty = () => {
    return (
      <View style={styles.flex}>
        <View style={styles.emptyView}>
          <Image source={IMAGES.noRecord1} style={{ marginTop: 50, resizeMode: 'contain', height: 200, width: 200 }} />
          <Text
            allowFontScaling={false}
            style={{
              color: COLORS.Black,
              marginTop: scaleHeight(20),
              fontFamily: FONTS.RobotoRegular,
              fontSize: normalizeFont(22),
            }}>
            {CONSTANT_TEXT.NO_ALERT}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      {isLoading ? (
        <View style={styles.loader_Container}>
          <ActivityIndicator size={CONSTANT_TEXT.LARGE} color="blue" />
        </View>
      ) : (
        <View style={styles.list_Container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={alertData}
            contentContainerStyle={{paddingBottom:50}}
            keyExtractor={item => item.id}
            ListHeaderComponent={<Header />}
            renderItem={({ item }) => <AlertCart item={item} />}
            ListEmptyComponent={renderEmpty}
          />
        </View>
      )}
      <AlertModalPopup
        isVisible={modalVisible}
        onClose={closeEditModal}
        alertId={alertId}
        alertPrice={alertPrice}
        defaultalertType={alertType}
        defaulTimeframe={defaulTimeframe}
        setAlertData={setAlertData}
      />
      {tinymcedata[0]?.screen_content && <UserGuideModal
        visible={userGuideModalVisible}
        onClose={userGuidCloseModal}
        text_content={tinymcedata[0]?.screen_content}
      />}
    </SafeAreaView>
  );
};
export default AlertScreen;
