import React, {useState} from 'react';
import {FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, normalizeFont, scaleHeight, scaleWidth} from '../../Constants/enums';
import { addCommaToCurrency } from '../../utils/digitCommaSeparator';
interface UpgradePlanListProps {
  data: [];
  onSelectPlan: (index: number) => void;
}

const UpgradePlanList: React.FC<UpgradePlanListProps> = ({data, onSelectPlan}) => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const RenderData: React.FC = (props: any) => {
    const {item, onSelectPlan, index} = props;
    const isSelected = index === selectedItem;
    return (
      <TouchableOpacity
        style={[styles.container, isSelected && styles.selectedContainer]}
        onPress={() => {
          onSelectPlan(item);
          setSelectedItem(index);
        }}>
        <View style={{marginHorizontal: scaleWidth(24)}}>
          <Text style={styles.PriceText} allowFontScaling={false}>
            ₹ {addCommaToCurrency(item?.price)} / {item?.quantity} alerts
          </Text>
          <Text style={styles.descriptionText} allowFontScaling={false}>
            {item?.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderEmpty = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          marginTop: scaleHeight(200),
        }}>
        <Text allowFontScaling={false} style={{color: COLORS.Black, fontSize: normalizeFont(20)}}>
          No Plans Present...
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => (
          <RenderData item={item} onSelectPlan={onSelectPlan} index={index} />
        )}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
  },
  PriceText: {
    color: COLORS.Black,
    fontSize: normalizeFont(22),
    fontWeight: '500',
  },
  descriptionText: {
    color: '#4E4E4E',
    fontSize: normalizeFont(10),
    fontWeight: '300',
    marginTop: scaleHeight(8),
  },
  selectedContainer: {
    borderColor: '#228B22',
    borderWidth: 1,
  },
});
export default React.memo(UpgradePlanList);
