import React, {useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../../Constants/enums/colorsEnum';
import {FixedValue} from '../../Constants/enums/numberEnum';
import {GlobalStyleValues} from '../../Constants/enums/globalStyleEnum';
import { scaleWidth } from '../../Constants/enums';

const DropDownElement = (props: any) => {
  const {
    title,
    data = [],
    onSelect,
    defaultValue = '',
    value,
    height = 20,
    placeholder = 'Select item',
  } = props;

  // const [value, setValue] = useState(defaultValue || '');
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return <Text allowFontScaling={false} style={[styles.label, isFocus && {color: 'blue'}]}>{title}</Text>;
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Dropdown
        style={[styles.dropdown, {height}, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={{color: COLORS.Black}}
        autoScroll={false}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        iconColor="black"
        data={data}
        search={false}
        // maxHeight={height}
        labelField="label"
        valueField="value"
        // placeholder={!isFocus ? 'Select Any' : '...'}
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          // setValue(item.value);
          setIsFocus(false);
          onSelect(item);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: FixedValue.CONSTANT_VALUE_1,
    backgroundColor: COLORS.White,
    // padding: FixedValue.CONSTANT_VALUE_7,
  },
  dropdown: {
    // height: FixedValue.CONSTANT_VALUE_20,
    borderColor: '#C9C9C9',
    borderWidth: 0.5,
    paddingLeft: scaleWidth(FixedValue.CONSTANT_VALUE_8),
    color: COLORS.Black,
    backgroundColor: '#F2F2F2',
  },
  // icon: {
  //    // marginRight: FixedValue.CONSTANT_VALUE_5,
  // },
  label: {
    position: GlobalStyleValues.ABSOLUTE,
    backgroundColor: COLORS.White,
    left: FixedValue.CONSTANT_VALUE_22,
    top: FixedValue.CONSTANT_VALUE_8,
    zIndex: FixedValue.CONSTANT_VALUE_999,
    paddingHorizontal: scaleWidth(FixedValue.CONSTANT_VALUE_8),
    fontSize: FixedValue.CONSTANT_VALUE_10,
    color: COLORS.Black,
  },
  placeholderStyle: {
    fontSize: FixedValue.CONSTANT_VALUE_10,
    color: Platform.OS === 'ios' ? '#C7C7C7' : "#C7C7C7",
  },
  selectedTextStyle: {
    // backgroundColor:'red',
    fontSize: FixedValue.CONSTANT_VALUE_10,
    color: Platform.OS === 'ios' ? COLORS.Black : COLORS.Black,
  },
  iconStyle: {
    width: FixedValue.CONSTANT_VALUE_20,
    height: FixedValue.CONSTANT_VALUE_20,
    // backgroundColor: COLORS.Black,
    color: Platform.OS === 'ios' ? COLORS.Black : COLORS.Black,
    marginRight: 5,
  },
  inputSearchStyle: {
    height: FixedValue.CONSTANT_VALUE_20,
    fontSize: FixedValue.CONSTANT_VALUE_16,
    color: COLORS.Black,
  },
});
export default DropDownElement;
