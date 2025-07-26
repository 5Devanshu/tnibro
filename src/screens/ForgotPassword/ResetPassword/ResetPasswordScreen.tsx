import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import {Formik} from 'formik';
import FormInput from '../../../Components/FormInput';
import {useDispatch, useSelector} from 'react-redux';
import {patchCnfPassword, postVerifyOtp} from '../../../apis/Onboarding/forgotPasswordSlice';
import {Platform} from 'react-native';
import {normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums/Dimensions';

let loginTimeout: number | null = null;

interface ResetPasswordScreenProps {
  navigation: any; // Replace 'any' with appropriate navigation type
  route: any;
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({navigation, route}) => {
  const {email} = route.params;
  const resetpasswordData = useSelector(state => state.forgotPassword);
  const {isCnfPasswordSuccess, isCnfPasswordError} = resetpasswordData;

  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const dispatch = useDispatch();

  const handleOptionClick = () => {
    setPasswordHidden(!isPasswordHidden);
  };

  const handleOnSubmit = values => {
    if (values.password === values.cfmpassword) {
      let requestBody = {
        email: email,
        password: values.password,
      };
      dispatch(patchCnfPassword(requestBody));
    }
  };
  const handleSession = () => {
    if (isCnfPasswordSuccess?.response) {
      clearTimeout(loginTimeout);
      loginTimeout = setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);
    }
  };
  useEffect(() => {
    handleSession();
  }, [isCnfPasswordSuccess]);

  useEffect(() => {
    if (isCnfPasswordSuccess?.response) {
    }
  }, [isCnfPasswordSuccess]);
  const getValidationSchema = () => {};

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={styles.backButton_containe}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={styles.hitslop}>
            <Image source={IMAGES.Back_Icon} style={styles.backIcon} />
          </Pressable>
        </View>
        <View style={styles.content}>
          <Text allowFontScaling={false} style={styles.headline}>Reset your password</Text>
          <Text allowFontScaling={false} style={styles.title}>Enter your new password</Text>
          <Formik
            initialValues={{password: '', cfmpassword: ''}}
            onSubmit={handleOnSubmit}
            validationSchema={getValidationSchema()}>
            {({handleChange, handleSubmit, values, errors, touched}) => (
              <View>
                <Text allowFontScaling={false} style={styles.label}>New Password</Text>
                <View style={styles.textInputView}>
                  <TextInput
                    allowFontScaling={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    onChangeText={handleChange('password')}
                    placeholder="******"
                    placeholderTextColor="#DEDEDE"
                    secureTextEntry={isPasswordHidden}
                    value={values.password}
                    style={styles.TextInputstyle}
                    // optionIcon={IMAGES.Eye}
                    // onOptionClick={handleOptionClick}
                  />
                  <TouchableWithoutFeedback onPress={handleOptionClick}>
                    <Text allowFontScaling={false} style={styles.textShow}>Show</Text>
                  </TouchableWithoutFeedback>
                </View>
                <Text allowFontScaling={false} style={styles.errorText}>{touched.password && errors.password}</Text>
                <Text allowFontScaling={false} style={styles.text_confirmpass}>Confirm Password</Text>
                <View style={styles.textInputView}>
                  <TextInput
                    allowFontScaling={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="default"
                    onChangeText={handleChange('cfmpassword')}
                    placeholder="*****"
                    placeholderTextColor="#DEDEDE"
                    secureTextEntry={isPasswordHidden}
                    value={values.cfmpassword}
                    style={styles.TextInputstyle}
                  />
                  <TouchableWithoutFeedback onPress={handleOptionClick}>
                    <Text allowFontScaling={false} style={styles.textShow}>Show</Text>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{marginTop: 78}}>
                  <Pressable style={styles.VerifyBtn} onPress={handleSubmit}>
                    <Text allowFontScaling={false} style={styles.VerifyBtnLbl}>Verify</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>
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
    marginBottom: 200,
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
    color: '#5D6166',
    fontSize: normalizeFont(14),
    fontWeight: '400',
    marginTop: scaleHeight(12),
    marginBottom: 40,
  },
  label: {
    color: '#5D6166',
    fontSize: normalizeFont(12),
    fontWeight: '400',
  },
  textInputView: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  TextInputstyle: {
    backgroundColor: '#FFFFFF',
    color: '#5D6166',
    paddingVertical: scaleHeight(14),
    paddingHorizontal: scaleWidth(16),
    fontSize: 16,
    borderRadius: 12,
    width: '85%',
  }, ////
  VerifyBtn: {
    ///nouse
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
  /////
  textShow: {
    textAlign: 'right',
    marginRight: 16,
    fontSize: 14,
    color: '#5D6166',
  },
  errorText: {
    color: 'red',
  },
  text_confirmpass: {
    color: '#5D6166',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 20,
  },
});

export default ResetPasswordScreen;
