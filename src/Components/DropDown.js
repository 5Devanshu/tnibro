import React, {useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, Modal, View, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Flag from 'react-native-flags';
import {scaleHeight, scaleWidth} from '../Constants/enums';

const Dropdown = ({data, onSelect}) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = item => {
    onSelect(item);
    setSelectedCountry(item);
    setVisible(false);
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={[
        styles.item,
        {
          borderBottomWidth: index === 1 ? 1 : 0,
          paddingBottom: index === 1 ? scaleHeight(20) : scaleHeight(10),
          paddingTop: index === 2 ? scaleHeight(20) : 10,
        },
      ]}
      onPress={() => onItemPress(item)}>
      <View style={styles.listItemContainer}>
        <Text allowFontScaling={false} style={styles.country}>
          {item.country}
        </Text>
        <Flag code={item?.iso} size={32} />
      </View>
      <Text allowFontScaling={false} style={[styles.country, {marginTop: 10}]}>
        More to come
      </Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, {top: dropdownTop}]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity ref={DropdownButton} style={styles.button} onPress={toggleDropdown}>
      {renderDropdown()}
      <LinearGradient colors={['#224D16', '#2B5E1C']} style={styles.linearGradient}>
        {renderDropdown()}
        <View style={styles.selectBtn}>
          {selectedCountry ? (
            <Text allowFontScaling={false} style={styles.selectBtnTxt}>
              {selectedCountry?.country}
            </Text>
          ) : (
            <Text allowFontScaling={false} style={styles.selectBtnTxt}>
              Select your Country
            </Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: Dimensions.get('window').width - 40,
    // height: '55%',
    height: '10%',
    marginHorizontal: scaleWidth(20),
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    elevation: 20,
  },
  country: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Montreal-Light',
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(10),
    borderBottomColor: '#f5f5f5',
  },
  countrySelectWrapper: {
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 40,
  },
  selectBtn: {
    width: Dimensions.get('window').width - 40,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectBtnTxt: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 20,
    fontFamily: 'Montreal-Light',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Dropdown;
