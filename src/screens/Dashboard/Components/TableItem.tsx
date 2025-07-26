import React from 'react';
import { View, Text} from 'react-native';
import styles from './style';
const TableItem: React.FC = (props: any) => {
const { item } = props
  return (
    <View style={styles.mainContainer}>
        <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.cont_txt}>{item.id}</Text>
        </View>
        <View style={styles.second_container}>
            <Text allowFontScaling={false} style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.email_container}>
            <Text allowFontScaling={false} style={styles.email}>{item.email}</Text>
        </View>
    </View>
  );
};

const StockTableItem = React.memo(TableItem);
export default StockTableItem;
