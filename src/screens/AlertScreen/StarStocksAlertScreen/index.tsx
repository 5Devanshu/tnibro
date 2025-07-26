import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {
  COLORS,
  CONSTANT_TEXT,
  ERROR_MESSAGES,
  scaleHeight,
  scaleWidth,
  styleBase,
  TAB_BAR_NAME,
} from '../../../Constants/enums';
import { premiumStockAlert, StockAlertToggle } from '../../../apis/Onboarding/totalAlertSlice';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import { navigation } from '../../../Navigation/NavigationService';
import GradientButton from '../../../Components/Button/GradientButton';
import styles from './styles';

const StarStocksAlertScreen = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { isStartAlertSuccess, isStartAlertLoading, isStockAlertToggleSuccess, isStockAlertToggleFail } = useSelector(
    (state) => state.totalalert
  );

  const [starStockData, setStarStockData] = useState([]);
  const [autoClose, setAutoClose] = useState(false);

  useEffect(() => {
    dispatch(premiumStockAlert());
  }, [dispatch, isFocused]);

  useEffect(() => {
    if (isStartAlertSuccess?.response) {
      setAutoClose(isStartAlertSuccess.response.status);
      setStarStockData(isStartAlertSuccess.response.stocks || []);
    }
  }, [isStartAlertSuccess]);

  useEffect(() => {
    if (isStockAlertToggleSuccess) {
      dispatch(premiumStockAlert());
    }
  }, [isStockAlertToggleSuccess, dispatch]);

  useEffect(() => {
    if (isStockAlertToggleFail?.response === 'You are not Premium User') {
      setTimeout(() => setAutoClose(false), 1000);
    }
  }, [isStockAlertToggleFail]);

  const toggleAutoClose = useCallback(
    (status) => {
      setAutoClose(status);
      dispatch(StockAlertToggle({ status }));
    },
    [dispatch]
  );

  const RenderCard = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() => navigation('SearchDetailScreen', { symbol: item.name, segment: item.segment })}
      >
        <View style={styles.container}>
          <View style={styleBase.inRow}>
            <View
              style={{
                height: scaleWidth(8),
                width: scaleWidth(8),
                borderRadius: scaleWidth(8),
                backgroundColor: '#23A047',
              }}
            />
            <Text style={styles.symbolText} allowFontScaling={false}>
              {item.name}
            </Text>
            <Image source={IMAGES.STAR_ICON} style={styles.starStyle} />
          </View>
        </View>
      </TouchableOpacity>
    ),
    []
  );

  const Header = useMemo(
    () => (
      <View style={[styleBase.inrowspaceBetween, { marginTop: scaleHeight(20) }]}>
        <View>
          <Text style={styles.headerText} allowFontScaling={false}>
            Alerts On-Off
          </Text>
          <Switch
            style={styles.switch}
            thumbColor={autoClose ? COLORS.white : COLORS.white}
            trackColor={{ true: COLORS.PrimaryGreen, false: '#bbbbbb' }}
            ios_backgroundColor={COLORS.white}
            onValueChange={toggleAutoClose}
            value={autoClose}
          />
        </View>
      </View>
    ),
    [autoClose, toggleAutoClose]
  );

  const EmptyState = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle} allowFontScaling={false}>
          Set Alerts On Star Stock?
        </Text>
        <Text style={styles.emptyDescription} allowFontScaling={false}>
          {CONSTANT_TEXT.SET_GREEN_SIGNAL}
        </Text>
        <Text style={styles.emptyNote} allowFontScaling={false}>
          *Star Rated Stocks - These Are All{'\n'} Nifty 50, PSU, Ratna.
        </Text>
        <Text style={styles.note}>
          Note: These alerts will be deducted from the total number of alerts included in your
          subscription plan. You'll be alerted whenever Star-Rated stocks are triggered with Green
          Signals, in line with your subscription limits.
        </Text>
      </View>
    ),
    []
  );

  return (
    <View style={[styles.mainContainer,{backgroundColor:COLORS.PrimaryBackGround}]}>
      {isStartAlertLoading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator color={'#197C5D'} size={'large'} />
        </View>
      ) : (
        <View style={styles.innerContainer}>
          {Header}
          {isStartAlertSuccess?.response?.status === false ? (
            EmptyState
          ) : isStockAlertToggleFail ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle} allowFontScaling={false}>
                {isStockAlertToggleFail?.response}
              </Text>
              <Text style={styles.emptyDescription} allowFontScaling={false}>
                {CONSTANT_TEXT.SET_GREEN_SIGNAL}
              </Text>
              <Text style={styles.emptyDescription} allowFontScaling={false}>
                {ERROR_MESSAGES.TO_ACCESS_THIS_FETURE}
              </Text>
              {isStockAlertToggleFail?.response === 'You are not Premium User' && (
                <GradientButton
                  text="Go To Subscription"
                  onPress={() => navigation(TAB_BAR_NAME.SUBSCRIPTION)}
                />
              )}
            </View>
          ) : (
            <FlatList
              data={starStockData}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={RenderCard}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default React.memo(StarStocksAlertScreen);
