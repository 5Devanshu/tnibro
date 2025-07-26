import { StyleSheet } from 'react-native';
import { COLORS, FONTS, scaleHeight, styleBase } from '../../Constants/enums';

export const styles = StyleSheet.create({
  mainContainer: {
    ...styleBase.flex1,
    ...styleBase.inCenter,
    ...styleBase.flex1,
    ...styleBase.absolutePosition,
  },
  mainContainerForBlankView: {
    ...styleBase.inCenter,
  },
  container: (tappable) => ({
    height: '100%',
    width: '100%',
    zIndex: tappable ? 1 : 999,
    backgroundColor: 'transparent',
  }),
  textStyle: {
    width: '65%',
    marginVertical: scaleHeight(16),
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    color: COLORS.PrimaryGreen,
    fontWeight: '500',
    lineHeight: scaleHeight(20),
  },
});
