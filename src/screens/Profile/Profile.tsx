import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import {
  editProfileData,
  editProfileReset,
  getProfileData,
} from '../../apis/Onboarding/authenticationSlice';
import MenuListItem from '../../Components/MenuItem';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import FormInput from '../../Components/FormInput';
import styles from './style';
import { CONSTANT_TEXT } from '../../Constants/enums/constantText';
import { goBack, toggleDrawer } from '../../Navigation/NavigationService';
import MainContainer from '../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import { COLORS } from '../../Constants/enums';
import CommonButton from '../../Components/Button/CommonButton';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';

const Profile: React.FC = (props: any) => {
  const { height } = Dimensions.get('window');
  const authenticationData = useSelector((state: any) => state.authentication);
  const { getProfileSuccess, profileLoader, editProfileLoader, editProfileSuccess } =
    authenticationData;
  const paymentData = useSelector((state: any) => state.CreateSubscSlice);
  const { isPremiumUser } = paymentData;
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState(null);
  const [profileData, setProfileData] = useState(null);

  const handleGoBack = () => {
    // props?.navigation.openDrawer();
    toggleDrawer();
  };

  const handleEdit = async () => {
    if (!editMode) {
      if (getProfileSuccess?.email) {
        await setFormInitialValues({
          username: getProfileSuccess?.username || '',
          email: getProfileSuccess?.email || '',
          phoneno: getProfileSuccess?.phoneno || '',
        });
      } else {
        await setFormInitialValues({
          username: getProfileSuccess?.username || '',
          phoneno: getProfileSuccess?.phoneno || '',
        });
      }
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  };

  const getProfileDetails = () => {
    AsyncStorage.getItem('userId').then(userId => {
      dispatch(
        getProfileData({
          userId: userId,
        }),
      );
    });
  };
  useEffect(() => {
    getProfileDetails();
  }, []);

  useEffect(() => {
    if (getProfileSuccess) {
      setProfileData(getProfileSuccess);
    }
  }, [getProfileSuccess]);

  const getValidationSchema = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (getProfileSuccess?.phoneno) {
      return Yup.object().shape({
        username: Yup.string().required('Name is required'),
      });
    } else {
      return Yup.object().shape({
        username: Yup.string().required('Name is required'),
        email: Yup.string()
          .matches(emailRegex, 'Invalid email address')
          .email('Invalid email')
          .required('Email is required'),
      });
    }
  };

  const handleEditProfile = (values: any) => {
    AsyncStorage.getItem('userId').then(userId => {
      dispatch(
        editProfileData({
          userId: userId,
          request: values,
        }),
      );
      var trackierEvent = new TrackierEvent("719qCHiv66");
      trackierEvent.param1 = isPremiumUser === true ? 'paid_user' : 'trial_user';
      if (userId) {
        TrackierSDK.setUserId(userId);
      }
      TrackierSDK.trackEvent(trackierEvent);
    });
  };

  useEffect(() => {
    if (editProfileSuccess === 'success') {
      getProfileDetails();
      setEditMode(false);
      setTimeout(() => {
        dispatch(editProfileReset());
      }, 2000);
    }
  }, [editProfileSuccess]);

  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle="My Profile" onPressBackArrow={() => goBack()} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? (height * 1) / 8 : 30}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {profileLoader ? (
            <View
              style={[
                styles.container,
                { height: (height * 67.46) / 100, justifyContent: 'center' },
              ]}>
              <ActivityIndicator size="large" color="blue" />
            </View>
          ) : (
            <View style={styles.container}>
              <>
                {editMode ? (
                  <Formik
                    initialValues={formInitialValues}
                    onSubmit={handleEditProfile}
                    validationSchema={getValidationSchema()}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                      <>
                        <MenuListItem title={CONSTANT_TEXT.NAME} isStatic />
                        <FormInput
                          allowFontScaling={false}
                          autoCapitalize="none"
                          autoCorrect={false}
                          onChangeText={handleChange('username')}
                          placeholder="Name"
                          placeholderTextColor="#6b7280"
                          // style={styles.inputControl}
                          value={values.username}
                        />
                        <Text allowFontScaling={false} style={{ color: 'red' }}>
                          {touched.username && errors.username}
                        </Text>
                        <>
                          <MenuListItem title={CONSTANT_TEXT.EMAIL} isStatic />
                          <FormInput
                            allowFontScaling={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            placeholder="Email address"
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            value={values.email}
                            // isDisabled={getProfileSuccess?.email ? true : false}
                            isDisabled={false}
                          />
                          <Text allowFontScaling={false} style={{ color: 'red' }}>
                            {touched.email && errors.email}
                          </Text>
                        </>
                        <>
                          <MenuListItem title={CONSTANT_TEXT.PHONE} isStatic />
                          <FormInput
                            allowFontScaling={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="number-pad"
                            onChangeText={handleChange('phoneno')}
                            placeholder="Phone number"
                            placeholderTextColor="#6b7280"
                            style={[styles.inputControl, { color: 'silver' }]}
                            value={values.phoneno}
                            isDisabled={true}
                          />
                          <Text allowFontScaling={false} style={{ color: 'red' }}>
                            {touched.phoneno && errors.phoneno}
                          </Text>
                        </>
                        <View style={styles.formAction}>
                          {editProfileLoader ? (
                            <View style={styles.btn}>
                              <ActivityIndicator size="small" color="#fff" />
                            </View>
                          ) : (
                            <>
                              <CommonButton
                                text={CONSTANT_TEXT.SAVE}
                                paddingVertical={17}
                                paddingHorizontal={100}
                                onPress={handleSubmit}
                              />
                              <Text
                                allowFontScaling={false}
                                style={{ color: 'green', marginTop: 20, textAlign: 'center' }}>
                                {editProfileSuccess === CONSTANT_TEXT.SUCCESS
                                  ? CONSTANT_TEXT.PROFILE_SAVE
                                  : ''}
                              </Text>
                            </>
                          )}
                        </View>
                      </>
                    )}
                  </Formik>
                ) : (
                  <>
                    <MenuListItem title={CONSTANT_TEXT.NAME} isStatic />
                    <Text allowFontScaling={false} style={styles.profileText}>
                      {getProfileSuccess?.username || 'N/A'}
                    </Text>
                    <MenuListItem title={CONSTANT_TEXT.EMAIL} isStatic />
                    <Text allowFontScaling={false} style={styles.profileText}>
                      {getProfileSuccess?.email || 'N/A'}
                    </Text>
                    <MenuListItem title={CONSTANT_TEXT.PHONE} isStatic />
                    <Text allowFontScaling={false} style={styles.profileText}>
                      {getProfileSuccess?.phoneno || 'N/A'}
                    </Text>
                  </>
                )}
              </>

              {!editMode && (
                <View style={[styles.settingsHeader]}>
                  {/* <TouchableWithoutFeedback style={styles.rightContainer} onPress={handleEdit}>
                  <Image
                    alt=""
                    resizeMode="contain"
                    style={styles.rightIcon}
                    source={!editMode ? require('../../assets/edit.png') : IMAGES.Rejected}
                  />
                </TouchableWithoutFeedback> */}
                  <CommonButton
                    text="Update"
                    paddingVertical={17}
                    paddingHorizontal={100}
                    onPress={handleEdit}
                  />
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

export default Profile;
