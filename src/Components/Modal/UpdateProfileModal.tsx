import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

const UpdateProfileModal = ({visible, onClose}) => {
  return (
    <Modal animationType="none" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Please Update your</Text>
          <Text style={styles.TxtUpdate}>Profile Details!</Text>
          <Text style={styles.Txtdetail}>
            Looks like your information needs a quick update before you can grab a subscription!
            Head over to your profile settings and fill in the missing details.
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.updateView}>
            <Text style={styles.txtUpdate}>Update Profile</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    marginHorizontal: scaleWidth(25),
    backgroundColor: 'white',
    borderRadius: scaleWidth(20),
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
  modalText: {
    color: '#696969',
    fontSize: normalizeFont(22.23),
    fontFamily: FONTS.RobotoRegular,
    textAlign: 'center',
  },
  TxtUpdate: {
    color: '#696969',
    fontSize: normalizeFont(22.23),
    fontFamily: FONTS.RobotoBold,
    textAlign: 'center',
  },
  Txtdetail: {
    color: '#5D6166',
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoRegular,
    textAlign: 'center',
    marginTop: scaleHeight(22),
  },
  updateView: {
    backgroundColor: COLORS.PrimaryGreen,
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(10),
    borderRadius: scaleWidth(6),
    marginTop: scaleHeight(22),
  },
  txtUpdate: {
    color: COLORS.PrimaryWhite,
    fontSize: normalizeFont(13),
    fontFamily: FONTS.RobotoBold,
  },
});

export default UpdateProfileModal;
