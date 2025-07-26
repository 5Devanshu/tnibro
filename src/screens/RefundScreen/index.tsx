import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import MainContainer from '../../Components/MainContainer';
import {COLORS, ROUTE_NAME, scaleHeight, scaleWidth, styleBase} from '../../Constants/enums';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import IMAGES from '../../Constants/enums/ImagesEnum';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  MoneyFeedback,
  refundMoneyBack,
  resetRefund,
} from '../../apis/Onboarding/PaymentApi/CreateSubscSlice';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {formatDate} from '../Dashboard/TableComponent/utils';

interface SubscriptionScreenProps {
  navigation: any;
}
const RefundScreen: FC<SubscriptionScreenProps> = ({navigation}) => {
  const HomeScreeneData = useSelector((state: any) => state.HomeScreenSlice);
  const {ishomeScreemSuccess} = HomeScreeneData;

  const isTRuee = ishomeScreemSuccess?.response?.[0]?.isRefund;

  const dispatch = useDispatch();
  const isfocused = useIsFocused();

  const paymentData = useSelector((state: any) => state.CreateSubscSlice);
  const {refundMoneyloading, refundMoneySuccess, isMoneyFeedbackSuccess, isMoneyFeedbackLoading} =
    paymentData;
  const [refundData, setRefundData] = useState();
  const [options, setOptions] = useState([
    {label: `Are you not able to create a watchlist`, checked: false, code: 'FB101'},
    {label: 'Are you not able to set an alert', checked: false, code: 'FB102'},
    {
      label: 'Are you not getting notifications on time We may have more question',
      checked: false,
      code: 'FB103',
    },
    {label: 'Are you not able to create a watchlist', checked: false, code: 'FB104'},
    {label: 'Others', checked: false, code: 'FB105'},
  ]);

  useEffect(() => {
    dispatch(refundMoneyBack());
  }, [isfocused]);

  useEffect(() => {
    if (refundMoneySuccess) {
      setRefundData(refundMoneySuccess);
    }
  }, [refundMoneySuccess]);
  const toggleOption = index => {
    const updatedOptions = [...options];
    updatedOptions[index].checked = !updatedOptions[index].checked;
    setOptions(updatedOptions);
  };
  const Checked_data = options
    .filter(option => option.checked === true)
    .map(option => option.code)
    .join(', ');
    
  // const isButtonDisable = options.every(option => !option.checked);

  const onPressRefund = async () => {
    const userid = await AsyncStorage.getItem('userId');
    let requestBody = {
      feedback: 'FB103',
      payment: refundData?.payment_id,
    };
    //
    Alert.alert('Are You Sure?', 'Do You really Want To Request Refund ??', [
      {
        text: 'Confirm',
        onPress: () => {
          dispatch(MoneyFeedback(requestBody));
        },
        style: 'destructive',
      },
      {
        text: 'Cancel',
      },
    ]);
  };
  useEffect(() => {
    if (isMoneyFeedbackSuccess) {
      navigation.navigate(ROUTE_NAME.REFUND_SUCCESS);
    }
  }, [isMoneyFeedbackSuccess]);
  const CustomCheckBox = ({label, checked, onChange}) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={onChange}>
        <View style={[styles.checkbox]}>
          {checked && (
            <Text allowFontScaling={false} style={styles.checkmark}>
              ✓
            </Text>
          )}
        </View>
        <View style={styles.labelContainer}>
          <Text allowFontScaling={false} style={styles.title}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const onPressBack = () => {
    dispatch(resetRefund());
    navigation.goBack();
  };
  return (
    <MainContainer bgColor="#FFF">
      <TitleWithBackBtnHeader centerTitle="Refund Details" onPressBackArrow={onPressBack} />
      {refundMoneyloading ? (
        <View style={styleBase.emptyContainer}>
          <ActivityIndicator color={COLORS.LOADER_COLOR} size={'large'} />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
          }}>
          {isTRuee ? (
            <View
              style={{
                flex: 1,
                marginHorizontal: scaleWidth(25),
              }}>
              <Image source={IMAGES.REFUND_SCREEN.RefundLogo} style={styles.applogo} />
              <Text style={[styles.txthead, {marginTop: scaleHeight(18)}]} allowFontScaling={false}>
                Stockyaari Premium
              </Text>
              <Text style={styles.txthead} allowFontScaling={false}>
                Subscription
              </Text>
              <Text style={styles.txtamount} allowFontScaling={false}>
                ₹{refundData?.amount}/- Plan
              </Text>
              <Text style={styles.purchaseDate} allowFontScaling={false}>
                Purchase on {formatDate(refundData?.purchase_date)}
              </Text>
              <Text style={styles.Refundvalid} allowFontScaling={false}>
                Refund valid up to: {formatDate(refundData?.refund_valid_date)}
              </Text>
              {refundData?.process_inited && (
                <View style={styles.refundcontainer}>
                  <LinearGradient colors={['#4BD874', '#2E8447']} style={styles.graidentcontainer}>
                    <View style={styles.refundInnerContainer}>
                      <Text style={styles.Txt_yourefund} allowFontScaling={false}>
                        Your refund status
                      </Text>
                      <Text style={styles.refundtxt} allowFontScaling={false}>
                        Refund ID : {refundData?.refund_id}
                      </Text>
                      <Text style={styles.refundtxt} allowFontScaling={false}>
                        Purchase On :{' '}
                        {refundData?.purchase_date ? formatDate(refundData?.purchase_date) : '---'}
                      </Text>
                      <Text style={styles.refundtxt} allowFontScaling={false}>
                        Request Refund :{' '}
                        {refundData?.refund_initiated_date
                          ? formatDate(refundData?.refund_initiated_date)
                          : '---'}
                      </Text>
                      <Text
                        style={[styles.refundtxt, {marginBottom: scaleHeight(26)}]}
                        allowFontScaling={false}>
                        Refund Status : {refundData?.refund_status}
                      </Text>
                      {refundData?.refund_inited === false && (
                        <Text style={styles.refundDes} allowFontScaling={false}>
                          We are currently processing your refund request. Please allow 5 to 7
                          working days for the refund to be completed. You will receive a
                          confirmation notification once the process is finalized. Thank you for
                          your patience and understanding.
                        </Text>
                      )}
                    </View>
                  </LinearGradient>
                </View>
              )}
              {/* {refundData?.process_inited === false && (
              <View>
                <Text style={styles.txtReason} allowFontScaling={false}>
                  Reason
                </Text>
                <View style={styles.contectContainer}>
                  {options.map((option, index) => (
                    <CustomCheckBox
                      key={index}
                      label={option.label}
                      checked={option.checked}
                      onChange={() => toggleOption(index)}
                    />
                  ))}
                </View>
              </View>
            )} */}

              {refundData?.process_inited === false && (
                <LinearGradient
                  colors={['#4BD874', '#2E8447']}
                  style={{borderRadius: 11, marginTop: scaleHeight(80), opacity: 1}}>
                  <TouchableOpacity onPress={onPressRefund}>
                    <View style={styles.offerView}>
                      {isMoneyFeedbackLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                      ) : (
                        <Text style={styles.offertxt} allowFontScaling={false}>
                          Request Refund
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              )}
            </View>
          ) : (
            <ScrollView>
              <View
                style={{
                  flex: 1,
                }}>
                <Image
                  source={IMAGES.REFUND_SCREEN.RefundExpire}
                  style={styles.RefundExpireImage}
                />
                <Text style={styles.txtpleaseNote} allowFontScaling={false}>
                  Please Note
                </Text>
                <Text style={styles.txtDesc} allowFontScaling={false}>
                  Please note that you are not eligible for a refund after 30 days from the date of
                  purchase. This policy ensures that we can continue to offer high-quality service
                  to all our valued customers. Thank you for your understanding and cooperation. If
                  you're not subscribed yet, you can purchase our annual subscription here.
                </Text>
              </View>
            </ScrollView>
          )}
        </View>
      )}
    </MainContainer>
  );
};
export default RefundScreen;
