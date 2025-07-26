import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import styles from './styles';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { COLORS } from '../../Constants/enums/colorsEnum';
import { normalizeFont, scaleHeight, scaleWidth } from '../../Constants/enums/Dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getOptions } from '../../apis/Onboarding/OptionsSlice';
import { ActivityIndicator } from 'react-native';
import { CONSTANT_TEXT } from '../../Constants/enums/constantText';
import UserGuideModal from '../../Components/Modal/UserGuideModal';
import { getTinymce } from '../../apis/Onboarding/TinymceApi/TinymceSlice';
import analytics from '../../Services/PushNotification/analytics';

const OptionScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const OptionDataApi = useSelector((state: any) => state.options);
  const { isOptionSuccess, isOptionError, loading } = OptionDataApi;

  const [optionData, setOptionData] = useState([]);
  const [selectButton, setSelectButtton] = useState('all');

  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;
  const [userGuideModalVisible, setuserGuideModalVisible] = React.useState(false);

  const [tinymcedata, setTinymceData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);

  const getOptionList = async () => {
    dispatch(
      getOptions({
        option: true,
      }),
    );
  };

  useEffect(() => {
    if (isFocused) getOptionList();
  }, [isFocused]);

  React.useEffect(() => {
    if (isOptionSuccess) {
      setOptionData(isOptionSuccess);
    }
  }, [isOptionSuccess]);

  const handleFilter = call_value => {
    // Call functi
    let newoptionData;
    if (call_value == 'calls') {
      newoptionData = isOptionSuccess.filter(val => {
        return val?.options === 'Buy Calls';
      });
    } else if (call_value == 'puts') {
      newoptionData = isOptionSuccess.filter(val => {
        return val?.options === 'Buy Puts';
      });
    } else if (call_value == 'all') {
      newoptionData = isOptionSuccess.filter(val => {
        return val;
      });
    }
    setOptionData(newoptionData);
    setSelectButtton(call_value);
  };
  const getTinymceData = async () => {
    await analytics.logEvent('Options_Screen')
    dispatch(getTinymce({ screen_name: 'options' }));
  };
  React.useEffect(() => {
    if (isFocused) getTinymceData();
  }, [isFocused]);
  useEffect(() => {
    if (isTinymceSuccess) {
      setTinymceData(isTinymceSuccess?.response);
    }
  }, [isTinymceSuccess]);
  useEffect(() => {
    if (isTinymceSuccess && isclick) {
      const timer = setTimeout(() => {
        setuserGuideModalVisible(true);
      }, 500); // 5000 milliseconds = 5 seconds
      return () => clearTimeout(timer); // Cleanup function to clear the timer
    }
  }, [isTinymceSuccess]);
  const userGuidCloseModal = () => {
    setuserGuideModalVisible(false);
    setIsClick(false);
  };

  const Header = () => {
    return (
      <View style={{}}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={IMAGES.Back_Icon} style={{ height: 42, width: 42 }} />
          </TouchableOpacity>
        </View>
        <Text
          allowFontScaling={false}
          style={{
            color: COLORS.Black,
            fontWeight: '600',
            fontSize: normalizeFont(24),
          }}>
          OPTION CHAIN
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 18, marginBottom: 28 }}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: selectButton === 'calls' ? '#3EB602' : '#DFF1E5',
              paddingVertical: scaleHeight(9),
              paddingHorizontal: scaleWidth(15),
            }}
            onPress={() => handleFilter('calls')}>
            <Text
              allowFontScaling={false}
              style={{
                color: selectButton === 'calls' ? COLORS.PrimaryWhite : COLORS.Black,
                fontSize: normalizeFont(15),
              }}>
              Call
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: selectButton === 'puts' ? '#3EB602' : '#DFF1E5',
              paddingVertical: scaleHeight(9),
              paddingHorizontal: scaleWidth(15),
              marginLeft: 8,
            }}
            onPress={() => {
              handleFilter('puts');
            }}>
            <Text
              allowFontScaling={false}
              style={{
                color: selectButton === 'puts' ? COLORS.PrimaryWhite : COLORS.Black,
                fontSize: 15,
              }}>
              Put
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: selectButton === 'all' ? '#3EB602' : '#DFF1E5',
              paddingVertical: scaleHeight(9),
              paddingHorizontal: scaleWidth(15),
              marginLeft: 10,
            }}
            onPress={() => handleFilter('all')}>
            <Text
              allowFontScaling={false}
              style={{
                color: selectButton === 'all' ? COLORS.PrimaryWhite : COLORS.Black,
                fontSize: normalizeFont(15),
              }}>
              All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const RenderItem = ({ item }) => (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: item?.options === 'Buy Calls' ? '#FFF' : '#FFF6F8',
          borderLeftColor: item?.options === 'Buy Calls' ? COLORS.PrimaryGreen : '#f35a4d',
        },
      ]}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 21,
          marginBottom: 17,
        }}
        onPress={() =>
          navigation.navigate('OptionDetailScreen', {
            symbol: item?.symbol,
            options: item?.options,
          })
        }>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={item?.options === 'Buy Calls' ? IMAGES.EllipseGreen : IMAGES.EllipseRed}
              style={{ height: 8, width: 8, marginHorizontal: 5 }}
            />
            <Text
              allowFontScaling={false}
              style={{
                fontSize: normalizeFont(18),
                color: COLORS.Black,
                // lineHeight: 26
              }}>
              Symbol
            </Text>
          </View>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: normalizeFont(14),
              color: COLORS.Black,
              lineHeight: 20,
              marginHorizontal: scaleWidth(19),
            }}>
            {item?.symbol}
          </Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: item?.options === 'Buy Calls' ? COLORS.PrimaryGreen : '#F5594E',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
              paddingHorizontal: scaleWidth(8),
              paddingVertical: scaleHeight(14),
            }}>
            <Text
              allowFontScaling={false}
              style={{
                color: COLORS.Black,
                fontSize: normalizeFont(11),
              }}>
              {item?.recommendation?.date}
            </Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              //   padding: 5,
              paddingHorizontal: scaleWidth(8),
              paddingVertical: scaleHeight(14),
              borderRadius: 5,
              borderColor: item?.options === 'Buy Calls' ? COLORS.PrimaryGreen : '#F5594E',
              marginRight: 15,
            }}>
            <Text
              allowFontScaling={false}
              style={{ color: COLORS.Black, fontSize: 7, lineHeight: 10 }}>
              Recommendation
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: COLORS.Black,
                fontSize: normalizeFont(11),
                textAlign: 'center',
                lineHeight: 15,
              }}>
              {item?.options}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={CONSTANT_TEXT.LARGE} color="blue" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ marginHorizontal: 30 }}
          showsHorizontalScrollIndicator={false}
          data={optionData}
          renderItem={({ item }) => <RenderItem item={item} />}
          ListHeaderComponent={<Header />}
          keyExtractor={item => item.id}
        />
      )}
      {tinymcedata[0]?.screen_content && <UserGuideModal
        visible={userGuideModalVisible}
        onClose={userGuidCloseModal}
        text_content={tinymcedata[0]?.screen_content}
      />}
    </SafeAreaView>
  );
};

export default OptionScreen;
