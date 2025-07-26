import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../../../Constants/enums';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainContainer from '../../../Components/MainContainer';
import { useDispatch, useSelector } from 'react-redux';
import SectorStockHeader from '../../../Components/Headers/SectorStockHeaders';
import SectorStockList from '../../../Components/FlatList/SectorStockList';
import { getSectorStock } from '../../../apis/Onboarding/SectorStock/SectorStockSlice';
import { goBack, navigation } from '../../../Navigation/NavigationService';
import { Loader } from '../../../Components/Loader';

const SectorStocksScreen: React.FC = ({ route }) => {
  const { Sector } = route.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [stockList, setStockList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'asc' | 'desc' | 'star'>('asc');

  const { isSectorStockSuccess, isLoading } = useSelector(
    (state: any) => state.SectorStockSlice
  );

  useEffect(() => {
    const getSectorStockData = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        dispatch(getSectorStock({ userid: userId, sector: Sector?.value }));
      }
    };

    if (isFocused) {
      getSectorStockData();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isSectorStockSuccess) {
      setStockList(isSectorStockSuccess);
    }
  }, [isSectorStockSuccess]);

  useEffect(() => {
    applyFilters();
  }, [stockList, ascendingOrder, showOnlyStarred]);

  const applyFilters = () => {
    let list = [...stockList];

    if (showOnlyStarred) {
      list = list.filter(item => item?.isStar);
    }

    list.sort((a, b) =>
      ascendingOrder
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

    setFilteredList(list);
  };

  const applySortAndFilter = () => {
    if (selectedOption === 'asc') {
      setAscendingOrder(true);
      setShowOnlyStarred(false);
    } else if (selectedOption === 'desc') {
      setAscendingOrder(false);
      setShowOnlyStarred(false);
    } else if (selectedOption === 'star') {
      setShowOnlyStarred(true);
    }
    setIsSortModalVisible(false);
  };

  const onPressBack = () => goBack();

  const onSelectStock = item =>
    navigation('SearchDetailScreen', {
      symbol: item?.name,
      segment: item?.segment,
    });

  return (
    <MainContainer bgColor={COLORS.PrimaryBackGround}>
      {isLoading && <Loader />}
      <SectorStockHeader
        onPressBackArrow={onPressBack}
        Sector={Sector}
        onSortPress={() => setIsSortModalVisible(true)}
        ascendingOrder={ascendingOrder}
      />
      <SectorStockList stockList={filteredList} onSelectStock={onSelectStock} />

      {/* Sort & Filter Modal */}
      <Modal
        transparent
        visible={isSortModalVisible}
        animationType="fade"
        onRequestClose={() => setIsSortModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Sort & Filter</Text>

            {[
              { label: 'Ascending (A-Z)', value: 'asc' },
              { label: 'Descending (Z-A)', value: 'desc' },
              { label: 'Star Stocks', value: 'star' },
            ].map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioButtonContainer}
                onPress={() => setSelectedOption(option.value as 'asc' | 'desc' | 'star')}
              >
                <View style={styles.radioCircle}>
                  {selectedOption === option.value && <View style={styles.radioDot} />}
                </View>
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.halfButton}
                onPress={applySortAndFilter}
              >
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.halfButton, styles.cancelButton]}
                onPress={() => setIsSortModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#228B22',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#228B22',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  halfButton: {
    width: '45%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#228B22',
  },
  applyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  cancelText: {
    color: '#228B22',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SectorStocksScreen;
