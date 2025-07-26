import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from '../Constants/enums/colorsEnum';
import { scaleWidth } from '../Constants/enums/Dimensions';

const DropdownComponent = props => {
  const {
    title,
    data = [],
    onSelect,
    isDisabled = false,
    defaultValue = '',
    placeholder = 'Select item',
    additionalStyle
  } = props;
  const [value, setValue] = useState(defaultValue || '');
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return <Text allowFontScaling={false} style={[styles.label, isFocus && { color: 'blue' }]}>{title}</Text>;
    }
    return null;
  };

  return (
    <View style={[styles.container, additionalStyle]}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.itemStyle}
        iconColor={COLORS.PrimaryWhite}
        data={data}
        disable={isDisabled}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onSelect(item);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    width: Dimensions.get('window').width - 120,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: scaleWidth(8),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: scaleWidth(8),
    fontSize: 14,
    color: '#303030',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemStyle: {
    color: '#000',
  },
});
