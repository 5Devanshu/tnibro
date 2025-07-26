import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import { ROUTE_NAME, normalizeFont, styleBase } from '../../Constants/enums';
import styles from './styles';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { goBack, navigation } from '../../Navigation/NavigationService';
import {
  PaymentOrder,
  PaymentVerify,
  resetCoupon,
  resetSubscriptionState,
  resetTopup,
  subscription_plan,
} from '../../apis/Onboarding/PaymentApi/CreateSubscSlice';
import { Loader } from '../../Components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';
import {
  editProfileData,
  editProfileReset,
  getProfileData,
} from '../../apis/Onboarding/authenticationSlice';
import RazorpayCheckout from 'react-native-razorpay';
import UpdateProfileField from '../../Components/Modal/UpdateProfileField';
import SubscriptionAgreementText from '../../Components/DisclamerContainer/PrivacyPolicy';
import SubscriptionPlanContainer from './CustomComponent/SubscriptionPlanContainer';
import BillContainer from './CustomComponent/BillContainer';
import { addCommaToCurrency } from '../../utils/digitCommaSeparator';
import analytics, { settings } from '@react-native-firebase/analytics';
import { RAZORPAY_INFORMATION } from '../../constants';
import { AppEventsLogger } from 'react-native-fbsdk-next';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import BannerCarousel from '../HomeScreen/Banner';
import CustomToast, { toast } from '../../utils/toast';
import { getTrackierId, sendTrackierEvent } from '../../Services/PushNotification/trackier';
import CouponPopUp from './CouponScreen/couponPop';

