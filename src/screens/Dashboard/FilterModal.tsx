import React, {useState, useEffect, memo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Keyboard, FlatList, Image} from 'react-native';
import {normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums/Dimensions';
import {COLORS} from '../../Constants/enums';
import Modal from 'react-native-modal';
import FONTS from '../../Constants/enums/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getDashboardTabData,
  resetDashboardTabData,
} from '../../apis/Onboarding/dashboardTabDataSlice';
import {useDispatch} from 'react-redux';
import IMAGES from '../../Constants/enums/ImagesEnum';

const FilterModal = (props: any) => {
  const {isVisible, onClose, onSave, isScreenerDataSuccess, toggleSelection, selectedItems} = props;
  const dispatch = useDispatch();

  const categories = [
    {index: '1', label: 'Segment', value: 'segment'},
    {index: '2', label: 'Sector', value: 'sector'},
    {index: '3', label: 'Screener', value: 'recommend_type'},
    {index: '4', label: 'Days', value: 'timeframe'},
    {index: '5', label: 'Screen Refresh', value: 'refresh'},
  ];

  const [selectedCategory, setSelectedCategory] = useState('segment');

  // const handleonClose = async () => {
  //   dispatch(resetDashboardTabData());

  //   AsyncStorage.getItem('userId').then(userid => {
  //     let payload = {
  //       userid: userid,
  //       segment: selectedItems?.segment,
  //       recommend_type: selectedItems?.recommend_type,
  //       timeframe: selectedItems?.timeframe,
  //       sector: selectedItems.sector,
  //     };
  //     dispatch(getDashboardTabData(payload));
  //   });
  //   onClose();
  // };

  return (
    <Modal
      style={styles.bottomModal}
      onBackButtonPress={onClose}
      onSwipeComplete={onClose}
      //   swipeDirection="down"
      ///
      swipeThreshold={100} // Reduce sensitivity
      scrollOffsetMax={400}
      //   scrollOffset={Platform.OS === 'android' ? scrollY : undefined} // Required for Android

      ///
      //   animationInTiming={400}
      //   animationOutTiming={400}
      onBackdropPress={onClose}
      isVisible={isVisible}
      animationIn="slideInUp"
      //   animationOut="slideOutDown"
      backdropTransitionOutTiming={0.5}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          hitSlop={{bottom: 20}}
          onPress={() => {
            Keyboard.dismiss();
            onClose();
          }}
          style={styles.modalClose}
        />
        <View style={styles.modalContent}>
          <Text style={styles.headerText}>Filters</Text>
          <View style={styles.container}>
            <View>
              <FlatList
                data={categories}
                keyExtractor={item => item.index}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(item.value)}
                    style={[
                      styles.categoryButton,
                      selectedCategory === item.value && styles.activeCategory,
                    ]}>
                    <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === item.value && styles.activeCategoryText,
                      ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.categoryTitle}>{selectedCategory}</Text>
              <FlatList
                data={isScreenerDataSuccess?.response[selectedCategory]}
                keyExtractor={item => item.index}
                contentContainerStyle={{}}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => toggleSelection(selectedCategory, item)}
                    style={[
                      styles.itemContainer,
                      selectedItems[selectedCategory] === item?.value && styles.selectedItem,
                    ]}>
                    {selectedItems[selectedCategory] === item?.value ? (
                      <Image style={styles.icon} source={IMAGES.ActiveCheck} />
                    ) : (
                      <Image style={styles.icon} source={IMAGES.InActiveCheck} />
                    )}
                    <Text style={styles.itemText}>{item?.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.resetButton} onPress={onClose}>
              <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.applyButton} onPress={handleonClose}> */}
            <TouchableOpacity style={styles.applyButton} onPress={onSave}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    width: '100%',
    borderTopLeftRadius: scaleWidth(24),
    borderTopRightRadius: scaleWidth(24),
    backgroundColor: COLORS.PrimaryWhite,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: scaleWidth(20),
    paddingBottom: scaleHeight(45),
    height: scaleHeight(700),
  },
  bottomModal: {
    height: scaleHeight(400),
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginBottom: 0,
  },
  modalClose: {
    height: scaleHeight(4),
    width: scaleWidth(56),
    alignSelf: 'center',
    marginTop: scaleHeight(15),
    backgroundColor: 'rgb(72, 72, 72)',
    borderRadius: scaleWidth(4),
  },
  modalContent: {
    flex: 1,
  }, ///
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  categoryButton: {
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scaleWidth(10),
    backgroundColor: COLORS.PrimaryBackGround,
    borderRadius: scaleWidth(18),
    marginRight: scaleWidth(8),
    marginBottom: scaleHeight(12),
  },
  activeCategory: {
    backgroundColor: COLORS.PrimaryGreen,
  },
  categoryText: {
    fontSize: normalizeFont(14),
    fontFamily: FONTS.RobotoMedium,
    color: COLORS.BorderColor,
    textAlign: 'center',
  },
  activeCategoryText: {
    color: COLORS.PrimaryWhite,
  },
  categoryTitle: {
    fontSize: normalizeFont(16),
    fontFamily: FONTS.RobotoBold,
    color: COLORS.PrimaryBlack,
    marginBottom: scaleHeight(22),
    paddingHorizontal: scaleWidth(10),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(10),
    marginBottom: scaleHeight(20),
  },
  selectedItem: {
    borderColor: '#4CAF50',
  },
  // checkbox: {
  //   width: scaleWidth(20),
  //   height: scaleHeight(20),
  //   borderRadius: 5,
  //   borderWidth: 1,
  //   borderColor: '#4CAF50',
  //   backgroundColor: 'transparent',
  //   marginRight: scaleWidth(12),
  // },
  icon: {
    height: scaleHeight(20),
    width: scaleWidth(20),
    marginRight: scaleWidth(12),
    resizeMode:'contain'
  },
  // checkedCheckbox: {
  //   backgroundColor: '#228B22',
  // },
  itemText: {
    fontSize: normalizeFont(14),
    color: COLORS.BorderColor,
    fontFamily: FONTS.RobotoRegular,
  },

  /////

  headerText: {
    fontSize: normalizeFont(20),
    fontFamily: FONTS.RobotoBold,
    marginBottom: scaleHeight(16),
    color: COLORS.PrimaryBlack,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#F1F1F1',
  },
  resetText: {
    fontSize: normalizeFont(16),
    color: COLORS.PrimaryBlack,
    fontFamily: FONTS.RobotoMedium,
  },
  applyButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  applyText: {
    fontSize: normalizeFont(16),
    color: COLORS.PrimaryWhite,
    fontFamily: FONTS.RobotoMedium,
  },
});

export default React.memo(FilterModal);
