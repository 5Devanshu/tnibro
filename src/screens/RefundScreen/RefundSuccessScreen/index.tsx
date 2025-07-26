import React, {FC} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import MainContainer from '../../../Components/MainContainer';
import {normalizeFont, scaleHeight, scaleWidth} from '../../../Constants/enums';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import {useDispatch, useSelector} from 'react-redux';
import {resetRefund} from '../../../apis/Onboarding/PaymentApi/CreateSubscSlice';
import FONTS from '../../../Constants/enums/Fonts';

interface SubscriptionScreenProps {
  navigation: any;
}
const RefundSuccessScreen: FC<SubscriptionScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const onPressBack = () => {
    dispatch(resetRefund());
    navigation.goBack();
  };
  return (
    <MainContainer bgColor="#FFF">
      <TitleWithBackBtnHeader centerTitle="Your Plan/Refund" onPressBackArrow={onPressBack} />
      <View style={styles.container}>
        <Image source={IMAGES.REFUND_SCREEN.RefundSuccess} style={styles.successImage} />
        <Text style={styles.txtheader} allowFontScaling={false}>
          Your Request Is Submitted Successfully!!
        </Text>
        <Text style={styles.txtDescription} allowFontScaling={false}>
          Thank you for your request. We have received your refund request and it is now being
          processed. Please allow 5 to 7 working days for the refund to be completed. You will
          receive a confirmation email once the refund has been processed. If you have any questions
          or need further assistance, please do not hesitate to contact our customer support team.
        </Text>
      </View>
    </MainContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scaleWidth(30),
  },
  successImage: {
    height: scaleWidth(111),
    width: scaleWidth(111),
    marginTop: -50,
  },
  txtheader: {
    color: '#2C362C',
    fontSize: normalizeFont(22),
    fontFamily: FONTS.RobotoBold,
    marginTop: scaleHeight(19),
    textAlign: 'center',
  },
  txtDescription: {
    color: '#777',
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoRegular,
    marginTop: scaleHeight(19),
    textAlign: 'center',
  },
});
export default React.memo(RefundSuccessScreen);
