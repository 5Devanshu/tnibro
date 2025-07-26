import React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { scaleHeight, scaleWidth } from '../../Constants/enums/Dimensions';

export default function Otp() {
  const authenticationData = useSelector(state => state.authentication);
  const {countrySelected} = authenticationData;

  return (
    <ScrollView style={{backgroundColor: '#e8ecf4'}}>
      <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={styles.contContain}>
          <View style={styles.headerImg}>
            <Image alt="" resizeMode="contain" source={IMAGES.Logotnibro} />
          </View>
          <View style={{bottom: 30}}>
            <View style={styles.container}>
              <View style={styles.loginLblCon}>
                <Text allowFontScaling={false} style={styles.loginLbl}>Forgot Password?</Text>
              </View>
              <View style={styles.forgotDes}>
                <Text allowFontScaling={false} style={styles.forgotDesLbl}>
                  Please enter the registered{' '}
                  {countrySelected === 'India' ? (
                    <Text allowFontScaling={false}> phone number</Text>
                  ) : (
                    <Text allowFontScaling={false}> emailId</Text>
                  )}
                </Text>
              </View>

              <Formik
                initialValues={{
                  email: '',
                  phone: '',
                }}
                onSubmit={values => console.log(values)}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Invalid email').required('Email is required'),
                  phone: Yup.string().matches(/^[0-9]+$/, 'Phone number should be numeric'),
                })}>
                {({handleChange, handleSubmit, values, errors, touched}) => (
                  <View style={styles.formCon}>
                    {countrySelected === 'India' ? (
                      <View style={styles.input}>
                        <TextInput
                         allowFontScaling={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          keyboardType="numeric"
                          onChangeText={handleChange('phone')}
                          placeholder="000000000"
                          placeholderTextColor="#6b7280"
                          style={styles.inputControl}
                          value={form.email}
                        />
                        <Text allowFontScaling={false} style={{color: 'red'}}>{touched.phone && errors.phone}</Text>
                      </View>
                    ) : (
                      <View style={styles.input}>
                        <TextInput
                         allowFontScaling={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          keyboardType="email-address"
                          onChangeText={handleChange('email')}
                          placeholder="john@example.com"
                          placeholderTextColor="#6b7280"
                          style={styles.inputControl}
                          value={values.email}
                        />
                        <Text allowFontScaling={false} style={{color: 'red'}}>{touched.email && errors.email}</Text>
                      </View>
                    )}

                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          handleSubmit;
                        }}>
                        <View style={styles.btn}>
                          <Text allowFontScaling={false} style={styles.btnText}>Verify</Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 100,
                      }}>
                      <Pressable>
                        <Text allowFontScaling={false} style={styles.registerLbl}>Resend OTP</Text>
                      </Pressable>
                      <Pressable>
                        <Text allowFontScaling={false} style={styles.registerLbl}>
                          {countrySelected === 'India' ? 'Change Number' : 'Change Email'}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
    marginBottom: 200,
  },
  headerImg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: scaleHeight(20),
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: scaleWidth(20),
    marginTop: 100,
  },
  loginLblCon: {
    alignItems: 'center',
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  forgotDes: {
    alignItems: 'center',
    position: 'relative',
    bottom: 35,
    paddingBottom: scaleHeight(20),
  },
  forgotDesLbl: {
    color: '#000',
  },
  registerLbl: {
    color: 'green',
    justifyContent: 'flex-start',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#000',
    fontWeight: 'bold',
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(110),
    borderWidth: 1,
    backgroundColor: 'green',
    borderColor: 'green',
    marginBottom: 10,
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: scaleWidth(70),
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  contContain: {
    marginTop: 100,
  },
});
