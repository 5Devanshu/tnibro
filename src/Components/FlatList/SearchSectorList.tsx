import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {scaleHeight, scaleWidth} from '../../Constants/enums';
import SearchSectorEmpty from '../../Components/EmptyListView/SearchSectorEmpty';
import SearchSectorTile from '../Tiles/SearchSectorTile';

interface SearchSectorListProps {
  data: Array<{index: number /* Add any other properties based on your actual data structure */}>;
  onSectorSelected: (index: number) => void;
}

const SearchSectorList: React.FC<SearchSectorListProps> = ({data, onSectorSelected}) => {
  return (
    <View style={styles.ListBox}>
      <FlatList
        data={data}
        style={styles.nameBox}
        keyExtractor={item => item.index.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <SearchSectorEmpty />}
        renderItem={({item, index}) => (
          <SearchSectorTile item={item} index={index} onSectorSelected={onSectorSelected} />
        )}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  ListBox: {
    marginHorizontal: scaleWidth(20),
    marginTop: scaleHeight(30),
  },
  nameBox: {
    marginBottom: scaleHeight(20),
  },
});

export default React.memo(SearchSectorList);
