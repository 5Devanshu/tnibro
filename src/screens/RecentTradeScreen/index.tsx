import React, { useState, useEffect } from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import MainContainer from '../../Components/MainContainer';
import IMAGES from '../../Constants/enums/ImagesEnum';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getTradedata, getclearDate } from '../../apis/Onboarding/TradeApi/TradeSlice';
import { useIsFocused } from '@react-navigation/native';
import { Loader } from '../../Components/Loader';
import { formatDate, formatTimeIn12Hour } from '../Dashboard/TableComponent/utils';
import { COLORS, scaleHeight, scaleWidth } from '../../Constants/enums';
import TradesEmpty from '../../Components/EmptyListView/TradesEmpty';
import AlertPopupIntraday from './AlertPopupIntraday';
import { active_topup } from '../../apis/Onboarding/PaymentApi/CreateSubscSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showSubscriptionAlert } from '../../utils/showSubscriptionAlert';
import { getAlert } from '../../apis/Onboarding/authenticationSlice';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../Navigation/NavigationService';
import { addCommaToCurrency } from '../../utils/digitCommaSeparator';

interface TradeItem {
  symbol: string;
  timeframe: string;
  recommendation: string;
  price: string;
}
interface RenderItemProps {
  item: [TradeItem, TradeItem, { 'profit/loss': number }]; // Assuming this is the structure of your data
}
const RecentTradeScreen: React.FC = ({ route }) => {
  const { symbol, trade_timeframe } = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const obj = {
    swing: '1-d',
    intraday: '15-min',
  };
  const TradeSliceData = useSelector((state: any) => state.TradeSlice);
  const { isTradeDataSuccess, isTradeDataFail, isloader } = TradeSliceData;

  const authenticationData = useSelector((state: any) => state.authentication);
  const { isGetAlertSuccess } = authenticationData;

   const [active_PlanCode, setActive_PlanCode] = useState('');
    AsyncStorage.getItem('active_PlanCode').then(value => {
      setActive_PlanCode(value)
    });
  const isEligiblePlan = ["NEWYEAR349", "GOLD849", "ANNUAL_UPGRADE", "ADV4499"].includes(active_PlanCode);

  const [tradeData, setTradeData] = useState([]);
  const slicedTradeData = tradeData && tradeData.slice(1);
  const [showPriceDialog, setShowPriceDialog] = useState<boolean>(false);
  const [defaultData, setDefaultData] = useState<any>(null);
  const [activeSymbol, setActiveSymbol] = useState<string>('');
  const [activePrice, setActivePrice] = useState<any>('');
  const [symbolId, setSymbolId] = useState<number>();
  const [isRefreshing, setRefreshing] = React.useState(false);

  const onCancelAlert = () => {
    setShowPriceDialog(false);
  };
  const gettotaltradeData = () => {
    dispatch(
      getTradedata({
        trade_timeframe: trade_timeframe,
        symbol: symbol?.value,
      }),
    );
  };

  useEffect(() => {
    AsyncStorage.getItem('userId').then(userid => {
      dispatch(getAlert({ userid: userid })); //comment this
      dispatch(active_topup({ userid: userid }));
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      gettotaltradeData();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isTradeDataSuccess) {
      setTradeData(isTradeDataSuccess?.data);
      setRefreshing(false);
    }
  }, [isTradeDataSuccess]);
  const clearAllData = () => {
    dispatch(getclearDate());
    setDefaultData(null);
    setActiveSymbol('');
    setActivePrice('');
    setSymbolId(null);
    setTradeData([]);
    goBack();
  };

  const handleAlertSubscribe = (data: string, symbol_id: number, price: string) => {
    setActivePrice(price);
    setActiveSymbol(data);
    setSymbolId(symbol_id);
    setShowPriceDialog(true);
  };
  const isAlerted = (symbol_id: number) => {
    const alertObj = isGetAlertSuccess.find(
      (item: any) => item.symbol_id === symbol_id && obj[trade_timeframe] === item.timeframe,
    );
    return alertObj?.alert_active;
  };
  const Header = () => {
    const Currenttime = tradeData && formatTimeIn12Hour(tradeData?.[0]?.current_trade?.timeframe);
    let Timeinsec = '0';
    Timeinsec = tradeData ? tradeData?.[0]?.current_trade?.timeframe.split('T') : '';
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title} allowFontScaling={false}>
          {trade_timeframe === 'intraday'
            ? '15 Mins Candle Carry Forward'
            : 'Day Candle carry Forward'}
        </Text>
        <Text style={styles.StoplossTxt} allowFontScaling={false}>
          Set Your Stop-Loss According To Your Risk Capacity!
        </Text>
        <Text style={styles.Currentrade} allowFontScaling={false}>
          Current Trade
        </Text>
        <View style={styles.tradeDetailcontainer}>
          <View style={{ width: '70%' }}>
            {/* Date */}
            <View style={styles.Datecontainer}>
              <View style={styles.flexDire}>
                <Image source={IMAGES.Dateicon} style={styles.icondetail} />
                <Text style={styles.Datetext} allowFontScaling={false}>
                  Date
                </Text>
              </View>
              {!isEligiblePlan ? (
                <Image
                  alt=""
                  style={{
                    height: scaleHeight(20),
                    width: scaleWidth(100),
                    resizeMode: 'contain'
                  }}
                  source={IMAGES.SUBSCRIPTION_LOCK.BlueBackground}
                />
              ) : (
                <Text style={styles.Pricetext} allowFontScaling={false}>
                  {formatDate(tradeData?.[0]?.current_trade?.timeframe)}
                </Text>
              )}
            </View>
            {/* Time */}
            {Timeinsec && Timeinsec[1] === '00:00:00' ? (
              <></>
            ) : (
              <View style={styles.Datecontainer}>
                <View style={styles.flexDire}>
                  <Image source={IMAGES.Timeicon} style={styles.icondetail2} />
                  <Text style={styles.Datetext} allowFontScaling={false}>
                    Time
                  </Text>
                </View>
                {!isEligiblePlan ? (
                  <Image
                    alt=""
                    style={{ height: scaleHeight(20), width: scaleWidth(100) }}
                    source={IMAGES.SUBSCRIPTION_LOCK.BlueBackground}
                  />
                ) : (
                  <Text style={styles.Pricetext} allowFontScaling={false}>
                    {Currenttime ? Currenttime : '...'}
                  </Text>
                )}
              </View>
            )}
            {/* Signal Green / Red Alert */}
            <View>
              {!isEligiblePlan ? (
                <Image
                  alt=""
                  style={{ height: scaleHeight(20), width: '100%', resizeMode: 'contain' }}
                  source={IMAGES.SUBSCRIPTION_LOCK.BlurRectangle}
                />
              ) : (
                <View style={styles.Datecontainer}>
                  <View style={styles.flexDire}>
                    <Image
                      source={
                        tradeData?.[0]?.current_trade?.recommendation === 'Buy'
                          ? IMAGES.Tradeicon
                          : IMAGES.tradeiconRed
                      }
                      style={styles.icondetail2}
                    />
                    <Text
                      style={[
                        styles.Datetext,
                        {
                          color:
                            tradeData?.[0]?.current_trade?.recommendation === 'Buy'
                              ? COLORS.Binance_green
                              : COLORS.Binance_red,
                        },
                      ]}
                      allowFontScaling={false}>
                      {tradeData?.[0]?.current_trade?.recommendation === 'Buy'
                        ? 'Green Signal'
                        : 'Red Alert'}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.Pricetext,
                      {
                        color:
                          tradeData?.[0]?.current_trade?.recommendation === 'Buy'
                            ? COLORS.Binance_green
                            : COLORS.Binance_red,
                      },
                    ]}
                    allowFontScaling={false}>
                    {addCommaToCurrency(tradeData?.[0]?.current_trade?.price)}
                  </Text>
                </View>
              )}
            </View>
            {/* Pointss */}
            <View style={styles.Datecontainer}>
              <View style={styles.flexDirJustCon}>
                <Image
                  source={
                    tradeData?.[0]?.current_trade?.points > 0 ? IMAGES.ProfitIcon : IMAGES.LossIcon
                  }
                  style={styles.Profit_LossIcon}
                />
                <Text allowFontScaling={false} style={[styles.Datetext]}>
                  Points
                </Text>
              </View>
              <Text
                style={[
                  styles.Pricetext,
                  {
                    color:
                      tradeData?.[0]?.current_trade?.points > 0
                        ? COLORS.Binance_green
                        : COLORS.Binance_red,
                  },
                ]}
                allowFontScaling={false}>
                {tradeData?.[0]?.current_trade?.points}
              </Text>
            </View>
            {/* ////Profit INR */}
            <View style={styles.Datecontainer}>
              <View style={styles.flexDirJustCon}>
                <Image source={IMAGES.RupeesIcon} style={styles.Profit_LossIcon} />
                <Text
                  style={[
                    styles.Datetext,
                  ]}
                  allowFontScaling={false}>
                  {tradeData?.[0]?.current_trade?.points > 0 ? 'Profit' : 'Loss'} in INR{' '}
                </Text>
              </View>
              <Text
                style={[
                  styles.Pricetext,
                  {
                    color:
                      tradeData?.[0]?.current_trade?.points > 0
                        ? COLORS.Binance_green
                        : COLORS.Binance_red,
                  },
                ]}
                allowFontScaling={false}>
                {tradeData?.[0]?.current_trade?.points > 0
                  ? `₹${addCommaToCurrency(
                    (tradeData?.[0]?.current_trade?.points * isTradeDataSuccess?.price).toFixed(2)
                  )}`
                  : `₹${addCommaToCurrency(
                    (tradeData?.[0]?.current_trade?.points * isTradeDataSuccess?.price).toFixed(2)
                  )}`}

              </Text>
            </View>
          </View>
          {/* Alert box */}
          {isEligiblePlan && <View style={styles.AlertContainer}>
            {isAlerted(tradeData?.[0]?.current_trade?.symbol_id) ? (
              <TouchableOpacity
                onPress={() =>
                  handleAlertSubscribe(
                    tradeData?.[0]?.current_trade?.symbol,
                    tradeData?.[0]?.current_trade?.symbol_id,
                    tradeData?.[0]?.current_trade?.price,
                  )
                }>
                <Image source={IMAGES.Bell_Ring} style={styles.AlertIcon} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  handleAlertSubscribe(
                    tradeData?.[0]?.current_trade?.symbol,
                    tradeData?.[0]?.current_trade?.symbol_id,
                    tradeData?.[0]?.current_trade?.price,
                  )
                }>
                <Image source={IMAGES.Bell} style={styles.AlertIcon} />
              </TouchableOpacity>
            )}
          </View>}
        </View>
        {!isEligiblePlan && (
          <Text style={{ fontSize: 12, paddingTop: 3, color: 'red', fontWeight: '700' }}>
            {`${symbol?.symbol} are only for BASIC PLUS , PRO & PRO ADVISORY plan`}
          </Text>
        )}
        <Text style={styles.tradeContainer} allowFontScaling={false}>
          Previous Trades
        </Text>
      </View>
    );
  };

  const RenderItem: React.FC<RenderItemProps> = (item, index) => {
    const REDALERT = () => {
      return (
        <View style={styles.Redalertbox}>
          <Text style={styles.boxtext} allowFontScaling={false}>
            Red ALERT
          </Text>
        </View>
      );
    };
    const GREENSIGNAL = () => {
      return (
        <View
          style={[
            styles.Redalertbox,
            {
              backgroundColor: '#228B22',
            },
          ]}>
          <Text style={styles.boxtext} allowFontScaling={false}>
            GREEN SIGNAL
          </Text>
        </View>
      );
    };
    const SHORTSELL = () => {
      return (
        <View
          style={[
            styles.Redalertbox,
            {
              backgroundColor: '#008C8A',
            },
          ]}>
          <Text style={styles.boxtext} allowFontScaling={false}>
            SHORT SELL
          </Text>
        </View>
      );
    };
    const Points = (item: any) => {
      const recommendation = item?.item[0]?.recommendation;
      const price1 = item?.item[0]?.price;
      const price2 = item?.item[1]?.price;

      if (recommendation === 'Buy') {
        return price1 < price2 ? 'Profit' : 'Loss';
      } else {
        return price1 > price2 ? 'Profit' : 'Loss';
      }
    };
    const timeinsec = item && item?.item[0]?.timeframe.split('T');
    const timeinsec2 = item && item?.item[1]?.timeframe.split('T');
    const time = item && formatTimeIn12Hour(item?.item[0]?.timeframe);
    const time2 = item && formatTimeIn12Hour(item?.item[1]?.timeframe);

    return (
      <View style={styles.PrevTradecontainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {!isEligiblePlan ? <View style={{
            width: '60%',
          }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{
              }}
              onPress={() => {
                showSubscriptionAlert();
              }}>
              <Image
                style={[styles.LockIcon, { resizeMode: 'contain', height: 125, width: 225 }]}
                source={IMAGES.SUBSCRIPTION_LOCK.LOCKICON_RECTANGLE}
              />
            </TouchableOpacity>
          </View> : <View>
            <View
              style={[
                styles.RedContainer,
              ]}>
              {item?.item[0]?.recommendation === 'Buy' ? <GREENSIGNAL /> : <REDALERT />}
              <Text style={[styles.redtextdetail]} allowFontScaling={false}>
                {formatDate(item?.item[0]?.timeframe)} {''}
                {timeinsec[1] === '00:00:00' ? '' : time} at
                {timeinsec[1] !== '00:00:00' ? <Text style={{ fontWeight: '600' }}> {`\n${addCommaToCurrency(item?.item[0]?.price)}`}</Text> : <Text style={{ fontWeight: '600' }}> {addCommaToCurrency(item?.item[0]?.price)}</Text>}
              </Text>
            </View>

            <View style={[styles.GreenContainer]}>
              {item?.item[0]?.recommendation === 'Buy' ? <SHORTSELL /> : <GREENSIGNAL />}
              <Text style={styles.redtextdetail} allowFontScaling={false}>
                {formatDate(item?.item[1]?.timeframe)}
                {' '}
                {timeinsec2[1] === '00:00:00' ? '' : time2} at
                {timeinsec2[1] !== '00:00:00' ? <Text style={{ fontWeight: '600' }}> {`\n${addCommaToCurrency(item?.item[1]?.price)}`}</Text> : <Text style={{ fontWeight: '600' }}> {addCommaToCurrency(item?.item[1]?.price)}</Text>}
                {/* {item?.item[0]?.improved_price && <>{item?.item[0]?.recommendation === 'Buy' ? <Text style={{ marginTop: 5 }}>{`\nProfit As Per Low :`} <Text style={{ fontWeight: '700' }}>{item?.item[0]?.improved_price}</Text></Text> : <Text style={{ marginTop: 5 }}>{`\nProfit As Per High :`} <Text style={{ fontWeight: '700' }}>{item?.item[0]?.improved_price}</Text></Text>}</>} */}
              </Text>
            </View>
          </View>}
          <View style={[styles.profitContainer]}>
            <Text style={[styles.txt_point]} allowFontScaling={false}>
              <Text
                style={[
                  {
                    color: Points(item) === 'Profit' ? COLORS.PrimaryGreen : COLORS.Binance_red,
                  },
                ]}>
                {Points(item)}
                {'\n'}
              </Text>

              {Points(item) === 'Loss'
                ? `-${item?.item[2]?.['profit/loss']} \n Points\n₹-${addCommaToCurrency(
                  (item?.item[2]?.['profit/loss'] * isTradeDataSuccess?.price).toFixed(2)
                )}`
                : `${item?.item[2]?.['profit/loss']}  \nPoints\n ₹${addCommaToCurrency(
                  (item?.item[2]?.['profit/loss'] * isTradeDataSuccess?.price).toFixed(2)
                )}`}
              {' '}
            </Text>
          </View>
          {item.index === 0 && !isEligiblePlan && (
            <View
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
                onPress={() => {
                  showSubscriptionAlert();
                }}>
                <Image
                  alt=""
                  style={[styles.LockIcon]}
                  source={IMAGES.SUBSCRIPTION_LOCK.LOCKICON_RECTANGLE}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    gettotaltradeData();
  }, []);
  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle={symbol?.symbol} onPressBackArrow={clearAllData} />
      {isloader ? (
        <Loader />
      ) : (
        // <View style={styles.flexarea}>
        <View style={styles.container}>
          <FlatList
            data={slicedTradeData}
            ListHeaderComponent={<Header />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => <TradesEmpty />}
            renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
            keyExtractor={(item, index) => index.toString()} // Use index as key for each item
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor={COLORS.blue}
                progressViewOffset={30}
              />
            }
          />
        </View>
        // </View>
      )}
      {showPriceDialog ? ( // open modal when we click on bell icon for setiing alert
        <AlertPopupIntraday
          isVisible={showPriceDialog} //// show modal
          onCancel={onCancelAlert}
          symbol={activeSymbol} //send symbol
          defaultPrice={activePrice} //send cmp current market price
          defaultData={defaultData}
          symbolId={symbolId} // send symbol id
          trade_timeframe={trade_timeframe}
        />
      ) : null}
    </MainContainer>
  );
};

export default React.memo(RecentTradeScreen);
//373
