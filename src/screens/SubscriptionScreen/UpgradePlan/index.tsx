import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import MainContainer from '../../../Components/MainContainer';
import { ROUTE_NAME } from '../../../Constants/enums';
import styles from './styles';
import { Loader } from '../../../Components/Loader';
import {
  Topup_plan,
  topup_payment_order,
  topup_payment_verify,
} from '../../../apis/Onboarding/PaymentApi/CreateSubscSlice';
import UpgradePlanList from '../../../Components/FlatList/UpgradePlanList';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { navigation, popToBack } from '../../../Navigation/NavigationService';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import { getProfileData } from '../../../apis/Onboarding/authenticationSlice';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';
import analytics from '@react-native-firebase/analytics';
import { RAZORPAY_INFORMATION } from '../../../constants';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import CustomToast, { toast } from '../../../utils/toast';
import { getTrackierId, sendTrackierEvent } from '../../../Services/PushNotification/trackier';

interface UpGradePlanScreenProps {
}
interface ItemType {
  id: number;
  price: string;
}
const UpGradePlanScreen: FC<UpGradePlanScreenProps> = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const toastRef = useRef<CustomToast | null>(null);
  const paymentData = useSelector(state => state.CreateSubscSlice);

  const {
    istopup_planSuccess,
    isLoadingtopup_plan,
    isuser_subscriptionSuccess,
    istopup_payment_orderSuccess,
    isLoad,
  } = paymentData;
  const authenticationData = useSelector((state: any) => state.authentication);
  const { getProfileSuccess } = authenticationData;

  const [upgradePlandata, setUpgradePlanData] = useState([]);
  const [selectItem, setSelectItem] = useState<ItemType | null>(null);
  const [tr_id, set_tr_id] = useState<ItemType | string>(null);
  let razorpayKeyId = RAZORPAY_INFORMATION?.RAZORPAY_KEY_SECRET;

  const getProfileDetails = () => {
    AsyncStorage.getItem('userId').then(userId => {
      dispatch(
        getProfileData({
          userId: userId,
        }),
      );
    });
  };
  useEffect(() => {
    if (isFocused) {
      getProfileDetails();
    }
  }, [isFocused]);
   useEffect(() => {
      const fetchTrackierId = async () => {
        const temp_tr_id = await getTrackierId();
        if (temp_tr_id) {
          set_tr_id(temp_tr_id.toLowerCase());
        }
      };
      fetchTrackierId();
    }, []);
  useEffect(() => {
    const getDATA = async () => {
      let userid = await AsyncStorage.getItem('userId');
      if (userid) {
        dispatch(Topup_plan({ userid: userid }));
      }
    };
    getDATA();
  }, []);

  useEffect(() => {
    if (istopup_planSuccess?.response) {
      setUpgradePlanData(istopup_planSuccess?.response);
    }
  }, [istopup_planSuccess]);

  const message = (textMessage: string, status: 'success' | 'fail') => {
    let color =
      status === 'success' ? toast.color.GREEN :
        status === 'fail' ? toast.color.RED :
          toast.color.BLUE;

    toast.bottom(toastRef, textMessage, 3000, color);
  };

  const onPressNext = async () => {
    let userid = await AsyncStorage.getItem('userId');
    if (userid) {
      dispatch(
        topup_payment_order({
          userid: userid,
          amount: selectItem?.price,
          plan_id: selectItem?.id,
          currency: 'INR',
          paymentmode: 'online',
        }),
      );
    }
  };

  useEffect(() => {
    const handleVerifyPlayment = async () => {
      let userid = await AsyncStorage.getItem('userId');
      try {
        var options = {
          description: 'Thanks for paying',
          image: 'https://stockyaari.s3.ap-south-1.amazonaws.com/Payment/stockyaari_logo.jpg',
          currency: istopup_payment_orderSuccess?.response?.currency,
          key: razorpayKeyId,
          amount: istopup_payment_orderSuccess?.response?.amount.toString(),
          name: 'StockYaari',
          order_id: istopup_payment_orderSuccess?.response?.id,
          prefill: {
            email: getProfileSuccess && getProfileSuccess?.email,
            contact: getProfileSuccess && getProfileSuccess?.phoneno,
            name: getProfileSuccess && getProfileSuccess?.username,
          },
          theme: { color: '#53a20e' },
          hidden: {
            contact: true,
            email: true,
          },
        };
        RazorpayCheckout.open(options)
          .then(data => {
            message(`Success: ${data?.razorpay_payment_id}`, 'success');
            const dataobj = {
              userid: userid,
              razorpay_payment_id: data?.razorpay_payment_id,
              razorpay_order_id: data?.razorpay_order_id,
              razorpay_signature: data?.razorpay_signature,
              amount: selectItem?.price,
              user_subscription_id: isuser_subscriptionSuccess?.response?.id,
            };
            const paymentObj = {
              payment_mode: 'online',
              transaction_id: istopup_payment_orderSuccess?.user_payment_details?.id,
              topup_price: selectItem?.price,
              topup_plan_id: selectItem?.id,
            };
            var sdkID = Platform.OS === 'android' ? 'b8a312aa-4077-4467-88ea-2577e540a6a6' : '62d4fa46-3be5-421d-b24a-0265c7f099ff'
                      const trackierObj = {
                        "app_token": sdkID,
                        "tr_id": tr_id,
                        "event_id": "Q4YsqBKnzZ",
                        "ip": null,
                        "customer_uid": userid,
                        "customer_email": getProfileSuccess?.email,
                        "customer_name": getProfileSuccess?.username,
                        "customer_phone": getProfileSuccess?.phoneno,
                        "revenue": istopup_payment_orderSuccess?.response?.amount / 100,
                        "discount": null,
                        "currency": 'INR',
                        "event_value": null,
                        "gaid": null,
                        "gaid_md5": null,
                        "gaid_sha1": null,
                        "idfa": null,
                        "imei1": null,
                        "idfv": null,
                        "amazon_fire_id": null,
                        "imei2": null,
                        "mac": null,
                        "param1": null,
                        "param2": null,
                        "param3": null,
                        "param4": null,
                        "param6": null,
                        "param5": null,
                        "param7": null,
                        "param8": null,
                        "param9": null,
                        "param10": null,
                        "order_id": data?.razorpay_order_id,
                        "c_code": null,
                        "status": null,
                        "oaid": "string",
                        "oaid_md5": "string",
                        "oaid_sha1": "string",
                        "android_id": "string",
                        "android_id_md5": "string",
                        "android_id_sha1": "string",
                        "idfa_md5": "string",
                        "idfa_sha1": "string",
                        "idfv_md5": "string",
                        "idfv_sha1": "string",
                        "imei1_md5": "string",
                        "imei1_sha1": "string",
                        "imei2_md5": "string",
                        "imei2_sha1": "string",
                        "mac_md5": "string",
                        "mac_sha1": "string"
                      }
            dispatch(topup_payment_verify({ ...dataobj, ...paymentObj }));
            sendTrackierEvent(trackierObj)
            AppEventsLogger.logEvent('thankyou_event_fb', {
              status: 'Success',
              amount: paymentObj.amount,
              timestamp: new Date().toISOString()
            });
            analytics().logEvent('thankyou_event', {
              status: 'Success',
              amount: paymentObj.topup_price,
              timestamp: new Date().toISOString()
            });
            setTimeout(() => { navigation(ROUTE_NAME.PAYMENT_SUCCESS_SCREEN, { status: true }) }, 1000)
          })
          .catch(error => {
            message(`Error: ${error?.code} | ${error?.description}`, "fail");
            if (Platform.OS === 'android') {
              message('You may have cancelled the payment or there was a delay in response from the UPI app', 'fail');
            } else if (Platform.OS === 'ios') {
              message(error?.description, 'fail');
            }
            setTimeout(() => { navigation(ROUTE_NAME.PAYMENT_SUCCESS_SCREEN, { status: false }) }, 1000)

          });
      } catch (e) {
      }
    };
    if (istopup_payment_orderSuccess?.response) {
      handleVerifyPlayment();
    }
  }, [istopup_payment_orderSuccess?.response]);

  const onSelectPlan = (item: any) => {
    setSelectItem(item);
  };
  const onPressBackArrow = () => {
    popToBack();
  };

  return (
    <MainContainer>
      <TitleWithBackBtnHeader onPressBackArrow={onPressBackArrow} centerTitle="Upgrade Alert" />
      {isLoadingtopup_plan ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <CustomToast ref={toastRef} position="bottom" />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewDe}>
            <UpgradePlanList data={upgradePlandata} onSelectPlan={onSelectPlan} />
          </ScrollView>
          {selectItem && (
            <View style={styles.bottomContainer}>
              <View style={styles.gradientStyle}>
                {isLoad ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <View style={{ backgroundColor: '#228B22', height: 56, borderRadius: 15 }}>
                    <TouchableOpacity onPress={onPressNext}>
                      <Text allowFontScaling={false} style={[styles.buttonText, { paddingTop: 17 }]}>
                        Proceed with ₹ {addCommaToCurrency(selectItem?.price)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>
      )}
    </MainContainer>
  );
};
export default React.memo(UpGradePlanScreen);
