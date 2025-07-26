import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { COLORS, normalizeFont, styleBase } from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';
import { alertTriggeredList } from '../../../apis/Onboarding/totalAlertSlice';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import MainContainer from '../../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../../Navigation/NavigationService';
import { formatDateNewRev } from '../../../utils/dateConverter';

const StarTriggeredAlertScreen: React.FC = () => {
  const [triggeredAlert, setTriggeredAlert] = useState([]);
  const { isTriggeredAlertLoad, isTriggeredAlertSuccess } = useSelector((state: any) => state.totalalert);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(alertTriggeredList());
  }, [dispatch]);

  useEffect(() => {
    if (isTriggeredAlertSuccess) {
      setTriggeredAlert(isTriggeredAlertSuccess?.response);
    }
  }, [isTriggeredAlertSuccess]);

  const RenderCard = ({ item }) => (
    <View style={styles.container}>
      <View style={styleBase.inRow}>
        <View style={styles.icon} />
        <Text style={styles.symbolValue}>{item?.symbol}</Text>
        <Image source={IMAGES.STAR_ICON} style={styleBase.starStyle} />
      </View>
      <View style={styles.alertDetails}>
        <Text style={styles.alertType}>ALERT TYPE:
          <Text style={styles.alertTriggeron}>
            {item?.alert_type && item?.alert_type === 'Sell Alert' ? ' Red Alert' : ''}
            {item?.alert_type && item?.alert_type === 'Buy Alert' ? ' Green Signal' : ''}
            {item?.alert_type && item?.alert_type === 'Price Alert' ? ' Price Alert' : ''}
          </Text></Text>
        <Text style={styles.alertTriggeron}>ALERT TRIGGERED ON: {formatDateNewRev(item?.alert_time)}</Text>
      </View>
    </View>
  );

  const ListHeader = () => (
    <Text style={styles.headerText}>Total Star Stocks Triggered Alerts: {isTriggeredAlertSuccess?.count}</Text>
  );

  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      {/* <Image source={IMAGES.STAR_ICON} style={styleBase.starStyle} /> */}
      <Text style={styles.emptyText}>No Alerts Triggered</Text>
    </View>
  );

  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle="Star Stock" onPressBackArrow={goBack} />
      {isTriggeredAlertLoad ? (
        <View style={styleBase.emptyContainer}>
          <ActivityIndicator color={COLORS.LOADER_COLOR} size='large' />
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={triggeredAlert}
            renderItem={({ item }) => <RenderCard item={item} />}
            ListHeaderComponent={ListHeader}
            ListEmptyComponent={EmptyList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </MainContainer>
  );
};

export default React.memo(StarTriggeredAlertScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#ADADAD',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  symbolValue: {
    fontSize: normalizeFont(18),
    color: '#2C362C',
    fontFamily: FONTS.RobotoBold,
    marginLeft: 10,
  },
  alertType: {
    color: '#2C362C',
    fontSize: normalizeFont(12),
    marginBottom: 3,
    fontFamily: FONTS.RobotoBold,
  },
  alertTriggeron: {
    color: '#2C362C',
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
    letterSpacing: 0.8,
  },
  icon: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: '#ADADAD',
  },
  alertDetails: {
    marginLeft: 15,
  },
  headerText: {
    marginTop: 15,
    color: '#2C362C',
    fontFamily: FONTS.RobotoRegular,
    marginBottom: 16,
    fontSize: normalizeFont(15),
  },
  emptyContainer: {
    flex: 1,
    marginTop: 300,
    alignItems: 'center',
  },
  emptyText: {
    color: '#2C362C',
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(20),
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
});
