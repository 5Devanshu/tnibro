import React from 'react';
import {StyleSheet, View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {COLORS, normalizeFont, scaleHeight} from '../Constants/enums';
import FONTS from '../Constants/enums/Fonts';
interface Props {
  title?: string;
  onClick?: (value?: any) => void;
  onClose?: (value?: any) => void;
  itemIcon?: string;
  isStatic?: boolean;
}

const MenuItem: React.FC<Props> = ({onClick, title, itemIcon, isStatic = false}) => {
  if (isStatic) {
    return (
      <View style={styles.settingsItem}>
        {itemIcon ? (
          <Image alt="" resizeMode="contain" style={styles.settingIcon} source={itemIcon} />
        ) : null}
        <Text allowFontScaling={false} style={styles.settingsItemText}>
          {title}
        </Text>
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.settingsItem}>
        {/* {itemIcon ? (
          <Image alt="" resizeMode="contain" style={styles.settingIcon} source={itemIcon} />
        ) : null} */}
        <Text allowFontScaling={false} style={styles.settingsItemText}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: scaleHeight(20),
  },
  settingsItemText: {
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(12),
    fontFamily: FONTS.RobotoRegular,
  },
  settingIcon: {
    width: 20,
    height: 20,
    margin: 10,
  },
});

const MenuListItem = React.memo(MenuItem);
export default MenuListItem;
