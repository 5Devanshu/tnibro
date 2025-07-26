import React, {useState, useEffect, memo} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums/Dimensions';
import {COLORS} from '../../../Constants/enums';
import Modal from 'react-native-modal';
import FONTS from '../../../Constants/enums/Fonts';

const CreateNewWatchlist = (props: any) => {
  const {isVisible, onClose, onSave, textHeader = 'Create New Watchlist', watchlistdetail} = props;
  const [inputValue, setInputValue] = useState(watchlistdetail?.Name || '');
  const isFocused = useIsFocused();

  const handleInputChange = (txt: string) => {
    setInputValue(txt);
  };
  const handleSave = () => {
    onSave(inputValue);
    setInputValue(''); // Clear the input field after saving
    onClose();
  };
  const handleonClose = () => {
    setInputValue(''); // Clear the input field after saving
    onClose();
  };
  useEffect(() => {
    if (isFocused) {
      setInputValue(watchlistdetail?.Name || '');
    }
  }, [isFocused, isVisible]);

  return (
    <Modal
      style={styles.bottomModal}
      onBackButtonPress={handleonClose}
      onSwipeComplete={handleonClose}
      animationInTiming={400}
      animationOutTiming={400}
      swipeDirection="down"
      onBackdropPress={handleonClose}
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0.5}>
      <KeyboardAvoidingView
        style={styles.modalContainer} /// change name
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 30}>
        <TouchableOpacity
          hitSlop={{bottom: 20}}
          onPress={() => {
            Keyboard.dismiss();
            handleonClose();
          }}
          style={styles.modalClose}></TouchableOpacity>
        <View style={styles.modalContent}>
          <View>
            <Text allowFontScaling={false} style={styles.nameLabel}>
              Create New Watchlist
            </Text>
            <TextInput
              allowFontScaling={false}
              placeholderTextColor={COLORS.BorderColor}
              style={styles.inputstyle}
              value={inputValue}
              onChangeText={handleInputChange}
              placeholder="Add watchlist name"
            />
            <TouchableOpacity
              style={[
                styles.createContainer,
                {
                  backgroundColor: inputValue ? '#228B22' : COLORS.PrimaryBackGround, // Change the color when disabled
                },
              ]}
              onPress={handleSave}
              disabled={!inputValue}>
              <Text
                allowFontScaling={false}
                style={[
                  styles.buttonstyle,
                  {
                    color: inputValue ? COLORS.PrimaryWhite : COLORS.BorderColor,
                  },
                ]}>
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    width: '100%',
    borderTopLeftRadius: scaleWidth(24),
    borderTopRightRadius: scaleWidth(24),
    backgroundColor: COLORS.PrimaryWhite,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: scaleWidth(30),
    paddingBottom: scaleHeight(10),
  },
  bottomModal: {
    height: scaleHeight(400),
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginBottom: 0,
  },
  modalClose: {
    height: scaleHeight(4),
    width: scaleWidth(56),
    alignSelf: 'center',
    marginTop: scaleHeight(15),
    backgroundColor: 'rgb(72, 72, 72)',
    borderRadius: scaleWidth(4),
  },
  modalContent: {
    flex: 1,
  },
  nameLabel: {
    marginVertical: scaleHeight(10),
    color: COLORS.BorderColor,
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoMedium,
  },
  createContainer: {
    marginBottom: 35,
    marginTop: scaleHeight(20),
    paddingHorizontal: scaleWidth(14),
    paddingVertical: scaleHeight(16),
    borderRadius: 7,
  },
  inputstyle: {
    height: scaleHeight(48),
    fontSize: normalizeFont(12),
    color: COLORS.PrimaryBlack,
    paddingLeft: scaleWidth(11),
    backgroundColor: COLORS.PrimaryBackGround,
    marginTop: scaleHeight(15),
  },
  buttonstyle: {
    fontFamily: FONTS.RobotoMedium,
    textAlign: 'center',
    fontSize: normalizeFont(14),
  },
});

export default memo(CreateNewWatchlist);
