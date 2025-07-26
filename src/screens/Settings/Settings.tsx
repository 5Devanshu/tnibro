import AppLayout from '../../Components/AppLayout';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loginReset } from '../../apis/Onboarding/authenticationSlice';
import MenuListItem from '../../Components/MenuItem';
import styles from './style'
import { CONSTANT_TEXT } from '../../Constants/enums/constantText';
const Settings: React.FC = (props: any) => {
  const dispatch = useDispatch()

  const handleGoBack = () => {
    props?.navigation.openDrawer();
  };

  const removeLocalStorage = () => {
    AsyncStorage.removeItem('accessToken')
    AsyncStorage.removeItem('activeSymbol');
    AsyncStorage.removeItem('emailVerified');
    AsyncStorage.removeItem('selectedCountry');
  }

  const handleLogout = async() => {
    await removeLocalStorage()
    dispatch(loginReset())
    setTimeout(() => {
      props.navigation.push('Splash')
    }, 1000)
  }

  // const goToProfile = () => {
  //   props.navigation.navigate('Profile')
  // }

  return (
    <AppLayout title={CONSTANT_TEXT.SETTINGS} onBackPress={handleGoBack} isDashboard threeLine>
      <View style={styles.container}>
        <View style={styles.settingsHeader}>
          <Text allowFontScaling={false} style={styles.settingsHeaderTitle}>{CONSTANT_TEXT.SETTINGS}</Text>
        </View>
        <MenuListItem itemIcon={require('../../assets/logout.png')} onClick={() => handleLogout()} title={CONSTANT_TEXT.LOGOUT} />
        {/* <MenuListItem itemIcon={require('../../assets/user.png')} onClick={() => goToProfile()} title={CONSTANT_TEXT.MY_PROFILE} /> */}
      </View>
    </AppLayout>
  );
};



export default Settings;
