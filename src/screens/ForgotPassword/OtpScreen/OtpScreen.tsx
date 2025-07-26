import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import {CONSTANT_TEXT} from '../../../Constants/enums/constantText';
import {normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums/Dimensions';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useDispatch, useSelector} from 'react-redux';
import {postVerifyOtp} from '../../../apis/Onboarding/forgotPasswordSlice';

interface ForgotOTPProps {
  navigation: any;
  route: any;
}

const ForgotOtpScreen: React.FC<ForgotOTPProps> = ({navigation, route}) => {
  let timeout = null;
  const {email} = route.params;
  const [errorMessage, setErrorMessage] = useState('');
  const fogotpasswordData = useSelector((state: any) => state.forgotPassword);
  const {ispostVerifyOtpSuccess, ispostVerifyOtpError} = fogotpasswordData;
  const dispatch = useDispatch();
  const [otpCode, setOtpCode] = useState('');

  const handleVerifyOtp = () => {
    if (otpCode.length < 6) {
      setErrorMessage('OTP invalid');
    } else {
      dispatch(
        postVerifyOtp({
          email: email,
          otp: otpCode,
        }),
      );
    }
  };
  const handleCodeFill = code => {
    setOtpCode(code.toString());
    if (code.toString().length === 6) {
      setErrorMessage('');
    }
  };
  useEffect(() => {
    if (ispostVerifyOtpSuccess?.response) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        navigation.navigate('ResetPasswordScreen', {
          email: email,
        });
      }, 1000);
    }
  }, [ispostVerifyOtpSuccess]);

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={styles.backButton_containe}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={styles.hitslop}>
            <Image source={IMAGES.Back_Icon} style={styles.backIcon} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text allowFontScaling={false} style={styles.headline}>
            {CONSTANT_TEXT.VERIFY_YOUR_OTP}
          </Text>
          <Text allowFontScaling={false} style={styles.title}>
            A 6 digit OTP code has been sent to {email} enter the code to continue.{' '}
          </Text>
          <Text allowFontScaling={false} style={styles.label}>
            {CONSTANT_TEXT.ENTER_OTP}
          </Text>
          <View style={{alignItems: 'center'}}>
            <OTPInputView
              style={styles.otpInput}
              pinCount={6}
              autoFocusOnLoad={false}
              codeInputFieldStyle={styles.codeinputfield}
              onCodeFilled={handleCodeFill}
            />
          </View>
          {/* show error */}
          <View>
            {ispostVerifyOtpError ? (
              <Text allowFontScaling={false} style={styles.danger}>
                {ispostVerifyOtpError?.response}
              </Text>
            ) : null}
          </View>

          <View style={{marginTop: 44}}>
            <Pressable style={styles.VerifyBtn} onPress={handleVerifyOtp}>
              <Text allowFontScaling={false} style={styles.VerifyBtnLbl}>
                {CONSTANT_TEXT.VERIFY}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E5FFED',
    flex: 1,
  },
  mainCon: {
    backgroundColor: '#E5FFED',
    flex: 1,
    marginBottom: scaleHeight(200),
  },
  backButton_containe: {
    marginTop: Platform.OS === 'ios' ? 60 : 30,
    marginHorizontal: 32,
  },
  hitslop: {
    top: 20,
    bottom: 20,
    left: 50,
    right: 50,
  },
  backIcon: {
    height: scaleHeight(42),
    width: scaleWidth(42),
  },
  content: {
    position: 'relative',
    marginHorizontal: 32,
  },
  headline: {
    marginTop: scaleHeight(70),
    color: '#17181A',
    fontSize: normalizeFont(24),
    fontWeight: '700',
  },
  title: {
    color: '#8B9199',
    fontSize: normalizeFont(14),
    fontWeight: '400',
    marginTop: scaleHeight(12),
    marginBottom: 34,
  },
  label: {
    color: '#5D6166',
    fontSize: normalizeFont(14),
    fontWeight: '400',
  },
  otpInput: {
    height: scaleHeight(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeinputfield: {
    color: '#5D6166',
    fontWeight: '400',
    fontSize: normalizeFont(24),
    backgroundColor: '#FFFFFF',
  },
  VerifyBtn: {
    backgroundColor: '#339502',
    borderRadius: 16,
    alignSelf: 'center',
  },
  VerifyBtnLbl: {
    textAlign: 'center',
    fontSize: normalizeFont(16),
    color: '#fff',
    paddingVertical: scaleHeight(20),
    paddingHorizontal: scaleWidth(78),
  },
  danger: {
    color: 'red',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'Montreal-Light',
  },
});

export default ForgotOtpScreen;
