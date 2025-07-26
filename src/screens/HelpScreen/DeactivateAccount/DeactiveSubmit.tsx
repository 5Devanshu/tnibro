import React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import {CONSTANT_TEXT} from '../../../Constants/enums/constantText';
import {normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginReset} from '../../../apis/Onboarding/authenticationSlice';
import {COLORS} from '../../../Constants/enums';
import MainContainer from '../../../Components/MainContainer';
import FONTS from '../../../Constants/enums/Fonts';

interface DeactiveSubmitProps {
  navigation: any;
  route: any;
}

const DeactiveSubmit: React.FC<DeactiveSubmitProps> = ({navigation, route}) => {
  let timeout = null;
  const {height} = Dimensions.get('window');
  const isshowdetail = route.params;
  const dispatch = useDispatch();

  const removeLocalStorage = () => {
    AsyncStorage.removeItem('accessToken');
    AsyncStorage.removeItem('activeSymbol');
    AsyncStorage.removeItem('emailVerified');
    AsyncStorage.removeItem('userId');
    // AsyncStorage.removeItem('oneSignal_userId');
    AsyncStorage.removeItem('segment_Detail');
    AsyncStorage.removeItem('isverified');
  };

  const handleLogout = async () => {
    await removeLocalStorage();
    dispatch(loginReset());
    setTimeout(() => {
      navigation.push('Splash');
    }, 1000);
  };
  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? (height * 1) / 100 : 30}>
        <ScrollView
          style={styles.flex}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Image
              source={IMAGES.deactivateicon}
              style={{
                height: scaleWidth(228),
                width: scaleWidth(342),
                alignSelf: 'center',
                marginTop: scaleHeight(10),
              }}
            />
            <Text allowFontScaling={false} style={styles.headline}>
              {isshowdetail ? 'Your account is Deleted ' : 'Your account is Deactivated'}
            </Text>
            <Text allowFontScaling={false} style={styles.title}>
              {isshowdetail ? CONSTANT_TEXT.DELETE_TITLE : CONSTANT_TEXT.DEACTIVATE_TITLE}
            </Text>
            <View style={{marginTop: scaleHeight(44), marginBottom: scaleHeight(58)}}>
              <Pressable style={styles.VerifyBtn} onPress={() => handleLogout()}>
                <Text allowFontScaling={false} style={styles.VerifyBtnLbl}>
                  Okay
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </MainContainer>
  );
};
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.PrimaryBackGround,
  },
  flex: {
    flex: 1,
  },
  content: {
    position: 'relative',
    marginHorizontal: scaleWidth(30),
    marginTop: Platform.OS === 'ios' ? 60 : 30,
  },
  headline: {
    marginTop: scaleHeight(28),
    color: COLORS.PrimaryBlack,
    fontSize: normalizeFont(24),
    fontFamily: FONTS.RobotoBold,
  },
  title: {
    color: '#5D6166',
    fontSize: normalizeFont(14),
    fontWeight: '400',
    marginTop: scaleHeight(16),
    marginBottom: 30,
    fontFamily: FONTS.RobotoRegular,
    textAlign: 'center',
  },
  VerifyBtn: {
    backgroundColor: '#228B22',
    borderRadius: scaleWidth(25),
    alignSelf: 'center',
  },
  VerifyBtnLbl: {
    textAlign: 'center',
    fontSize: normalizeFont(16),
    color: COLORS.PrimaryWhite,
    paddingVertical: scaleHeight(17),
    paddingHorizontal: scaleWidth(100),
    fontFamily: FONTS.RobotoRegular,
  },
});

export default DeactiveSubmit;
