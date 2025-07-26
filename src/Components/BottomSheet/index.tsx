import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import {COLORS} from '../../Constants/enums';

const BottomSheet = props => {
  const {onCancel, isvisible} = props;

  return (
    <Modal
      onBackdropPress={onCancel}
      isVisible={isvisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      backdropOpacity={Platform.OS === 'android' ? 0.05 : 0.15}
      //   key={key}
    >
      <TouchableOpacity
        onPress={onCancel}
        style={{height: '80%', width: '100%'}}></TouchableOpacity>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.boxContainer(COLORS.bottomsheet_background_color),
            styles.optionContainer,
          ]}>
          <View style={[styles.txtStyle(true, 46)]}>
            <Text style={styles.text_one}>{'Stock yaari alerts'}</Text>
          </View>
          <TouchableOpacity style={[styles.txtStyle(true, 57)]} onPress={() => {}}>
            <Text style={styles.text_two}>{'Add this alert'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.txtStyle(false, 57)]} onPress={() => {}}>
            <Text style={styles.text_three}>{'Delete this alert'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.boxContainer(COLORS.bottomsheet_background_color), styles.cancelField]}
          onPress={onCancel}>
          <Text style={styles.text_two}>{'CANCEL'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
export default React.memo(BottomSheet);

{
  /* <BottomSheet onCancel={''} 
isvisible={true} /> */
}
