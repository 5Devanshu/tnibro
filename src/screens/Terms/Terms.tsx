import IMAGES from '../../Constants/enums/ImagesEnum';
import AppLayout from '../../Components/AppLayout';
import React from 'react';
import { Image, Pressable } from 'react-native';
import {StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';

const Terms = ({navigation}) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    // <AppLayout title="Terms & Conditions" onBackPress={handleGoBack} isDashboard>
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
           <Pressable onPress={() => navigation.goBack()}>
          <Image source={IMAGES.Back_Icon} style={{height: 42, width: 42}} />
        </Pressable>

          <Text allowFontScaling={false} style={styles.capitalLetter}>Terms and Conditions</Text>
          <Text allowFontScaling={false} style={styles.capitalLetter2}>Welcome to TNIBRO! {'\n'}</Text>
          <Text allowFontScaling={false}style={styles.detail}>
            These terms and conditions outline the rules and regulations for the use of TNIBRO's
            Website, located at https://tnibro.com/. By accessing this website, we assume you accept
            these terms and conditions. Do not continue to use TNIBRO if you do not agree to take
            all of the terms and conditions stated on this page. The following terminology applies
            to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all
            Agreements: "Client", "You" and "“Your" refers to you, the person log on this website
            and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We",
            "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the
            Client and ourselves. All terms refer to the offer, acceptance and consideration of
            payment necessary to undertake the process of our assistance to the Client in the most
            appropriate manner for the express purpose of meeting the Client's needs in respect of
            provision of the Company's stated services, in accordance with and subject to,
            prevailing law of us. Any use of the above terminology or other words in the singular,
            plural, capitalization and/or he/she or they, are taken as interchangeable and therefore
            as referring to same.
            {'\n'}
          </Text>
          <Text allowFontScaling={false} style={styles.header}>Cookies</Text>
          <Text allowFontScaling={false} style={styles.detail}>
            We employ the use of cookies. By accessing TNIBRO, you agreed to use cookies in
            agreement with the TNIBRO's Privacy Policy. Most interactive websites use cookies to let
            us retrieve the user's details for each visit. Cookies are used by our website to enable
            the functionality of certain areas to make it easier for people visiting our website.
            Some of our affiliate/advertising partners may also use cookies. {'\n'}
          </Text>
          <Text allowFontScaling={false} style={styles.header}>License</Text>
          <Text allowFontScaling={false} style={styles.detail}>
            Unless otherwise stated, TNIBRO and/or its licensors own the intellectual property
            rights for all material on TNIBRO. All intellectual property rights are reserved. You
            may access this from TNIBRO for your own personal use subjected to restrictions set in
            these terms and conditions. {'\n'}
          </Text>
          <Text allowFontScaling={false} style={styles.header}>You must not:</Text>
          <Text allowFontScaling={false} style={styles.detail}>
            Republish material from TNIBRO Sell, rent or sub-license material from TNIBRO Reproduce,
            duplicate or copy material from TNIBRO Redistribute content from TNIBRO This Agreement
            shall begin on the date hereof. Our Terms and Conditions were created with the help of
            the Terms and Conditions Generator. {'\n'} Parts of this website offer an opportunity
            for users to post and exchange opinions and information in certain areas of the website.
            TNIBRO does not filter, edit, publish or review Comments prior to their presence on the
            website. Comments do not reflect the views and opinions of TNIBRO, its agents and/or
            affiliates. Comments reflect the views and opinions of the person who post their views
            and opinions. To the extent permitted by applicable laws, TNIBRO shall not be liable for
            the Comments or for any liability, damages or expenses caused and/or suffered as a
            result of any use of and/or posting of and/or appearance of the Comments on this
            website. {'\n'} TNIBRO reserves the right to monitor all Comments and to remove any
            Comments which can be considered inappropriate, offensive or causes breach of these
            Terms and Conditions. You warrant and represent that: {'\n'} You are entitled to post
            the Comments on our website and have all necessary licenses and consents to do so;{' '}
            {'\n'} The Comments do not invade any intellectual property right, including without
            limitation copyright, patent or trademark of any third party; The Comments do not
            contain any defamatory, libelous, offensive, indecent or otherwise unlawful material
            which is an invasion of privacy {'\n'} The Comments will not be used to solicit or
            promote business or custom or present commercial activities or unlawful activity. {'\n'}{' '}
            You hereby grant TNIBRO a non-exclusive license to use, reproduce, edit and authorize
            others to use, reproduce and edit any of your Comments in any and all forms, formats or
            media. Hyperlinking to our Content {'\n'}The following organizations may link to our
            website without prior written approval: {'\n'} Government agencies; {'\n'} Search
            engines; {'\n'}News organizations; {'\n'}Online directory distributors may link to our
            website in the same manner as they hyperlink to the Websites of other listed businesses;
            and {'\n'} System wide Accredited Businesses except soliciting non-profit organizations,
            charity shopping malls, and charity fundraising groups which may not hyperlink to our
            Web site. {'\n'} These organizations may link to our home page, to publications or to
            other Website information so long as the link: (a) is not in any way deceptive; (b) does
            not falsely imply sponsorship, endorsement or approval of the linking party and its
            products and/or services; and (c) fits within the context of the linking party's site.{' '}
            {'\n'} We may consider and approve other link requests from the following types of
            organizations: commonly-known consumer and/or business information sources; {'\n'}
            dot.com community sites; {'\n'} associations or other groups representing charities;{' '}
            {'\n'} online directory distributors; {'\n'} internet portals; {'\n'} accounting, law
            and consulting firms; and {'\n'}
            educational institutions and trade associations. {'\n'} We will approve link requests
            from these organizations if we decide that: (a) the link would not make us look
            unfavorably to ourselves or to our accredited businesses; (b) the organization does not
            have any negative records with us; (c) the benefit to us from the visibility of the
            hyperlink compensates the absence of TNIBRO; and (d) the link is in the context of
            general resource information. {'\n'} These organizations may link to our home page so
            long as the link: (a) is not in any way deceptive; (b) does not falsely imply
            sponsorship, endorsement or approval of the linking party and its products or services;
            and (c) fits within the context of the linking party's site. {'\n'} If you are one of
            the organizations listed in paragraph 2 above and are interested in linking to our
            website, you must inform us by sending an e-mail to TNIBRO. Please include your name,
            your organization name, contact information as well as the URL of your site, a list of
            any URLs from which you intend to link to our website, and a list of the URLs on our
            site to which you would like to link. Wait 2-3 weeks for a response. {'\n'} Approved
            organizations may hyperlink to our website as follows: {'\n'} By use of our corporate
            name; or {'\n'} By use of the uniform resource locator being linked to; or {'\n'} By use
            of any other description of our website being linked to that makes sense within the
            context and format of content on the linking party's site. {'\n'} No use of TNIBRO's
            logo or other artwork will be allowed for linking absent a trademark license agreement.{' '}
            {'\n'}
          </Text>
          <Text allowFontScaling={false} style={styles.header}>iFrames </Text>
          <Text allowFontScaling={false} style={styles.detail}>
            Without prior approval and written permission, you may not create frames around our Web
            Pages that alter in any way the visual presentation or appearance of our website. {'\n'}
          </Text>
          <Text allowFontScaling={false} style={styles.header}>Content Liability </Text>
          <Text allowFontScaling={false} style={styles.detail}>
            We shall not be held responsible for any content that appears on your Website. You agree
            to protect and defend us against all claims that are rising on your Website. No link(s)
            should appear on any Website that may be interpreted as libelous, obscene or criminal,
            or which infringes, otherwise violates, or advocates the infringement or other violation
            of, any third party rights. {'\n'}
          </Text>
          <Text allowFontScaling={false} style={styles.header}>Reservation of Rights</Text>
          <Text allowFontScaling={false} style={styles.detail}>
            We reserve the right to request that you remove all links or any particular link to our
            website. You approve to immediately remove all links to our Website upon request. We
            also reserve the right to amend these terms and conditions and it's linking policy at
            any time. By continuously linking to our website, you agree to be bound to and follow
            these linking terms and conditions. {'\n'}
          </Text>
          <Text allowFontScaling={false} style={styles.header}>Removal of links from our website</Text>
          <Text allowFontScaling={false} style={styles.detail}>
            If you find any link on our website that is offensive for any reason, you are free to
            contact and inform us any moment. We will consider requests to remove links but we are
            not obligated to or so or to respond to you directly. {'\n'} We do not ensure that the
            information on this website is correct, we do not warrant its completeness or accuracy;
            nor do we promise to ensure that the website remains available or that the material on
            the website is kept up to date. {'\n'}
          </Text>
          <Text allowFontScaling={false} style={styles.header}>Recommended Stocks</Text>
          <Text allowFontScaling={false} style={styles.detail}>
            Stocks recommended on application / web is completely providing by an algorithm and we
            do not suggest any stock / options chain on manual basis, and these recommendations are
            for education and training purpose. We strongly suggest you to do your own research
            before you buy or sell any stock or options chain. We will not responsible for any loss
            or damage occur due to any recommendations provided by our algo on our application or
            website. {'\n'} Calculation done and provided for any stock is for research and training
            purpose which will help you to take decisions. {'\n'}
          </Text>
          <Text allowFontScaling={false} style={styles.header}>Disclaimer</Text>
          <Text allowFontScaling={false} style={styles.detail}>
            To the maximum extent permitted by applicable law, we exclude all representations,
            warranties and conditions relating to our website and the use of this website. Nothing
            in this disclaimer will: {'\n'} limit or exclude our or your liability for death or
            personal injury; {'\n'} limit or exclude our or your liability for fraud or fraudulent
            misrepresentation; {'\n'}limit any of our or your liabilities in any way that is not
            permitted under applicable law; or exclude any of our or your liabilities that may not
            be excluded under applicable law. The limitations and prohibitions of liability set in
            this Section and elsewhere in this disclaimer: (a) are subject to the preceding
            paragraph; and (b) govern all liabilities arising under the disclaimer, including
            liabilities arising in contract, in tort and for breach of statutory duty. {'\n'} As
            long as the website and the information and services on the website are provided free of
            charge, we will not be liable for any loss or damage of any nature. {'\n'}
          </Text>
          {/* <Text>
          TNIBRO Technologies LLP and its employees will not responsible for any kind of loss or
          harm to anyone who are using and not using the app. disputes are subject to Delhi
          Jurisdiction. {'\n'}
        </Text> */}
        </View>
      </ScrollView>
    </SafeAreaView>
    // </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: 80,
    padding: 20,
  },
  text: {
    color: '#41cdf4',
  },
  capitalLetter: {
    color: '#000',
    fontSize: 20,
  },
  capitalLetter2: {
    color: '#000',
    fontSize: 18,
  },
  wordBold: {
    fontWeight: 'bold',
    color: 'black',
  },
  italicText: {
    color: '#37859b',
    fontStyle: 'italic',
  },
  textShadow: {
    textShadowColor: 'red',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
  },
  header: {
    fontSize: 15,
    fontWeight: '800',
    color: 'black',
  },
  detail: {
    fontSize: 13,
    color: 'black',
  },
});

const TermsConditions = React.memo(Terms);
export default TermsConditions;
