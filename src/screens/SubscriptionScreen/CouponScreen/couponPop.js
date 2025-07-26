import React, { useEffect, useState, useCallback } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from '../../../Components/Loader';
import CouponList from '../../../Components/FlatList/CouponList';
import {
  available_coupons,
  coupon_validation,
} from '../../../apis/Onboarding/PaymentApi/CreateSubscSlice';
import styles from './styles';

const CouponPopUp = ({ visible, onClose, setCouponCode, selectPlanDetail }) => {
  const dispatch = useDispatch();
  const {
    isLoads,
    isavailable_couponsSuccess,
    iscoupon_validationSuccess,
  } = useSelector((state) => state.CreateSubscSlice);

  const [couponCode, setCouponCodeState] = useState('');

  useEffect(() => {
    const fetchCoupons = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        dispatch(available_coupons({ userid: userId }));
      }
    };
    if (visible) fetchCoupons();
  }, [visible, dispatch]);

  useEffect(() => {
    if (iscoupon_validationSuccess?.response) {
      setCouponCode(iscoupon_validationSuccess);
      onClose();
    }
  }, [iscoupon_validationSuccess]);

  const handleApplyCoupon = useCallback(
    (code) => {
      if (code.trim()) {
        dispatch(
          coupon_validation({
            coupon_code: code.toUpperCase(),
            plan_id: selectPlanDetail?.id,
          })
        );
      }
    },
    [dispatch, selectPlanDetail]
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Apply Coupon</Text>
          {isLoads ? (
            <Loader />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollviewDe}
            >
              <View style={styles.container}>
                <TextInput
                  style={styles.input}
                  allowFontScaling={false}
                  onChangeText={(text) => setCouponCodeState(text.toUpperCase())}
                  value={couponCode}
                  placeholder="Enter Coupon Code"
                  placeholderTextColor="#4A4A4A"
                  autoCorrect={false}
                  autoCapitalize="characters"
                />
                <Text
                  onPress={() => handleApplyCoupon(couponCode)}
                  allowFontScaling={false}
                  style={{
                    color: '#228B22',
                    letterSpacing: 0.5,
                    fontSize: 14,
                    fontWeight: '700',
                  }}
                >
                  APPLY
                </Text>
              </View>

              {Array.isArray(isavailable_couponsSuccess?.response) &&
                isavailable_couponsSuccess.response.length > 0 && (
                  <>
                    <Text style={styles.Header_Text} allowFontScaling={false}>
                      Best Coupon
                    </Text>
                    <CouponList
                      data={isavailable_couponsSuccess.response}
                      onPressCoupon={(item) =>
                        handleApplyCoupon(item.coupon_code)
                      }
                    />
                  </>
                )}
            </ScrollView>
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CouponPopUp;
