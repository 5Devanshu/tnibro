import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './style';
import { COLORS } from '../../Constants/enums/colorsEnum';

const DropdownComnComponent = (props: any) => {
  const { title, data = [], onSelect, defaultValue = '', height,Value } = props

  const [value, setValue] = useState(defaultValue || '');
  const [isFocus, setIsFocus] = useState(false);

  const memoizedLabel = useMemo(() => {
    if (value || isFocus) {
      return (
        <Text allowFontScaling={false} style={[styles.label, isFocus && { color: 'blue' }]}>
          {title}
        </Text>
      );
    }
    return null;
  }, [value, isFocus, title]);

  return (
    <View style={styles.container}>
      {memoizedLabel}
      <Dropdown
        allowFontScaling={false}
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle} //
        itemTextStyle={{color:COLORS.Black}}
        autoScroll={false}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        iconColor={COLORS.PrimaryWhite}
        data={data}
         // search
        maxHeight={height}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select items' : '...'}
        searchPlaceholder="Search..."
        value={Value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onSelect(item)
        }}
      />
    </View>
  );
};

export default DropdownComnComponent;

