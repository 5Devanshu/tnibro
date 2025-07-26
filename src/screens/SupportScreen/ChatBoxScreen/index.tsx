import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import MainContainer from '../../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import { normalizeFont, scaleHeight, scaleWidth } from '../../../Constants/enums';
import { getTicketComment, postTicketComment } from '../../../apis/Onboarding/News_ipo/News_ipoSlice';

interface Props {
  navigation: any;
  route: any;
}

const ChatBoxScreen: FC<Props> = ({ navigation, route }) => {
  const { ticketId, status } = route.params;
  const [inputText, setInputText] = useState('');
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const { isticketCommentSuccess, ispostTicketSuccess } = useSelector((state: any) => state.news_ipoSlice);

  const fetchComments = () => {
    dispatch(getTicketComment({ id: ticketId }));
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    if (isticketCommentSuccess) {
      const data = isticketCommentSuccess?.response?.[0]?.comments || [];
      setComments(data);
    }
  }, [isticketCommentSuccess]);

  useEffect(() => {
    if (ispostTicketSuccess) {
      fetchComments();
    }
  }, [ispostTicketSuccess]);

  const handleSend = () => {
    if (inputText.trim()) {
      dispatch(postTicketComment({ id: ticketId, comments: inputText }));
      setInputText('');
    }
  };

  const renderItem = useCallback(({ item }) => {
    const isAdmin = item.commenter_type === 'Admin';
    const messageStyle = isAdmin ? styles.adminMessage : styles.userMessage;
    const textStyle = isAdmin ? styles.adminText : styles.userText;

    return (
      <View style={[styles.messageContainer, messageStyle]}>
        <Text style={textStyle} allowFontScaling={false}>
          {item.comments}
        </Text>
      </View>
    );
  }, []);

  return (
    <MainContainer bgColor="#FFF">
      <TitleWithBackBtnHeader centerTitle="Customer Care" onPressBackArrow={navigation.goBack} />
      <KeyboardAwareScrollView contentContainerStyle={styles.flexGrow} keyboardShouldPersistTaps="handled">
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
        />
        {status !== 'Closed' && (
          <View style={styles.inputContainer}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message"
              style={styles.input}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText} allowFontScaling={false}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAwareScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  flexGrow: {
    flexGrow: 1,
  },
  messageList: {
    padding: 10,
    paddingBottom: 40,
  },
  messageContainer: {
    marginVertical: scaleHeight(5),
    padding: 10,
    borderRadius: scaleWidth(10),
    maxWidth: '90%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#20A25C',
  },
  adminMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEE',
  },
  userText: {
    color: '#fff',
  },
  adminText: {
    color: '#656565',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: scaleHeight(40),
    borderColor: '#ccc',
    borderWidth: scaleWidth(1),
    borderRadius: scaleWidth(20),
    paddingHorizontal: scaleWidth(10),
  },
  sendButton: {
    marginLeft: scaleWidth(10),
    backgroundColor: '#4bd874',
    borderRadius: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(15),
  },
  sendButtonText: {
    color: '#fff',
    fontSize: normalizeFont(16),
  },
});

export default React.memo(ChatBoxScreen);
