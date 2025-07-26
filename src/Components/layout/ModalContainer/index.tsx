import React from 'react';
import {Modal, Pressable, View, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  normalizeFont,
  scaleHeight,
  Percentage,
  GlobalStyleValues,
  FixedValue,
  styleBase,
  CONSTANT_TEXT,
  COLORS,
  MinValues,
} from '../../../Constants/enums';

export interface IModalContainerProps {
  children: React.ReactElement | null;
  visible: boolean;
  onPressOutside?: () => void;
  backgroundColor?: string;
}
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: Percentage.PRECENTAGE_100,
    height: Percentage.PRECENTAGE_100,
    backgroundColor: COLORS.LIGHT_BLACK,
  },
  outterBtn: {
    ...styleBase.absolutePosition,
    zIndex: MinValues.CONSTANT_VALUE_MIN_1,
    width: Percentage.PRECENTAGE_100,
    height: Percentage.PRECENTAGE_100,
  },
  innerView: {
    ...styleBase.flex1,
    justifyContent: GlobalStyleValues.FLEX_END,
  },
});

const ModalContainer = (props: IModalContainerProps) => {
  const {children, visible, onPressOutside, backgroundColor} = props;

  return (
    <Modal transparent visible={visible} onRequestClose={onPressOutside}>
      <KeyboardAwareScrollView
        style={styleBase.flex1}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        overScrollMode="never"
        contentContainerStyle={styles.contentContainerStyle}
        keyboardShouldPersistTaps={GlobalStyleValues.HANDLED}>
        <View style={styles.innerView}>
          <Pressable style={styles.outterBtn} onPress={onPressOutside} />
          {children}
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default React.memo(ModalContainer);
