import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {CONSTANT_TEXT} from '../../../Constants/enums/constantText';
import {normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums/Dimensions';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useDispatch, useSelector} from 'react-redux';
import DeactivateModal from '../DeactivateModal';
import {
  DeactivateFeedback,
  DeactivateVerify,
  resetDeactivatePhone,
} from '../../../apis/Onboarding/DeactivateSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import MainContainer from '../../../Components/MainContainer';
import {COLORS} from '../../../Constants/enums';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import {goBack} from '../../../Navigation/NavigationService';
import FONTS from '../../../Constants/enums/Fonts';

interface DeactiveOtpScreenProps {
  navigation: any;
  route: any;
}

const DeactiveOtpScreen: React.FC<DeactiveOtpScreenProps> = ({navigation, route}) => {
  let timeout = null;
  const dispatch = useDispatch();

  const {height} = Dimensions.get('window');
  const {Checked_Data, phone} = route.params;
  const [otpCode, setOtpCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const deactivateIdData = useSelector(state => state.deactivateId);
  const {isdeactivateIdSuccess, isloader, isdeactivateotpError, isdeactivateotpSuccess} =
    deactivateIdData;

    const openModal = () => {
    setVisibleModal(true);
  };
  const closeMode = () => {
    setVisibleModal(false);
  };
  const handleOnprss = async () => {
    /// confirmation box
    const userid = await AsyncStorage.getItem('userId');
    if (isdeactivateIdSuccess?.response) {
      dispatch(
        DeactivateVerify({
          phoneno: isdeactivateIdSuccess?.response?.phoneno,
          country: isdeactivateIdSuccess?.response?.country,
          otp: otpCode,
        }),
      );
      closeMode();
    }
  };
  useEffect(() => {
    if (isdeactivateotpSuccess) {
      AsyncStorage.getItem('userId').then(userId => {
        dispatch(
          DeactivateFeedback({
            userid: userId,
            feedback_list: Checked_Data,
          }),
        );
      });
      navigation.navigate('DeactiveSubmit');
    } else {
      setErrorMessage(isdeactivateotpError?.data?.response);
      closeMode();
    }
  }, [isdeactivateotpSuccess, isdeactivateotpError]);

  const handleClose = async () => {
    await dispatch(resetDeactivatePhone());
    navigation.goBack();
  };
  const handleCodeFill = code => {
    setOtpCode(code.toString());
    if (code.toString().length === 6) {
      setErrorMessage('');
    }
  };
  const handleVerifyOtp = async () => {
    if (otpCode.length < 6) {
      setErrorMessage('OTP invalid');
    } else {
      openModal();
    }
  };
  const onPressBack = () => {
    dispatch(resetDeactivatePhone());
    goBack();
  };
  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle="Verify your account" onPressBackArrow={onPressBack} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? (height * 1) / 100 : 30}>
        <ScrollView
          style={styles.flex}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text allowFontScaling={false} style={styles.headline}>
              {CONSTANT_TEXT.VERIFY_YOUR_OTP}
            </Text>
            <Text allowFontScaling={false} style={styles.title}>
              An authentication code has been sent to {phone}
            </Text>
            <View style={{alignItems: 'center'}}>
              <OTPInputView
                style={styles.otpInput}
                pinCount={6}
                autoFocusOnLoad={false}
                codeInputFieldStyle={styles.codeinputfield}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={handleCodeFill}
              />
            </View>
            {errorMessage ? (
              <View>
                <Text allowFontScaling={false} style={styles.danger}>
                  {errorMessage}
                </Text>
              </View>
            ) : null}

            <View style={{}}>
              <TouchableOpacity style={styles.VerifyBtn} onPress={handleVerifyOtp}>
                {isloader ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text allowFontScaling={false} style={styles.VerifyBtnLbl}>
                    {CONSTANT_TEXT.VERIFY}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          {visibleModal ? (
            <DeactivateModal
              visible={visibleModal}
              data={`Deactivate Account\nAre you sure?`}
              description={CONSTANT_TEXT.DEACTIVATE_DES}
              closeModal={closeMode}
              handleOnprss={handleOnprss}
              isshowconfirm={true}
            />
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    position: 'relative',
    marginHorizontal: scaleWidth(20),
  },
  headline: {
    marginTop: scaleHeight(30),
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(25),
    alignSelf: 'center',
    fontFamily: FONTS.RobotoBold,
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(16),
    marginTop: scaleHeight(13),
    marginBottom: scaleHeight(18),
  },
  otpInput: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: scaleHeight(100),
  },
  codeinputfield: {
    color: '#242A37',
    fontSize: normalizeFont(18),
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: scaleWidth(10),
    width: scaleWidth(50),
    height: scaleHeight(60),
    fontFamily: FONTS.RobotoBold,
  },
  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  VerifyBtn: {
    backgroundColor: '#228B22',
    borderRadius: scaleWidth(26),
    alignSelf: 'center',
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(110),
  },
  VerifyBtnLbl: {
    textAlign: 'center',
    fontSize: normalizeFont(16),
    lineHeight: 26,
    color: COLORS.PrimaryWhite,
    fontFamily: FONTS.RobotoMedium,
  },
  danger: {
    color: 'red',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: normalizeFont(15),
    fontFamily: FONTS.RobotoRegular,
  },
});

export default DeactiveOtpScreen;
