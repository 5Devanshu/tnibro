import React, { FC, useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Linking,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { TrackierSDK, TrackierEvent } from 'react-native-trackier';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import styles from './style';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { referalDetail } from '../../apis/Onboarding/verifyEmailOtpSlice';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack, navigation } from '../../Navigation/NavigationService';
import { ROUTE_NAME, scaleHeight, scaleWidth, styleBase } from '../../Constants/enums';

interface ReferScreenProps {
  navigation: any;
}

const ReferScreen: FC<ReferScreenProps> = () => {
  const [referralCode, setReferralCode] = useState('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { isreferalDetailSuccess } = useSelector(
    (state: any) => state.verifyemailOtp
  );

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const [userId, code] = await Promise.all([
          AsyncStorage.getItem('userId'),
          AsyncStorage.getItem('referralcode'),
        ]);
        if (code) setReferralCode(code);
        if (isFocused && userId && code) {
          dispatch(referalDetail({ userid: userId, referral_completed: code }));
        }
      } catch (err) {
        console.error('Failed to fetch referral data:', err);
      }
    };

    fetchReferralData();
  }, [isFocused, dispatch]);

  const referralLink = `https://stockyaari.u9ilnk.me/d/v98MA25TN5?ref=${referralCode}`;

  const shareReferralCode = useCallback(async () => {
    if (!referralCode) return;

    TrackierSDK.trackEvent(new TrackierEvent('7lnE3OclNT'));

    const message = `Download StockYaari App.\n\n Use my referral code: ${referralCode} or click on below link:\n\n${referralLink}\n\nTeam Stockyaari`;

    try {
      await Share.share({ title: 'Share Referral Code', message });
    } catch (error) {
      console.error('Error sharing referral code:', error);
    }
  }, [referralCode]);

  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
    Alert.alert('Copied to clipboard', referralCode);
  };

  const copyToClipboardCode = () => {
    Clipboard.setString(referralLink);
    Alert.alert('Copied to clipboard', referralLink);
  };

  const openReferralLink = () => {
    if (referralCode) {
      Linking.openURL(referralLink).catch(err =>
        console.error('Failed to open referral link:', err)
      );
    }
  };

  const headerRight = () => {
    return (
      <TouchableOpacity style={{ marginRight: 20 }}
        onPress={() => {
          navigation(ROUTE_NAME.REFER_HISTORY, {
            shareReferralCode,
            referralCode,
          });
        }}>
        <Image source={IMAGES.HISTORY_ICON} style={{resizeMode:'contain', height: scaleHeight(22),
            width: scaleWidth(22)}} />
      </TouchableOpacity>
    )
  };

  const referredCount =
    isreferalDetailSuccess?.response?.referred_user?.toString() || '0';
  const subscribedCount =
    isreferalDetailSuccess?.response?.referred_subscribed_user?.toString() || '0';

  return (
    <SafeAreaView style={{ backgroundColor: '#F4F5F7' }}>
      <TitleWithBackBtnHeader onPressBackArrow={goBack} centerTitle="Refer & Earn" headerRight={headerRight()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <Image source={IMAGES.ReferalImage} style={styles.referalImage} />
        <Text style={styles.textShare}>Refer your friend</Text>
        <Text style={styles.textdesc}>
          Share this code with your friend and help them{'\n'}discover Stockyaari!
        </Text>

        <View style={styles.codeContainer}>
          <Text style={styles.referalCode} onPress={openReferralLink}>
            {referralCode}
          </Text>
          <View style={styles.borderline} />
          <TouchableOpacity onPress={copyToClipboard}>
            <Image source={IMAGES.copyIcon} style={styles.copyIconstyle} />
          </TouchableOpacity>
          <Text style={{ color: '#01D4E8' }} onPress={copyToClipboard}>
            Copy Code
          </Text>
        </View>

        {referralCode !== '' && (
          <Text
            style={{
              marginTop: 10,
              color: '#007AFF',
              fontSize: 10,
              textAlign: 'center',
            }}
            onPress={copyToClipboardCode}
          >
            {referralLink}
          </Text>
        )}

        <Text style={[styles.textdesc, { fontWeight: '700' }]}>
          Invite your friends to join and grow together.
        </Text>

        <TouchableOpacity
          onPress={shareReferralCode}
          style={styles.invitefrndcontainer}
        >
          <Text style={styles.textShareyoucode}>Invite Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={1}  onPress={() => {
          navigation(ROUTE_NAME.REFER_HISTORY, {
            shareReferralCode,
            referralCode,
          });
        }}
          style={[
            styles.Countcontainer,
            {
              paddingVertical: scaleHeight(10),
              borderColor: '#BCBCBC',
            },
          ]}
        >
          <View style={styleBase.inrowspaceBetween}>
            <View style={styles.ReferCount}>
              <Text style={styles.txtCount}>
                <Text style={{ fontWeight: 'bold', color: '#5B5B5B' }}>Total</Text> Referral Count
              </Text>
              <Text style={styles.countNumber}>{referredCount}</Text>

              <Text style={styles.txtCount}>
                <Text style={{ fontWeight: 'bold', color: '#5B5B5B' }}>Subscription</Text> Count
              </Text>
              <Text style={styles.countNumber}>{subscribedCount}</Text>
            </View>
            <Image source={IMAGES.refercountimg} style={styles.referImage} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReferScreen;
