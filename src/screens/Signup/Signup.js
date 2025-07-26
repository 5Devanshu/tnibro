import React, { useEffect, useState } from 'react';
import { signUp, loginReset } from '../../apis/Onboarding/authenticationSlice';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useSelector, useDispatch } from 'react-redux';
import FormInput from '../../Components/FormInput';
import styles from './style';
import { CONSTANT_TEXT } from '../../Constants/enums/constantText';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/enums/Dimensions';
import CountryPicker from 'react-native-country-picker-modal';
import MainContainer from '../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import { COLORS, ROUTE_NAME } from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';
import { goBack } from '../../Navigation/NavigationService';
import { WebPagesUrl } from '../../Constants/WebPageUrl';

const indianUser = {
  phoneno: '',
};

export default function Signup({ navigation, route }) {
  const { height } = Dimensions.get('window');
  const { referred_by } = route?.params;

  const authenticationData = useSelector(state => state.authentication);
  const { isSignupSuccess, signuploader, isSignupError } =
    authenticationData;
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [isTncChecked, setIsTncChecked] = useState(false);
  const [countryCode, setCountryCode] = useState('IN'); // Default country code
  const [callingCode, setCallingCode] = useState('91'); // Default calling code for India
  const [showInput, setShowInput] = useState(false);
  const [referralCode, setReferralCode] = useState(referred_by ?? '');

  useEffect(() => {
    setCountryCode('IN');
  }, []);

  const getInitialValuesSet = () => {
    return indianUser;
  };

  const getValidationSchema = () => {
    return Yup.object().shape({
      phoneno: Yup.string().required('Phone number is required'),
    });
  };

  useEffect(() => {
    if (isSignupSuccess) {
      navigation.navigate('OtpVerify', { referred_by: referred_by });
    }
  }, [isSignupSuccess]);

  const goToTerms = () => {
    navigation.navigate(ROUTE_NAME.WEB_VIEW_PAGE, {
      uri: WebPagesUrl.TERMS_OF_USE,
    });
  };

  const handleSignup = values => {
    if (isTncChecked) {
      let requestBody = {
        phoneno: `${values.phoneno}`,
        country: callingCode,
        referred_by: referralCode
      };
      dispatch(signUp(requestBody));
    } else {
      setErrorMessage('Please accept the terms & conditions');
    }
  };
  const goBackLogin = () => {
    dispatch(loginReset());
    navigation.navigate('Login');
  };
  const onPressBack = () => {
    dispatch(loginReset());
    goBack();
  };
  const onSelectCountry = country => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };
  const handleReferralPress = () => {
    setShowInput(!showInput);
  };

  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle="Sign Up" onPressBackArrow={onPressBack} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? (height * 1) / 100 : 30}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={[styles.container]}>
            <Image source={IMAGES.LOGIN_ICON.LogInLogo} style={styles.loginlogo} />

            <Formik
              initialValues={getInitialValuesSet()}
              onSubmit={handleSignup}
              validationSchema={getValidationSchema()}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.form}>
                  <View style={styles.input}>
                    <>
                      <Text style={styles.maintitle}>
                        New to Stockyaari? <Text style={{ color: COLORS.PrimaryGreen }}>Sign up now!</Text>
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
                          onChangeText={handleChange('phoneno')}
                          placeholder="phone number"
                          placeholderTextColor="#4A4A4A"
                          value={values.phoneno}
                          style={styles.inputControl}
                          styling={styles.inputfiield}
                          textInputstyling={styles.inputtxt}
                          formIcon={IMAGES.LOGIN_ICON.Call_Icon}
                        />
                      </View>
                      <Text allowFontScaling={false} style={{ color: 'red', alignSelf: 'flex-end' }}>
                        {touched.phoneno && errors.phoneno}
                      </Text>
                      {!showInput && (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <View style={styles.separator} />
                          <TouchableOpacity
                            onPress={handleReferralPress}
                            style={{
                              color: '#4A4A4A',
                              fontSize: normalizeFont(12),
                              fontFamily: FONTS.RobotoRegular,
                              marginLeft: scaleWidth(12),
                            }}>
                            <Text style={styles.referralText}>Referral Code </Text>
                          </TouchableOpacity>
                          <Image
                            source={IMAGES.ArrowDown}
                            style={{
                              height: scaleHeight(14),
                              width: scaleWidth(14),
                              marginRight: scaleWidth(12),
                            }}
                          />
                          <View style={styles.separator} />
                        </View>
                      )}
                      {showInput && (
                        <>
                          <Text style={styles.inputLabel} onPress={handleReferralPress}>
                            Referral code
                          </Text>
                          <TextInput
                            style={styles.referalcontainer}
                            placeholder="Your referral code"
                            value={referralCode}
                            onChangeText={setReferralCode}
                            place
                            holderTextColor={'#4A4A4A'}
                          />
                        </>
                      )}

                      {isSignupError || errorMessage ? (
                        <Text allowFontScaling={false} style={styles.danger}>
                          {isSignupError || errorMessage}
                        </Text>
                      ) : null}
                      <View style={styles.formAction}>
                        {signuploader ? (
                          <View style={styles.btn}>
                            <ActivityIndicator size="small" color="#fff" />
                          </View>
                        ) : (
                          <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={
                              !values.phoneno ||
                              values.phoneno.length < (callingCode === '91' ? 10 : 7) ||
                              !/^\d+$/.test(values.phoneno)
                            }
                            style={
                              values.phoneno && values.phoneno.length >= (callingCode === '91' ? 10 : 7) && /^\d+$/.test(values.phoneno)
                                ? styles.btn
                                : styles.disablebtn
                            }>
                            <Text
                              allowFontScaling={false}
                              style={[
                                styles.btnText,
                                { color: values.phoneno ? COLORS.PrimaryWhite : COLORS.PrimaryBlack },
                              ]}>
                              {'Sign Up'}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <View style={styles.tncWrapper}>
                        <BouncyCheckbox
                          size={25}
                          fillColor={COLORS.PrimaryGreen}
                          unfillColor={COLORS.PrimaryWhite}
                          iconStyle={{ borderColor: COLORS.PrimaryGreen }}
                          innerIconStyle={{ borderWidth: 2 }}
                          onPress={isChecked => setIsTncChecked(isChecked)}
                          disableText
                        />
                        <Text allowFontScaling={false} style={styles.tncTxtWrapper}>
                          {CONSTANT_TEXT.I_ACCEPT_THE}{' '}
                          <Text allowFontScaling={false} style={styles.tncLink} onPress={goToTerms}>
                            {CONSTANT_TEXT.TERMS_AND_CONDITION}
                          </Text>
                        </Text>
                      </View>
                      <Text style={styles.textDesc} allowFontScaling={false}>
                        Register with your WhatsApp number to get more details and stay informed.
                      </Text>
                    </>
                  </View>

                  <TouchableOpacity onPress={goBackLogin} style={{ marginTop: 'auto' }}>
                    <Text allowFontScaling={false} style={styles.formFooter}>
                      {CONSTANT_TEXT.ALREADY_HAVE_ACCOUNT}
                      <Text style={{ textDecorationLine: 'underline', color: '#265B26' }}>
                        {CONSTANT_TEXT.SIGN_IN_HERE}
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
