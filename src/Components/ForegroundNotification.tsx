import React from 'react';
import {Dimensions} from 'react-native';
import {Modal, StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import IMAGES from '../Constants/enums/ImagesEnum';
import { scaleHeight, scaleWidth } from '../Constants/enums';

const { width } = Dimensions.get('window');
const NotificationBox = (props: any) => {
  const {isVisible, onCancel, data} = props;
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={onCancel}>
              <Image
                alt=""
                resizeMode="contain"
                style={styles.sortIcon}
                source={IMAGES.REFUND_SCREEN.Refundcancel}
              />
            </TouchableOpacity>
          </View>
          <Text allowFontScaling={false} style={styles.title}>Price Alert</Text>
          <Text allowFontScaling={false} style={styles.notificationBody}>{data}</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={onCancel}>
              <View style={styles.submitBtn}>
                <Text allowFontScaling={false} style={styles.submitBtnTxt}>Got It</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 200,
    width: Dimensions.get('window').width - 70,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
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
    fontWeight: '600',
    color: '#fff',
  },
  formAction: {
    marginVertical: 24,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: scaleWidth(16),
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  sortIcon: {
   height: 25,
    width: 25,
    // tintColor: 'green',
  },
  closeContainer: {
    position: 'absolute',
    right: -10,
    borderRadius: 7,
    backgroundColor: '#fff',
    top: -10,
  },
  notificationBody: {
    color: '#000',
    fontSize: 16,
    marginTop: 20,
  },
  submitBtn: {
    width: width - 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  submitBtnTxt: {
    color: '#fff',
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
  },
});
const ForegroundNotification = React.memo(NotificationBox);
export default ForegroundNotification;
