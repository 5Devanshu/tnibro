import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {COLORS, scaleHeight, scaleWidth} from '../../../Constants/enums';
import HTML from 'react-native-render-html';

interface MyComponentProps {
  text_content: string;
}
const TinymceDataComp: React.FC<MyComponentProps> = ({text_content}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled={true}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <HTML source={{html: text_content}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PrimaryWhite,
    width: '100%',
    paddingHorizontal: scaleWidth(25),
    position: 'relative',
    marginVertical: scaleHeight(10),
  },
});

export default React.memo(TinymceDataComp);
