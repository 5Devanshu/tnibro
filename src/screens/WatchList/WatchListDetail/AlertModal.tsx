import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity, Image, Button} from 'react-native';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import DropDownElement from '../../../screens/Dashboard/DropDownElement';
import {useDispatch, useSelector} from 'react-redux';
import {addAlertWatchList, getWatchlist} from '../../../apis/Onboarding/watchlistSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {uploadFcmToken} from '../../../apis/Onboarding/authenticationSlice';
import { scaleWidth } from '../../../Constants/enums/Dimensions';

const AlertModal = (props: any) => {
  const {isVisible, onClose, alertWatchlistId, alertName, alerStatus} = props;
  const {Buy_Alert, Sell_Alert} = alerStatus;
  const dispatch = useDispatch();
  const watchListData = useSelector(state => state.totalWatchlist);

  const {isAlertWatchListError} = watchListData;
  const errorMsg = isAlertWatchListError?.response; /// use in toast msg
  const [alertType, setAlertType] = useState<string>();
  const [alertInterval, setAlertInterval] = useState<string>();
  const [buttonDisable, setButtonDisable] = useState(true);
  const [deviceDetail, setDeviceDetail] = useState({
    getUniqueId: '',
    getDeviceName: '',
    getDeviceType: '',
  });

  const AlertInterval = [
    // {index: '1', label: '1-Min', value: '1-min'},
    {index: '1', label: '1-day', value: '1-d'},
    // {index: '2', label: '5-Min', value: '5-min'},
    // {index: '3', label: '10-Min', value: '10-min'},
    // {index: '4', label: '15-Min', value: '15-min'},
    // {index: '5', label: '30-Min', value: '30-min'},
    // {index: '6', label: '1-hour', value: '60-min'},
  ];
  const AlertType = [
    {id: 0, value: 'Buy Alert', label: 'Green Signal'},
    {id: 1, value: 'Sell Alert', label: 'Red Alert'},
  ];
  const getDeviceInfo = async () => {
    const UniqueId = await DeviceInfo.getUniqueId();
    const deviceName = await DeviceInfo.getDeviceName();
    const DeviceType = await DeviceInfo.getDeviceType();
    setDeviceDetail({
      getUniqueId: UniqueId,
      getDeviceName: deviceName,
      getDeviceType: DeviceType,
    });
  };
  useEffect(() => {
    getDeviceInfo();
  }, []);
  const handleSetAlert = async () => {
    const userid = await AsyncStorage.getItem('userId');
    let oneSignal_userId = await AsyncStorage.getItem('oneSignal_userId');
    if (userid && oneSignal_userId) {
      dispatch(
        uploadFcmToken({
          userid: userid,
          notify_token: oneSignal_userId,
          device_name: deviceDetail.getDeviceName,
          device_type: deviceDetail.getDeviceType,
          device_id: deviceDetail.getUniqueId,
        }),
      );
      dispatch(
        addAlertWatchList({
          watchlist_id: alertWatchlistId,
          alert_request_type: 'add',
          alert_type: alertType,
          timeframe: alertInterval,
          userid: userid,
        }),
      );
      dispatch(getWatchlist({userid: userid})); /// update the state instead of dispatch
    }
    setButtonDisable(false);
    if (!buttonDisable) {
      onClose();
    }
    setAlertType('');
    setAlertInterval('');
    // if (errorMsg) {
    //   showToast(true, errorMsg);
    // }
  };
  // Toast.show({
  //   type: 'success',
  //   text1: errorMsg,
  // });
  const handleRemoveAlert = async () => {
    const userid = await AsyncStorage.getItem('userId');
    dispatch(
      addAlertWatchList({
        watchlist_id: alertWatchlistId,
        alert_request_type: 'remove',
        alert_type: alertType,
        timeframe: alertInterval,
        userid: userid,
      }),
    );
    onClose();
    setAlertType('');
    setAlertInterval('');
  };
  // Update the button disabled state whenever dropdown values change
  React.useEffect(() => {
    setButtonDisable(!alertType || !alertInterval);
  }, [alertType, alertInterval]);
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => onClose()}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          // backgroundColor: 'white',
        }}>
        {/* <Toast
          ref={ref => Toast.setRef(ref)}
          config={{
            success: ({text1, props, ...rest}) => (
              <View style={{height: 60, width: '100%', backgroundColor: 'green'}}>
                <Text>{text1}</Text>
              </View>
            ),
            error: ({text1, props, ...rest}) => (
              <View style={{height: 60, width: '100%', backgroundColor: 'red'}}>
                <Text>{text1}</Text>
              </View>
            ),
          }}
        /> */}
        <View
          style={{
            position: 'relative',
            backgroundColor: '#FFF',
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,
            elevation: 14,
            marginHorizontal: 54,
          }}>
          <View style={styles.closeContainer}>
            <TouchableOpacity
              onPress={() => {
                onClose();
                setAlertType('');
                setAlertInterval('');
              }}>
              <Image //add cut icon
                alt=""
                resizeMode="contain"
                style={styles.sortIcon}
                source={IMAGES.REFUND_SCREEN.Refundcancel}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text allowFontScaling={false}
              style={{
                color: '#181818',
                fontSize: 14,
                fontWeight: '300',
                lineHeight: 28,
                textAlign: 'center',
                marginTop: 31,
              }}>
              Watchlist Alert for {alertName}
            </Text>
            <View
              style={{
                backgroundColor: '#FFF',
                borderRadius: 15,
                marginTop: 22,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,
                elevation: 14,
                paddingHorizontal: scaleWidth(37),
              }}>
              <Text allowFontScaling={false}
                style={{
                  color: '#181818',
                  marginTop: 35,
                  fontSize: 12,
                  fontWeight: '500',
                  lineHeight: 28,
                }}>
                Select Alert Type
              </Text>
              <DropDownElement
                data={AlertType}
                height={34}
                value={alertType}
                onSelect={value => setAlertType(value.value)}
                placeholder={'Select Alert'}
              />
              <Text allowFontScaling={false}
                style={{
                  color: '#181818',
                  marginTop: 9,
                  fontSize: 12,
                  fontWeight: '500',
                  lineHeight: 28,
                }}>
                Select Interval
              </Text>
              <DropDownElement
                data={AlertInterval}
                height={34}
                value={alertInterval}
                onSelect={value => setAlertInterval(value.value)}
                placeholder={'Select Interval'}
              />
              <View
                style={{
                  alignSelf: 'flex-start',
                  flexDirection: 'row',
                  marginTop: 22,
                  marginBottom: 28,
                }}>
                <TouchableOpacity
                  style={[styles.button, buttonDisable && styles.disabledButton]}
                  onPress={handleSetAlert}
                  disabled={buttonDisable}>
                  <Text allowFontScaling={false} style={styles.buttonText}>Set Alert</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button2, !Buy_Alert && !Sell_Alert && styles.disabledButton]}
                  onPress={handleRemoveAlert}
                  disabled={!Buy_Alert && !Sell_Alert}>
                  <Text allowFontScaling={false} style={styles.buttonText}>Remove Alert</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  closeContainer: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  sortIcon: {
    height: 25,
    width: 25,
  },
  button: {
    // flex: 1,
    backgroundColor: '#46B6F5',
    borderRadius: 7,
    padding: 10,
    marginHorizontal: 5,
  },
  button2: {
    // flex: 1,
    backgroundColor: '#FF3B2F',
    borderRadius: 7,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 10,
    color: '#FFF',
  },
  disabledButton: {
    backgroundColor: 'lightgray',
  },
});
const AlertModalPopup = React.memo(AlertModal);
export default AlertModalPopup;
