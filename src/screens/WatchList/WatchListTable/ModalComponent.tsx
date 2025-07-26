import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Image,
  Platform,
  Keyboard,
} from 'react-native';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import { COLORS } from '../../../Constants/enums/colorsEnum';
import { normalizeFont, scaleHeight, scaleWidth } from '../../../Constants/enums/Dimensions';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getWatchlistTable,
  symboleAddedWatchList,
  deleteSymbol,
} from '../../../apis/Onboarding/watchlistSlice';
import { CONSTANT_TEXT } from '../../../Constants/enums';
import { navigation } from '../../../Navigation/NavigationService';

const ModalComponent = (props: any) => {
  const { visible, onClose, watchlistid } = props;
  const dispatch = useDispatch();
  const watchListData = useSelector((state: any) => state.totalWatchlist);
  const { isSymbolListSuccess, isSymbolSuccess, isWatchlistTableSuccess, isdeleteSymbolSuccess } =
    watchListData;
  const watchlistSymbols =
    isWatchlistTableSuccess && isWatchlistTableSuccess.map(item => item.symbol);
  const newListing =
    isSymbolListSuccess &&
    isSymbolListSuccess?.response?.map(value => {
      if (watchlistSymbols.includes(value?.name)) {
        return {
          name: value.name,
          segment: value.segment,
          id: value.id,
          isAdded: true,
        };
      } else {
        return {
          name: value.name,
          segment: value.segment,
          id: value.id,
          isAdded: false,
        };
      }
    });
  const [data, setData] = useState(newListing);
  const [originalData, setOriginalData] = useState(newListing);
  const [searchQuery, setSearchQuery] = useState('');

  const showElement = () => {
    if (isSymbolListSuccess?.response) {
      setData(newListing);
      setOriginalData(newListing);
    }
  };
  useEffect(() => {
    showElement();
  }, [isSymbolListSuccess]);

  useEffect(() => {
    const updateWatchListTable = async () => {
      // user to show the update total stocks when user add the symbol in table insinde the modal
      const userid = await AsyncStorage.getItem('userId');
      if (userid) {
        dispatch(
          getWatchlistTable({
            watchlist_id: watchlistid,
            userid: userid,
          }),
        );
      }
    };
    updateWatchListTable();
  }, [isSymbolSuccess]);
  useEffect(() => {
    const updateWatchListTable = async () => {
      // user to show the update total stocks when user add the symbol in table insinde the modal
      const userid = await AsyncStorage.getItem('userId');
      if (userid) {
        dispatch(
          getWatchlistTable({
            watchlist_id: watchlistid,
            userid: userid,
          }),
        );
      }
    };
    updateWatchListTable();
  }, [isdeleteSymbolSuccess]);
  useEffect(() => {
    if (searchQuery) {
      // Filter the data based on the search query
      const filteredData = originalData.filter(item =>
        item?.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setData(filteredData);
    } else {
      // If searchQuery is empty, show the original data
      setData(originalData);
    }
  }, [searchQuery, originalData]);

  const handleAddSymbol = async (item: string, id: string) => {
    /// dispatch the add symbol api ... when we add any sumbol
    const userid = await AsyncStorage.getItem('userId');
    dispatch(symboleAddedWatchList({ userid: userid, symbol: [item], watchlist_id: watchlistid }));
    setData(prevState => {
      return prevState.map(value => {
        if (value.id === id) {
          return {
            ...value,
            isAdded: true,
          };
        } else {
          return value;
        }
      });
    });
  };
  const handleDeleteSymbol = async (item: string, id: string) => {
    ///delete symbol function
    /// dispatch the delete symbol api ... when we remove any symbol
    const userid = await AsyncStorage.getItem('userId');
    dispatch(deleteSymbol({ userid: userid, symbol: item, watchlist_id: watchlistid }));
    setData(prevState => {
      return prevState.map(value => {
        if (value.id === id) {
          return {
            ...value,
            isAdded: false,
          };
        } else {
          return value;
        }
      });
    });
  };

  // const isAddedSymbol = (symbol: string) => {
  //   const alertIndex = isWatchlistTableSuccess.map(item => item.symbol).includes(symbol);
  //   return alertIndex;
  // };
  const isAddedSymbol = (symbol: string) => {
    const alertIndex = isWatchlistTableSuccess.findIndex((item: any) => item?.symbol === symbol);
    if (alertIndex > -1) {
      return true;
    }
    return false;
  };
  const RenderItem = React.memo((props: any) => {
    const { item, index } = props;
    return (
      <View style={{ backgroundColor: index % 2 === 0 ? '#F9F9F9' : '#FFFFFF' }}>
        <TouchableOpacity disabled
          style={styles.itemContainer}
          onPress={() => {
            navigation('SearchDetailScreen', {
              symbol: item?.name,
              segment: item?.segment,
            });
            onClose();
          }}>
          <Text allowFontScaling={false} style={styles.itemName}>
            {item?.name}
          </Text>
          {item?.isAdded === true ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                handleDeleteSymbol(item?.name, item?.id); ////delete symbol
              }}>
              <Image style={styles.icon} source={IMAGES.decrement} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                handleAddSymbol(item?.name, item?.id); ///add symbol
              }}>
              <Image style={[styles.icon, {
                height: 30,
                width: 30,
              }]} source={IMAGES.Add_icon} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    );
  });
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={() => onClose()}
      onSwipeComplete={() => onClose()}
      onBackdropPress={() => onClose()}
      style={styles.bottomModal}
      propagateSwipe={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      animationInTiming={400}
      animationOutTiming={400}
      swipeDirection="down"
      backdropOpacity={Platform.OS === 'android' ? 0.05 : 0.15}>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
        style={styles.KeyboardAvoidingViewStyle}>
        <TouchableOpacity
          hitSlop={styles.hitslop}
          onPress={() => {
            Keyboard.dismiss();
            onClose();
          }}
          style={styles.modalClose}
        />

        <View style={styles.modalContent}>
          <View style={styles.searchBox}>
            <Image
              alt=""
              resizeMode="contain"
              style={styles.searchIcon}
              source={IMAGES.SearchIcon}
            />
            <TextInput
              allowFontScaling={false}
              style={[
                styles.searchInput,
                { fontSize: searchQuery ? normalizeFont(12) : normalizeFont(10) },
              ]}
              onChangeText={text => setSearchQuery(text)}
              value={searchQuery}
              placeholder={CONSTANT_TEXT.SEARCH_ANY_STOCKS}
              placeholderTextColor="gray"
              keyboardType="default"
            />
          </View>

          <FlatList
            style={styles.listContainer}
            data={data}
            renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  KeyboardAvoidingViewStyle: {
    backgroundColor: '#FFF',
    height: '90%',
    borderTopLeftRadius: scaleWidth(24),
    borderTopRightRadius: scaleWidth(24),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingBottom: scaleHeight(45),
    paddingHorizontal: scaleWidth(35),
  },
  hitslop: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  },
  modalClose: {
    height: scaleHeight(4),
    width: scaleWidth(20),
    alignSelf: 'center',
    marginTop: scaleHeight(15),
    backgroundColor: COLORS.gray,
    borderRadius: 4,
  },
  searchIcon: {
    height: 15,
    width: 15,
    marginRight: 16,
    tintColor: '#6D7985',
    resizeMode: 'contain'
  },
  bottomModal: {
    height: 200,
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginBottom: 0,
  },
  modalContent: {
    backgroundColor: '#FFF',
    height: '100%',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: scaleWidth(8),
    marginTop: 26,
    paddingVertical: Platform.OS === 'ios' ? scaleHeight(12) : scaleHeight(0),
    borderWidth: 0.1,
    borderColor: '#E5E6ED',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaleHeight(11),
  },
  itemName: {
    fontSize: normalizeFont(15),
    fontWeight: '500',
    color: '#333333',
    lineHeight: 28.717,
    marginLeft: 24,
  },
  iconContainer: {
    marginRight: 24,
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  listContainer: {
    borderRadius: 16,
    marginTop: 27,
  },
});

const SymbolPopup = React.memo(ModalComponent);

export default SymbolPopup;
