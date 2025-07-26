import React, { FC, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import FloatingButton from './RaiseTicketButton';
import { COLORS, HEADER_TITLE, ROUTE_NAME, scaleWidth, styleBase } from '../../Constants/enums';
import { getraise_ticket } from '../../apis/Onboarding/News_ipo/News_ipoSlice';
import { formatDate } from '../Dashboard/TableComponent/utils';
import styles from './style';

interface SubscriptionScreenProps {
  navigation: any;
}

const SupportScreen: FC<SubscriptionScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { isLoad, israiseTicketSuccess, isticketLength } = useSelector(
    (state: any) => state.news_ipoSlice
  );

  const tickets = useMemo(
    () => israiseTicketSuccess?.response || [],
    [israiseTicketSuccess]
  );

  const isChecked = useMemo(() => isticketLength > 0, [isticketLength]);

  const fetchTickets = useCallback(() => {
    dispatch(getraise_ticket());
  }, [dispatch]);

  useEffect(() => {
    if (isFocused) {
      fetchTickets();
    }
  }, [isFocused, fetchTickets]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCreateTicket = useCallback(() => {
    navigation.navigate(ROUTE_NAME.CREATE_TICKET);
  }, [navigation]);

  const handleTicketPress = useCallback(
    (ticketId: string, status: string) => {
      navigation.navigate(ROUTE_NAME.CHAT_BOX, { ticketId, status });
    },
    [navigation]
  );

  const renderTicketItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() => handleTicketPress(item?.id, item?.status)}
        activeOpacity={0.8}
      >
        <View style={[styles.listContainer, item?.status === 'Closed' && { backgroundColor: '#F4F5F7' }]}>
          {/* Ticket ID */}
          <Text
            style={[styles.TxtTitle, { marginBottom: 6 }]}
            allowFontScaling={false}
          >
            Ticket ID: {item?.ticket_id}
          </Text>

          {/* Title and Date Row */}
          <View
            style={[styleBase.inrowspaceBetween, { width: '100%', marginBottom: 4 }]}
          >
            <Text
              style={[styles.TxtTitle2, { flex: 1 }]}
              numberOfLines={2}
              allowFontScaling={false}
            >
              Title: {item?.title}
            </Text>
            <Text
              style={[styles.txtDate, { marginLeft: 10 }]}
              allowFontScaling={false}
            >
              {formatDate(item?.created_at)}
            </Text>
          </View>

          {/* Description */}
          <Text
            style={[styles.Description, { marginBottom: 5 }]}
            numberOfLines={3}
            allowFontScaling={false}
          >
            Description: {item?.description}
          </Text>

          {/* Status Badge */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View
              style={[
                styles.view_currentStatue,
                {
                  alignSelf: 'flex-start',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  marginTop: 5,
                  borderRadius: 12,
                  backgroundColor: '#E0F7FA',
                },
              ]}
            >
              <Text
                style={[
                  styles.txtCurrentStatue,
                  { color: '#00796B', fontWeight: 'bold' },
                ]}
                allowFontScaling={false}
              >
                {item?.status}
              </Text>
            </View>
            <View style={{ paddingTop: 20 }}>
              <Feather name="arrow-right-circle" size={25} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [handleTicketPress]
  );

  const keyExtractor = useCallback((item, index) => item?.ticket_id?.toString() || index.toString(), []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TitleWithBackBtnHeader
        centerTitle={HEADER_TITLE.CUSTOMER_CARE}
        onPressBackArrow={handleBack}
      />
      <View style={{ flex: 1 }}>
        {isLoad ? (
          <View style={styleBase.emptyContainer}>
            <ActivityIndicator color={COLORS.LOADER_COLOR} size="large" />
          </View>
        ) : (
          <FlatList
            data={tickets}
            renderItem={renderTicketItem}
            keyExtractor={keyExtractor}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 200 }}
          />
        )}
      </View>
      <View style={{ height: 150 }}>
        <FloatingButton onPress={handleCreateTicket} isChecked={isChecked} />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(SupportScreen);
