import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { editAlertList, getTotalAlert, resetEditAlert } from '../../apis/Onboarding/totalAlertSlice';
import DropdownComponent from '../../Components/DropDownPicker';
import FormInput from '../../Components/FormInput';
import { COLORS } from '../../Constants/enums';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/enums/Dimensions';

const AlertTypes = [
  { index: '1', label: 'Green Signal', value: 'Buy Alert' },
  { index: '2', label: 'Red Alert', value: 'Sell Alert' },
  { index: '3', label: 'Price Alert', value: 'Price Alert' },
];

const SelectAlert = ({
  alertId,
  selectedAlertType,
  alertPrice,
  defaultalertType,
  onChangeAlertType,
  handleSubmit,
  iseditAlertLiError,
  totalalertData,
}) => {
  const { isLoaded } = totalalertData;
  const isPriceAlert = selectedAlertType === 'Price Alert' || defaultalertType === 'Price Alert';

  return (
    <Formik
      initialValues={{
        alert_type: AlertTypes.find(item => item.value === (defaultalertType || selectedAlertType)) || '',
        price: alertPrice,
      }}
      validationSchema={Yup.object({
        alert_type: Yup.object().required('Alert type is required').nullable(),
        price: isPriceAlert ? Yup.string().required('Price is required') : Yup.string(),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, setFieldValue, values, errors }) => (
        <View>
          <View style={styles.input}>
            <Text style={styles.tabLabel}>Set Alert</Text>
            {isPriceAlert ? (<></>
            ) : (
              <DropdownComponent
                title="Select Alert Type"
                data={AlertTypes}
                defaultValue={values.alert_type}
                onSelect={(value) => {
                  setFieldValue('alert_type', value);
                  onChangeAlertType(value.value);
                }}
              />
            )}
          </View>

          {isPriceAlert && (
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Enter the price for the alert</Text>
              <FormInput
                onChangeText={value => {
                  if (/^[0-9.]*$/.test(value)) setFieldValue('price', value);
                }}
                placeholder="Enter Price"
                value={values.price}
                maxLength={10}
              />
            </View>
          )}

          <View style={styles.formAction}>
            {isLoaded ? (
              <View style={styles.btn}>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            ) : (
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Set Alert</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {iseditAlertLiError && <Text style={styles.errormsg}>{iseditAlertLiError?.response}</Text>}
          <View style={{
            borderWidth: .8, marginTop: scaleHeight(10), padding: 5, borderRadius: 5, borderColor: '#FBB142',
            backgroundColor: '#FFF7EB', marginBottom: -20,
          }}>
            <Text style={{ fontWeight: '700', fontSize: 11, color: '#323C47', textAlign: 'justify' }}>Disclaimer: <Text style={{ fontWeight: '400', fontSize: 11, color: '#323C47', }}>{`Signals may change throughout the day. Final signal (Red or Green) is confirmed only after the day's closing candle.There may be a delay in signals due to latency or delays in data transmission`}</Text></Text>
          </View>
        </View>
      )}
    </Formik>
  );
};

const EditAlertModal = ({ isVisible, onClose, alertId, alertPrice, defaultalertType }) => {
  const dispatch = useDispatch();
  const [selectedAlertType, setSelectedAlertType] = useState('');
  const totalalertData = useSelector(state => state.totalalert);
  const { iseditAlertLiSuccess } = totalalertData;

  useEffect(() => {
    if (iseditAlertLiSuccess) {
      dispatch(getTotalAlert());
      handleClose();
    }
  }, [iseditAlertLiSuccess]);

  const handleClose = () => {
    setSelectedAlertType('');
    dispatch(resetEditAlert());
    onClose();
  };

  const handleSubmit = (values) => {
    dispatch(editAlertList({
      alert_id: alertId,
      alert_active: true,
      alert_type: values?.alert_type?.value,
      price: values.price,
      set_alert_time: moment().format('DD/MM/YYYY HH:mm:ss'),
    }));
  };

  return (
    <Modal animationType="none" transparent visible={isVisible} onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={{ alignItems: 'center', marginTop: 20,marginHorizontal:15 }}>
              <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 35 }}>
                <TouchableOpacity onPress={handleClose} style={styles.closeContainer}>
                  <Image source={IMAGES.REFUND_SCREEN.Refundcancel} style={styles.sortIcon} />
                </TouchableOpacity>
                <SelectAlert
                  handleSubmit={handleSubmit}
                  alertId={alertId}
                  alertPrice={alertPrice}
                  selectedAlertType={selectedAlertType}
                  onChangeAlertType={setSelectedAlertType}
                  defaultalertType={defaultalertType}
                  iseditAlertLiError={totalalertData.iseditAlertLiError}
                  totalalertData={totalalertData}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
    flex: 1,
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: 'lightgray',
  },
  //
  keyboardAvoidingView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 5,
  },
  tabLabel: {
    color: '#000',
    textTransform: 'capitalize',
    fontFamily: 'Montreal-Medium',
    marginBottom: 15,
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
    marginTop:10,
    marginVertical: 24,
    marginBottom: 0
  },
  errormsg: {
    color: COLORS.red,
    fontSize: normalizeFont(12),
    textAlign: 'center',
    marginTop: scaleHeight(5),
  },
});
const AlertModalPopup = React.memo(EditAlertModal);
export default AlertModalPopup;
