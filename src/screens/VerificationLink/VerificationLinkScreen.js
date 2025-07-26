// // when signup through other country user
// import React, {useEffect, useState} from 'react';
// import {
//   ImageBackground,
//   KeyboardAvoidingView,
//   Image,
//   Platform,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
//   Pressable,
//   ActivityIndicator,
// } from 'react-native';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
// import {useSelector, useDispatch} from 'react-redux';
// import {verifyEmailOtp} from '../../apis/Onboarding/verifyEmailOtpSlice';
// import {getResendEmail} from '../../apis/Onboarding/resendEmailSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import styles from './style';
// import {CONSTANT_TEXT} from '../../Constants/enums/constantText';
// import IMAGES from '../../Constants/enums/ImagesEnum';
// import {COLORS} from '../../Constants/enums/colorsEnum';
// import DeviceInfo from 'react-native-device-info';
// import {uploadFcmToken} from '../../apis/Onboarding/authenticationSlice';

// let timeout = null;
// const VerificationScreen = ({navigation, route}) => {
//   const dispatch = useDispatch();
//   // const { referred_by, } = route?.params;
//   const authenticationData = useSelector(state => state.authentication);
//   const verifyemailOtpData = useSelector(state => state.verifyemailOtp);
//   const {isSignupSuccess, loader, isLoginWithEmail} = authenticationData;
//   const {isemailOtpVerifyError, isverified, isemailOtpVerifySuccess} = verifyemailOtpData;

//   const [otpCode, setOtpCode] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [deviceDetail, setDeviceDetail] = useState({
//     getUniqueId: '',
//     getDeviceName: '',
//     getDeviceType: '',
//   });
//   const handleVerifyOtp = () => {
//     if (otpCode.length < 6) {
//       setErrorMessage('OTP invalid');
//     } else {
//       if (isLoginWithEmail?.response?.email_verified == false) {
//         dispatch(
//           verifyEmailOtp({
//             otp: otpCode,
//             userid: isLoginWithEmail?.response?.id.toString(),
//             //refered by send
//           }),
//         );
//       } else {
//         dispatch(
//           verifyEmailOtp({
//             otp: otpCode,
//             userid: isSignupSuccess?.response?.id.toString(),
//           }),
//         );
//       }
//     }
//   };

//   useEffect(() => {
//     if (isverified) {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         handleSession();
//       }, 1000);
//     }
//   }, [isverified]);

//   const handleCodeFill = code => {
//     setOtpCode(code.toString());
//     if (code.toString().length === 6) {
//       setErrorMessage('');
//     }
//   };

//   const handleSession = async () => {
//     try {
//       await AsyncStorage.setItem('isverified', isverified);
//       // navigation.push('Home');
//       navigation.push('DrawerNavigation');
//     } catch (error) {}
//   };

//   const onGoBack = () => {
//     navigation.goBack();
//   };

//   const handleResend = () => {
//     dispatch(
//       getResendEmail({
//         userid:
//           isSignupSuccess?.response?.id.toString() || isLoginWithEmail?.response?.id.toString(),
//       }),
//     );
//   };
//   const getDeviceInfo = async () => {
//     const UniqueId = await DeviceInfo.getUniqueId();
//     const deviceName = await DeviceInfo.getDeviceName();
//     const DeviceType = await DeviceInfo.getDeviceType();
//     setDeviceDetail({
//       getUniqueId: UniqueId,
//       getDeviceName: deviceName,
//       getDeviceType: DeviceType,
//     });
//   };
//   useEffect(() => {
//     getDeviceInfo();
//   }, []);
//   useEffect(() => {
//     if (isemailOtpVerifySuccess) {
//       AsyncStorage.getItem('oneSignal_userId').then(oneSignal_userId => {
//         dispatch(
//           uploadFcmToken({
//             userid: isemailOtpVerifySuccess?.data?.user_details?.id,
//             notify_token: oneSignal_userId,
//             device_name: deviceDetail.getDeviceName,
//             device_type: deviceDetail.getDeviceType,
//             device_id: deviceDetail.getUniqueId,
//           }),
//         );
//       });
//     }
//   }, [isemailOtpVerifySuccess]);

//   return (
//     <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
//       <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
//         <View style={styles.spaceView}></View>
//         <ImageBackground
//           source={IMAGES.Tnibro_Back_Light}
//           resizeMode="stretch"
//           style={styles.imageBackground}>
//           {/* logo tnibro */}
//           <View>
//             <Image source={IMAGES.Logotnibro_New} style={styles.image1} />
//           </View>
//           <View style={styles.bottomStyle}>
//             <View style={styles.container}>
//               <Text allowFontScaling={false} style={styles.selectBtnTxt}>
//                 {CONSTANT_TEXT.VERIFY_OTP}
//               </Text>
//               {/* text verify otp */}
//               <View style={styles.forgotDes}>
//                 {/* txt  */}
//                 <Text allowFontScaling={false} style={[styles.forgotDesLbl, {marginTop: 20}]}>
//                   {CONSTANT_TEXT.PLEASE_ENTER_CODE}
//                 </Text>
//                 <Text allowFontScaling={false} style={styles.forgotDesLbl}>
//                   {isSignupSuccess?.response?.email}
//                   {isLoginWithEmail?.response?.email}
//                 </Text>
//               </View>
//               <View style={styles.formCon}>
//                 {/* enter otp here */}
//                 <OTPInputView
//                   allowFontScaling={false}
//                   style={styles.otpStyling}
//                   pinCount={6}
//                   autoFocusOnLoad={false}
//                   codeInputFieldStyle={styles.underlineStyleBase}
//                   codeInputHighlightStyle={styles.underlineStyleHighLighted}
//                   onCodeFilled={handleCodeFill}
//                 />
//                 {/* show error */}
//                 <View style={styles.error_style}>
//                   {errorMessage || isemailOtpVerifyError ? (
//                     <Text allowFontScaling={false} style={styles.danger}>
//                       {errorMessage || isemailOtpVerifyError}
//                     </Text>
//                   ) : null}
//                 </View>
//                 {/* verify button */}
//                 <TouchableOpacity onPress={handleVerifyOtp}>
//                   <View style={styles.btn}>
//                     {loader ? (
//                       <ActivityIndicator size="small" color={COLORS.White} />
//                     ) : (
//                       <Text allowFontScaling={false} style={styles.btnText}>
//                         {CONSTANT_TEXT.VERIFY}
//                       </Text>
//                     )}
//                   </View>
//                 </TouchableOpacity>

//                 <View
//                   style={{
//                     flexDirection: 'row-reverse',
//                     gap: 100,
//                   }}>
//                   {/* resend otp text */}
//                   <Pressable onPress={handleResend}>
//                     <Text allowFontScaling={false} style={styles.registerLbl}>
//                       {CONSTANT_TEXT.RESEND_OTP}
//                     </Text>
//                   </Pressable>
//                   {/* go back txt */}
//                   <Pressable onPress={onGoBack}>
//                     <Text allowFontScaling={false} style={styles.registerLbl}>
//                       {CONSTANT_TEXT.GO_BACK}
//                     </Text>
//                   </Pressable>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </ImageBackground>
//       </KeyboardAvoidingView>
//     </ScrollView>
//   );
// };
// export default VerificationScreen;
