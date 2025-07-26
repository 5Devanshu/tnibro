import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {TrackierSDK, TrackierEvent} from 'react-native-trackier';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivationVerify,
  loginReset,
  loginWithPhone,
  verifyOtp,
} from '../../apis/Onboarding/authenticationSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import {CONSTANT_TEXT} from '../../Constants/enums/constantText';
import IMAGES from '../../Constants/enums/ImagesEnum';
import DeviceInfo from 'react-native-device-info';
import {scaleHeight} from '../../Constants/enums/Dimensions';
import MainContainer from '../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import DeactivateModal from '../HelpScreen/DeactivateModal';
import {COLORS} from '../../Constants/enums';

let timeout = null;

export default function Otp({navigation, route}) {
  const dispatch = useDispatch();
  const {referred_by} = route?.params;
  const {
    isSignupSuccess,
    isOtpVerifyError,
    isAccessToken,
    loader,
    isLoginWithPhoneSuccess,
    userData,
    isactivationVerifyError,
  } = useSelector(state => state.authentication);

  const [deviceDetail, setDeviceDetail] = useState({
    getUniqueId: '',
    getDeviceName: '',
    getDeviceType: '',
  });
  const [otpCode, setOtpCode] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const {height} = Dimensions.get('window');

  // Handle OTP verification error
  useEffect(() => {
    if (isOtpVerifyError) setVisibleModal(true);
  }, [isOtpVerifyError]);

  // Track resend countdown timer
  useEffect(() => {
    let interval;
    if (resendDisabled && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendDisabled, resendTimer]);

  // Fetch device info on mount
  useEffect(() => {
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
    getDeviceInfo();
  }, []);

  // Handle success session
  useEffect(() => {
    if (isAccessToken) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        handleSession();
      }, 1000);
    }
  }, [isAccessToken]);

  const handleSession = async () => {
    try {
      await AsyncStorage.setItem('accessToken', isAccessToken);
      await AsyncStorage.setItem('user_Data', JSON.stringify(userData));
      navigation.push('DrawerNavigation');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const onGoBack = () => {
    dispatch(loginReset());
    navigation.goBack();
  };

  const handleCodeFill = code => {
    setOtpCode(code.toString());
    if (code.toString().length === 6) {
      setErrorMessage('');
    }
  };

  const handleVerifyOtp = () => {
    if (otpCode.length < 6) {
      setErrorMessage('OTP invalid');
      return;
    }

    const phoneno = isSignupSuccess?.response?.phoneno || isLoginWithPhoneSuccess?.response?.phoneno;
    const country = isSignupSuccess?.response?.country || isLoginWithPhoneSuccess?.response?.country;

    const payload = {
      otp: otpCode,
      phoneno,
      country,
      device_name: deviceDetail.getDeviceName,
      device_type: deviceDetail.getDeviceType,
      device_id: deviceDetail.getUniqueId,
    };

    if (isOtpVerifyError) {
      dispatch(ActivationVerify(payload));
    } else {
      dispatch(verifyOtp({...payload, referred_by}));
      const trackierEvent = new TrackierEvent('o91gt1Q0PK');
      TrackierSDK.trackEvent(trackierEvent);
    }
  };

  const handleResend = () => {
    if (resendDisabled) return;

    const phoneno = isLoginWithPhoneSuccess?.response?.phoneno;
    const country = isLoginWithPhoneSuccess?.response?.country;

    dispatch(
      loginWithPhone({
        phoneno,
        country,
        referred_by,
      }),
    );
    setOtpCode('');
    setResendDisabled(true);
    setResendTimer(45);
  };

  const closeMode = () => {
    setVisibleModal(false);
  };

  const handleOnpressActivate = () => {
    const phoneno = isLoginWithPhoneSuccess?.response?.phoneno;
    const country = isLoginWithPhoneSuccess?.response?.country;

    dispatch(
      loginWithPhone({
        phoneno,
        country,
        referred_by: null,
      }),
    );
    setOtpCode('');
    closeMode();
  };

  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle="OTP Verification" onPressBackArrow={onGoBack} />
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          behavior="position"
          style={styles.mainCon}
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? height * 0.01 : 30}>
          <View style={styles.container1}>
            <Image source={IMAGES.LOGIN_ICON.LogInLogo} style={styles.loginlogo} />
            <View style={styles.input}>
              <Text style={styles.maintitle} allowFontScaling={false}>
                An authentication code has been sent to{' '}
                {isLoginWithPhoneSuccess?.response?.phoneno || isSignupSuccess?.response?.phoneno}
              </Text>

              <OTPInputView
                style={{width: '100%', height: scaleHeight(100)}}
                pinCount={6}
                autoFocusOnLoad={false}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={handleCodeFill}
              />

              {(errorMessage || isOtpVerifyError || isactivationVerifyError) && (
                <View style={{justifyContent: 'center'}}>
                  <Text allowFontScaling={false} style={styles.danger}>
                    {errorMessage || isOtpVerifyError || isactivationVerifyError?.data?.response}
                  </Text>
                </View>
              )}

              <Text allowFontScaling={false} style={styles.registerLbl}>
                I didn't receive code.{' '}
                <Text
                  onPress={handleResend}
                  style={{
                    fontWeight: '600',
                    color: resendDisabled ? '#aaa' : '#265B26',
                  }}>
                  {resendDisabled ? `Resend OTP in ${resendTimer}s` : CONSTANT_TEXT.RESEND_OTP}
                </Text>
              </Text>

              <TouchableOpacity onPress={handleVerifyOtp}>
                <View style={styles.btn}>
                  {loader ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text allowFontScaling={false} style={styles.btnText}>
                      {CONSTANT_TEXT.VERIFY}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        {visibleModal && (
          <DeactivateModal
            visible={visibleModal}
            data={'Your Account is Deactivated please activate your account'}
            closeModal={closeMode}
            handleOnprss={handleOnpressActivate}
            isshow={false}
            showactivatebutton={true}
          />
        )}
      </ScrollView>
    </MainContainer>
  );
}
