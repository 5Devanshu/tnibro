import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import IMAGES from '../Constants/enums/ImagesEnum';
import {
  COLORS,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../Constants/enums';
import { getProfileData, loginReset } from '../apis/Onboarding/authenticationSlice';
import { CONSTANT_TEXT } from '../Constants/enums/constantText';
import SocialMediaContainer from './SocialMediaContainer';
import FONTS from '../Constants/enums/Fonts';
import { apiEnviornment } from '../constants';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CustomDrawerContent = ({ state, navigation }) => {
  const dispatch = useDispatch();
  const [bannerUrl, setBannerUrl] = useState(null);
  const authenticationData = useSelector((state) => state.authentication);
  const { getProfileSuccess } = authenticationData;
  const paymentData = useSelector((state) => state.CreateSubscSlice);
  const { isPremiumUser } = paymentData;
  const HomeScreeneData = useSelector((state) => state.HomeScreenSlice);
  const { isAdvertisementBannerSuccess } = HomeScreeneData;
  const market_status = useSelector((state: any) => state.HomeScreenSlice?.market_status);

  useEffect(() => {
    const banner = isAdvertisementBannerSuccess?.response?.data?.find(
      (b) => b.screen_name === 'DrawerNavigation'
    );
    if (banner) {
      setBannerUrl(banner.screen_url);
    }
  }, [isAdvertisementBannerSuccess]);

  useEffect(() => {
    const fetchSubscriptionPlan = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        dispatch(getProfileData({ userId }));
      }
    };
    fetchSubscriptionPlan();
  }, [dispatch]);

  const removeLocalStorage = async () => {
    const keysToRemove = [
      'accessToken',
      'activeSymbol',
      'emailVerified',
      'selectedCountry',
      'userId',
      'segment_Detail',
      'isverified',
      'active_PlanCode'
    ];
    await AsyncStorage.multiRemove(keysToRemove);
  };

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to Log Out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Logout',
          onPress: async () => {
            await removeLocalStorage();
            var trackierEvent = new TrackierEvent("pr1kg0PakC");
            trackierEvent.param1 = isPremiumUser === true ? 'paid_user' : 'trial_user';
            TrackierSDK.trackEvent(trackierEvent);
            dispatch(loginReset());
            setTimeout(() => {
              navigation.push('Splash');
            }, 1000);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const getGreetingAndIcon = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 12) return { greeting: 'Good Morning', icon: IMAGES.DRAWER_TAB_ICON.morningIcon };
    if (hours >= 12 && hours < 17) return { greeting: 'Good Afternoon', icon: IMAGES.DRAWER_TAB_ICON.afternoonIcon };
    if (hours >= 17 && hours < 21) return { greeting: 'Good Evening', icon: IMAGES.DRAWER_TAB_ICON.eveningIcon };
    return { greeting: 'Good Night', icon: IMAGES.DRAWER_TAB_ICON.nightIcon };
  };

  const RenderIcons = (tabName: string, focused: boolean) => {
    switch (tabName) {
      case 'My Profile':
        return IMAGES.DRAWER_TAB_ICON.MY_PROFILE_ICON;
      case 'About Us':
        return IMAGES.DRAWER_TAB_ICON.ABOUT_US_ICON;
      case 'How it works':
        return IMAGES.DRAWER_TAB_ICON.HELP_ICON;
      case 'Refund':
        return IMAGES.DRAWER_TAB_ICON.REFUND_ICON;
      case 'Support':
        return IMAGES.DRAWER_TAB_ICON.SUPPORT_ICON;

      default:
        return null;
    }
  };

  const Footer = ({ isPremiumUser, bannerUrl }) => {
    const WHATSAPP_URL = "whatsapp://send?phone=9355123233";

    const handleSupportEmail = () => {
      Alert.alert(
        'Contact Us',
        'For any queries or support, please email us at support@stockyaari.com.',
        [
          { text: 'Email', onPress: () => Linking.openURL(`mailto:${CONSTANT_TEXT.CONTACT_SUPPORT_EMAIL}`) },
          { text: 'OK' },
        ]
      );
    };

    const handleWhatsApp = () => {
      Linking.canOpenURL(WHATSAPP_URL)
        .then(supported => {
          if (supported) {
            Linking.openURL(WHATSAPP_URL);
          } else {
            Alert.alert(
              'WhatsApp Not Found',
              'Please install WhatsApp to contact support.',
            );
          }
        })
        .catch(err => {
          console.error('An error occurred while trying to open WhatsApp:', err);
        });
    };

    return (
      <View style={styles.footerContainer}>
        {/* Social Media */}
        <SocialMediaContainer />

        {/* Divider */}
        <View style={styles.divider} />

        {/* Version and Contact */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>{apiEnviornment === 'STAGING' && <Text style={styles.versionText}>{apiEnviornment} </Text>}version {DeviceInfo.getVersion()}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Email Support */}
            <TouchableOpacity onPress={handleSupportEmail}>
              <Text style={styles.supportText}>support@stockyaari.com</Text>
            </TouchableOpacity>

            {/* WhatsApp Icon */}
            <TouchableOpacity onPress={handleWhatsApp} style={{ marginLeft: scaleWidth(10) }}>
              <Image
                source={IMAGES.whatsapp}
                style={{
                  height: scaleHeight(23),
                  width: scaleWidth(23),
                  resizeMode: 'contain'
                }}
              />
            </TouchableOpacity>
            {/* Phone */}
            <TouchableOpacity onPress={() => Linking.openURL('tel:' + '08035714673')} style={{ marginLeft: Platform.OS === 'android' ? scaleWidth(15) : 10 }}>
              <FontAwesome name={'phone-square'}
                size={24}
                color={'#228B22'} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={styles.supportBox}
        >
          <Text style={{ fontSize: 10, color: '#333', fontWeight: '600' }}>
            Working hours:{' '}
            <Text style={{ color: '#333', fontWeight: '400' }}>
              {`Monday to Friday,10:00 AM to 6:30 PM`}
            </Text>
          </Text>
        </View>

      </View>
    );
  };

  const { greeting, icon } = getGreetingAndIcon();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.greetingContainer}>
        <TouchableOpacity disabled >
          <Image source={icon} style={styles.greetingIcon} />
        </TouchableOpacity>
        <Text style={styles.greetingText}>{greeting} !</Text>
        <Text style={styles.usernameText}>{getProfileSuccess?.username ?? 'Guest User'}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
          <Text style={styles.marketStatus}>Market Status</Text>
          <Text
            style={{
              marginLeft: 8,
              marginTop: 6,
              fontSize: 14,
              fontWeight: '600',
              color: '#fff',
              backgroundColor: market_status === 'OPEN' ? 'green' : 'red', // Dynamic background color
              borderRadius: 10, // Rounded corners
              paddingHorizontal: 8, // Add horizontal padding
              paddingVertical: 4, // Add vertical padding
            }}
          >
            {market_status}
          </Text>
        </View>

      </View>
      {/* Drawer Items */}
      <ScrollView>
        {state?.routes.map((item: any, index: number) => {
          if (index === 0) {
            // Skip rendering the first item
            return null;
          }

          const isFocused = state.index === index;
          return (
            <TouchableOpacity
              key={item?.name}
              onPress={() => navigation.navigate(item?.name)}>
              <View style={styles.optionContainer}>
                <Image
                  resizeMode={'contain'}
                  source={RenderIcons(item?.name, isFocused)}
                  style={styles.tabItem}
                />
                <Text
                  allowFontScaling={false}
                  style={styles.selectBtnTxt}>
                  {item?.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity onPress={() => handleLogout()}>
          <View style={[styles.optionContainer, { marginBottom: 22 }]}>
            <Image
              resizeMode={'contain'}
              source={IMAGES.DRAWER_TAB_ICON.LOGOUT_ICON}
              style={[styles.tabItem]}
            />
            <Text allowFontScaling={false} style={[styles.selectBtnTxt, { color: '#000' }]}>
              {CONSTANT_TEXT.LOGOUT}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer Section */}
      <Footer isPremiumUser={isPremiumUser} bannerUrl={bannerUrl} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  greetingContainer: { marginTop: scaleHeight(5), marginLeft: scaleWidth(22), marginBottom: 12 },
  greetingIcon: { height: scaleHeight(100), width: scaleWidth(100), resizeMode: 'contain' },
  greetingText: { fontSize: normalizeFont(24), fontWeight: 'bold', color: COLORS.PrimaryBlack, marginTop: scaleHeight(15) },
  usernameText: { fontSize: normalizeFont(24), fontWeight: 'bold', color: COLORS.PrimaryBlack, maxWidth: 250 },
  marketStatus: { fontSize: normalizeFont(14), color: COLORS.BorderColor, marginTop: 10, fontWeight: '400' },
  drawerItemContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: scaleHeight(8), marginLeft: scaleWidth(20), backgroundColor: '#F4F5F7', borderRadius: scaleWidth(15), marginTop: scaleHeight(15), paddingHorizontal: scaleWidth(12) },
  drawerIcon: { height: scaleHeight(44), width: scaleWidth(44) },
  drawerLabel: { marginLeft: scaleWidth(12), fontSize: normalizeFont(14), fontWeight: '400', color: COLORS.PrimaryBlack },
  footerContainer: { marginBottom: scaleHeight(20), width: '100%' },
  bannerImage: { height: scaleHeight(95), width: '70%', alignSelf: 'center', marginTop: scaleHeight(8) },
  divider: { borderBottomWidth: 0.6, borderColor: '#4A4A4A', marginVertical: 10 },
  versionContainer: { marginLeft: scaleWidth(20) },
  versionText: { fontSize: normalizeFont(14), color: COLORS.Black, fontWeight: '400' },
  supportText: { fontSize: normalizeFont(14), color: COLORS.Black, fontWeight: '700' },
  selectBtnTxt: {
    fontSize: normalizeFont(14),
    fontWeight: '400',
    textAlign: 'center',
    marginLeft: scaleWidth(12),
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoRegular,
  },
  optionContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F4F5F7',
    flexDirection: 'row',
    paddingVertical: scaleHeight(8),
    width: '70%',
    borderRadius: scaleWidth(15),
    marginTop: scaleHeight(12),
    marginLeft: scaleWidth(20),
  },
  tabItem: {
    height: scaleHeight(44),
    width: scaleWidth(44),
    marginLeft: scaleWidth(12),
  },
  supportBox: {
    borderWidth: 1,
    marginTop: 8,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 3,
    paddingHorizontal: 5,
    borderColor: '#FBB142',
    backgroundColor: '#FFF7EB',
  }
});

export default React.memo(CustomDrawerContent);