interface ItemType {
  coupon_code: string;
  final_report: object;
  final_amount: number;
}
const SubscriptionScreen: FC<SubscriptionScreenProps> = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  let razorpayKeyId = RAZORPAY_INFORMATION?.RAZORPAY_KEY_SECRET;
  const currency = 'INR';
  const toastRef = useRef<CustomToast | null>(null);
  const paymentData = useSelector((state: any) => state.CreateSubscSlice);
  const { issubscription_planSuccess, isLoadingsubscription_plan, ispaymentOrderSuccess, isLoading } =
    paymentData;
  const [active_PlanCode, setActive_PlanCode] = useState('');
  AsyncStorage.getItem('active_PlanCode').then(value => {
    setActive_PlanCode(value)
  });

  const authenticationData = useSelector((state: any) => state.authentication);
  const { getProfileSuccess, editProfileSuccess, deepLinkState } =
    authenticationData;

  const [couponcode, setCouponCode] = useState<ItemType | null>(null);
  const [planDetail, setPlanDetail] = useState(); /// api plaan data response
  const [selectPlan, setSelectPlan] = useState(null); // on click select plan code,
  const [planListItem, setPlanListItem] = useState(null); /// listing item  description (alerts,ads)
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(true); // Track the checkbox state
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [user_id, setUser_id] = useState(false);
  const [tr_id, set_tr_id] = useState<ItemType | string>(null);
  const [final_plan_id, set_final_plan_id] = useState<ItemType | string>(null);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked); // Toggle the state when the checkbox is pressed
  };

  useEffect(() => {
    const fetchTrackierId = async () => {
      const temp_tr_id = await getTrackierId();
      if (temp_tr_id) {
        set_tr_id(temp_tr_id.toLowerCase());
      }
    };
    fetchTrackierId();
  }, []);

  const getProfileDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        dispatch(getProfileData({ userId }));
        setUser_id(userId);
      }
    } catch (error) {
      console.error('Error fetching userId:', error);
    }
  };
  useEffect(() => {
    if (isFocused) {
      getProfileDetails();
    }
  }, [isFocused]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const message = (textMessage: string, status: 'success' | 'fail') => {
    let color =
      status === 'success' ? toast.color.GREEN :
        status === 'fail' ? toast.color.RED :
          toast.color.BLUE;

    toast.bottom(toastRef, textMessage, 3000, color);
  };

  const showUpdateModal = () => {
    let isShow = false;
    if (getProfileSuccess?.email && getProfileSuccess?.username && getProfileSuccess?.phoneno) {
      return (isShow = true);
    }
    return (isShow = false);
  };

  useEffect(() => {
    const GetSubsPlan = async () => {
      let userid = await AsyncStorage.getItem('userId');
      if (isFocused) {
        dispatch(subscription_plan());
      }
    };
    GetSubsPlan();
  }, [isFocused]);

  const getFilteredPlans = (allPlans, customData, active_PlanCode) => {
    let allowedPlanCodes = [];
    switch (active_PlanCode) {
      case "NEWYEAR349":
        allowedPlanCodes = ["GOLD849", "ANNUAL_UPGRADE", "ADV4499"];
        break;
      case "NEW349":
        allowedPlanCodes = ["NEW349", "GOLD849", "ANNUAL_UPGRADE", "ADV4499"];
        break;
      case "BASIC179":
        allowedPlanCodes = ["NEW349", "GOLD849", "ANNUAL_UPGRADE", "ADV4499"];
        break;
      default:
        allowedPlanCodes = ["NEW349", "GOLD849", "ANNUAL_UPGRADE", "ADV4499"];
    }
    let NewAllowedPlanCodes;

    if (['BASIC179', 'ADV4499', 'GOLD849', 'NEW349', 'ANNUAL_UPGRADE'].includes(customData)) {
      NewAllowedPlanCodes = [customData];
    } else {
      NewAllowedPlanCodes = allowedPlanCodes;
    }
    return allPlans.filter(plan =>
      NewAllowedPlanCodes.includes(plan?.data?.[0]?.plan_code)
    );
  };

  useEffect(() => {
    if (issubscription_planSuccess?.response) {
      const allPlans = issubscription_planSuccess?.response?.plans || [];
      const filteredPlans = getFilteredPlans(allPlans, deepLinkState, active_PlanCode);
      setPlanDetail(filteredPlans);
    }
  }, [issubscription_planSuccess, deepLinkState]);

  useEffect(() => {
    const allPlans = issubscription_planSuccess?.response?.plans || [];
    const filteredPlans = getFilteredPlans(allPlans, deepLinkState, active_PlanCode);
    if (filteredPlans.length > 1 && filteredPlans[1]?.data?.[0]) {
      setSelectPlan(filteredPlans[1].data[0].plan_description.split(', '));
      setPlanListItem(filteredPlans[1]);
      setSelectedItem(filteredPlans[1].data[0]);
    } else {
      setSelectPlan(filteredPlans[0]?.data[0]?.plan_description.split(', '));
      setPlanListItem(filteredPlans[0]);
      setSelectedItem(filteredPlans[0]?.data[0]);
    }
  }, [issubscription_planSuccess, deepLinkState, isFocused]);

  useEffect(() => {
    dispatch(resetTopup());
    dispatch(resetSubscriptionState());
    dispatch(editProfileReset());
    dispatch(resetCoupon());
  }, []);

  const NET_PAYABLE_AMOUNT = couponcode?.final_report?.final_amount
    ? couponcode?.final_report?.final_amount
    : selectedItem?.price;

  const handlePaymentOrder = async () => {
    const restrictedPlans = ["NEW349", "NEWYEAR349", "GOLD849", "ANNUAL_UPGRADE", "ADV4499", "BASIC179"];

    const isConflictingPlan =
      restrictedPlans.includes(active_PlanCode) &&
      selectedItem?.plan_code === "BASIC179" &&
      active_PlanCode === "BASIC179";

    if (isConflictingPlan) {
      message('You already have an active conflicting plan. Please select a different plan.', 'fail');
      return;
    }

    try {
      const userid = await AsyncStorage.getItem('userId');
      if (!selectedItem?.plan_code) {
        message('Plan ID is missing. Payment initialization aborted.', 'fail');
        return;
      }
      set_final_plan_id(selectedItem?.plan_code)
      dispatch(
        PaymentOrder({
          userid,
          amount: NET_PAYABLE_AMOUNT,
          plan_type: selectedItem?.plan_code,
          paymentmode: 'online',
          currency: 'INR',
        })
      );
    } catch (error) {
      message('Something went wrong while initiating the payment.', 'fail');
    }
  };

  const onPressNext = async () => {
    let userid = await AsyncStorage.getItem('userId');

    if (!showUpdateModal()) {
      setModalVisible(true);
    } else {
      setPaymentVerified(false); // Reset verification status
      handlePaymentOrder();
    }
  };

  const onSubmitProfileDetail = async (values: any) => {
    AsyncStorage.getItem('userId').then(userId => {
      dispatch(
        editProfileData({
          userId: userId,
          request: values,
        }),
      );
    });
  };

  useEffect(() => {
    const handleSubscription = async () => {
      if (editProfileSuccess === 'success') {
        try {
          setModalVisible(false);
          const userId = await AsyncStorage.getItem('userId');
          handlePaymentOrder();
          setTimeout(() => {
            dispatch(editProfileReset());
          }, 2000);
        } catch (error) {
          console.error('Failed to get user ID:', error);
        }
      }
    };

    handleSubscription();
  }, [editProfileSuccess === 'success']);

  const handleVerifyPlayment = async () => {
    let userid = await AsyncStorage.getItem('userId');
    try {
      var options = {
        description: 'Thanks for paying',
        image: 'https://stockyaari.s3.ap-south-1.amazonaws.com/Payment/stockyaari_logo.jpg',
        currency: currency,
        key: razorpayKeyId,
        amount: ispaymentOrderSuccess?.response?.amount.toString(),
        name: 'StockYaari',
        order_id: ispaymentOrderSuccess?.response?.id,
        prefill: {
          email: getProfileSuccess?.email,
          contact: getProfileSuccess?.phoneno,
          name: getProfileSuccess?.username,
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
            plan_id: final_plan_id,
            user_coupon: couponcode?.response?.id || null,
            order_id: ispaymentOrderSuccess?.response?.id,
            razorpay_payment_id: data?.razorpay_payment_id,
            razorpay_signature: data?.razorpay_signature,
            transaction_id: ispaymentOrderSuccess?.user_payment_details?.id,
            start_date: ispaymentOrderSuccess?.user_payment_details?.payment_date,
            billing_date: ispaymentOrderSuccess?.user_payment_details?.payment_date,
            razorpay_order_id: data?.razorpay_order_id,
          };
          var sdkID = Platform.OS === 'android' ? 'b8a312aa-4077-4467-88ea-2577e540a6a6' : '62d4fa46-3be5-421d-b24a-0265c7f099ff'
          const trackierObj = {
            "app_token": sdkID,
            "tr_id": tr_id,
            "event_id": "B4N_In4cIP",
            "ip": null,
            "customer_uid": userid,
            "customer_email": getProfileSuccess?.email,
            "customer_name": getProfileSuccess?.username,
            "customer_phone": getProfileSuccess?.phoneno,
            "revenue": ispaymentOrderSuccess?.response?.amount / 100,
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
          const paymentObj = {
            amount: ispaymentOrderSuccess?.user_payment_details?.amount,
          };
          dispatch(PaymentVerify({ ...dataobj, ...paymentObj }));
          sendTrackierEvent(trackierObj)
          const rupees = ispaymentOrderSuccess?.response?.amount / 100
          let eventId = "";
          switch (rupees) {
            case 179:
              eventId = "RH87NuJIvl";
              break;
            case 349:
              eventId = "dkzzE2Jldl";
              break;
            case 849:
              eventId = "p2nvfyax2Z";
              break;
            case 1799:
              eventId = "q2oomxKaal";
              break;
            case 4499:
              eventId = "T6gceYD6Qu";
              break;
            default:
              break;
          }
          if (eventId) {
            var trackierEvent = new TrackierEvent(eventId);
            if (userid) {
              TrackierSDK.setUserId(userid);
            }
            TrackierSDK.trackEvent(trackierEvent);
          }
          AppEventsLogger.logEvent('thankyou_event_fb', {
            status: 'Success',
            amount: paymentObj.amount,
            timestamp: new Date().toISOString()
          });
          analytics().logEvent('thankyou_event', {
            status: 'Success',
            amount: paymentObj.amount,
            timestamp: new Date().toISOString()
          });
          setPaymentVerified(true);
          setTimeout(() => {
            navigation(ROUTE_NAME.PAYMENT_SUCCESS_SCREEN, { status: true });
          }, 1000);
        })
        .catch(error => {
          setSelectedItem(null);
          setCouponCode(null);
          setPaymentVerified(true);
          dispatch(resetSubscriptionState());
          if (Platform.OS === 'android') {
            message('You may have cancelled the payment or there was a delay in response from the UPI app', 'fail');
          } else if (Platform.OS === 'ios') {
            message(error?.description, "fail");
          }
          setTimeout(() => {
            navigation(ROUTE_NAME.PAYMENT_SUCCESS_SCREEN, { status: false });
          }, 1000);

        });
    } catch (e) {
      setSelectedItem(null);
      setCouponCode(null);
      dispatch(resetSubscriptionState());
    }
  };
  useEffect(() => {
    if (ispaymentOrderSuccess?.response && !paymentVerified) {
      handleVerifyPlayment();
    }
  }, [ispaymentOrderSuccess, paymentVerified]);
  const handleSubscriptionContainer = item => {
    setPlanListItem(item);
    setSelectedItem(item?.data?.[0]); ///used to show tick by default 1 box in price container
    setCouponCode(null);
    setSelectPlan(item?.data?.[0]?.plan_description.split(', '));
  };
  const handleubscriptionPrize = item => {
    setSelectPlan(item?.plan_description.split(', '));
    setSelectedItem(item);
    setCouponCode(null);
  };
  const headerRight = () => (
    <View style={{ position: 'absolute', right: 25, alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          navigation(ROUTE_NAME.SUBSCRIPTION_HISTORY);
        }}>
        <Image source={IMAGES.HISTORY_ICON} style={styles.historyicon} />
      </TouchableOpacity>
    </View>
  )
  return (
    <>
      {user_id === '35821' ? (
        <SafeAreaView style={{ flex: 1, marginTop: 10 }}>
          <TitleWithBackBtnHeader
            centerTitle={''}
            onPressBackArrow={() => goBack()}
          />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={IMAGES.HOME_SCREEN_ICON.PREMIUM_Icon} style={{ resizeMode: 'contain', width: 200, height: 200 }} />
            <Text style={{ fontSize: normalizeFont(26), }}>Coming Soon</Text>
          </View>
        </SafeAreaView>
      ) : <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F5F7' }}>
        {isLoadingsubscription_plan ? (
          <Loader />
        ) : (
          <View style={{ flex: 1 }}>
            <TitleWithBackBtnHeader
              centerTitle={' Subscription Plans'}
              externalStyleText={{ paddingLeft: 25 }}
              onPressBackArrow={() => goBack()}
              headerRight={headerRight()}
            />
            <CustomToast ref={toastRef} position="bottom" />
            <ScrollView showsVerticalScrollIndicator={false}>
              {false && <BannerCarousel height={180} carouselStyle={{ flex: 1, marginBottom: 10, marginTop: 10 }} background_color={{ backgroundColor: '#F4F5F7' }}
                bannerData={[{ "image": "https://stock-help.s3.ap-south-1.amazonaws.com/Frame-1984077937.jpg", "redirect_url": "https://stockyaari.com" }]} />}
              <View style={styles.scrollviewDe}>
                <FlatList
                  data={planDetail}
                  renderItem={({ item }) => (
                    <SubscriptionPlanContainer
                      item={item}
                      planListItem={planListItem}
                      handleSubscriptionContainer={handleSubscriptionContainer}
                      setSelectPlan={setSelectPlan}
                      setSelectedItem={setSelectedItem}
                      setCouponCode={setCouponCode}
                      selectedItem={selectedItem}
                      handleubscriptionPrize={handleubscriptionPrize}
                      selectPlan={selectPlan}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
                {selectedItem?.is_coupon_visible && (
                  <TouchableOpacity onPress={() => {
                    dispatch(resetCoupon());
                    setCouponCode(null);
                    setCouponModalVisible(true)
                  }}>
                    <View style={styles.couponContainer}>
                      <View style={styleBase.inRow}>
                        <Image source={IMAGES.couponIcon} style={styles.couponIcon} />
                        <Text style={styles.textApplyCoupon} allowFontScaling={false}>
                          {couponcode?.response?.coupon_code
                            ? couponcode?.response?.coupon_code
                            : 'Apply Coupon Code'}
                        </Text>
                      </View>
                      {couponcode && (
                        <TouchableOpacity onPress={() => {
                          dispatch(resetCoupon());
                          setCouponCode(null);
                        }}>
                          <Image source={IMAGES.Cross} style={{ resizeMode: 'contain', height: 22, width: 22 }} />
                        </TouchableOpacity>

                      )}
                    </View>
                  </TouchableOpacity>
                )}
                <BillContainer
                  selectedItem={selectedItem}
                  couponcode={couponcode}
                  NET_PAYABLE_AMOUNT={NET_PAYABLE_AMOUNT}
                />

              </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
              <View style={styles.bottominnercontainer}>
                <TouchableOpacity onPress={toggleCheckbox}>
                  {isChecked ? (
                    <Image source={IMAGES.ActiveCheck} style={styles.iconTick} />
                  ) : (
                    <Image source={IMAGES.InActiveCheck} style={styles.iconTick} />
                  )}
                </TouchableOpacity>
                <Text
                  style={{ fontSize: normalizeFont(12), color: '#151716', fontWeight: '500' }}
                  allowFontScaling={false}>
                  {' '}
                  I Agree To The Terms And Conditions
                </Text>
              </View>
              <TouchableOpacity style={[!isChecked && { opacity: 0.7 }, { backgroundColor: '#228B22', borderRadius: 9, height: 50, marginTop: 15, paddingTop: 5 }]} onPress={onPressNext} disabled={!isChecked}>
                <View style={styles.gradientStyle}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text allowFontScaling={false} style={[styles.buttonText]}>
                      Pay  ₹ {addCommaToCurrency(NET_PAYABLE_AMOUNT)}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <SubscriptionAgreementText />
            </View>

            {!showUpdateModal() && (
              <UpdateProfileField
                isVisible={modalVisible}
                onClose={handleCloseModal}
                onSubmit={onSubmitProfileDetail}
              />
            )}
            <CouponPopUp
              visible={couponModalVisible}
              onClose={() => setCouponModalVisible(false)}
              setCouponCode={setCouponCode}
              selectPlanDetail={selectedItem}
            />
          </View>
        )}
      </SafeAreaView>}
    </>

  );
};
export default React.memo(SubscriptionScreen);
