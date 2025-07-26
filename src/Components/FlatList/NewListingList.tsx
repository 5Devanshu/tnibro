import React from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {dynamicSize, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import SectorStockEmpty from '../EmptyListView/SectorStockEmpty';
import NewListingTile from '../Tiles/NewListingTile';

interface NewListingListProps {
  newlistingList: [];
  onSelectStock: (index: number) => void;
}
const NewListingList: React.FC<NewListingListProps> = ({newlistingList, onSelectStock}) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={newlistingList}
        style={{marginHorizontal: scaleWidth(30)}}
        keyExtractor={item => item.symbol_id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <SectorStockEmpty />}
        renderItem={({item}) => <NewListingTile item={item} onSelectStock={onSelectStock} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  ListBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(13),
    marginBottom: scaleHeight(24),
    borderRadius: 8,
  },
  label: {
    color: '#3D3D3D',
    fontSize: normalizeFont(17),
    fontWeight: '400',
  },
});
export default React.memo(NewListingList);
