import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { scaleHeight, scaleWidth } from '../../../Constants/enums';
import IMAGES from '../../../Constants/enums/ImagesEnum';

const UserRatingModal = ({
  visible,
  onClose,
  onSubmit,
  text_content = `Rate your support experience with us\non the ${Platform.OS === 'ios' ? 'Apple App Store' : 'Google Play Store'}`, 
  buttonText = 'RATE US',
}) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!visible) setRating(0);
  }, [visible]);

  const handleRating = useCallback((star) => {
    setRating(star);
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit?.(rating);
    onClose();
  }, [rating, onSubmit, onClose]);

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
        <Image source={IMAGES.rateUs} style={styles.image} />
        <Image source={IMAGES.App_Logo} style={styles.logo} />

        <View style={styles.starsRow}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity disabled
              key={index}
              onPress={() => handleRating(index + 1)}
              activeOpacity={0.7}
              accessibilityLabel={`Rate ${index + 1} stars`}
            >
              <Text style={[styles.star, rating > index ? styles.filledStar : styles.emptyStar]}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.heading}>{text_content}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.laterButton} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.laterText}>Maybe Later</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
            <Text style={styles.submitText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const baseButton = {
  paddingVertical: scaleHeight(14),
  paddingHorizontal: scaleWidth(35),
  borderRadius: scaleWidth(12),
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 5,
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
    paddingBottom: scaleHeight(30),
  },
  image: {
    height: 206,
    width: 263,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -scaleHeight(125),
  },
  logo: {

    height: 70,
    width: 70,
    borderRadius: 35,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop:15
  },
  heading: {
    fontSize: scaleWidth(20),
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: scaleHeight(24),
    textAlign: 'center',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scaleHeight(24),
  },
  star: {
    fontSize: scaleWidth(40),
    marginHorizontal: scaleWidth(6),
  },
  filledStar: {
    color: '#FFD700',
    textShadowColor: '#00000040',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  emptyStar: {
    color: '#228B22',
  },
  buttonContainer: {
    marginHorizontal:20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleWidth(15),
    marginTop: scaleHeight(10),
  },
  submitButton: {
    ...baseButton,
    backgroundColor: '#228B22',
    shadowColor: '#DFFFE8B2',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: scaleWidth(16),
    fontWeight: '600',
    textAlign: 'center',
  },
  laterButton: {
    ...baseButton,
    backgroundColor: '#F4F5F7',
    shadowColor: '#DFFFE8B2',
  },
  laterText: {
    color: '#3A3A3A',
    fontSize: scaleWidth(16),
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default UserRatingModal;
