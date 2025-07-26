import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { COLORS, scaleHeight } from '../../Constants/enums';
import * as Progress from 'react-native-progress';

export const Loader = (props) => {
  let style = styles.container(props?.tappable ? true : false);
  function getContainerStyle() {
    return props.showForBlankScreen
      ? styles.mainContainerForBlankView
      : styles.mainContainer;
  }
  return (
    <View style={props?.asComponent ? style : [getContainerStyle(), style]}>
      <View style={{marginTop:props?.marginTop?props?.marginTop:0}}>
       <Progress.Circle
          size={scaleHeight(props?.height ?? 22)}
          endAngle={0.8}
          borderWidth={2}
          borderColor={COLORS.LOADER_COLOR}
          indeterminateAnimationDuration={1000}
          indeterminate={true}
          color={COLORS.blue}
        />
        {props?.message && <Text style={styles.textStyle}>{props?.message}</Text>}
      </View>
    </View>
  );
};
