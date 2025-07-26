import React, { FC, useEffect, useState, useCallback } from 'react';
import { Text, ScrollView, View, TextInput, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from '../../../Components/Loader';
import CouponList from '../../../Components/FlatList/CouponList';
import { goBack, popToBack } from '../../../Navigation/NavigationService';
import { available_coupons, coupon_validation } from '../../../apis/Onboarding/PaymentApi/CreateSubscSlice';
import styles from './styles';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';

interface CouponScreenProps {
  route: any;
}

const CouponScreen: FC<CouponScreenProps> = ({ route }) => {
  const { setCouponCode, selectPlanDetail } = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { isLoads, isavailable_couponsSuccess, iscoupon_validationSuccess } = useSelector(
    (state: any) => state.CreateSubscSlice
  );
  const [couponCode, setCouponCodeState] = useState('');

  useEffect(() => {
    const fetchCoupons = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        dispatch(available_coupons({ userid: userId }));
      }
    };
    if (isFocused) fetchCoupons();
  }, [isFocused, dispatch]);

  useEffect(() => {
    if (iscoupon_validationSuccess?.response) {
      setCouponCode(iscoupon_validationSuccess);
      popToBack();
    }
  }, [iscoupon_validationSuccess, setCouponCode]);

  const handleApplyCoupon = useCallback(
    (code: string) => {
      if (code.trim()) {
        dispatch(coupon_validation({ coupon_code: code.toUpperCase(), plan_id: selectPlanDetail?.id }));
      }
    },
    [dispatch, selectPlanDetail]
  );

  return (
    <SafeAreaView>
      <TitleWithBackBtnHeader
        centerTitle={'Apply Coupon'}
        onPressBackArrow={() => goBack()}
      />
      {isLoads ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollviewDe}>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              allowFontScaling={false}
              onChangeText={setCouponCodeState}
              value={couponCode}
              placeholder="Enter Coupon Code"
              placeholderTextColor="#4A4A4A"
              autoCorrect={false}
            />
            <Text
              onPress={() => handleApplyCoupon(couponCode)}
              allowFontScaling={false}
              style={{ color: '#228B22', letterSpacing: 0.5, fontSize: 14,fontWeight:'700' }}>
              APPLY
            </Text>
          </View>
          {isavailable_couponsSuccess?.response?.length === 'undefined' &&
            <View>
              <Text style={styles.Header_Text} allowFontScaling={false}>Best Coupon</Text>
            </View>
          }
          <CouponList
            data={isavailable_couponsSuccess?.response}
            onPressCoupon={(item) => handleApplyCoupon(item.coupon_code)}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default React.memo(CouponScreen);
