import React, { FC, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './styles';
import IMAGES from '../../Constants/enums/ImagesEnum';
import DeactivateModal from './DeactivateModal';
import { CONSTANT_TEXT } from '../../Constants/enums/constantText';
import MainComponent from '../../Components/MainContainer';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountDelete } from '../../apis/Onboarding/DeactivateSlice';
import { COLORS, ROUTE_NAME, normalizeFont, scaleHeight, scaleWidth } from '../../Constants/enums';
import { WebPagesUrl } from '../../Constants/WebPageUrl';
import TitleWithBackBtnHeader from '../../Components/BackButton/TitleWithBackBtnHeader';
import { goBack } from '../../Navigation/NavigationService';

interface HomeScreenProps {
  navigation: any;
}

const HelpScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [visibleModalDelete, setVisibleModalDelete] = useState(false);
  const dispatch = useDispatch();
  const deletionData = useSelector(state => state.deactivateId);
  const { isaccountDeletionSuccess } = deletionData;

  const [faqs, setFaqs] = useState([
    {
      question: 'What is StockYaari?',
      answer: `StockYaari is a trading prediction app designed to assist users in making informed decisions in the stock market. It provides a platform where users can create a watchlist for their preferred shares,receive alerts for buying and selling, and stay updated on the performance of top gainers and losers in the stock market. The app aims to offer valuable insights and information to help users navigate the complexities of trading, allowing them to make more informed decisions about their investment strategies. `,
    },
    {
      question: 'How to Use StockYaari?',
      answer: `To use StockYaari, follow these steps:\n
a. Download and install the StockYaari app on your device.\n
b. Sign up for an account or log in if you already have one.\n
c. Explore the app features to familiarize yourself with its functionalities.\n
d. Create a watchlist by selecting your preferred shares or stocks.\n
e. Set up alerts for buying and selling based on your trading preferences.\n
f. Stay informed about market trends and updates provided by StockYaari.`,
    },
    {
      question: 'How to create a watchlist in the StockYaari App?',
      answer: `Establishing your own Watch List on StockYaari is easy:\n
a. Log in to your StockYaari account.\n
b. Navigate to the "Watchlist" section within the app.\n
c. Browse and select the shares you want to include in your watchlist.\n
d. Save your selections to create a personalized watchlist.\n
e. Receive timely updates and insights on the performance of your chosen stocks.`,
    },
    {
      question: 'Who is eligible to use the \nStockYaari app?',
      answer: `The StockYaari app is accessible to anyone interested in trading and seeking to make informed decisions in the stock market. Whether you are a novice or an experienced investor, the app is designed to cater to a broad range of users looking to create watchlists, receive alerts, and stay informed about stock market trends, making it suitable for individuals at various levels of expertise in the world of trading.`,
    },
    {
      question: 'If you wish to deactivate account',
      answer: `a. Log in to your StockYaari account.\n
b. Go to the Help section.\n
c. Look for the option to deactivate or close your account.\n
d. Follow the provided instructions to complete the deactivation process.\n
e. Note that deactivating your account will result in the loss of access to StockYaari features and data associated with your account.
\n`,

    },
    {
      question: 'If you wish to delete account',
      answer: ``,
    },
  ]);
  const HeaderLine = () => {
    return (
      <>
        <Text allowFontScaling={false} style={styles.txtHelp}>
          {CONSTANT_TEXT.HOW_IT_WORK}
        </Text>
        <Text allowFontScaling={false} style={styles.txtDescription}>
          {CONSTANT_TEXT.HELP_DESC}
        </Text>
      </>
    );
  };
  const toggleFAQ = index => {
    setFaqs(prevState => {
      const updatedFaqs = [...prevState];
      updatedFaqs[index].expanded = !updatedFaqs[index].expanded;
      return updatedFaqs;
    });
  };
  const openDeactiveModal = () => {
    setVisibleModal(true);
  };
  const closeMode = () => {
    setVisibleModal(false);
  };
  const handleOnprssDeactivate = () => {
    navigation.navigate('DeactivateScreen');
    closeMode();
  };
  const openDeleteModal = () => {
    setVisibleModalDelete(true);
  };
  const closeDeleteMode = () => {
    setVisibleModalDelete(false);
  };
  const handleOnprssDelete = async () => {
    /// confirmation box
    const userid = await AsyncStorage.getItem('userId');
    dispatch(
      AccountDelete({
        userid: userid,
      }),
    );
    closeDeleteMode();
  };

  useEffect(() => {
    if (isaccountDeletionSuccess) {
      navigation.navigate('DeactiveSubmit', { isshowdetail: true });
    }
  }, [isaccountDeletionSuccess]);

  const renderFAQItem = ({ item, index }) => (
    <View style={styles.FaqContainer}>
      <TouchableOpacity onPress={() => toggleFAQ(index)}>
        <View style={styles.FAQcontainer}>
          <Text allowFontScaling={false} style={styles.txtquestion}>
            {item.question}
          </Text>
          <Image
            source={item.expanded ? IMAGES.ArrowUP : IMAGES.DownArrowIcon}
            style={{
              height: scaleHeight(24),
              width: scaleWidth(24),
              marginRight: scaleWidth(12),
              resizeMode: 'contain'
            }}
          />
        </View>
      </TouchableOpacity>
      {item.expanded && (
        <Text allowFontScaling={false} style={styles.textanswer}>
          {item.answer}
        </Text>
      )}
      <TouchableOpacity onPress={openDeactiveModal}>
        {item.expanded && index == 4 && (
          <Text allowFontScaling={false} style={styles.textanswer2}>
            Deactive
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={openDeleteModal}>
        {item.expanded && index == 5 && (
          <Text allowFontScaling={false} style={styles.textanswer2}>
            Delete
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
  const onGoBack = () => {
    goBack();
  };
  return (
    <MainComponent bgColor={COLORS.PrimaryBackGround}>
      <TitleWithBackBtnHeader centerTitle={CONSTANT_TEXT.HOW_IT_WORK} onPressBackArrow={onGoBack} />
      <ScrollView style={styles.flex} showsVerticalScrollIndicator={false}>
        <View style={styles.backbtnView}>
          <HeaderLine />
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            data={faqs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderFAQItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.DisclaimerView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTE_NAME.WEB_VIEW_PAGE, {
                uri: `${WebPagesUrl.DISCLAIMER}`,
              });
            }}>
            <Text style={styles.txtquestion} allowFontScaling={false}>
              Disclaimer
            </Text>
          </TouchableOpacity>
          <Text style={styles.DisclaimerDes} allowFontScaling={false}>
            {`* The information provided by this Green signal and Red alert tool is for Research and education only and does not constitute financial advice. The tool relies on historical data, algorithms, and other relevant factors to generate Green signal and Red alert, but it cannot predict future market movements with certainty.

* There may be a delay in signals due to latency or delays in data transmission as market data received from third-party data provider. Users are advised to consider this potential delay and verify market conditions independently before making any decisions. Stockyaari is not liable for any losses arising due to delayed signals.`}
          </Text>
          <View style={styles.Termandcondition}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ROUTE_NAME.WEB_VIEW_PAGE, {
                  uri: `${WebPagesUrl.TERMS_OF_USE}`,
                });
              }}>
              <Text style={styles.txtquestion} allowFontScaling={false}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ROUTE_NAME.WEB_VIEW_PAGE, {
                  uri: `${WebPagesUrl.PRIVACY_POLICY}`,
                });
              }}>
              <Text style={styles.txtquestion} allowFontScaling={false}>
                Privacy policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {visibleModal ? (
          <DeactivateModal
            visible={visibleModal}
            data={'Are you sure you want to deactivate\n your StockYaari account?'}
            closeModal={closeMode}
            handleOnprss={handleOnprssDeactivate}
            isshow={true}
          />
        ) : null}
        {visibleModalDelete ? (
          <DeactivateModal
            visible={visibleModalDelete}
            data={'Are you sure you want to delete\n your StockYaari account?'}
            closeModal={closeDeleteMode}
            handleOnprss={handleOnprssDelete}
            isshow={true}
          />
        ) : null}
      </ScrollView>
    </MainComponent>
  );
};

export default HelpScreen;
