import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { scaleHeight, scaleWidth } from '../../Constants/enums';
import HTML from 'react-native-render-html';
import Modal from 'react-native-modal';
import { navigation } from '../../Navigation/NavigationService';

interface UserGuideModalProps {
  visible: boolean;
  onClose: () => void;
  text_content?: string;
}

const UserGuideModal: React.FC<UserGuideModalProps> = ({ visible, onClose, text_content = '' }) => {
  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={400}
      animationOutTiming={400}
      backdropTransitionOutTiming={0.5}
    >
      <View style={styles.modalContent}>
        <View style={styles.closeIndicator} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <HTML source={{ html: text_content }} />
        </ScrollView>
        <TouchableOpacity
  activeOpacity={1}
  onPress={() => {
    onClose();
    setTimeout(() => navigation('SubscriptionScreen'), 500);
  }}
  style={{
    position: 'absolute',
    top: 100, // replaced marginTop + top
    width: '85%',
    height: 320,
    alignSelf: 'center',
  }}
/>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: scaleWidth(20),
    borderTopRightRadius: scaleWidth(20),
    width: '100%',
    alignSelf: 'center',
    maxHeight: scaleHeight(750),
    paddingTop: scaleHeight(10),
    position: 'relative'
  },
  closeIndicator: {
    height: scaleHeight(5),
    width: scaleWidth(50),
    alignSelf: 'center',
    backgroundColor: '#000',
    borderRadius: scaleWidth(10),
    marginBottom: scaleHeight(10),
  },
  scrollContent: {
    paddingTop: 0,
    paddingBottom: scaleHeight(20),
  },
});

export default UserGuideModal;
