import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import {COLORS} from '../../../Constants/enums/colorsEnum';
import styles from './style';
import {normalizeFont, scaleWidth} from '../../../Constants/enums/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {
  optionchain,
  optionchainSymbol,
  optionchainTable,
} from '../../../apis/Onboarding/OptionsSlice';
import DropdownComnComponent from '../../../Components/DropdownComponent/DropdownComponent';
import {ActivityIndicator} from 'react-native';
import {CONSTANT_TEXT} from '../../../Constants/enums/constantText';

interface OptionListProps {
  navigation: any;
  route: any;
}
const OptionDetailScreen: React.FC<OptionListProps> = ({navigation, route}) => {
  const {symbol, options} = route.params;

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const OptionchainDataApi = useSelector((state: any) => state.options);
  const {isOptionchainSuccess, isOptionchainSymbSuccess, isOptionTableSuccess, isLoading} =
    OptionchainDataApi;

  const [optionSymbol, setOptionSymbol] = useState([]);
  const [optExpireData, setOptExpireDate] = useState([]);

  const [selectData, setSelectData] = useState({
    symbol: symbol || '',
    expireDate: optExpireData[0] || '', //expirytime
  });
  const [tableData, setTableData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [url, setUrl] = useState('');

  const StrikerPrice =
    isOptionTableSuccess?.striker_price_gain &&
    JSON.parse(isOptionTableSuccess?.striker_price_gain);

  const getOptionDetail = async () => {
    dispatch(
      // get expiry date
      optionchain({
        symbol: symbol,
      }),
    );
    dispatch(optionchainSymbol({symbol: true}));
  };

  useEffect(() => {
    if (isFocused) getOptionDetail();
  }, [isFocused]);

  React.useEffect(() => {
    if (isOptionchainSymbSuccess) {
      setOptionSymbol(isOptionchainSymbSuccess);
    }
  }, [isOptionchainSymbSuccess]);

  React.useEffect(() => {
    if (isOptionchainSuccess) {
      setOptExpireDate(isOptionchainSuccess);
      setSelectData(prevData => {
        return {...prevData, expireDate: isOptionchainSuccess[0]};
      });
    }
  }, [isOptionchainSuccess]);
  React.useEffect(() => {
    if (isOptionTableSuccess) {
      setTableData(isOptionTableSuccess?.option_data);
    }
  }, [isOptionTableSuccess]);

  const renderSymbol = optionSymbol.map(item => {
    return {
      id: item.id,
      label: item?.name,
      value: item?.name,
    };
  });
  const renderDate = optExpireData.map((item, index) => {
    return {
      id: index + 1,
      label: item,
      value: item,
    };
  });

  useEffect(() => {
    if (!selectData.expireDate) return;

    if (isOptionchainSuccess) {
      dispatch(
        optionchainTable({
          expirytime: selectData.expireDate,
          symbol: selectData.symbol,
        }),
      );
    }
  }, [selectData.expireDate, isOptionchainSuccess]);

  const handleSelectedItem = (type, value) => {
    setSelectData(prevData => {
      return {...prevData, [type]: value};
    });
  };
  const handleSelectedSymbol = (type, value) => {
    dispatch(
      optionchain({
        symbol: value,
      }),
    );
    setSelectData(prevData => {
      return {...prevData, symbol: value};
    });
  };
  const openModalWithUrl = url => {
    setUrl(url);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setUrl('');
  };
  const styledDataArray = StrikerPrice?.map(item => {
    return item?.striker_price;
  });

  const RenderItem = ({item}) => {
    function formatOptionSymbol(SYMBOL, EXPIRY_DATE, STRIKE_PRICE, TYPE) {
      if (!STRIKE_PRICE) return '-';

      const expiry_date_format = EXPIRY_DATE?.slice(2).split('-').join('');

      return `${SYMBOL}${expiry_date_format}${STRIKE_PRICE.toString()}${TYPE}`;
    }
    const ce_value = formatOptionSymbol(
      selectData.symbol,
      selectData.expireDate,
      options === 'Buy Calls' ? item?.CE?.striker_price : item?.PE?.striker_price,
      options === 'Buy Calls' ? 'CE' : 'PE',
    );
    return (
      <View style={styles.row}>
        <Text allowFontScaling={false} style={[styles.cell, styles.cellWidth]}>
          {options === 'Buy Calls'
            ? item?.CE?.ltp
              ? item?.CE?.ltp
              : '-'
            : item?.PE?.ltp
            ? item?.PE?.ltp
            : '-'}
        </Text>
        <Text allowFontScaling={false}
          style={[
            styles.cell,
            styles.cellWidth,

            {
              backgroundColor:
                options === 'Buy Calls'
                  ? styledDataArray?.includes(item?.CE?.striker_price)
                    ? COLORS.PrimaryGreen
                    : ''
                  : styledDataArray?.includes(item?.PE?.striker_price)
                  ? COLORS.PrimaryGreen
                  : '',
            },
          ]}>
          {options === 'Buy Calls'
            ? item?.CE?.striker_price
              ? item?.CE?.striker_price
              : '-'
            : item?.PE?.striker_price
            ? item?.PE?.striker_price
            : '-'}
        </Text>
        <Text allowFontScaling={false} style={[styles.cell, styles.cellWidth]}>
          {options === 'Buy Calls'
            ? item?.CE?.volume
              ? item?.CE?.volume
              : '-'
            : item?.PE?.volume
            ? item?.PE?.volume
            : '-'}
        </Text>

        {options === 'Buy Calls' ? (
          item?.CE?.striker_price ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ChartScreen', {
                  url: `https://faircopy.tnibro.com/charts/?symbol=${ce_value}:optionchain`,
                })
              }>
              <Text allowFontScaling={false}
                style={[
                  styles.cell,
                  styles.cellWidth,
                  {backgroundColor: 'lightblue', alignSelf: 'center'},
                ]}>
                Chart
              </Text>
            </TouchableOpacity>
          ) : (
            <Text allowFontScaling={false} style={[styles.cell, styles.cellWidth]}>-</Text>
          )
        ) : item?.PE?.striker_price ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChartScreen', {
                url: `https://faircopy.tnibro.com/charts/?symbol=${ce_value}:optionchain`,
              })
            }
            // onPress={() =>
            //   openModalWithUrl(`https://faircopy.tnibro.com/charts?symbol=${ce_value}:optionchain`)
            // }
          >
            <Text allowFontScaling={false} style={[styles.cell, styles.cellWidth]}>Chart</Text>
          </TouchableOpacity>
        ) : (
          <Text allowFontScaling={false} style={[styles.cell, styles.cellWidth]}>-</Text>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={CONSTANT_TEXT.LARGE} color="blue" />
        </View>
      ) : (
        <View>
          <View style={{marginHorizontal: 30}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={IMAGES.Back_Icon} style={{height: 42, width: 42}} />
            </TouchableOpacity>
            <Text allowFontScaling={false}
              style={{
                color: COLORS.Black,
                fontWeight: '600',
                fontSize: normalizeFont(24),
              }}>
              OPTION CHAIN
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#DFFFE8',
              paddingHorizontal: scaleWidth(30),
              marginVertical: 10,
            }}>
            <DropdownComnComponent
              title="Select Symbol"
              data={renderSymbol}
              Value={selectData.symbol}
              defaultValue="geeeeeeeee"
              height={300}
              onSelect={val => {
                handleSelectedSymbol('symbol', val?.value);
              }}
            />
            <DropdownComnComponent
              title="Expiry Date"
              data={renderDate}
              Value={selectData.expireDate}
              defaultValue="cash"
              height={300}
              onSelect={val => {
                handleSelectedItem('expireDate', val.value);
              }}
            />
          </View>

          <ScrollView horizontal>
            <View>
              <View style={styles.header}>
                <Text allowFontScaling={false} style={[styles.headerCell, styles.cellWidth]}>LTP</Text>
                <Text allowFontScaling={false} style={[styles.headerCell, styles.cellWidth]}>Strike</Text>
                <Text allowFontScaling={false} style={[styles.headerCell, styles.cellWidth]}>VOL</Text>
                <Text allowFontScaling={false} style={[styles.headerCell, styles.cellWidth]}>CHART</Text>
              </View>
              <FlatList
                data={tableData}
                renderItem={({item}) => <RenderItem item={item} />}
                keyExtractor={item => item.index}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OptionDetailScreen;
