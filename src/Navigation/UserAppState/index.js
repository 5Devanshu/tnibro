import React, {useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Platform,
  Text,
  Alert,
  Linking,
  AppState,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
// import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IMAGES from '../../Constants/enums/ImagesEnum';
// // import NetInfo from "@react-native-community/netinfo";

// // import { copyAsynStorageToRedux } from "../../redux";
// // import { STATE_OF_APP, COLORS, FONTS, BASE_URL } from "../../constants";
// // import {RewardOnActionContext} from '../../ContextAPI/RewardOnAction';
// // import { NO_NETWORK } from "../../constants/actionTypes";
// import {setConnectionStatus} from '../../utils/utils';
// import {normalizeFont, scaleHeight} from '../../Constants/enums/Dimensions';
// // import apiUrls from "../../constants/apiUrls";
// // import { getVersion } from "react-native-device-info";
// const {width} = Dimensions.get('window');
// const NO_NETWORK = {
//   NO_NETWORK_FOUND: 'NO_NETWORK_FOUND',
// };
const styles = StyleSheet.create({
  // offlineContainer: {
  //   backgroundColor: '#cc0000',
  //   height: scaleHeight(30),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   width,
  //   position: 'absolute',
  //   top: Platform.OS === 'ios' ? scaleHeight(30) : 0,
  // },
  // offlineText: {
  //   color: '#fff',
  //   // fontFamily: FONTS.WorkSansRegular,
  //   fontSize: normalizeFont(14),
  // },
  // closeContainer: {
  //   position: 'absolute',
  //   right: -10,
  //   top: -10,
  // },
  // sortIcon: {
  //   height: 30,
  //   width: 30,
  // },
  // modalView: {
  //   position: 'relative',
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 10,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   // marginTop: 200,
  // },
});

export default function UserAppState(props) {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   Alert.alert('welcome');
  // }, []);
;
  //   const [status, setStatus] = React.useState(true);
  //   const [isAppStarted, setIsAppStarted] = React.useState(false);
  //   const [showTryAgainBtn, setShowTryAgainBtn] = React.useState(false);
  //   //   const {setIsTryAgainBtnPress} = React.useContext(RewardOnActionContext);
  //   //   const appState = React.useRef(AppState.currentState);
  //   //   let popup_visible = false;

  //   const handleNetConnection = state => {
  //     setStatus(state.isConnected);
  //     setConnectionStatus(state.isConnected);
  //     if (!state.isConnected) {
  //     //   dispatch({type: NO_NETWORK.NO_NETWORK_FOUND});
  //     }
  //   };

  return (
    <View style={{flex: 1}}>
      {props.children}
    </View>
  );
}
//       {props.children}
//       {!status && (
//         <View style={styles.offlineContainer}>
//           <Text style={styles.offlineText}>No Internet Connection</Text>
//         </View>
//       )}
//       {showTryAgainBtn && (
//         <View style={[styles.offlineContainer, {backgroundColor: '#4CC34F'}]}>
//           <Text style={styles.offlineText}>Online now!</Text>
//         </View>
//       )}
// //   const CheckUserAppState = async () => {
// //     dispatch(copyAsynStorageToRedux());
// //     try {
// //       const userState = await AsyncStorage.getItem("USER_STATE");
// //       switch (userState) {
// //         case STATE_OF_APP.WELCOME:
// //           props.setInitialRoute("WelcomeTrendList");
// //           break;
// //         case STATE_OF_APP.AUTHENTICATION:
// //           props.setInitialRoute("LoginPage");
// //           break;
// //         case STATE_OF_APP.BOTTOM_TAB:
// //           props.setInitialRoute("BottomTab");
// //           break;
// //         default:
// //           props.setInitialRoute("WelcomeTrendList");
// //           break;
// //       }
// //     } catch (error) {
// //       props.setInitialRoute("WelcomeTrendList");
// //     }
// //   };
// //   const refreshPage = () => {
// //     setIsTryAgainBtnPress(true);
// //     setTimeout(() => {
// //       setShowTryAgainBtn(false);
// //     }, 4000);
// //   };

// //   const OpenMobileStore = (link) => {
// //     Linking.canOpenURL(link)
// //       .then(async (isSupported) => {
// //         if (isSupported) await Linking.openURL(link);
// //       })
// //       .catch((error) => console.log(error));
// //   };

// //   const compareVersions = (versionA, versionB) => {
// //     const partsA = versionA.split(".").map(Number);
// //     const partsB = versionB.split(".").map(Number);
// //     for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
// //       const partA = partsA[i] || 0;
// //       const partB = partsB[i] || 0;

// //       if (partA < partB) {
// //         return -1;
// //       } else if (partA > partB) {
// //         return 1;
// //       }
// //     }

// //     return 0;
// //   }
// //   const forceUpdateFunction = async () => {
// //     try {
// //       const url = BASE_URL.replace("v1/", "") + apiUrls.FORCE_UPDATE.name;
// //       const version = getVersion();
// //       const result = await axios.get(url);

// //       if (result) {
// //         const { data } = result?.data;

// //         const storeUrl =
// //           Platform.OS === "ios" ? data?.itunes_url : data?.playstore_url;
// //         const msg = data?.messages
// //           ? data?.messages
// //           : "Please update your application.";
// //         const isForceUpdateRequired = data?.is_update_required ?? false;

// //         const serverVersion =
// //           Platform.OS === "android"
// //             ? data?.current_android_version
// //             : data?.current_ios_version;
// //         const comparisonResult = compareVersions(version, serverVersion);
// //         if (comparisonResult < 0 && isForceUpdateRequired) {
// //           if (!popup_visible) {
// //             popup_visible = true;
// //             Alert.alert(
// //               data?.title ?? "New version available",
// //               msg ?? "Please update your application.",
// //               [
// //                 {
// //                   text: "Update",
// //                   onPress: () => {
// //                     OpenMobileStore(storeUrl);
// //                     popup_visible = false;
// //                   },
// //                   style: Platform.OS === "ios" ? "default" : "destructive",
// //                 },
// //               ]
// //             );
// //           }
// //         }
// //       }
// //     } catch (error) {}
// //   };

// //   React.useEffect(() => {
// //     if (isAppStarted && status) {
// //       setShowTryAgainBtn(true);
// //       refreshPage();
// //     } else setIsAppStarted(true);
// //   }, [status]);

// //   React.useEffect(() => {
// //     forceUpdateFunction();
// //     CheckUserAppState();
// //     const unsubscribe = NetInfo.addEventListener(handleNetConnection);
// //     const subscription = AppState.addEventListener("change", (nextAppState) => {
// //       if (
// //         appState.current.match(/inactive|background/) &&
// //         nextAppState === "active"
// //       ) {
// //         forceUpdateFunction();
// //       }
// //       appState.current = nextAppState;
// //     });

// //     return () => {
// //       unsubscribe();
// //       subscription.remove();
// //     };
// //   }, []);
