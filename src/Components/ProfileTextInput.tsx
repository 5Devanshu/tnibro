import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import { scaleWidth } from '../Constants/enums';

const Input: React.FC = (props: any) => {
  const {onChange, placeHolder, defaultValue} = props;

  return (
    <TextInput
      allowFontScaling={false}
      autoCorrect={false}
      onChangeText={onChange}
      placeholder={placeHolder}
      placeholderTextColor="#6b7280"
      style={styles.inputControl}
      value={defaultValue}
    />
  );
};

const styles = StyleSheet.create({
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  settingsItemText: {
    color: '#000',
    fontSize: 16,
  },
  settingIcon: {
    width: 20,
    height: 20,
    margin: 10,
  },
  inputControl: {
    color: '#000',
    height: 44,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 15,
    paddingLeft: scaleWidth(10),
    marginTop: 10,
    fontFamily: 'Montreal-Light',
  },
});

const InputField = React.memo(Input);
export default InputField;
