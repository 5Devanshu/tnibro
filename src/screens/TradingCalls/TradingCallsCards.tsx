import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
  Linking,
  Dimensions,
} from 'react-native';
import IMAGES from '../../Constants/enums/ImagesEnum';
import { COLORS, normalizeFont, styleBase } from '../../Constants/enums';
import styles from './styles';
import RNFetchBlob from 'rn-fetch-blob';
import { calculateDays, formatDateTime } from '../../utils/dateConverter';
import { addCommaToCurrency } from '../../utils/digitCommaSeparator';
import { navigation } from '../../Navigation/NavigationService';
import { downloadFile } from '../../utils/downloadFile';
import { showSubscriptionAlert } from '../../utils/showSubscriptionAlert';
import { deepLinkPayment } from '../../apis/Onboarding/authenticationSlice';
import { useDispatch } from 'react-redux';


interface TradingCallsCardsProps {
  item: any; // Replace `any` with the actual type of `item`
  isExpanded: boolean;
  onToggle: () => void;
  CloseTrade?: boolean;
  message: (textMessage: string, status: "success" | "fail") => void;
  active_PlanCode: any;
  activeOption: any;
}

const TradingCallsCards: React.FC<TradingCallsCardsProps> = ({
  item,
  isExpanded,
  onToggle,
  CloseTrade = false,
  message,
  active_PlanCode,
  activeOption
}) => {
  const screenWidth = Dimensions.get('window').width;
  const dropdownWidth = screenWidth - 120
  const dispatch = useDispatch();
  const requestStoragePermission = async url => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Write Storage Permission',
            message: 'The app needs access to your storage to download files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadFile(url);
        } else {
          Alert.alert('Permission Denied', 'Storage permission is required to download files');
        }
        // return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.log('ERRORR in this', err);
    }
  };
  const downloadFile = async url => {
    const { config, fs } = RNFetchBlob;
    const fileDir = fs.dirs.DownloadDir;

    const response = await fetch(url);
    // const blob = await response.blob();

    const filePath = `${fileDir}/document.pdf`;

    const exists = await fs.exists(filePath);
    if (exists) {
      await fs.unlink(filePath);
    }
    try {
      const configOptions = {
        path: filePath,
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading the file...',
        },
      };

      const result = await config(configOptions).fetch('GET', response.url);

      if (Platform.OS === 'android') {
        Alert.alert('Download Complete', `File saved to ${filePath}`);
      }
      return result;
    } catch (error) {
      console.error('error--', error);
      Alert.alert('Download Failed', 'Unable to download the file');

      return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.whiteContainer}>
        <View style={styles.postedOnContainer}>
          <Image
            source={IMAGES.BOTTOM_TAB_ICON.Clock} // Replace with your actual image path
            style={{ resizeMode: 'contain', height: 14, width: 14, alignSelf: 'center', marginLeft: 12 }}
          />
          <Text style={styles.postedOnText}>Posted on : {formatDateTime(item?.created_at)}</Text>
        </View>
        <TouchableOpacity style={styles.expandIconContainer} onPress={onToggle}>
          <Image source={isExpanded ? IMAGES.ArrowUP : IMAGES.HOME_SCREEN_ICON.EXPAND_AROW} style={styles.expandIcon} />
        </TouchableOpacity>
        {CloseTrade && (
          <View style={[styles.header2]}>
            <Image source={IMAGES.closedIcon} style={styles.calenderImage} />
            <Text style={styles.txtCloseTrade} allowFontScaling={false}>
              Trade Closed{' '}
              {item?.segment === 'SWING' ? `in ${calculateDays(item?.created_at, item?.exit_price_time)} days` : null}
            </Text>
          </View>
        )}
        {(active_PlanCode !== 'ADV4499' && activeOption === 'OPEN_TRADE') ?
          <TouchableOpacity onPress={() => {
                               dispatch(deepLinkPayment("ADV4499"));
                return setTimeout(() => {
                  showSubscriptionAlert();
                }, 500);
                            }}>
            <Image source={IMAGES.SUBSCRIPTION_LOCK.BlurRectangle} style={{ height: 50, width: dropdownWidth, resizeMode: 'contain' }} />
          </TouchableOpacity>
          : <View style={styleBase.inrowspaceBetween}>
            <TouchableOpacity onPress={() => {
              navigation('SearchDetailScreen', {
                symbol: item?.symbol_name,
                segment: 'cash',
              });
            }}>
              <Text style={styles.stockName}>{item?.symbol_name}</Text>
            </TouchableOpacity>

            <View style={styles.segmentContainer}>
              <Text style={styles.segmentText}>{item?.segment}</Text>
            </View>
          </View>}
        {(active_PlanCode !== 'ADV4499' && activeOption === 'OPEN_TRADE') && (
          <Text style={{ fontSize: 12, paddingTop: 3, color: 'red', fontWeight: '700' }}>
            {'These trading calls are only for PRO ADVISORY plan'}
          </Text>
        )}
        {item?.lot_size && <Text style={styles.lotSizeTxt}>Lot Size - {item?.lot_size}</Text>}
        {(activeOption === 'OPEN_TRADE' ? active_PlanCode === 'ADV4499' : true) && <Text style={{ marginLeft: 10, fontSize: 10, color: '#000' }}>{item?.company_name}</Text>}
        {CloseTrade && (
          <View style={[styleBase.inRow, styles.netGainContainer]}>
            <Text style={styles.netGainLabel} allowFontScaling={false}>
              Net Gain:{' '}
            </Text>
            <View
              style={[
                styles.netGainBox,
                {
                  backgroundColor:
                    item?.profit_loss_percent && parseFloat(item?.profit_loss_percent) > 0
                      ? COLORS.PrimaryGreen
                      : '#FF4D4F',
                },
              ]}>
              <Image
                source={
                  item?.profit_loss_percent && parseFloat(item?.profit_loss_percent) > 0
                    ? IMAGES.WhiteUpicon
                    : IMAGES.GreenDownIcon
                }
                style={styles.gainIcon}
              />
              <Text style={styles.netGainText}>
                {' '}
                {item?.profit_loss_percent}% (₹{addCommaToCurrency(item?.profit_loss)})
              </Text>
            </View>
          </View>
        )}
        {item?.signal && (item?.segment === 'INTRADAY' || (item?.segment === 'SWING' && item?.lot_size)) && (
          <View style={styles.tradeTypeContainer}>
            <Text style={styles.tradeTypeText}>{item?.signal == 'short' ? 'Short Sell' : 'Long Buy'}</Text>
          </View>
        )}
        <View style={styles.entryPriceContainer}>
          <Text style={styles.entryPriceText}>
            Entry Price ₹ {addCommaToCurrency(item?.entry_price || '-')}
            <Text style={{ fontSize: normalizeFont(12) }}>
              {'\n'} {formatDateTime(item?.created_at)}
            </Text>
          </Text>
        </View>
        {CloseTrade && (
          <View style={styles.targetPriceContainer}>
            <Text style={styles.targetPriceText}>
              Exit Price At ₹ {addCommaToCurrency(item?.exit_price || '-')}
              {item?.exit_price_time && (
                <Text style={{ fontSize: normalizeFont(10) }}>
                  {'\n'}
                  {formatDateTime(item?.exit_price_time) || '-'}
                </Text>
              )}
            </Text>
          </View>
        )}
        {!CloseTrade && <View style={styles.targetPriceContainer}>
          <Text style={styles.targetPriceText}>Target Price ₹ {addCommaToCurrency(item?.target_price || '-')}</Text>
        </View>}
        {isExpanded && (
          <>
            <View style={styles.stopLossContainer}>
              <Text style={styles.stopLossText}>Stop Loss ₹ {item?.stop_loss}</Text>
            </View>
            <View style={styles.dashedBorder}></View>
            {(activeOption === 'OPEN_TRADE' ? active_PlanCode === 'ADV4499' : true) && <View style={styles.pdfContainer}>
              <TouchableOpacity disabled style={styles.pdfButton}>
                <Image source={IMAGES.pdfIcon} style={styles.pdfIcon} />
                <Text style={styles.pdfText} allowFontScaling={false} numberOfLines={1}>
                  {item?.file_name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  () => {
                    message('Downloaded Successfully', 'success')
                    setTimeout(() => {
                      Linking.openURL(item?.file)
                    }, 3000)
                  }}
              >
                <Image source={IMAGES.DownloadIcon} style={styles.shareIcon} />
              </TouchableOpacity>
            </View>}
          </>
        )}
      </View>
    </View>
  );
};
export default React.memo(TradingCallsCards);
//240 - 95
