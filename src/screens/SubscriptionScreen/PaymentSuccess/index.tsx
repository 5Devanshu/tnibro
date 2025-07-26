import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { normalizeFont } from '../../../Constants/enums';
import { push } from '../../../Navigation/NavigationService';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import { useDispatch } from 'react-redux';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';
import { editProfileReset } from '../../../apis/Onboarding/authenticationSlice';
import GradientButton from '../../../Components/Button/GradientButton';
import {
  resetCoupon,
  resetSubscriptionState,
  resetTopup,
} from '../../../apis/Onboarding/PaymentApi/CreateSubscSlice';

const PaymentSuccessScreen: React.FC = props => {
  const status = props.route.params.status;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (status === true) {
        push('DrawerNavigation');
      } else {
        push('DrawerNavigation');
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [push]);

  useEffect(() => {
    if (isFocused) {
      dispatch(resetTopup());
      dispatch(resetSubscriptionState());
      dispatch(editProfileReset());
      dispatch(resetCoupon());
    }
  }, [isFocused]);
  const onPressDone = () => {
    dispatch(resetTopup());
    dispatch(resetSubscriptionState());
    dispatch(editProfileReset());
    dispatch(resetCoupon());
    push('DrawerNavigation');
  };
  return (
    <View style={styles.container}>
      <Image
        source={status ? IMAGES.paymentSuccess : IMAGES.paymentfail}
        style={styles.paymentstatueicon}
      />
      <Text style={styles.paymentstatue} allowFontScaling={false}>
        {status ? `Thanks for Paying!` : 'Payment Failed!'}
      </Text>
      <Text style={styles.paymentDesc} allowFontScaling={false}>
        {status
          ? `Your payment has been successfully processed. We appreciate your business.`
          : `Sorry, We can't complete your purchase at this time`}
      </Text>
      <GradientButton text={'Done'} onPress={onPressDone} style={{ width: 300, height: 50 }} />
      <Text
        style={{
          color: '#000',
          textAlign: 'center',
          fontSize: normalizeFont(15),
          marginHorizontal: 10,
          marginTop: 50,
        }}>
        Please <Text style={{ fontWeight: '800' }}>restart</Text> your app for better performance!
      </Text>
    </View>
  );
};

export default React.memo(PaymentSuccessScreen);
