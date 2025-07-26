import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Text,
} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { getGainerData } from '../../apis/Onboarding/gainerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../Constants/enums/colorsEnum';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { Image } from 'react-native';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { CONSTANT_TEXT } from '../../Constants/enums/constantText';
import { scaleHeight, scaleWidth } from '../../Constants/enums';
import UserGuideModal from '../../Components/Modal/UserGuideModal';
import { getTinymce } from '../../apis/Onboarding/TinymceApi/TinymceSlice';

const GainerLooserScreen = ({ route, navigation }) => {
  const { segment, category } = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const gainerdata = useSelector((state: any) => state.gainerdata);
  const { isGainerDataSuccess, isloader } = gainerdata;
  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;

  const [istableData, setTableData] = useState<any>([]);

  const [tableHead] = useState(['SYMBOL', 'DATE SUGGESTED', 'PRICE SUGGESTED', '% GAIN / LOSS']);
  const [widthArr] = useState([100, 100, 100, 100]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [tinymcedata, setTinymceData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);


  const getTableData = () => {
    let parampayload = {
      segment: segment,
      category: category,
    };
    dispatch(getGainerData(parampayload));
  };
  useEffect(() => {
    if (isFocused) getTableData();
  }, [isFocused]);
  const getTinymceData = async () => {
    dispatch(getTinymce({ screen_name: category }));
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
        setModalVisible(true);
      }, 5000); // 5000 milliseconds = 5 seconds
      return () => clearTimeout(timer); // Cleanup function to clear the timer
    }
  }, [isTinymceSuccess]);
  const userGuidCloseModal = () => {
    setModalVisible(false);
    setIsClick(false);
  };

  function formatDate(date: string): string {
    return moment(date).format('MMM D,YYYY');
  }

  const mappedArray = isGainerDataSuccess && isGainerDataSuccess.map(item => {
    return {
      symbol: item.symbol,
      date: item.recommendation.date,
      price: item.recommendation.buyprice || item.recommendation.sellprice,
      gl_pct: item.recommended_pChange,
    };
  });

  const mappedData = mappedArray.map(item => {
    const newArray = Object.values(item);
    return newArray;
  });

  useEffect(() => {
    if (isGainerDataSuccess && isGainerDataSuccess.length > 0) formatTableData();
  }, [isGainerDataSuccess]);

  const formatTableData = () => { };
  const headers = ['symbol', 'date', 'buyprice', 'recommended_pChange'];
  const tableData = [];

  for (let i = 0; i < isGainerDataSuccess.length; i += 1) {
    const rowData = [];
    for (let j = 0; j < headers.length; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginHorizontal: scaleWidth(30) }}>
        <Image source={IMAGES.Back_Icon} style={{ height: scaleHeight(42), width: scaleWidth(42) }} />
      </TouchableOpacity>
      {isloader ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={CONSTANT_TEXT.LARGE} color="blue" />
        </View>
      ) : (
        <>
          <ScrollView horizontal={true} style={{ marginTop: 5 }}>
            <View>
              {category == 'gainer' ? (
                <Text
                  allowFontScaling={false}
                  style={{ textAlign: 'center', color: COLORS.Black, fontSize: 20, padding: 5 }}>
                  TOP GAINERS
                </Text>
              ) : (
                <Text
                  allowFontScaling={false}
                  style={{ textAlign: 'center', color: COLORS.Black, fontSize: 20, padding: 5 }}>
                  SHORT / SELL RECOMMENDATIONS
                </Text>
              )}
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                  <Row
                    allowFontScaling={false}
                    data={tableHead}
                    widthArr={widthArr}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                  {mappedData.map((rowData, index) => (
                    <TableWrapper key={index} style={[styles.row]}>
                      {rowData.map((cellData, cellIndex) => (
                        <Cell
                          allowFontScaling={false}
                          key={cellIndex}
                          data={cellIndex === 1 ? formatDate(cellData) : cellData}
                          width={100}
                          textStyle={[
                            styles.text1,
                            {
                              color:
                                cellIndex === 3
                                  ? cellData >= 0
                                    ? COLORS.Binance_green
                                    : COLORS.Binance_red
                                  : 'black',
                            },
                          ]}
                        />
                      ))}
                    </TableWrapper>
                  ))}
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </>
      )}
      {tinymcedata[0]?.screen_content && <UserGuideModal
        visible={modalVisible}
        onClose={userGuidCloseModal}
        text_content={tinymcedata[0]?.screen_content}
      />}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: scaleHeight(30),
    backgroundColor: COLORS.SecondaryGreen,
  },
  header: {
    height: 50,
    backgroundColor: COLORS.SecondaryGreen,
  },
  text: {
    textAlign: 'center',

    fontWeight: '500',
    color: COLORS.Black,
    fontSize: 15,
  },
  text1: {
    textAlign: 'center',
    color: COLORS.Black,
    fontSize: 12,
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF1C1',
    height: 40,
  },
  loaderContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GainerLooserScreen;
