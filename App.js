import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null);

  const openImagePickerAsync = async () => {
    console.log('Great job pushing the button!');
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required! Everyone knows that. How did you not know that?');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  }

  const goBack = () => {
    setSelectedImage(null);
  }

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <Text style={styles.title}>Oh fun, look at that!</Text>
        <TouchableOpacity
          onPress={goBack}
          style={styles.button}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Brian, you so cool!</Text>
      <Text style={styles.instructions}>Push that button down there to share a photo</Text>
      
      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  logo: {
    width: 305, 
    height: 159, 
    marginBottom: 32
  },
  instructions: {
    color: '#888', 
    fontSize: 18, 
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'purple',
    padding: 16,
    borderRadius: 5,
    margin: 16
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
