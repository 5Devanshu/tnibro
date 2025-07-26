import React, {useMemo, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {
  COLORS,
  FixedValue,
  GlobalStyleValues,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../Constants/enums';

const SortDropDown = ({data, setSelectedValue, Value, onSelect, title}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const memoizedLabel = useMemo(() => {
    return (
      <Text allowFontScaling={false} style={[styles.label, isFocus && {color: 'blue'}]}>
        {title}
      </Text>
    );

    return null;
  }, [value, isFocus, title]);
  return (
    <View style={styles.container}>
      {memoizedLabel}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={{color: COLORS.Black}}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        value={Value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setSelectedValue(item);
          setIsFocus(false);
          onSelect(item);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scaleHeight(50),
  },
  label: {
    position: GlobalStyleValues.ABSOLUTE,
    fontSize: FixedValue.CONSTANT_VALUE_12,
    color: '#303030',
    left: scaleWidth(13),
    top: -10,
    zIndex: 999,
    paddingHorizontal: scaleWidth(5),
    backgroundColor: '#fff',
  },
  dropdown: {
    borderColor: '#646464',
    borderWidth: 1,
    borderRadius: scaleWidth(6),
    paddingHorizontal: scaleWidth(15),
    flex: 1,
    color: COLORS.Black,
  },
  placeholderStyle: {
    fontSize: normalizeFont(16),
    color: '#a9a9a9',
  },
  selectedTextStyle: {
    fontSize: normalizeFont(16),
    color: '#525151',
  },
  iconStyle: {
    width: scaleWidth(30),
    height: scaleHeight(30),
  },
});

export default SortDropDown;
