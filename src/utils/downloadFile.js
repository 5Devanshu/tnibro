import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const checkPermissions = async () => {
    let apiLevel = await DeviceInfo.getApiLevel();
    if (apiLevel > 29) {
        return true;
    }
    try {
        const permissionEnabled = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (permissionEnabled) {
            return true;
        } else {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
        }
    } catch (err) {
        console.warn('Permission error:', err);
    }
    return false;
};

export const downloadDocument = async (file, res, error) => {
    let hasPermission = Platform.OS === 'ios' ? true : await checkPermissions();
    if (hasPermission) {
        const { fs, android } = RNFetchBlob;
        let time = new Date();
        let DownloadDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
        let filePath = '/' + time.getTime() + '_' + file.docTitle + '.pdf';

        fs.writeStream(DownloadDir + filePath, 'base64')
            .then(stream => {
                stream.write(file.document);
                if (Platform.OS === 'android') {
                    android.addCompleteDownload({
                        title: file.docTitle,
                        description: 'Downloaded Successfully!',
                        mime: 'application/pdf',
                        path: DownloadDir + filePath,
                        showNotification: true,
                    });
                }
                res();
                return stream.close();
            })
            .catch(err => {
                console.warn('Download error:', err);
                error();
            });
    }
};

export const downloadFile = (fileUrl) => {
    if (!fileUrl) {
        console.warn('Download URL is missing');
        return;
    }

    let DownloadDir = RNFetchBlob.fs.dirs.DownloadDir;
    let options = {
        fileCache: true,
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            title: 'Downloaded File',
            path: `${DownloadDir}/downloadedFile.pdf`,
            description: 'Downloading file...',
        },
    };

    RNFetchBlob.config(options)
        .fetch('GET', fileUrl)
        .then((res) => {
            console.log('File downloaded successfully:', res.path());
        })
        .catch((err) => {
        });
};

