import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Linking,
  Image,
  ScrollView,
} from 'react-native';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import {normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums';

const ToolTipModal = (props: any) => {
  const {visible, data, closeModal} = props;

  return (
    <Modal
      visible={visible}
      onRequestClose={() => closeModal()}
      transparent={true}
      animationType="none">
      <View style={styles.modalContent}>
        {data && (
          <View style={styles.mainView}>
            <View style={styles.closeContainer}>
              <TouchableOpacity onPress={() => closeModal()}>
                <Image //add cut icon
                  alt=""
                  resizeMode="contain"
                  style={styles.sortIcon}
                  source={IMAGES.REFUND_SCREEN.Refundcancel}
                />
              </TouchableOpacity>
            </View>
            <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
              <View style={styles.adderssView}>
                <Text allowFontScaling={false} style={styles.textline}>
                  {data?.address}
                </Text>
                {/* <TouchableOpacity onPress={() => Linking.openURL(data.link)}>
                <Text style={styles.textModalLink}>{data.link}</Text>
              </TouchableOpacity> */}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  mainView: {
    borderRadius: 15,
    backgroundColor: '#FFF',
    marginHorizontal: scaleWidth(54),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    maxHeight: scaleHeight(450),
  },
  textline: {
    fontSize: normalizeFont(16),
    marginBottom: scaleHeight(10),
    color: '#5B5B5B',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 20,
  },
  textModalLink: {
    color: '#339502',
    fontSize: normalizeFont(16),
    textDecorationLine: 'underline',
    alignSelf: 'center',
    fontWeight: '400',
  },
  closeContainer: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  sortIcon: {
    height: 25,
    width: 25,
  },
  adderssView: {
    marginVertical: scaleHeight(41),
    marginHorizontal: scaleWidth(28),
  },
});

export default ToolTipModal;
