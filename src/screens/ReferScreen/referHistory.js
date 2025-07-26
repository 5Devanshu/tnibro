import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../Navigation/NavigationService';
import IMAGES from '../../Constants/enums/ImagesEnum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { store } from '../../store/store';
import { apiEnviornment } from '../../constants';

export default function ReferHistory({ route }) {
  const { referralCode, shareReferralCode } = route.params;

  const [referralUsers, setReferralUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReferralHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = store.getState().authentication.isAccessToken;
        const userId = await AsyncStorage.getItem('userId');

        if (!userId || !token) {
          throw new Error('Missing user credentials.');
        }

        const baseUrl =
          apiEnviornment === 'PRODUCTION'
            ? 'https://india.tnibro.com'
            : 'https://api.tnibro.com';

        const url = `${baseUrl}/referral/user/referrals_details?userid=${userId}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReferralUsers(
          (response.data?.data || []).sort((a, b) => {
            // Sort so that items with plan_activate_status === true come first
            return (b.plan_activate_status === true) - (a.plan_activate_status === true);
          })
        );
      } catch (err) {
        console.error('Referral history error:', err?.message || err);
        setError('Failed to load referral history.');
      } finally {
        setLoading(false);
      }
    };

    fetchReferralHistory();
  }, []);

  const renderUserItem = ({ item }) => {
    const name = item.name ? item.name : "Guest User";
    const firstLetter = name.charAt(0).toUpperCase();
    const isActivated = item.plan_activate_status;

    return (
      <View style={styles.userItem}>
        {/* Avatar Circle */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>

        {/* User Info + Capsule in row */}
        <View style={styles.userInfoWrapper}>
          <View style={{ width: '70%' }}>
            <Text numberOfLines={1} style={styles.userName}>{name}</Text>
            <Text style={styles.userDetail}>{item.phoneno}</Text>
          </View>

          {/* Activation Capsule aligned right */}
          <View
            style={[
              styles.statusCapsule,
              { backgroundColor: isActivated ? '#228B22' : '#FF5F3B' },
            ]}
          >
            <Text style={styles.statusText}>
              {isActivated ? 'Activated' : '  Inactive'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#228B22" />;
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }

    return (
      <FlatList
        data={referralUsers}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
        renderItem={renderUserItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <>
            <Image source={IMAGES.noRecord2} style={{ marginTop: 100, resizeMode: 'contain', height: 200, width: 200,alignSelf:'center' }} />
            <Text style={styles.emptyText}>No referrals found yet.</Text>
          </>

        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TitleWithBackBtnHeader onPressBackArrow={goBack} centerTitle="Referral History" />
      <View style={styles.container}>
        <View style={styles.referralCard}>
          <View style={styles.referralContent}>
            <Image source={IMAGES.shareIcon} style={styles.shareIcon} />
            <View style={styles.codeSection}>
              <Text style={styles.codeText}>{referralCode}</Text>
              <Text style={styles.codeLabel}>Your Referral Code</Text>
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={shareReferralCode}>
              <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentArea}>{renderContent()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F5F7',
  },
  container: {
    flex: 1,
    marginTop: 15,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  referralCard: {
    marginHorizontal: 36,
    marginVertical: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  referralContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shareIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginRight: 12,
  },
  codeSection: {
    flex: 1,
    marginRight: 12,
  },
  codeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  codeLabel: {
    fontSize: 14,
    color: '#888888',
    marginTop: 4,
  },
  shareButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  shareText: {
    fontSize: 14,
    color: '#228B22',
    marginTop: 5,
  },
  contentArea: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#DBDBDB',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#E5FFED33',
  },
  userItem: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  separator: {
    height: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 30,
    fontSize: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#228B22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfoWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  userDetail: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  statusCapsule: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    width: '30%'
  },
  statusText: {
    color: '#fff',
    fontSize: Platform.OS === 'ios' ? 9.5 : 12,
    fontWeight: 'bold',

  },
});
