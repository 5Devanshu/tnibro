import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS, dynamicSize, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import FONTS from '../../Constants/enums/Fonts';

interface CouponListProps {
  data: [];
  onPressCoupon: (index: number) => void;
}
const CouponList: React.FC<CouponListProps> = ({data, onPressCoupon}) => {
  
  const RenderData: React.FC = (props: any) => {
    const {item, onPressCoupon} = props;
    return (
      <View style={[styles.container]}>
        <View style={styles.contentcontainer}>
          <Text allowFontScaling={false} style={styles.couponcode}>
            {item?.coupon_code}
          </Text>
          <TouchableWithoutFeedback onPress={() => onPressCoupon(item)}>
            <Text style={styles.applycopoun}>Apply Coupon</Text>
          </TouchableWithoutFeedback>
        </View>
        <Text ellipsizeMode="clip" numberOfLines={1} style={styles.dash}>
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        </Text>
        {item?.description && <Text style={styles.descriptiontxt}>{item?.description}</Text>}
        {item?.discount && <Text style={styles.descriptiontxt}>{item?.discount}</Text>}
      </View>
    );
  };
  const CouponListEmpty: React.FC = () => {
    return (
      <View style={styles.noDataView}>
        <Text style={styles.noDataTitle}>You don't have any Coupons</Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={({item}) => <RenderData item={item} onPressCoupon={onPressCoupon} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => <CouponListEmpty />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: scaleHeight(10),
    backgroundColor: '#F4F5F7',
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(22),
    borderRadius: scaleWidth(11),
  },
  noDataView: {
    alignItems: 'center',
    marginTop: dynamicSize(30),
    paddingHorizontal: dynamicSize(20),
  },
  noDataTitle: {
    marginTop: dynamicSize(35),
    fontSize: normalizeFont(22),
    color: COLORS.Black,
    fontFamily: FONTS.RobotoRegular,
  },
  contentcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dash: {
    marginVertical: scaleHeight(5),
    color: '#8B8B8B',
  },
  couponcode: {
    color: '#2B2B2B',
    fontSize: normalizeFont(12),
    fontWeight: '600',
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(11),
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  applycopoun: {
    color: COLORS.Black,
    fontSize: normalizeFont(16),
    fontWeight: '700',
  },
  descriptiontxt: {
    color: '#4A4A4A',
    fontFamily:FONTS.RobotoMedium,
    fontSize: normalizeFont(10),
    fontWeight: '400',
    lineHeight: 18,
  },
});
export default React.memo(CouponList);
