import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';



const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    const [location, setLocation] = useState(null);
    const [image, setImage] = useState(null);
    const actionSheet = useActionSheet();

    // generates a random string so that it can be used for infinite document (for messages or image) names.
    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split('/')[uri.split('/').length - 1];
        return `${userID}-${timeStamp}-${imageName}`
    }


    // async function for uploading and sending images
    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const response = await fetch(imageURI);
        const blobbedImage = await response.blob(); //blobbed images are just a way to translate them so they are readable.
        const newUploadRef = ref(storage, uniqueRefString);
        uploadBytes(newUploadRef, blobbedImage).then(async (snapshot) => {
            console.log('File has been uploaded successfully');
            const imageURL = await getDownloadURL(snapshot.ref);
            onSend({ image: imageURL });
        });
    }

    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync(); //asking for permission from user

        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync()

            if (!result.canceled) {
                await uploadAndSendImage(result.assets[0].uri)
            }
            else Alert.alert('Permissions have not been granted');
        };
    }

    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();

        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();

            if (!result.canceled) {
                await uploadAndSendImage(result.assets[0].uri)
            }
        }
        else setImage(null);
    }

const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();

    if (permissions?.granted) {
        let location = await Location.getCurrentPositionAsync();
        if (location) {
            onSend({
                location: {
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude
                },
            });
            setLocation(location);
        } else Alert.alert('Error occured while fetching location');
    } else {
        Alert.alert('Permissions have not been granted');
    }
}

const onActionPress = () => {
    const options = ['Choose from Library', 'Take Picture', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1; //this makes cancel always last.
    actionSheet.showActionSheetWithOptions({
        options,
        cancelButtonIndex,
    },
        async (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    pickImage();
                    return;
                case 1:
                    takePhoto();
                    return;
                case 2:
                    getLocation();
                    return;
                default:
            }
        });
};

return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
        <View style={[styles.wrapper, wrapperStyle]}>
            <Text
                style={[styles.iconText, iconTextStyle]} //iconTextStyle and wrapperStyle are both part of Imagepicker
            >
                +
            </Text>

        </View>

    </TouchableOpacity>
)
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 15,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 15,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

export default CustomActions;