import React, { FC, useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import MainContainer from '../../../Components/MainContainer';
import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import GradientButton from '../../../Components/Button/GradientButton';
import DropdownComponent from '../../../Components/DropDownPicker';
import {
  COLORS,
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../../Constants/enums';
import FONTS from '../../../Constants/enums/Fonts';
import {
  createNewTicket,
  resetCreatTicket,
} from '../../../apis/Onboarding/News_ipo/News_ipoSlice';
import { goBack } from '../../../Navigation/NavigationService';

interface SubscriptionScreenProps {
  navigation: any;
}

const CreateTicketScreen: FC<SubscriptionScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const ticketState = useSelector((state: any) => state.news_ipoSlice);
  const authState = useSelector((state: any) => state.authentication);

  const screenWidth = Dimensions.get('window').width;
  const dropdownWidth = screenWidth - 15;

  const user = authState?.getProfileSuccess ?? {};
  const { username = '', email = '', phoneno = '' } = user;

  const titleOptions = useMemo(
    () => [
      { label: 'App Related Issue', value: 'App Related Issue' },
      { label: 'App Lock Issue', value: 'App Lock Issue' },
      { label: 'Payment Related Issue', value: 'Payment Related Issue' },
      { label: 'Alerts and Notifications', value: 'Alerts and Notifications' },
      { label: 'How to Create Watchlist', value: 'How to Create Watchlist' },
      { label: 'Talk to Customer Support', value: 'Talk to Customer Support' },
      { label: 'Others', value: 'Others' },
    ],
    []
  );

  const handleDonePress = useCallback(() => {
    if (!title || !description) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    const ticketData = {
      title,
      description,
      status: 'open',
      priority: 'low',
    };

    dispatch(createNewTicket(ticketData));
  }, [title, description, dispatch]);

  const kit19ApiCall = async (payload: any) => {
    try {
      const response = await axios.post(
        'https://sipapi.kit19.com/Enquiry/Add',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'kit19-Auth-Key': '65280d7f4b2c43028d5cae7a5b9e6a1e',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Kit19 API Error:', error);
      return null;
    }
  };

  useEffect(() => {
    if (ticketState.iscreateTicketSuccess) {
      const ticketID = ticketState.iscreateTicketSuccess?.response?.[0]?.ticket_id;

      const kit19Payload = {
        PersonName: username,
        CompanyName: 'Stockyaari',
        MobileNo: phoneno,
        EmailID: email,
        SourceName: 'App',
        InitialRemarks: description,
        isdescription: description,
        title,
        CountryCode: '+91',
        ticketID,
        MobileNo1: '',
        MobileNo2: '',
        EmailID1: '',
        EmailID2: '',
        City: '',
        State: '',
        Country: '',
        CountryCode1: '',
        CountryCode2: '',
        PinCode: '',
        ResidentialAddress: '',
        OfficeAddress: '',
        MediumName: '',
        CampaignName: '',
      };

      kit19ApiCall(kit19Payload);

      Alert.alert('Ticket Created', 'Your ticket has been created successfully!', [
        { text: 'OK', onPress: () => goBack() },
      ]);

      // Reset form & redux state
      setTitle('');
      setDescription('');
      dispatch(resetCreatTicket());
    }
  }, [
    ticketState.iscreateTicketSuccess,
    username,
    phoneno,
    email,
    title,
    description,
    dispatch,
  ]);

  return (
    <MainContainer bgColor={COLORS.White}>
      <TitleWithBackBtnHeader
        centerTitle="Customer Care"
        onPressBackArrow={() => navigation.goBack()}
      />
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Dropdown Title */}
          <View style={styles.dropdownContainer}>
            <Text style={[styles.label, { marginBottom: 0 }]}>Select Title</Text>
            <DropdownComponent
              title="Select Title"
              data={titleOptions}
              onSelect={(item) => setTitle(item.value)}
              defaultValue={title}
              placeholder="Choose an issue"
              additionalStyle={{
                width: dropdownWidth,
                alignSelf: 'center',
              }}
            />
          </View>

          {/* Description Field */}
          <Text style={styles.label}>Describe Your Issue</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Please provide more details about your issue..."
            multiline
          />

          {/* Gradient Button */}
          <GradientButton
            onPress={handleDonePress}
            text="Submit Ticket"
            style={{ paddingHorizontal: scaleWidth(80) }}
            mainstyle={{
              borderRadius: scaleWidth(30),
              marginTop: scaleHeight(20),
              alignSelf: 'center',
            }}
          />
        </View>
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: scaleWidth(20),
    marginTop: scaleHeight(30),
    marginBottom: scaleHeight(30),
    backgroundColor: COLORS.White,
  },
  dropdownContainer: {
    borderWidth: 0,
  },
  label: {
    fontSize: normalizeFont(15),
    color: '#333',
    fontFamily: FONTS.RobotoBold,
    marginBottom: scaleHeight(10),
    marginTop: scaleHeight(10),
  },
  input: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: scaleWidth(12),
    fontSize: normalizeFont(14),
    color: '#444',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(12),
    marginBottom: scaleHeight(16),
  },
  textArea: {
    height: scaleHeight(160),
    textAlignVertical: 'top',
  },
});

export default React.memo(CreateTicketScreen);
