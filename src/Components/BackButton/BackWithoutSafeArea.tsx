import React from 'react';
import {Image, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {scaleWidth, scaleHeight} from '../../Constants/enums';
import {goBack, popToBack, popToTop} from '../../Navigation/NavigationService';
import IMAGES from '../../Constants/enums/ImagesEnum';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const styles = (props: {top: number; opacity?: number}) =>
  StyleSheet.create({
    containerView: {
      marginTop: Platform.OS === 'ios' ? scaleHeight(props?.top + 16) : scaleHeight(20),
      marginLeft: scaleWidth(26),
      position: 'absolute',
      zIndex: 999,
      opacity: props?.opacity ?? 1,
    },
    backIcon: {
      height: scaleHeight(42),
      width: scaleWidth(42),
    },
  });
interface BackWithoutSafeAreaProps {
  image?: any;
  additionalAction?: () => void;
  opacity?: number;
  onlyActionPerform?: boolean;
  discardGoBack?: boolean;
  noOfScreensToBack?: number | null;
  isNavigatePopToTop?: boolean;
}
const BackWithoutSafeArea: React.FC<BackWithoutSafeAreaProps> = ({
  image,
  additionalAction = () => {},
  opacity,
  onlyActionPerform = false,
  discardGoBack = false,
  noOfScreensToBack = null,
  isNavigatePopToTop = false,
}) => {
  const insets = useSafeAreaInsets();
  const goBackAction = () => {
    if (isNavigatePopToTop) {
      popToTop();
      return;
    }
    if (onlyActionPerform) {
      additionalAction();
    } else if (discardGoBack) {
      popToBack(noOfScreensToBack ? noOfScreensToBack : 1);
    } else {
      additionalAction();
      goBack();
    }
  };
  return (
    <TouchableOpacity
      onPress={goBackAction}
      style={styles({top: insets.top}).containerView}
      activeOpacity={1}>
      <Image
        // resizeMode="center"
        source={image ?? IMAGES.Back_Icon}
        style={[styles({opacity: opacity ?? 1}).backIcon]}
      />
    </TouchableOpacity>
  );
};
export default BackWithoutSafeArea;
