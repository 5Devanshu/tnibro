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
  Platform,
} from 'react-native';
import IMAGES from '../../Constants/enums/ImagesEnum';
import {CONSTANT_TEXT} from '../../Constants/enums/constantText';
import styles from './style';
import {Formik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {getforgotPasswordEmail} from '../../apis/Onboarding/forgotPasswordSlice';

let loginTimeout: number | null = null;

const ForgotPasswordScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const [isemail, setEmail] = useState('');
  const fogotpasswordData = useSelector((state:any) => state.forgotPassword);
  const {isFogotpasswordSuccess, isFogotPasswordError} = fogotpasswordData;

  const handleOnSubmit = values => {
    setEmail(values.email);
    let requestBody = {
      user_email: values.email,
    };
    dispatch(getforgotPasswordEmail(requestBody));
  };
  const getValidationSchema = () => {};

  const handleSession = () => {
    if (isFogotpasswordSuccess?.response) {
      clearTimeout(loginTimeout);
      loginTimeout = setTimeout(() => {
        navigation.navigate('ForgotOtpScreen', {
          email: isemail,
        });
      }, 1000);
    }
  };
  
  useEffect(() => {
    handleSession();
  }, [isFogotpasswordSuccess]);

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={styles.backButtonContainer}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={styles.hitSlop}>
            <Image source={IMAGES.Back_Icon} style={styles.backButton} />
          </Pressable>
        </View>
        <View style={styles.forgotPasswordContainer}>
          <Text allowFontScaling={false} style={styles.headline}>Forgot Password</Text>
          <Text allowFontScaling={false} style={styles.title}>Enter your email to continue</Text>
          <Formik
            initialValues={{email: ''}}
            onSubmit={handleOnSubmit}
            validationSchema={getValidationSchema()}>
            {({handleChange, handleSubmit, values, errors, touched}) => (
              <View>
                <Text allowFontScaling={false} style={styles.emailheader}>{CONSTANT_TEXT.EMAIL_ADDRESS}</Text>
                <TextInput
                  allowFontScaling={false}
                  autoCapitalize="none"
                  autoCorrent={false}
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  placeholder={'Your email address'}
                  placeholderTextColor="#8B9199"
                  value={values.email}
                  style={styles.imputfield}
                />
                <Text allowFontScaling={false} style={styles.error}>{touched.email && isFogotPasswordError?.response}</Text>
                <View style={styles.margintop}>
                  <Pressable style={styles.LoginBtn} onPress={handleSubmit}>
                    <Text allowFontScaling={false} style={styles.loginBtnLbl}>{CONSTANT_TEXT.GET_CODE}</Text>
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
export default ForgotPasswordScreen;
