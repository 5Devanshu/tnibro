import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../../../Constants/enums';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import BackWithCenterIcons from '../../../../Components/BackButton/BackWithCenterIcons';
import MainContainer from '../../../../Components/MainContainer';

const PastScreen: React.FC = props => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  return (
    <MainContainer>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: normalizeFont(26), color: COLORS.PrimaryBlack}}>CurrentScreen</Text>
      </View>
    </MainContainer>
  );
};

export default React.memo(PastScreen);
