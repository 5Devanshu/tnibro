import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';
import styles from './styles';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import {Dimensions} from 'react-native';
import {CONSTANT_TEXT} from '../../../Constants/enums/constantText';
import {useDispatch, useSelector} from 'react-redux';
import {DeactivateFeedback, DeactivateWithPhone} from '../../../apis/Onboarding/DeactivateSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainContainer from '../../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import {goBack} from '../../../Navigation/NavigationService';
import {COLORS} from '../../../Constants/enums';
import CountryPicker from 'react-native-country-picker-modal';

interface DeactivateScreenProps {
  // : string;
  navigation: any;
  route: any;
}

const DeactivateScreen: React.FC<DeactivateScreenProps> = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {height} = Dimensions.get('window');

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [errormsg, setErrorMsg] = useState('');
  const [options, setOptions] = useState([
    {label: `I'm not interested anymore.`, checked: false, code: 'FB101'},
    {label: 'I found a better product.', checked: false, code: 'FB102'},
    {label: 'Inaccurate recommendations.', checked: false, code: 'FB103'},
    {label: 'Performance issues.', checked: false, code: 'FB104'},
    {label: 'Alert Delay & Inaccurate.', checked: false, code: 'FB105'},
    {label: 'Others.', checked: false},
  ]);
  const [countryCode, setCountryCode] = useState('IN'); // Default country code
  const [callingCode, setCallingCode] = useState('91');
  // console.log('callingCode', callingCode);

  const [userdata, setuserData] = useState('');
  const deactivateIdData = useSelector(state => state.deactivateId);
  const {isdeactivateIdSuccess, isdeactivateIdError, loader} = deactivateIdData;

  // useEffect(() => {
  //   if (loader) {
  //   } else if (isdeactivateIdSuccess) {
  //     navigation.navigate('DeactiveOtpScreen', {Checked_Data: Checked_data, phone: phoneNumber});
  //   } else if (isdeactivateIdError) {
  //     setErrorMsg(isdeactivateIdError?.data?.response);
  //   }
  // }, [loader, isdeactivateIdError, isdeactivateIdSuccess]);

  useEffect(() => {
    if (isdeactivateIdSuccess) {
      AsyncStorage.getItem('userId').then(userId => {
        dispatch(
          DeactivateFeedback({
            userid: userId,
            feedback_list: Checked_data,
          }),
        );
      });
      navigation.navigate('DeactiveSubmit');
    } else {
      // setErrorMessage(isdeactivateotpError?.data?.response);
      // closeMode();
    }
  }, [isdeactivateIdSuccess, isdeactivateIdSuccess]);

  const handleInputChange = (text: string) => {
    // Limit the phone number to 10 characters
    const formattedPhoneNumber = text.slice(0, 10);
    setPhoneNumber(formattedPhoneNumber);
  };

  useEffect(() => {
    getuserData();
  }, []);

  const getuserData = async () => {
    const user_Data = await AsyncStorage.getItem('user_Data');
    setuserData(JSON.parse(user_Data));
  };

  const handleSubmit = async () => {
    let requestBody = {
      phoneno: userdata?.phoneno,
      country: userdata?.country,
    };
    dispatch(DeactivateWithPhone(requestBody));
  };

  const toggleOption = index => {
    const updatedOptions = [...options];
    updatedOptions[index].checked = !updatedOptions[index].checked;
    setOptions(updatedOptions);
  };

  const toggleAllOptions = () => {
    const allSelected = options.every(option => option.checked);
    const updatedOptions = options.map(option => ({
      ...option,
      checked: !allSelected,
    }));
    setOptions(updatedOptions);
  };
  const HeaderLine = () => {
    return (
      <>
        <Text allowFontScaling={false} style={styles.txtHelp}>
          Deactivate account 📛
        </Text>
        <Text allowFontScaling={false} style={styles.txttitle}>
          We value your feedback! Please take a moment to let us know the reason for deactivating
          your StockYaari account. Your insights are important in helping us enhance our services
          and address any concerns you may have. Thank you for sharing your feedback with us.
        </Text>
        <Text allowFontScaling={false} style={styles.subTitle}>
          Why you want to Deactivate account !
        </Text>
      </>
    );
  };
  const CustomCheckBox = ({label, checked, onChange}) => {
    return (
      <TouchableOpacity style={styles.checkboxContainer} onPress={onChange}>
        <View style={[styles.checkbox]}>
          {checked && (
            <Text allowFontScaling={false} style={styles.checkmark}>
              ✓
            </Text>
          )}
        </View>
        <View style={styles.labelContainer}>
          <Text allowFontScaling={false} style={styles.label}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const Checked_data = options
    .filter(option => option.checked === true)
    .map(option => option.code)
    .join(', ');

  // const isButtonDisable = !phoneNumber || options.every(option => !option.checked);
  const isButtonDisable = options.every(option => !option.checked);

  const onPressBack = () => {
    goBack();
  };
  const onSelectCountry = country => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };
  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle="Deactivate account" onPressBackArrow={onPressBack} />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? (height * 1) / 100 : 30}>
        <ScrollView
          style={styles.flex}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Image source={IMAGES.deactivateicon} style={styles.deactivateIcon} />
          <View style={styles.mainContainer}>
            <HeaderLine />
            <View style={styles.Checkboxcontainer}>
              {options.map((option, index) => (
                <CustomCheckBox
                  key={index}
                  label={option.label}
                  checked={option.checked}
                  onChange={() => toggleOption(index)}
                />
              ))}
            </View>
            <Text allowFontScaling={false} style={styles.phoneno}>
              Here is your Phone Number {userdata?.country} {userdata?.phoneno}
            </Text>

            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.numberContainer}>
                <CountryPicker
                  countryCode={'IN'}
                  withFlag
                  withCallingCode
                  withFilter
                  withCallingCodeButton
                  onSelect={onSelectCountry}
                  containerButtonStyle={styles.countryPicker}
                />
              </View>
              <TextInput
                allowFontScaling={false}
                style={styles.input}
                placeholder="Enter phone number"
                placeholderTextColor={'gray'}
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={handleInputChange}
              />
            </View> */}
            {/* error message */}
            {/* {errormsg && (
              <Text allowFontScaling={false} style={styles.errorMsg}>
                {errormsg}
              </Text>
            )} */}
            {/* Get code button */}
            <Pressable
              style={[styles.LoginBtn, {opacity: isButtonDisable ? 0.5 : 1}]}
              onPress={handleSubmit}
              disabled={isButtonDisable}>
              {loader ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text allowFontScaling={false} style={styles.loginBtnLbl}>
                  Deactivate Account
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};

export default DeactivateScreen;
