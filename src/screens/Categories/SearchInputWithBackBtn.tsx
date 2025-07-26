import React, {useEffect, useRef} from 'react';
import {View, TextInput, StyleSheet, Image, TouchableOpacity, Platform, Text} from 'react-native';
import {COLORS} from '../../Constants/enums/colorsEnum';
import IMAGES from '../../Constants/enums/ImagesEnum';
import {normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums/Dimensions';
import FONTS from '../../Constants/enums/Fonts';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import {styleBase} from '../../Constants/enums';

type SearchInputWithBackBtnProps = {
  value: string;
  onChangeText: (text: string) => void;
  onPressCross: () => void;
  onSortPress: () => void;
  ascendingOrder: boolean;
};
const styles = StyleSheet.create({
  searchIcon: {
    height: scaleHeight(16),
    width: scaleWidth(16),
    marginRight: scaleWidth(5),
  },
  TextInput: {
    color: COLORS.PrimaryBlack,
    flex: 1,
    fontFamily: FONTS.RobotoRegular,
  },
  hitSlop: {
    top: 20,
    bottom: 20,
    left: 50,
    right: 50,
  },
  container: {
    paddingHorizontal: scaleWidth(20),
  },
  searchinputcontainer: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PrimaryWhite,
    borderRadius: scaleWidth(25),
    paddingHorizontal: scaleWidth(15),
    paddingVertical: Platform.OS === 'ios' ? scaleHeight(12) : scaleHeight(0),
  },
  sorting_container: {
    borderRadius: scaleWidth(25),
    paddingHorizontal: scaleWidth(15),
    backgroundColor: COLORS.PrimaryWhite,
  },
  sortIcon: {
    width: scaleWidth(40),
    height: scaleHeight(40),
  },
});

const SearchInputWithBackBtn: React.FC<SearchInputWithBackBtnProps> = ({
  value,
  onChangeText,
  onPressCross,
  onSortPress, // New prop for handling sorting
  ascendingOrder,
}) => {
  const textInputRef = useRef<TextInput | null>(null); // Specify the type of ref
  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);
  return (
    <View style={[styleBase.inrowspaceBetween, styles.container]}>
      <View style={styles.searchinputcontainer}>
        <Image alt="" resizeMode="contain" style={styles.searchIcon} source={IMAGES.SearchIcon} />
        <TextInput
          ref={textInputRef}
          value={value}
          onChangeText={onChangeText}
          style={[styles.TextInput, {fontSize: value ? normalizeFont(16) : normalizeFont(12)}]}
          keyboardType="default"
          autoCorrect={false}
          placeholder="Search any Categories"
          placeholderTextColor={COLORS.BorderColor}
        />
        {/* closing search and textfilel */}
        {value.length > 0 && (
          <TouchableOpacity activeOpacity={1} onPress={onPressCross} hitSlop={styles.hitSlop}>
            <Image
              alt=""
              resizeMode="contain"
              style={styles.searchIcon}
              source={IMAGES.ErrorSign}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* closing search container */}
      <TouchableOpacity activeOpacity={1} onPress={onSortPress} style={styles.sorting_container}>
        <Image
          source={ascendingOrder ? IMAGES.Sorting_Down : IMAGES.Sorting_Up}
          style={styles.sortIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SearchInputWithBackBtn);
