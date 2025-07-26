import React, { useEffect, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Image,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from './FormInput';
import { useDispatch } from 'react-redux';
import {
  editAlert,
  getAlert,
  resetAlert,
  setAlert,
  uploadFcmToken,
} from '../apis/Onboarding/authenticationSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import DropdownComponent from '../Components/DropDownPicker';
import IMAGES from '../Constants/enums/ImagesEnum';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import { COLORS } from '../Constants/enums/colorsEnum';
import { scaleHeight, scaleWidth } from '../Constants/enums';

const alertTypes = [
  { label: 'Green Signal', value: '1', value2: 'Buy Alert' },
  { label: 'Red Alert', value: '2', value2: 'Sell Alert' },
  { label: 'Price Alert', value: '3', value2: 'Price Alert' },
];

const PurchaseAlert = (props: any) => {
  const {
    handleSubmit,
    defaultData,
    defaultPrice,
    selectedAlertType,
    onChangeAlertType,
    symbol,
    authenticationData,
    isSetAlertError,
  } = props;
  const { isAlertLoading } = authenticationData;

  const getAlertType = () => {
    const alertTypeIndex = alertTypes.findIndex(
      item => item.value2 === (selectedAlertType || defaultData?.alert_type),
    );

    if (alertTypeIndex > -1) {
      return alertTypes[alertTypeIndex];
    }
  };

  const getIntervalType = () => {
    const intervalTypeIndex = intervalTypes.findIndex(
      item => item.value === defaultData?.timeframe,
    );
    if (intervalTypeIndex > -1) {
      return intervalTypes[intervalTypeIndex];
    }
  };
  return (
    <Formik
      initialValues={{
        price: defaultData?.price || defaultPrice,
        alert_type: defaultData || selectedAlertType ? getAlertType() : '',
        // time_frame: defaultData ? getIntervalType()?.value : '',
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        alert_type: Yup.object().required('Alert type is Required').nullable(),
        // time_frame: Yup.string().required('This field is Required').nullable(),
      })}>
      {({ handleSubmit, setFieldValue, values, errors, touched, isSubmitting }) => (
        <View>
          <View style={styles.input}>
            <Text allowFontScaling={false} style={styles.tabLabel}>
              Set alert for {symbol}
            </Text>
            <DropdownComponent
              title="Select Alert Type"
              data={alertTypes}
              placeholder={'Select Alert'}
              defaultValue={values.alert_type}
              onSelect={(value: any) => {
                setFieldValue('alert_type', value);
                onChangeAlertType(value);
              }}
            />
          </View>
          {/* <View style={styles.input}>
            <DropdownComponent
              title="Select Interval"
              data={intervalTypes}
              placeholder={'Select Interval'}
              defaultValue={values.time_frame}
              onSelect={(value: any) => {
                setFieldValue('time_frame', value.value);
              }}
            />
            <Text allowFontScaling={false} style={{color: 'red'}}>
              {errors.time_frame}
            </Text>
          </View> */}
          <View style={styles.formAction}>
            {isAlertLoading ? (
              <View style={styles.btn}>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            ) : (
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text allowFontScaling={false} style={styles.btnText}>
                    Set Alert
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {isSetAlertError && (
              <Text style={{ color: COLORS.red, marginTop: scaleHeight(5) }} allowFontScaling={false}>
                {isSetAlertError?.response}
              </Text>
            )}
          </View>
        </View>
      )}
    </Formik>
  );
};

const ValueAlert = (props: any) => {
  const {
    handleSubmit,
    defaultData,
    defaultPrice,
    selectedAlertType,
    onChangeAlertType,
    symbol,
    authenticationData,
    isSetAlertError,
  } = props;
  const { isAlertLoading } = authenticationData;

  const getAlertType = () => {
    const alertTypeIndex = alertTypes.findIndex(
      item => item.value2 === (selectedAlertType || defaultData?.alert_type),
    );
    if (alertTypeIndex > -1) {
      return alertTypes[alertTypeIndex];
    }
  };
  return (
    <Formik
      initialValues={{
        alert_type: defaultData || selectedAlertType ? getAlertType() : '',
        price: defaultData?.price || defaultPrice,
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        alert_type: Yup.object().required('Alert type is Required').nullable(),
        price: Yup.string().required('Price is Required'),
      })}>
      {({ handleSubmit, setFieldValue, values, errors }) => (
        <View>
          <View style={styles.input}>
            <Text allowFontScaling={false} style={styles.tabLabel}>
              Set alert for {symbol}
            </Text>
            <DropdownComponent
              title="Select Alert Type"
              data={alertTypes}
              placeholder={'Select Alert'}
              defaultValue={values.alert_type}
              onSelect={(value: any) => {
                setFieldValue('alert_type', value);
                onChangeAlertType(value);
              }}
            />
          </View>
          {selectedAlertType === 'Price Alert' || defaultData?.alert_type === 'Price Alert' ? (
            <View style={styles.input}>
              <Text allowFontScaling={false} style={styles.inputLabel}>
                Enter the price for which you want to set alert
              </Text>
              <FormInput
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={value => {
                  const re = /^[0-9.\b]+$/;
                  if (value === '' || re.test(value)) {
                    setFieldValue('price', value);
                  }
                }}
                placeholder="Enter Price"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={values.price}
                maxLength={10}
              />
              <Text allowFontScaling={false} style={{ color: 'red' }}>
                {errors?.price}
              </Text>
            </View>
          ) : null}
          <View style={styles.formAction}>
            {isAlertLoading ? (
              <View style={styles.btn}>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            ) : (
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text allowFontScaling={false} style={styles.btnText}>
                    Set Alert
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {isSetAlertError && (
              <Text style={{ color: COLORS.red, marginTop: scaleHeight(10) }}>
                {isSetAlertError?.response}
              </Text>
            )}
            <View style={{
              borderWidth: .8, marginTop: scaleHeight(15), padding: 5, borderRadius: 5, borderColor: '#FBB142',
              backgroundColor: '#FFF7EB',marginBottom:-35,
            }}>
              <Text style={{ fontWeight: '700', fontSize: 11, color: '#323C47', textAlign: 'justify' }}>Disclaimer: <Text style={{ fontWeight: '400',fontSize: 11, color: '#323C47', }}>{`Signals may change throughout the day. Final signal (Red or Green) is confirmed only after the day's closing candle.There may be a delay in signals due to latency or delays in data transmission`}</Text></Text>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

const intervalTypes = [
  { id: 1, value: '1-d', label: '1-day' },
  // {id: 1, value: '1-min', label: '1-min'},
  // {id: 2, value: '5-min', label: '5-min'},
  // {id: 3, value: '15-min', label: '15-min'},
  // {id: 4, value: '30-min', label: '30-min'},
  // {id: 5, value: '45-min', label: '45-min'},
  // {id: 6, value: '60-min', label: '60-min'},
];

const PriceAlert = (props: any) => {
  const {
    isVisible,
    onCancel,
    symbol,
    defaultPrice = '0.0',
    defaultData = null,
    symbolId,
    setTableStockeData = {},
    ischeck = false,
    onRefresh,
    onDoneAlert
  } = props;
  const dispatch = useDispatch();
  const [selectedAlertType, setSelectedAlertType] = useState('');
  const authenticationData = useSelector((state: any) => state.authentication);
  const { isAlertLoading, isSetAlertSuccess, isSetAlertError, isEditAlertSuccess } =
    authenticationData;
  const paymentData = useSelector(state => state.CreateSubscSlice);
  const { isactive_topupSuccess } = paymentData;

  const [deviceDetail, setDeviceDetail] = useState({
    getUniqueId: '',
    getDeviceName: '',
    getDeviceType: '',
  });

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
  const currentDateTime = moment().format('DD/MM/YYYY HH:mm:ss');

  const handleSubmit = (values: any) => {
    AsyncStorage.setItem('activeSymbol', '');
    AsyncStorage.getItem('userId').then(userId => {
      const reqParams = {
        userid: userId,
        price: values.price,
        symbol_id: symbolId,
        alert_type: values?.alert_type?.value2,
        timeframe: values?.time_frame || '1-d',
        set_alert_time: currentDateTime,
        user_topup_id: isactive_topupSuccess?.response?.active_topup_id,
      };
      if (defaultData) {
        dispatch(editAlert({ id: defaultData?.id, reqParams }));
      } else {
        dispatch(setAlert(reqParams));
      }
      setTimeout(() => onRefresh ? onRefresh() : null, 1000)
      setTimeout(() => onDoneAlert ? onDoneAlert() : null, 1000)
    });
  };

  const updateAlerts = async () => {
    let userid = await AsyncStorage.getItem('userId');
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
      try {
        if (!ischeck) {
          setTableStockeData(prevState => {
            if (!prevState) return []; // Handle null state
            return prevState.map(sts => {
              if (sts.stock_id_id === symbolId) {
                return {
                  ...sts,
                  is_user_alert: true,
                };
              }
              return sts;
            });
          });
        }
      } catch (error) {
        console.error("Error updating stock data:", error);
      }

    }
  };

  const handleFinalizeAlert = async () => {
    await AsyncStorage.setItem('activeSymbol', symbol);
    await updateAlerts();
    handleClose();
  };

  const handleClose = async () => {
    await dispatch(resetAlert());
    onCancel();
  };

  useEffect(() => {
    if (isSetAlertSuccess || isEditAlertSuccess) {
      handleFinalizeAlert();
    }
  }, [isSetAlertSuccess, isEditAlertSuccess]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 30}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.closeContainer}>
                <TouchableOpacity onPress={() => handleClose()}>
                  <Image
                    alt=""
                    resizeMode="contain"
                    style={styles.sortIcon}
                    source={IMAGES.REFUND_SCREEN.Refundcancel}
                  />
                </TouchableOpacity>
              </View>
              {['Green signal', 'Red alert'].includes(
                selectedAlertType || defaultData?.alert_type,
              ) ? (
                <PurchaseAlert
                  handleSubmit={handleSubmit}
                  defaultData={defaultData}
                  defaultPrice={defaultPrice}
                  selectedAlertType={selectedAlertType}
                  onChangeAlertType={(value: any) => {
                    setSelectedAlertType(value.value2);
                  }}
                  symbol={symbol}
                  authenticationData={authenticationData}
                  isSetAlertError={isSetAlertError}
                  onRefresh={onRefresh}
                />
              ) : (
                <ValueAlert
                  handleSubmit={handleSubmit}
                  defaultData={defaultData}
                  defaultPrice={defaultPrice}
                  selectedAlertType={selectedAlertType}
                  onChangeAlertType={(value: any) => {
                    setSelectedAlertType(value.value2);
                  }}
                  symbol={symbol}
                  authenticationData={authenticationData}
                  isSetAlertError={isSetAlertError}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  modalView: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  cancelLink: {
    color: 'green',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontFamily: 'Montreal-Light',
    marginTop: 50,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(20),
    borderWidth: 1,
    backgroundColor: 'green',
    borderColor: 'green',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: 'Montreal-Light',
    color: '#fff',
  },
  formAction: {
    marginTop:0,
    marginVertical: 24,
  },
  input: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    color: '#222',
    marginBottom: 8,
    fontFamily: 'Montreal-Light',
  },
  inputControl: {
    color: 'red',
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: scaleWidth(16),
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
  },
  sortIcon: {
  height: 25,
    width: 25,
  },
  closeContainer: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  tabLabel: {
    color: '#000',
    textTransform: 'capitalize',
    fontFamily: 'Montreal-Medium',
    marginBottom: 15,
  },
  keyboardAvoidingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
const PriceAlertPopup = React.memo(PriceAlert);
export default PriceAlertPopup;
