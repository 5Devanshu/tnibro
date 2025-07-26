import React, { FC, useEffect, useCallback, useState, memo, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { COLORS } from '../../../Constants/enums';
import { goBack } from '../../../Navigation/NavigationService';
import { Loader } from '../../../Components/Loader';
import { payment_history } from '../../../apis/Onboarding/PaymentApi/CreateSubscSlice';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import { formatDate_InNumber } from '../../../screens/Dashboard/TableComponent/utils';
import MainContainer from '../../../Components/MainContainer';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';

const CARD_HEIGHT = 110;
const PADDING = 10;
const SPACING = CARD_HEIGHT + PADDING;

const SubscriptionHistory: FC = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { ishistoryload, ispayment_historySuccess } = useSelector(state => state.CreateSubscSlice);

  const [userPayment, setUserPayment] = useState([]);

  const fetchSubscriptionHistory = useCallback(async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (userId) dispatch(payment_history({ userid: userId }));
  }, [dispatch]);

  useEffect(() => {
    if (isFocused) fetchSubscriptionHistory();
  }, [isFocused, fetchSubscriptionHistory]);

  useEffect(() => {
    if (ispayment_historySuccess?.response) {
      setUserPayment(ispayment_historySuccess.response);
    }
  }, [ispayment_historySuccess]);

  const PlanContainer = memo(({ item, index }) => {
    const navigation = useNavigation();

    const handlePress = () => navigation.navigate('InvoiceScreen', { id: item.id });

    const getStatus = () => ({
      text: item.payment_refund ? 'Refunded' : item.payment_status === false ? 'Failed' : 'Success',
      color: item.payment_refund ? COLORS.Binance_green : item.payment_status === false ? COLORS.Binance_red : COLORS.Binance_green,
    });

    const inputRange = [
      -1,
      0,
      SPACING * index,
      SPACING * (index + 2),
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.85],
      extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
      extrapolate: 'clamp',
    });

    const translateY = scrollY.interpolate({
      inputRange,
      outputRange: [0, 0, 0, -20],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[style.cardContainer, { transform: [{ scale }, { translateY }], opacity }]}
      >
        <TouchableOpacity onPress={handlePress}>
          <View style={style.inrowSpaceBetween}>
            <View>
              <Text style={style.txtHead}>
                {item.product.charAt(0).toUpperCase() + item.product.slice(1).toLowerCase()}
              </Text>
              {item.payment_id && (
                <Text style={style.transactionNo}>
                  Transaction No : <Text style={style.transactionNo}>{item.payment_id}</Text>
                </Text>
              )}
            </View>
            <Text style={style.txtAmount}>₹ {addCommaToCurrency(item.amount)}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Entypo name={'calendar'} size={15} color={'#4A4A4A'} />
            <Text style={style.dateNo}>{formatDate_InNumber(item.payment_date)}</Text>
          </View>

          <Text style={[style.txtActive, { color: getStatus().color }]}>{getStatus().text}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  });

  return (
    <MainContainer>
      <TitleWithBackBtnHeader onPressBackArrow={goBack} centerTitle="Your Payment History" />
      {ishistoryload ? (
        <Loader />
      ) : (
        <Animated.FlatList
          data={userPayment}
          renderItem={({ item, index }) => <PlanContainer item={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingVertical: 8, paddingBottom: 200 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          ListEmptyComponent={
            <View style={styles.noDataView}>
              <Text style={styles.noDataTitle}>No History Found</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </MainContainer>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    paddingVertical: 16,
    paddingHorizontal: 26,
    marginHorizontal: 25,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inrowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtHead: {
    fontSize: 13,
    fontWeight: '300',
    color: '#000',
  },
  transactionNo: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
  },
  txtAmount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  dateNo: {
    marginLeft: 5,
    fontSize: 14,
    color: '#000',
    marginVertical: 4,
  },
  txtActive: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default memo(SubscriptionHistory);
