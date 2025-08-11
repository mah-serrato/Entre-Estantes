import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import { Dimensions, ImageSourcePropType, Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';

const PlaceholderImage = require('@/assets/images/livros.jpg');

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  
  const imageRef = useRef<View>(null);

  // Calcula a posição central da imagem (ajuste conforme necessário baseado no tamanho da sua imagem)
  const imageCenterX = screenWidth / 2 - 25; // subtrai metade do tamanho do emoji (50/2)
  const imageCenterY = 200; // ajuste conforme a posição da sua imagem

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('Você não selecionou nenhuma imagem.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(undefined);
    setSelectedImage(undefined);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    try {
      const uri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
        format: 'png',
      });

      if (Platform.OS === 'web') {
        const link = document.createElement('a');
        link.download = 'imagem_editada.png';
        link.href = uri;
        link.click();
      } else {
        await MediaLibrary.saveToLibraryAsync(uri);
        alert('Imagem salva na galeria!');
      }
    } catch (e) {
      console.log(e);
      alert('Erro ao salvar imagem.');
    }
  };

  const onModalClose = () => setIsModalVisible(false);

  if (status === null) requestPermission();

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View
            ref={imageRef}
            collapsable={false}
            style={styles.imageWrapper}
            {...(Platform.OS === 'web' ? { id: 'image-wrapper' } : {})}
          >
            <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
            {pickedEmoji && (
              <EmojiSticker 
                imageSize={48} 
                stickerSource={pickedEmoji} 
                initialX={imageCenterX}
                initialY={imageCenterY}
              />
            )}
          </View>
        </View>

        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Resetar" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Salvar" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button theme="primary" label="Escolha uma foto!" onPress={pickImageAsync} />
            <Button label="Use esta foto" onPress={() => setShowAppOptions(true)} />
          </View>
        )}

        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList
            onSelect={(emoji) => {
              setPickedEmoji(emoji);
              onModalClose();
            }}
            onCloseModal={onModalClose}
          />
        </EmojiPicker>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fefaf9',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  imageWrapper: {
    position: 'relative',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
});