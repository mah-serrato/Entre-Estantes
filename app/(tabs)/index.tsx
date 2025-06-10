import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";

import Button from '@/components/Button';
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/livros.jpg');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('Você não selecionou nenhuma imagem.');
    }
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
        <Text style={styles.text}>
          Use este aplicativo para falar sobre seus livros favoritos! :)
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Escolha uma foto!" onPress={pickImageAsync} />
        <Button label="Use esta foto" onPress/>
      </View>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect = {setPickedEmoji} onCloseModal={onModalClose}/>
      </EmojiPicker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fefaf9',
  },
  text: {
    color: '#5C4F4B',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 16,
  },
  button: {
    color: '#512b72',
    textDecorationLine: 'underline',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40, 
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
});
