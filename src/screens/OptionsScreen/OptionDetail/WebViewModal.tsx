import React from 'react';
import {Dimensions} from 'react-native';
import {Modal, View, Button, StyleSheet} from 'react-native';
// import WebView from 'react-native-webview';

const WebViewModal = ({visible, onClose, url}) => {
  const screenHeight = Dimensions.get('window').height;
  const modalHeight = screenHeight * 0.8;
  return (
    <Modal
      animationType="none" // Set the animation type to "slide"
      transparent={true}
      visible={visible}>
      <View style={[styles.modalContainer, {height: '100%'}]}>
        <Button title="Close" onPress={onClose} />
        <View style={styles.webViewContainer}>
          {/* <WebView
            source={{uri: url}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowFileAccessFromFileURLs={true}
            allowUniversalAccessFromFileURLs={true}
            onMessage={event => console.log(event.nativeEvent.data)} // For debugging
          /> */}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0, // Start at the bottom of the page
    left: 0,
    right: 0,
    justifyContent: 'flex-end', // Align content at the bottom
    // backgroundColor: 'white', // Optional: Set a white background for the modal
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  webViewContainer: {
    height: '91%', // Set the WebView container height to 80% of the modal's height
    width: '100%', // Use 100% width
  },
});
export default WebViewModal;
