import React, {FC, useEffect, useState} from 'react';
import {View, Text, ScrollView, ActivityIndicator, Platform} from 'react-native';
import MainContainer from '../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {goBack, navigation} from '../../Navigation/NavigationService';
import styles from './style';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPriceAction} from '../../apis/Onboarding/PriceActionApi/PriceActionSlice';
import {ToastHandler} from '../../utils/utils';
import {CONSTANT_TEXT, scaleHeight} from '../../Constants/enums';
import PriceActionTable from './PriceActionTable';

interface PriceActionScreenProps {
  //   navigation: any;
}

const PriceActionScreen: FC<PriceActionScreenProps> = () => {
  const insets = useSafeAreaInsets();

  const isFocused = useIsFocused(); // Get the focused state
  const dispatch = useDispatch();

  const PriceActionData = useSelector((state: any) => state.PriceActionSlice);
  const {ispriceActionSuccess, ispriceActionError, isLoading, isDataLength} = PriceActionData;

  const [TableData, setTableData] = React.useState<any[]>([]);

  const getPriceActionData = async () => {
    const userid = await AsyncStorage.getItem('userId');
    dispatch(getPriceAction({userid: userid}));
  };
  React.useEffect(() => {
    if (isFocused) getPriceActionData();
  }, [isFocused]);
  /// handle Error
  useEffect(() => {
    if (ispriceActionError) {
      ToastHandler(false, ispriceActionError?.response || 'Somthing went wrong');
    }
  }, [ispriceActionError]);
  React.useEffect(() => {
    if (ispriceActionSuccess?.status === 'success') {
      const temp = ispriceActionSuccess?.response.length > 0 ? ispriceActionSuccess?.response : [];
      const temp22 =
        ispriceActionSuccess?.response &&
        temp?.slice().sort((a, b) => {
          const num1 = parseFloat(a.previous_recommendation?.pct);
          const num2 = parseFloat(b.previous_recommendation?.pct);
          return num2 - num1;
        });
      setTableData(temp22);
    }
  }, [ispriceActionSuccess?.response]);

  return (
    <MainContainer>
      <TitleWithBackBtnHeader centerTitle="Price Action" onPressBackArrow={() => goBack()} />
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={CONSTANT_TEXT.LARGE} color="blue" />
          </View>
        ) : ispriceActionError ? (
          <View style={styles.loaderContainer}>
            <Text allowFontScaling={false} style={styles.errorMsg}>
              {ispriceActionError?.response}
            </Text>
          </View>
        ) : isDataLength ? (
          <View style={styles.loaderContainer}>
            <Text style={styles.errorMsg} allowFontScaling={false}>
              No Data in the Price Action
            </Text>
          </View>
        ) : (
          <PriceActionTable
            isdashboardScreenerSuccess={ispriceActionSuccess?.response}
            isScreenerSaveData={ispriceActionSuccess?.response}
            tableStocksData={TableData}
            setTableStockeData={setTableData}
            noDataFound={isDataLength}
          />
        )}
      </View>
    </MainContainer>
  );
};
export default PriceActionScreen;
