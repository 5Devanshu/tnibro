// import React from 'react';
// import {FlatList, View, Text, TouchableOpacity, Platform, StyleSheet, Image} from 'react-native';
// import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
// import IMAGES from '../../Constants/enums/ImagesEnum';
// import {formatDate_InNumber} from '../../screens/Dashboard/TableComponent/utils';

// interface UserTopUpListProps {
//   data: [];
// }
// const UserTopUpList: React.FC<UserTopUpListProps> = ({data}) => {
//   const RenderData: React.FC = (props: any) => {
//     const {item} = props;
//     return (
//       <TouchableOpacity style={[styles.container]}>
//         <View style={styles.contentcontainer}>
//           <Text style={styles.txtorderid} allowFontScaling={false}>
//             Order ID : {item?.payment_id?.provider_order_id}
//           </Text>
//           <Text style={styles.txtamount} allowFontScaling={false}>
//             ₹{item?.payment_id?.amount}
//           </Text>
//         </View>
//         <View style={styles.paymentview}>
//           <Image source={IMAGES.Dateicon} style={styles.icondetail} />
//           <Text style={styles.paymentdate} allowFontScaling={false}>
//             {formatDate_InNumber(item?.payment_id?.payment_date)}
//           </Text>
//         </View>
//         <Text style={styles.txtactivate} allowFontScaling={false}>
//           Active
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Text allowFontScaling={false} style={styles.HeadText}>
//         Your Top up Plans
//       </Text>
//       <FlatList
//         data={data}
//         renderItem={({item}) => <RenderData item={item} />}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     marginBottom: scaleHeight(10),
//     backgroundColor: COLORS.white,
//     paddingVertical: scaleHeight(12),
//     paddingHorizontal: 22,
//     borderRadius: scaleWidth(11),
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOpacity: 0.3,
//         shadowRadius: 1,
//         shadowOffset: {
//           height: 4,
//           width: -2,
//         },
//       },
//       android: {
//         elevation: 5,
//         shadowColor: '#000',
//       },
//     }),
//   },
//   HeadText: {
//     color: '#2B2B2B',
//     fontSize: normalizeFont(18),
//     fontWeight: '600',
//     marginBottom: 22,
//     marginTop: 5,
//   },
//   icondetail: {
//     height: scaleHeight(13),
//     width: scaleWidth(13),
//     marginRight: scaleWidth(4),
//   },
//   contentcontainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   txtorderid: {color: '#494949', fontSize: normalizeFont(11), fontWeight: '700'},
//   txtamount: {color: '#494949', fontSize: normalizeFont(14), fontWeight: '700'},
//   paymentview: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//   },
//   paymentdate: {color: '#494949', fontSize: normalizeFont(12), fontWeight: '300'},
//   txtactivate: {
//     fontSize: normalizeFont(12),
//     fontWeight: '600',
//     color: '#0BDA51',
//     marginTop: scaleHeight(6),
//   },
// });
// export default React.memo(UserTopUpList);
