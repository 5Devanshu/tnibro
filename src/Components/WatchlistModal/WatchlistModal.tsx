import React, { useEffect, useState } from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import styles from './style';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addWatchList,
  deleteSymbol,
  getWatchlist,
  symboleAddedWatchList,
} from '../../apis/Onboarding/watchlistSlice';
import CreateNewWatchlist from '../../screens/WatchList/WatchListDetail/CreateNewWatchlist';
import IMAGES from '../../Constants/enums/ImagesEnum';
import WatchListDropdown from './WatchListDropdown';
import { CONSTANT_TEXT } from '../../Constants/enums/constantText';
import CommonButton from '../Button/CommonButton';
import { scaleWidth } from '../../Constants/enums';

const WatchListPopUp = (props: any) => {
  const { isVisible, onCancel, symbol_name, updateWatchlistTable, updateWatchlistRemove, watchlist_menu, remove_Watchlist_id } = props;
  const dispatch = useDispatch();
  const watchListData = useSelector(state => state.totalWatchlist);
  const { isWatchlistSuccess, isaddWatchlistSuccess } = watchListData;
  const [selectedWatchlist, setSelectedWatchlist] = useState('');
  const [watchlist_id, setWatchlist_id] = useState(''); //use to store the watchlist id to save to watchlist
  const [modalVisible, setModalVisible] = useState(false); //open modal when we click on create new
  const [removeWatchlist, setremoveWatchlist] = useState('');
  const [removeWatchlist_id, setRemoveWatchlist_id] = useState(remove_Watchlist_id); //use to store the  delet the symbol from watchlist
  const getWatchList = async () => {
    const userid = await AsyncStorage.getItem('userId');
    if (userid) {
      dispatch(getWatchlist({ userid: userid }));
    }
  };

  useEffect(() => {
    getWatchList();
  }, []);

  const handleWatchlistData = value => {
    setSelectedWatchlist(value.name);
    setWatchlist_id(value.id);
  };
  const handleAddSymbol = async () => {
    const userid = await AsyncStorage.getItem('userId');
    dispatch(
      symboleAddedWatchList({
        userid: userid,
        symbol: [symbol_name],
        watchlist_id: watchlist_id,
      }),
    );
    updateWatchlistTable(symbol_name); ///use to show the green save symbol in table
    onCancel();
  };
  const handleRemoveWatchlist = value => {
    setremoveWatchlist(value.name);
    setRemoveWatchlist_id(value.id);
  };
  const handleDeleteSymbol = async item => {
    const userid = await AsyncStorage.getItem('userId');
    dispatch(deleteSymbol({ userid: userid, symbol: symbol_name, watchlist_id: removeWatchlist_id }));
    updateWatchlistRemove(symbol_name);
    onCancel();
  };

  const updateWatchlist = async () => {
    const userid = await AsyncStorage.getItem('userId');
    if (userid) {
      dispatch(getWatchlist({ userid: userid }));
    }
  };
  useEffect(() => {
    if (isaddWatchlistSuccess) {
      updateWatchlist();
    }
  }, [isaddWatchlistSuccess]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleSaveWatchList = async (title, Description) => {
    const userid = await AsyncStorage.getItem('userId');
    dispatch(addWatchList({ description: Description, name: title, userid: userid }));
  };
  const newWatchlistsForActiveSymbol =
    isWatchlistSuccess &&
    isWatchlistSuccess?.response
      ?.filter(item => item.symbol?.includes(symbol_name))
      .map(item => {
        return {
          name: item.name,
          id: item.id,
        };
      });
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}>
      <KeyboardAvoidingView
        style={styles.container}
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 30}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {watchlist_menu ? <View style={[styles.containerCard, { padding: 20 }]}>
            <Text style={[styles.txtRemovewatchlist, { fontWeight: '500', fontSize: 15 }]}>
              {'Are you sure you want to Delete from watchlist ?'}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 20  }}>
              <CommonButton
                text={'Delete'}
                onPress={handleDeleteSymbol}
              />
              <CommonButton
                text={CONSTANT_TEXT.CANCEL}
                onPress={onCancel}
                backgroundColor={'#46B6F5'}
                marginHorizontal={scaleWidth(7)}
              />
            </View>
          </View> : <View style={styles.containerCard}>
            <View style={styles.closeContainer}>
              <TouchableOpacity onPress={() => onCancel()}>
                <Image
                  style={styles.sortIcon}
                  source={IMAGES.REFUND_SCREEN.Refundcancel}
                />
              </TouchableOpacity>
            </View>
            <Text allowFontScaling={false} style={styles.txtheading}>
              {CONSTANT_TEXT.ADD_TO_WATCHLIST}
            </Text>
            <View style={styles.SecondContainer}>
              <Text allowFontScaling={false} style={styles.txtline}>
                {CONSTANT_TEXT.SAVE_TO_WATCHLIST}
              </Text>
              <View style={styles.containerMargin}>
                <Text allowFontScaling={false} style={styles.txtheader}>
                  {CONSTANT_TEXT.CHOOSE_A_WATCHLIST}
                </Text>
                <WatchListDropdown
                  data={isWatchlistSuccess?.response}
                  height={350}
                  value={selectedWatchlist}
                  onSelect={value => handleWatchlistData(value)}
                />
                <View style={styles.mainView}>
                  <CommonButton
                    text={CONSTANT_TEXT.SAVE}
                    onPress={handleAddSymbol}
                    disabled={!selectedWatchlist}
                  />
                  <CommonButton
                    text={CONSTANT_TEXT.CREATE_NEW}
                    onPress={handleOpenModal}
                    backgroundColor="#46B6F5"
                    marginHorizontal={scaleWidth(7)}
                  />
                  <CreateNewWatchlist
                    isVisible={modalVisible}
                    onClose={handleCloseModal}
                    onSave={handleSaveWatchList}
                  />
                </View>
              </View>
              <View style={styles.borderline} />
              <View style={styles.containerMargin}>
                <Text allowFontScaling={false} style={styles.txtRemovewatchlist}>
                  {CONSTANT_TEXT.REMOVE_FROM_WATCHLIST}
                </Text>
                {newWatchlistsForActiveSymbol && (
                  <WatchListDropdown
                    data={newWatchlistsForActiveSymbol}
                    height={350}
                    value={removeWatchlist}
                    onSelect={value => handleRemoveWatchlist(value)}
                  />
                )}
                <View style={styles.RemoveButtonView}>
                  <CommonButton
                    text={CONSTANT_TEXT.REMOVE}
                    onPress={handleDeleteSymbol}
                    backgroundColor={'#46B6F5'}
                  />
                </View>
              </View>
            </View>
          </View>}
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const WatchlistPopup = React.memo(WatchListPopUp);
export default WatchlistPopup;
