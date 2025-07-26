import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { COLORS, CONSTANT_TEXT } from '../../../Constants/enums';
import { getPredictionStock } from '../../../apis/Onboarding/SectorStock/SectorStockSlice';
import MainContainer from '../../../Components/MainContainer';
import BackWithCenterIcons from '../../../Components/BackButton/BackWithCenterIcons';
import { formatDate_InNumber } from '../../../screens/Dashboard/TableComponent/utils';
import { Loader } from '../../../Components/Loader';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import { Table } from 'react-native-table-component';
import { useIsFocused } from '@react-navigation/native';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../../Navigation/NavigationService';
import AdvertismentComponent from '../../../screens/HomeScreen/AdvertismentComponent';
import { getTinymce } from '../../../apis/Onboarding/TinymceApi/TinymceSlice';
import UserGuideModal from '../../../Components/Modal/UserGuideModal';
import analytics from '../../../Services/PushNotification/analytics';

const StocksPredictions: React.FC = ({ route }) => {
  const { symbol_id, symbol } = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused(); // Get the focused state

  const [topBannerUrl, setTopBannerUrl] = useState(null);

  const SectorStockData = useSelector((state: any) => state.SectorStockSlice);
  const { getPredictStockFail, getPredictStockSuccess, isloading, noDataFound } = SectorStockData;
  const HomeScreeneData = useSelector((state: any) => state.HomeScreenSlice);
  const { isAdvertisementBannerSuccess } = HomeScreeneData;
  const paymentData = useSelector((state: any) => state.CreateSubscSlice);
  const { isPremiumUser } = paymentData;
  const TinymceData = useSelector((state: any) => state.TinymceSlice);
  const { isTinymceSuccess } = TinymceData;
  const [userGuideModaVisible, setUserGuideModalVisible] = React.useState(false);
  const [tinymcePopUpdata, setTinymcePopUpData] = React.useState([]);
  const [isclick, setIsClick] = React.useState(true);
  const BannerScreenName = 'StocksPredictions';

  const [tableData, setTableData] = useState([]);
  const rightRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isFocused) {
      handlePrecictionData();
    }
  }, [isFocused]);

  const handlePrecictionData = () => {
    dispatch(getPredictionStock({ stock_id: symbol_id }));
  };
  React.useEffect(() => {
    if (getPredictStockSuccess) {
      setTableData(getPredictStockSuccess?.response?.data);
    }
  }, [getPredictStockSuccess]);
  useEffect(() => {
    const banner = isAdvertisementBannerSuccess?.response?.data.find(
      b => b.screen_name === BannerScreenName,
    );
    if (banner) {
      setTopBannerUrl(banner);
    }
  }, [isAdvertisementBannerSuccess]);
  const tableDataSample = {
    tableHead: [
      { label: `Sno`, col: '' },
      { label: `Green Signal ${'\n'}Price/Date`, col: 'recommendation_date' },
      { label: `Red Alert ${'\n'}Price/Date`, col: 'recommendation_date' },
      { label: `Profit/Loss ${'\n'}As Per${'\n'} Red Alert`, col: 'recommendation_date' },
      { label: `High Price ${'\n'}Date/Max${'\n'}Profit`, col: 'recommendation_date' },
    ],
    widthArr: [40, 100, 100, 80, 100],
  };
  const [data, setData] = React.useState(tableDataSample);

  let filteredTableFeed;
  filteredTableFeed = getPredictStockSuccess && getPredictStockSuccess?.response?.data;
  useEffect(() => { }, [getPredictStockSuccess]);
  const tableHeaders = ['Sno', 'recommendation_date', 'max_high', 'min_low', 'profit/loss'];
  const getTinymceData = async () => {
    await analytics.logEvent('Stocks_Predictions_Screen')
    dispatch(getTinymce({ screen_name: 'StocksPredictions' }));
  };
  useEffect(() => {
    getTinymceData(); //Pop up message in modal
  }, []);
  useEffect(() => {
    if (isTinymceSuccess) {
      setTinymcePopUpData(isTinymceSuccess?.response);
    }
  }, [isTinymceSuccess]);
  useEffect(() => {
    if (isTinymceSuccess && isclick) {
      const timer = setTimeout(() => {
        setUserGuideModalVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTinymceSuccess]);
  const userGuidCloseModal = () => {
    setUserGuideModalVisible(false);
    setIsClick(false);
  };
  const getCellContent = (rowIndex: number, rowData: any, item: string, index: number) => {
    {
      if (rowIndex === 0) {
        return (
          <>
            <Text allowFontScaling={false} style={[styles.text]}>
              {index + 1}
            </Text>
          </>
        );
      } else if (rowIndex === 1) {
        return (
          <>
            <Text allowFontScaling={false} style={[styles.text, { color: COLORS.Binance_green }]}>
              {rowData?.buy_price ? rowData?.buy_price : ''}
            </Text>
            <Text allowFontScaling={false} style={[styles.textDate]}>
              {rowData?.recommendation_date
                ? formatDate_InNumber(rowData?.recommendation_date)
                : '-'}
            </Text>
          </>
        );
      } else if (rowIndex === 2) {
        return (
          <>
            <Text allowFontScaling={false} style={[styles.text, { color: COLORS.Binance_red }]}>
              {rowData?.sell_price ? rowData?.sell_price : ''}
            </Text>
            <Text allowFontScaling={false} style={[styles.textDate]}>
              {rowData?.sell_price_date ? formatDate_InNumber(rowData?.sell_price_date) : '-'}
            </Text>
          </>
        );
      } else if (rowIndex === 3) {
        return (
          <>
            <Text
              allowFontScaling={false}
              style={[
                styles.text,
                {
                  color:
                    rowData?.profit_loss_asper_red_alert > 0
                      ? COLORS.Binance_green
                      : rowData?.profit_loss_asper_red_alert === 'open trade'
                        ? COLORS.Black
                        : COLORS.Binance_red,
                },
              ]}>
              {rowData?.profit_loss_asper_red_alert}
              {rowData?.profit_loss_asper_red_alert
                ? rowData?.profit_loss_asper_red_alert === 'open trade'
                  ? ''
                  : '%'
                : ''}
            </Text>
          </>
        );
      } else if (rowIndex === 4) {
        return (
          <>
            <Text allowFontScaling={false} style={[styles.text]}>
              {rowData?.max_high}
            </Text>
            <Text allowFontScaling={false} style={[styles.textDate]}>
              {formatDate_InNumber(rowData?.max_high_date)}
            </Text>
            <Text
              allowFontScaling={false}
              style={[
                styles.text,
                {
                  color:
                    rowData?.profit_loss_asper_high_alert > 0
                      ? COLORS.Binance_green
                      : COLORS.Binance_red,
                },
              ]}>
              ({rowData?.profit_loss_asper_high_alert}
              {rowData?.profit_loss_asper_high_alert ? '%' : ''})
            </Text>
          </>
        );
      } else {
        return (
          <Text allowFontScaling={false} style={[styles.text]}>
            {rowData[item]}
          </Text>
        );
      }
    }
  };

  return (
    <MainContainer>
      {/* <BackWithCenterIcons /> */}
      <TitleWithBackBtnHeader centerTitle="Recent Performance" onPressBackArrow={() => goBack()} />
      <View style={styles.backcontainer}>
        <View style={{ flex: 1 }}>
          {/* <Text style={styles.textRecent} allowFontScaling={false}></Text> */}
          <Text style={styles.description} allowFontScaling={false}>
            Green Signal on <Text style={styles.textRecent}>{symbol}</Text>
          </Text>
        </View>
        {/* <View
          style={{
            borderWidth: 1,
            backgroundColor: '#fff',
            borderColor: '#8D8D8D',
            borderRadius: 5,
            padding: 5,
          }}>
          <Text style={styles.totalproft} allowFontScaling={false}>
            Total Profit ={' '}
            <Text style={{color: '#3FA468'}}>{getPredictStockSuccess?.response?.profit}%</Text>
          </Text>
          <Text style={styles.totalproft} allowFontScaling={false}>
            Total Loss ={' '}
            <Text style={{color: '#F44336'}}>{getPredictStockSuccess?.response?.loss}%</Text>
          </Text>
          <Text style={styles.totalproft}>Based on Below Table</Text>
        </View> */}
      </View>
      {topBannerUrl && <AdvertismentComponent bannerUrl={topBannerUrl} />}

      {/* Right Column */}
      {isloading ? (
        <Loader />
      ) : noDataFound ? (
        <View style={styles.loaderContainer}>
          <Image source={IMAGES.Alert} style={styles.rightIcon} resizeMode="contain" />
          <Text allowFontScaling={false} style={styles.noDataLabel}>
            {CONSTANT_TEXT.NO_DATA_FOUNG}
          </Text>
        </View>
      ) : (
        <View style={styles.tableContainer}>
          <View style={styles.container3}>
            <ScrollView
              horizontal={true}
              bounces={false}
              showsHorizontalScrollIndicator={false}
            // showsVerticalScrollIndicator={false}
            >
              <View>
                {/* Right Column Tabs -> sell/buy */}
                <ScrollView
                  horizontal
                  style={{}}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}>
                  {data.tableHead.map((item, index) => (
                    <TouchableWithoutFeedback key={index}>
                      <View style={[styles.head, { width: data.widthArr[index] }]}>
                        <Text allowFontScaling={false} style={styles.headText}>
                          {item?.label}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </ScrollView>
                <ScrollView
                  ref={rightRef}
                  scrollEventThrottle={16}
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}>
                  <Table>
                    {filteredTableFeed &&
                      filteredTableFeed.map((rowData: any, index: number) => (
                        <View
                          key={`stockTab${index}`}
                          style={[
                            styles.rowbox,
                            { backgroundColor: index % 2 === 0 ? '#fff' : '#f5f5f5' },
                          ]}>
                          {tableHeaders.map((item: any, rowIndex: number) => (
                            <View
                              key={`tableHead${index}`}
                              style={[
                                styles.cell,
                                {
                                  width: data.widthArr[rowIndex],
                                  backgroundColor: [1].includes(rowIndex) ? '#EAFFEC' : 'fff',
                                },
                              ]}>
                              {getCellContent(rowIndex, rowData, item, index)}
                            </View>
                          ))}
                        </View>
                      ))}
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
      {tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content && <UserGuideModal
        visible={userGuideModaVisible}
        onClose={userGuidCloseModal}
        text_content={tinymcePopUpdata && tinymcePopUpdata[0]?.screen_content}
      />}
    </MainContainer>
  );
};

export default StocksPredictions;
