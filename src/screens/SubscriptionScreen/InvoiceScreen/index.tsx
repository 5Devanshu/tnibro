import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TitleWithBackBtnHeader from '../../../Components/BackButton/TitleWithBackBtnHeader';
import { invoice_detail } from '../../../apis/Onboarding/PaymentApi/CreateSubscSlice';
import { getProfileData } from '../../../apis/Onboarding/authenticationSlice';
import { formatDate_InNum24 } from '../../../screens/Dashboard/TableComponent/utils';
import { COLORS, normalizeFont, scaleHeight, scaleWidth } from '../../../Constants/enums';
import { addCommaToCurrency } from '../../../utils/digitCommaSeparator';
import { goBack } from '../../../Navigation/NavigationService';
import IMAGES from '../../../Constants/enums/ImagesEnum';
import { Loader } from '../../../Components/Loader';
import FONTS from '../../../Constants/enums/Fonts';

const InvoiceScreen = ({ route }) => {
  const { id } = route?.params;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [userInvoice, setUserInvoice] = useState([]);

  const { isinvoiceload, isinvoiceSuccess } = useSelector((state) => state.CreateSubscSlice);
  const { getProfileSuccess } = useSelector((state) => state.authentication);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        dispatch(getProfileData({ userId }));
      }
    };

    if (isFocused) {
      fetchProfileDetails();
    }
  }, [isFocused, dispatch]);

  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        dispatch(invoice_detail({ userid: userId, payment_id: id }));
      }
    };

    if (isFocused) {
      fetchInvoiceDetails();
    }
  }, [isFocused, id, dispatch]);

  useEffect(() => {
    if (isinvoiceSuccess?.response) {
      const invoiceData =  isinvoiceSuccess?.response?.find(inv => inv.id === Number(id));
      if (invoiceData) {
        setUserInvoice(invoiceData);
      }
    }
  }, [isinvoiceSuccess, id]);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:COLORS.PrimaryBackGround}}>
      <TitleWithBackBtnHeader onPressBackArrow={goBack} centerTitle="Invoice" />
      {isinvoiceload ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Image source={IMAGES.App_Logo} style={styles.logo} />

            <Text style={styles.companyInfo} allowFontScaling={false}>
              STOCK YAARI TECHNOLOGIES pvt. ltd.{'\n'}2nd Floor, Plot No 756{'\n'}Udyog Vihar Phase
              5,
              {'\n'}Gurugram Haryana-122016.{'\n'}billing@stockyaari.com {'\n'}GSTIN:
              06ABMCS2604Q1ZV
            </Text>

            <Text style={styles.emailText} allowFontScaling={false}>
              {getProfileSuccess?.email}
            </Text>

            <Text style={styles.invoiceText} allowFontScaling={false}>
              Invoice No: {userInvoice?.payment_id}
            </Text>

            <View style={styles.separator} />

            <View style={styles.rowBetween}>
              <Text style={styles.text} allowFontScaling={false}>Date</Text>
              <Text style={styles.text} allowFontScaling={false}>
                {formatDate_InNum24(userInvoice?.payment_date)}
              </Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.text} allowFontScaling={false}>Description</Text>
              <Text style={styles.text} allowFontScaling={false}>Stockyaari Premium</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.text} allowFontScaling={false}>Amount</Text>
              <Text style={styles.text} allowFontScaling={false}>₹ {addCommaToCurrency(userInvoice?.amount)}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.rowBetween}>
              <Text style={[styles.text, styles.boldText]} allowFontScaling={false}>TOTAL</Text>
              <Text style={[styles.text, styles.boldText]} allowFontScaling={false}>₹ {addCommaToCurrency(userInvoice?.amount)}</Text>
            </View>
            <Text style={[styles.text, styles.marginTop]} allowFontScaling={false}>
              Payment Method: Online
            </Text>
            <Text style={styles.text} allowFontScaling={false}>
              Payment Date: {formatDate_InNum24(userInvoice?.payment_date)}
            </Text>
            <Text style={styles.text} allowFontScaling={false}>
              Reference ID: {userInvoice?.provider_order_id}
            </Text>
            <Text style={styles.text} allowFontScaling={false}>
              Place of Supply: Haryana
            </Text>
            <Text style={[styles.text, styles.marginBottom]} allowFontScaling={false}>
              SAC Code: 998319
            </Text>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    paddingTop: 30,
    paddingHorizontal: scaleWidth(30),
    backgroundColor: '#FFF',
    flex: 1,
    borderTopLeftRadius: 30,  
    borderTopRightRadius: 30, 
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius:50,
    resizeMode: 'contain',
  },
  companyInfo: {
    color: '#000',
    fontSize: normalizeFont(10),
    fontFamily: FONTS.RobotoRegular,
    marginTop: scaleHeight(10),
  },
  emailText: {
    marginTop: scaleHeight(30),
    color: '#000',
    fontFamily: FONTS.RobotoMedium,
    fontSize: normalizeFont(12),
  },
  invoiceText: {
    marginTop: scaleHeight(30),
    color: '#000',
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(12),
  },
  separator: {
    borderWidth: 0.5,
    marginVertical: scaleHeight(16),
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#000',
    fontFamily: FONTS.RobotoRegular,
    fontSize: normalizeFont(13),
    marginBottom: scaleHeight(13),
  },
  boldText: {
    fontFamily: FONTS.RobotoBlack,
  },
  marginTop: {
    marginTop: 20,
  },
  marginBottom: {
    marginBottom: scaleHeight(20),
  },
});

export default React.memo(InvoiceScreen);
