import React from 'react';
import {View, Modal, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import IMAGES from '../../Constants/enums/ImagesEnum';
import {CONSTANT_TEXT} from '../../Constants/enums/constantText';
import {normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums/Dimensions';
import {COLORS} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

const DeactivateModal = (props: any) => {
  const {
    visible,
    data,
    closeModal,
    handleOnprss,
    isshow = false,
    showactivatebutton = false,
    description = '',
    isshowconfirm,
  } = props;

  return (
    <Modal
      visible={visible}
      onRequestClose={() => closeModal()}
      transparent={true}
      animationType="none">
      <View style={styles.modalContent}>
        <View style={styles.maincontainer}>
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
          <Text allowFontScaling={false} style={styles.txtHeader}>
            {data}
          </Text>
          {isshowconfirm && (
            <Text allowFontScaling={false} style={styles.txtDesc}>
              {description}
            </Text>
          )}
          {isshow && (
            <Text allowFontScaling={false} style={styles.txtDesc}>
              {CONSTANT_TEXT.YOU_HAVE_NO_LONGER}
            </Text>
          )}
          {(isshow || isshowconfirm) && (
            <View style={styles.ViewContainer}>
              <TouchableOpacity style={styles.viewtouchable} onPress={() => closeModal()}>
                <Text allowFontScaling={false} style={styles.textNo}>
                  {CONSTANT_TEXT.CANCEL}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.yesContainer} onPress={() => handleOnprss()}>
                <Text allowFontScaling={false} style={styles.textYes}>
                  {CONSTANT_TEXT.YES}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {showactivatebutton && (
            <View style={styles.ActiveateContainer}>
              <TouchableOpacity style={styles.ActivateContainer} onPress={() => handleOnprss()}>
                <Text allowFontScaling={false} style={styles.textNo}>
                  {CONSTANT_TEXT.ACTIVATE}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
  closeContainer: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  sortIcon: {
    height: 25,
    width: 25,
  },
  maincontainer: {
    borderRadius: scaleWidth(16),
    backgroundColor: COLORS.PrimaryBackGround,
    marginHorizontal: 41,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  txtHeader: {
    marginTop: scaleHeight(36),
    textAlign: 'center',
    color: COLORS.SecondaryBlack,
    fontSize: normalizeFont(18),
    paddingHorizontal: scaleWidth(5),
    fontFamily: FONTS.RobotoBold,
  },
  txtDesc: {
    marginTop: 20,
    paddingHorizontal: scaleWidth(25.16),
    textAlign: 'center',
    color: '#5D6166',
    fontSize: 15,
    fontWeight: '400',
  },
  ViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 36,
  },
  viewtouchable: {
    borderRadius: scaleWidth(20),
    backgroundColor: '#228B22',
  },
  textNo: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(16),
    lineHeight: 17,
    paddingHorizontal: scaleWidth(30),
    paddingVertical: scaleHeight(9),
    fontFamily: FONTS.RobotoMedium,
  },
  yesContainer: {
    borderRadius: scaleWidth(20),
    backgroundColor: COLORS.PrimaryWhite,
    marginLeft: scaleWidth(5),
  },
  textYes: {
    color: COLORS.PrimaryBlack,
    lineHeight: 17,
    paddingHorizontal: scaleWidth(32),
    fontSize: normalizeFont(16),
    paddingVertical: scaleHeight(9),
    fontFamily: FONTS.RobotoMedium,
  },
  ActiveateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 36,
  },
  ActivateContainer: {borderRadius: 10, backgroundColor: '#339502', marginLeft: 5},
});
export default DeactivateModal;
