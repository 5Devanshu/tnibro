import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {colors} from '../../utils/colors';
import IMAGES from '../../Constants/enums/ImagesEnum';

export default function Header({title, headerRight, onPress, icon}) {
  return (
    <View style={styles.shadowWrapper}>
      <View style={styles.wrapper}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={onPress}>
            <Image source={IMAGES.Back_Icon} style={{height: 42, width: 42}} resizeMode="contain" />
          </TouchableOpacity>
          {icon}
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
        {headerRight && <View>{headerRight}</View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
    zIndex: 1000,
    borderBottomWidth: 0.1,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    height: 56,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: colors.PRIMARY,
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#B6B4B4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {fontSize: 16, color: '#1C1C1C', fontFamily: 'Lato-Bold'},
});
