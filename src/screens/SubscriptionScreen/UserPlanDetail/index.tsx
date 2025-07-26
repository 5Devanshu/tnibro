import React, { FC, useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  LayoutAnimation,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text
} from 'react-native';
import styles from './styles';
import { CONSTANT_TEXT, ROUTE_NAME } from '../../../Constants/enums';
import { goBack, navigation, push } from '../../../Navigation/NavigationService';
import { Loader } from '../../../Components/Loader';
import {
  subscription_plan,
  Topup_plan,
  user_subscription,
  user_topup_plan,
} from '../../../apis/Onboarding/PaymentApi/CreateSubscSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdateProfileModal from '../../../Components/Modal/UpdateProfileModal';
import { getProfileData } from '../../../apis/Onboarding/authenticationSlice';
import UserplanContainer from './UserplanContainer';
import GradientButton from '../../../Components/Button/GradientButton';
import SubscriptionAgreementText from '../../../Components/DisclamerContainer/PrivacyPolicy';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface UserPlanDetailScreenProps {
  //   navigation: any;
}
const UserPlanDetailScreen: FC<UserPlanDetailScreenProps> = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const paymentData = useSelector(state => state.CreateSubscSlice);
  const { topup_plan_length, issubscription_planSuccess, isLoadingsubscription_plan } = paymentData;
  const authenticationData = useSelector((state: any) => state.authentication);
  const { getProfileSuccess } = authenticationData;
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState(null);
  const [userPlanList, setUserPlanList] = useState([]);
  const [active_PlanCode, setActive_PlanCode] = useState('');
  AsyncStorage.getItem('active_PlanCode').then(value => {
    setActive_PlanCode(value)
  });

  const GetSubsPlan = async () => {
    let userid = await AsyncStorage.getItem('userId');
    if (userid) {
      dispatch(user_subscription({ userid: userid })); // send id in topup
      dispatch(subscription_plan()); //new changes
      dispatch(user_topup_plan({ userid: userid }));
      dispatch(
        getProfileData({
          userId: userid,
        }),
      );
    }
  };
  useEffect(() => {
    if (issubscription_planSuccess?.response) {
      const activeSubscription = issubscription_planSuccess?.response?.users_plan.find(
        item => item.plan_name?.[0]?.plan_code === active_PlanCode
      );

      const activeTopup = issubscription_planSuccess?.response?.users_plan.filter(
        item => item.is_topup === true
      );

      setUserPlanList([
        ...(activeSubscription ? [activeSubscription] : []),
        ...activeTopup
      ]);
    }
  }, [issubscription_planSuccess]);

  useEffect(() => {
    if (isFocused) {
      GetSubsPlan();
    }
  }, [isFocused]);
  useEffect(() => {
    const getDATA = async () => {
      let userid = await AsyncStorage.getItem('userId');
      if (userid) {
        dispatch(Topup_plan({ userid: userid }));
      }
    };
    getDATA();
  }, []);

  const showUpdateModal = () => {
    let isShow = false;
    if (getProfileSuccess?.email && getProfileSuccess?.username && getProfileSuccess?.phoneno) {
      return (isShow = true);
    }
    return (isShow = false);
  };
  const handleCloseModal = () => {
    push('Profile');
    setModalVisible(false);
  };

  const onPressNext = () => {
    if (!showUpdateModal()) {
      setModalVisible(true);
    } else {
      navigation(ROUTE_NAME.UPGRADE_PLAN_SCREEN);
    }
  };

  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedPlan(expandedPlan === index ? null : index);
  };

  const headerRight = () => {
    return (
      <TouchableOpacity style={{ marginRight: 20 }}
        onPress={() => {
          navigation(ROUTE_NAME.SUBSCRIPTION_HISTORY);
        }}>
        <Image source={IMAGES.HISTORY_ICON} style={styles.historyicon} />
      </TouchableOpacity>
    )
  };


  const UserInfoBox = ({ getProfileSuccess }) => {
    return (
      <View style={styles.userInfoBox}>
        {/* Username */}
        <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: '70%' }}>
          <Icon name="person" size={16} color="#FBB142" style={{ marginRight: 6 }} />
          <Text numberOfLines={1}
            ellipsizeMode="tail" style={{ fontSize: 14, color: '#323C47', flexShrink: 1 }}>
            {getProfileSuccess?.username ?? 'Guest User'}
          </Text>
        </View>
        {/* Phone */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="phone" size={16} color="#FBB142" style={{ marginRight: 6 }} />
          <Text style={{ fontSize: 14, color: '#323C47' }}>
            {getProfileSuccess?.phoneno ?? 'N/A'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F5F7' }}>
      {isLoadingsubscription_plan ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <TitleWithBackBtnHeader
            onPressBackArrow={goBack}
            centerTitle={CONSTANT_TEXT.YOUR_PLAN_DETAIL}
            headerRight={headerRight()}
          />
          <UserInfoBox getProfileSuccess={getProfileSuccess} />
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewDe}>
            {!showUpdateModal() && (
              <UpdateProfileModal visible={modalVisible} onClose={handleCloseModal} />
            )}
            {/* plan container */}
            <FlatList
              contentContainerStyle={styles.flatlistcontainer}
              data={userPlanList && userPlanList}
              renderItem={({ item, index }) => (
                <UserplanContainer
                  key={index}
                  item={item}
                  onToggle={() => toggleExpand(index)}
                  isExpanded={expandedPlan === index}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </ScrollView>
          <View style={styles.bottomContainer}>
            <View
              style={{
                flexDirection: topup_plan_length > 0 ? 'row' : 'column',
                justifyContent: 'space-between',
              }}>
              {topup_plan_length > 0 && (
                <GradientButton
                  onPress={onPressNext}
                  text="Alerts Topup"
                  style={{ paddingVertical: 11, paddingHorizontal: 30 }}
                  mainstyle={styles.mainstyle}
                  textStyle={styles.textStyle}
                />
              )}
              <GradientButton
                onPress={() => navigation(ROUTE_NAME.SUBSCRIPTION_SCREEN, { isShowBack: true })}
                text="Upgrade Plan"
                style={{
                  paddingVertical: 11,
                  paddingHorizontal: 30,
                }}
                mainstyle={styles.mainstyle}
                textStyle={styles.textStyle}
              />
            </View>
            <SubscriptionAgreementText />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
export default React.memo(UserPlanDetailScreen);
