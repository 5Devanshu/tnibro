import React from 'react';
import {StyleSheet, TextInput, Image, View, TouchableOpacity} from 'react-native';
import FONTS from '../Constants/enums/Fonts';
import {COLORS, scaleWidth} from '../Constants/enums';

const InputBox: React.FC = (props: any) => {
  const {
    optionIcon = null,
    onOptionClick,
    isDisabled = false,
    styling,
    formIcon,
    textInputstyling,
  } = props;
  return (
    <View style={[styles.inputContainer, styling]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {formIcon ? (
          <View>
            <Image alt="" resizeMode="contain" style={styles.settingIcon} source={formIcon} />
          </View>
        ) : null}
        <TextInput
          allowFontScaling={false}
          {...props}
          style={[styles.textInput, {color: isDisabled ? 'silver' : '#000'}, textInputstyling]}
          editable={isDisabled ? false : true}
          selectTextOnFocus={isDisabled ? false : true}
        />
      </View>
      {optionIcon ? (
        <TouchableOpacity onPress={onOptionClick}>
          <Image alt="" resizeMode="contain" style={styles.settingIcon} source={optionIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLORS.PrimaryGreen,
    borderBottomWidth: 1,
  },
  textInput: {
    width: '90%',
    color: '#000',
    fontFamily: FONTS.RobotoRegular,
    fontSize: 20,
  },
  settingIcon: {
    width: scaleWidth(20),
    height: scaleWidth(20),
  },
});

const FormInput = React.memo(InputBox);
export default FormInput;
