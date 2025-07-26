import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../Constants/enums';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MainContainerProps {
  bgColor?: string;
  children: ReactNode;
}

const styles = StyleSheet.create({
  mainContainer: (bgColor: string | undefined, paddingTop: number) => ({
    flex: 1,
    backgroundColor: bgColor || COLORS.PrimaryBackGround,
    paddingTop,
  }),
});

function MainContainer(props: MainContainerProps) {
  const insets = useSafeAreaInsets();

  return <View style={styles.mainContainer(props.bgColor, insets.top)}>{props.children}</View>;
}

export default React.memo(MainContainer);
