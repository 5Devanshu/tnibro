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

const SortingDropdown = ({data, setSelectedValue, Value, onSelect, title}) => {
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
        iconStyle={styles.iconStyle}
        data={data}
        itemTextStyle={{color: COLORS.Black}}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        value={Value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value); // Sets local dropdown value
          setSelectedValue(item); // Passes selected value to parent
          setIsFocus(false);
          onSelect(item);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(150),
    marginLeft: scaleWidth(25),
  },
  label: {
    position: GlobalStyleValues.ABSOLUTE,
    fontSize: FixedValue.CONSTANT_VALUE_12,
    color: '#303030',
    left: 13,
    top: -10,
    zIndex: 999,
    paddingHorizontal: scaleWidth(5),
    backgroundColor: '#fff',
  },
  dropdown: {
    height: scaleHeight(34),
    borderColor: '#777777',
    borderWidth: 1,
    borderRadius: scaleWidth(53),
    paddingHorizontal: scaleWidth(8),
    color: COLORS.Black,
  },
  placeholderStyle: {
    fontSize: normalizeFont(14),
    color: '#a9a9a9',
  },
  selectedTextStyle: {
    fontSize: normalizeFont(14),
    color: '#525151',
  },
  iconStyle: {
    width: scaleWidth(20),
    height: scaleHeight(20),
  },
});

export default React.memo(SortingDropdown);
