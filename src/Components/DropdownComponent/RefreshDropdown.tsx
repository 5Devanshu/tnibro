import React, {useState, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../../Constants/enums/colorsEnum';
import {Platform} from 'react-native';
import {FixedValue} from '../../Constants/enums/numberEnum';
import {GlobalStyleValues} from '../../Constants/enums/globalStyleEnum';
import {scaleHeight, scaleWidth} from '../../Constants/enums';

const RefreshDropdown = (props: any) => {
  const {title, data = [], onSelect, defaultValue = '', height, Value, disable} = props;

  const [value, setValue] = useState(defaultValue || '');
  const [isFocus, setIsFocus] = useState(false);

  const memoizedLabel = useMemo(() => {
    if (value || isFocus) {
      return (
        <Text allowFontScaling={false} style={[styles.label, isFocus && {color: 'blue'}]}>
          {title}
        </Text>
      );
    }
    return null;
  }, [value, isFocus, title]);

  return (
    <View style={[styles.container]}>
      {/* {memoizedLabel} */}
      <Dropdown
        allowFontScaling={false}
        style={[
          styles.dropdown,
          isFocus && {borderColor: 'blue'},
          disable && {borderColor: '#ccc'},
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle} //
        itemTextStyle={{color: COLORS.Black}}
        autoScroll={false}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={[styles.iconStyle, disable && {backgroundColor: '#ccc'}]}
        iconColor={COLORS.PrimaryWhite}
        data={data}
        disable={disable}
        // search
        maxHeight={height}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Refresh time' : '...'}
        searchPlaceholder="Search..."
        value={Value}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DFFFE8',
  },
  dropdown: {
    height: scaleHeight(FixedValue.CONSTANT_VALUE_28),
    width: scaleWidth(FixedValue.CONSTANT_VALUE_90),
    borderColor: COLORS.PrimaryGreen,
    borderWidth: FixedValue.CONSTANT_VALUE_1,
    borderRadius: 10,
    paddingLeft: scaleWidth(FixedValue.CONSTANT_VALUE_8),
    color: COLORS.Black,
  },
  label: {
    position: GlobalStyleValues.ABSOLUTE,
    backgroundColor: COLORS.SecondaryGreen,
    fontSize: FixedValue.CONSTANT_VALUE_12,
    color: '#303030',
    left: FixedValue.CONSTANT_VALUE_13,
    top: -10,
    zIndex: FixedValue.CONSTANT_VALUE_999,
    paddingHorizontal: scaleWidth(FixedValue.CONSTANT_VALUE_5),
  },
  placeholderStyle: {
    fontSize: FixedValue.CONSTANT_VALUE_9,
    color: Platform.OS === 'ios' ? '#525151' : '#525151',
  },
  selectedTextStyle: {
    fontSize: FixedValue.CONSTANT_VALUE_12,
    color: Platform.OS === 'ios' ? '#525151' : '#525151',
  },
  iconStyle: {
    height: scaleHeight(FixedValue.CONSTANT_VALUE_28),
    width: scaleWidth(FixedValue.CONSTANT_VALUE_28),
    backgroundColor: COLORS.PrimaryGreen,
    borderTopRightRadius: scaleWidth(10),
    borderBottomRightRadius: 10,
  },
  inputSearchStyle: {
    height: FixedValue.CONSTANT_VALUE_40,
    fontSize: FixedValue.CONSTANT_VALUE_16,
  },
});

export default RefreshDropdown;
