import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { normalizeFont, scaleWidth } from '../../../Constants/enums';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import FONTS from '../../../Constants/enums/Fonts';
import SubscriptionPrize from './SubscriptionPrize';
import FeaturesList from './FeaturesList';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';

const SubscriptionPlanContainer = ({
  item,
  planListItem,
  handleSubscriptionContainer,
  setSelectPlan,
  setSelectedItem,
  setCouponCode,
  selectedItem,
  handleubscriptionPrize,
  selectPlan
}) => {
  const isSelected = planListItem?.plan_name === item?.plan_name;

  return (
    <View style={[
      styles.container,
      !isSelected && styles.selectedContainer
    ]}>
      <TouchableOpacity
        style={styles.touchableContainer}
        onPress={() => handleSubscriptionContainer(item)}
      >
        <View style={styles.innerContainer}>
          <View style={styles.row}>
            <Image
              source={IMAGES.LOGOSTOCKYAARI}
              style={styles.logo}
            />
            <View>
              {!isSelected ? <Text style={styles.planText} allowFontScaling={false}>
                {item?.plan_name || 'Premium Plans'} {` (₹${addCommaToCurrency(item?.data[0]?.price)})`}
              </Text> : <Text style={styles.planText} allowFontScaling={false}>
                {item?.plan_name || 'Premium Plans'}
              </Text>}
              {item.data[0].id === 10 && <Text style={{ fontSize: 12, marginLeft: 8, paddingTop: 3, color: 'red', fontWeight: '700' }}>{'Save ₹198 with Extra Benefits of Indices'}</Text>}
            </View>

          </View>

          <Image
            source={isSelected ? IMAGES.TickActive : IMAGES.NonTick}
            style={styles.tickIcon}
          />
        </View>
      </TouchableOpacity>

      {/* Show details only when the card is selected */}
      {isSelected && (
        <View style={styles.expandedContent}>
          <FlatList
            data={planListItem?.data}
            renderItem={({ item }) => (
              <SubscriptionPrize
                item={item}
                selectedItem={selectedItem}
                handleSubscriptionPrize={handleubscriptionPrize}
              // setSelectPlan={setSelectPlan}
              // setSelectedItem={setSelectedItem}
              // setCouponCode={setCouponCode}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
          <FeaturesList selectPlan={selectPlan} planDetails={planListItem?.data} />
        </View>
      )}
    </View>
  );
};

export default React.memo(SubscriptionPlanContainer);

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  selectedContainer: {
    borderColor: '#228B22',
    borderWidth: 1,
  },
  touchableContainer: {
    borderRadius: 3,
  },
  innerContainer: {
    borderRadius: scaleWidth(15),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 31,
    width: 31,
    backgroundColor: '#4BD874',
    borderRadius: 20,
    resizeMode: 'contain',
  },
  planText: {
    color: '#2C362C',
    marginLeft: 8,
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoBold,
  },
  tickIcon: {
    height: 31,
    width: 31,
    backgroundColor: '#4BD874',
    borderRadius: 20,
    resizeMode: 'contain',
  },
  expandedContent: {
    marginTop: 20,
  },
});
