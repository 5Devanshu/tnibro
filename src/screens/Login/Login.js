import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithPhone } from '../../apis/Onboarding/authenticationSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormInput from '../../Components/FormInput';
import styles from './style';
import { CONSTANT_TEXT } from '../../Constants/enums/constantText';
import IMAGES from '../../Constants/enums/ImagesEnum';
import DeviceInfo from 'react-native-device-info';
import CountryPicker from 'react-native-country-picker-modal';
import MainContainer from '../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import { COLORS } from '../../Constants/enums';
import OneSignal from 'react-native-onesignal';
import { apiEnviornment } from '../../constants';

const indianUser = {
  phone: '',
};

export default function Login({ navigation, route }) {
  const { customData } = route.params;
  const { height } = Dimensions.get('window');
  const [deviceDetail, setDeviceDetail] = useState({
    getUniqueId: '',
    getDeviceName: '',
    getDeviceType: '',
  });
  const [referralCode] = useState(customData ?? '');

  const [countryCode, setCountryCode] = useState('IN'); // Default country code
  const [callingCode, setCallingCode] = useState('91'); // Default calling code for India

  const authenticationData = useSelector(state => state.authentication);
  const {
    isAccessToken,
    loader,
    isLoginError,
    isLoginWithPhoneSuccess,
  } = authenticationData;

  const dispatch = useDispatch();

  useEffect(() => {
    setCountryCode('IN');
  }, []);

  useEffect(() => {
    if (isAccessToken) {
      // handleSession();
    }
    return () => {
      console.log('login unmounted');
    };
  }, [isAccessToken]);

  useEffect(() => {
    if (isLoginWithPhoneSuccess?.response) {
      navigation.navigate('OtpVerify', { referred_by: customData || referralCode });
    }
  }, [isLoginWithPhoneSuccess]);

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

  const getInitialValuesSet = () => {
    // if (countrySelected === 'India') {
    return indianUser;
    // }
    // return abroadUser;
  };

  const handleLogin = values => {
    let requestBody = {
      phoneno: `${values.phone}`,
      country: `${callingCode}`,
      // referred_by: customData || referralCode,
    };
    dispatch(loginWithPhone(requestBody));
  };

  const getValidationSchema = () => {
    return Yup.object().shape({
      phone: Yup.string().required('Phone number required').min(6, 'Phone number is not valid'),
    });
  };

  useEffect(() => {
    const appId = apiEnviornment === 'PRODUCTION'
      ? '3a7e2c4a-c9e1-4eb1-9257-cbd1130f4c49'
      : '87badf4c-4538-49b8-884c-aa6ee6809b62';

    OneSignal.setAppId(appId);

    OneSignal.promptForPushNotificationsWithUserResponse();

    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      let notification = notificationReceivedEvent.getNotification();
      const data = notification.additionalData;
      notificationReceivedEvent.complete(notification);
    });

    OneSignal.setNotificationOpenedHandler(notification => { });
    const timeout = setTimeout(() => {
      OneSignal.getDeviceState().then(data => {
        const oneSignal_userId = data?.userId;
        if (oneSignal_userId) {
          AsyncStorage.setItem('oneSignal_userId', oneSignal_userId)
            .then(() => console.log('Data stored successfully in AsyncStorage'))
            .catch(error => console.log('Error storing data in AsyncStorage:', error));
        }
      });
    }, 17000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const onSelectCountry = country => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };
  const onPressBack = () => {
    navigation.goBack();
  };
  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle="Log in" onPressBackArrow={onPressBack} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? (height * 1) / 100 : 30}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image source={IMAGES.LOGIN_ICON.LogInLogo} style={styles.loginlogo} />
            <Formik
              initialValues={getInitialValuesSet()}
              onSubmit={handleLogin}
              validationSchema={getValidationSchema()}>
              {({ handleChange, handleSubmit, values, errors, touched }) => (
                <View style={styles.form}>
                  <View style={styles.input}>
                    <>
                      <Text style={styles.maintitle}>Welcome to Stockyaari</Text>
                      <Text style={styles.subtitle}>
                        Simply enter your phone number to <Text style={{ fontWeight: 'bold' }}>Log in</Text>
                      </Text>
                      <Text allowFontScaling={false} style={styles.inputLabel}>
                        {CONSTANT_TEXT.PHONE_NO}
                      </Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.numberContainer}>
                          <CountryPicker
                            countryCode={countryCode}
                            withFlag
                            withCallingCode
                            withFilter
                            withCallingCodeButton
                            onSelect={onSelectCountry}
                            containerButtonStyle={styles.countryPicker}
                          />
                        </View>
                        <FormInput
                          autoCapitalize="none"
                          autoCorrect={false}
                          keyboardType="number-pad"
                          maxLength={callingCode === '91' ? 10 : 15}
                          onChangeText={handleChange('phone')}
                          placeholder="Phone number"
                          placeholderTextColor="#4A4A4A"
                          style={styles.inputControl} /// comment this no use
                          value={values.phone}
                          styling={styles.inputfiield}
                          textInputstyling={styles.inputtxt}
                          formIcon={IMAGES.LOGIN_ICON.Call_Icon}
                        />
                      </View>

                      <Text allowFontScaling={false} style={styles.danger}>
                        {touched.phone && errors.phone}
                      </Text>
                      {isLoginError ? (
                        <Text allowFontScaling={false} style={styles.danger}>
                          {isLoginError}
                        </Text>
                      ) : null}
                      <View style={styles.formAction}>
                        {loader ? (
                          <View style={styles.btn}>
                            <ActivityIndicator size="small" color="#fff" />
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={
                              !values.phone ||
                              values.phone.length < (callingCode === '91' ? 10 : 7) ||
                              !/^\d+$/.test(values.phone)
                            }
                            style={
                              values.phone &&
                                values.phone.length >= (callingCode === '91' ? 10 : 7) &&
                                /^\d+$/.test(values.phone)
                                ? styles.btn
                                : styles.disablebtn
                            }>
                            <Text
                              allowFontScaling={false}
                              style={[
                                styles.btnText,
                                { color: values.phone ? COLORS.PrimaryWhite : COLORS.PrimaryBlack },
                              ]}>
                              {'Generate OTP'}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Signup', { referred_by: customData || referralCode });
                    }}
                    style={{ marginTop: 'auto' }}>
                    <Text allowFontScaling={false} style={styles.formFooter}>
                      {CONSTANT_TEXT.DONT_HAVE_ACCOUNT}
                      <Text style={{ textDecorationLine: 'underline', color: '#265B26' }}>
                        {CONSTANT_TEXT.SIGN_UP_HERE}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </MainContainer>
  );
}
