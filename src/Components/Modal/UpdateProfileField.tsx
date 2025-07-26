import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  editProfileData,
  getProfileData,
} from '../../apis/Onboarding/authenticationSlice';
import {
  COLORS,
  SCREEN_WIDTH,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../Constants/enums';
import LinearGradient from 'react-native-linear-gradient';
import FONTS from '../../Constants/enums/Fonts';

const UpdateProfileField = ({isVisible, onClose, onSubmit}) => {
  const {height} = Dimensions.get('window');
  const dispatch = useDispatch();

  const {getProfileSuccess, profileLoader, editProfileLoader} = useSelector(
    (state: any) => state.authentication,
  );
  const {isLoading} = useSelector((state: any) => state.CreateSubscSlice);

  const getProfileDetails = useCallback(() => {
    AsyncStorage.getItem('userId').then(userId => {
      if (userId) {
        dispatch(getProfileData({userId}));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    getProfileDetails();
  }, [getProfileDetails]);

  const formInitialValues = useMemo(
    () => ({
      username: getProfileSuccess?.username || '',
      email: getProfileSuccess?.email || '',
      phoneno: getProfileSuccess?.phoneno || '',
    }),
    [getProfileSuccess],
  );

  const validationSchema = useMemo(() => {
    const base = {
      username: Yup.string().required('Name is required'),
    };
    if (!getProfileSuccess?.phoneno) {
      base['email'] = Yup.string()
        .email('Invalid email')
        .required('Email is required');
    }
    return Yup.object().shape(base);
  }, [getProfileSuccess]);

  const handleEditProfile = useCallback(
    values => {
      AsyncStorage.getItem('userId').then(userId => {
        if (userId) {
          dispatch(editProfileData({userId, request: values}));
        }
      });
    },
    [dispatch],
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.outterBtn} activeOpacity={1} onPress={onClose} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          {profileLoader ? (
            <View style={[styles.container, {height: (height * 67.46) / 100}]}>
              <ActivityIndicator size="large" color="blue" />
            </View>
          ) : (
            <View style={styles.innerView}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={Keyboard.dismiss}
              />
              <View style={styles.lineView} />
              <Formik
                initialValues={formInitialValues}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={onSubmit || handleEditProfile}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={styles.form}>
                    <Text style={styles.head}>Name</Text>
                    <TextInput
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                      placeholder="Name"
                      placeholderTextColor="#6b7280"
                      style={styles.input}
                    />
                    {touched.username && errors.username && (
                      <Text style={styles.error}>{errors.username}</Text>
                    )}

                    <Text style={styles.head}>Phone</Text>
                    <TextInput
                      value={values.phoneno}
                      keyboardType="number-pad"
                      editable={false}
                      selectTextOnFocus={false}
                      style={styles.input}
                    />

                    <Text style={styles.head}>Email</Text>
                    <TextInput
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder="Email address"
                      placeholderTextColor="#6b7280"
                      keyboardType="email-address"
                      style={styles.input}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.error}>{errors.email}</Text>
                    )}
                      <TouchableOpacity style={{backgroundColor:'#228B22',marginTop:15,borderRadius:8}} onPress={handleSubmit}>
                        <View style={styles.gradientStyle}>
                          {(isLoading || editProfileLoader) ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            <Text style={styles.buttonText}>
                              Save and Pay now
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  head: {
    fontSize: normalizeFont(16),
    marginBottom:5,
    color: COLORS.Black,
    fontFamily: FONTS.RobotoRegular,
  },
  outterBtn: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  graidentView: {
    alignSelf: 'center',
    borderRadius: scaleWidth(16),
    marginTop: scaleHeight(20),
  },
  gradientStyle: {
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(72),
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoMedium,
  },
  innerView: {
    width: '100%',
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(54),
    paddingTop: scaleHeight(7),
    backgroundColor: COLORS.white,
    borderTopLeftRadius: scaleHeight(24),
    borderTopRightRadius: scaleHeight(24),
  },
  lineView: {
    width: scaleWidth(37),
    height: scaleHeight(4),
    alignSelf: 'center',
    backgroundColor: COLORS.RGB_173_173_173,
    marginBottom: scaleHeight(20),
    borderRadius: scaleHeight(2),
  },
  mainContainer: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: COLORS.LIGHT_GRAY,
    justifyContent: 'flex-end',
  },
  form: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: normalizeFont(16),
    color: '#000',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default React.memo(UpdateProfileField);
