import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import { Animated, ImageSourcePropType, Platform, StyleSheet, View } from "react-native";

import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from '@/components/IconButton';
import ImageViewer from '@/components/ImageViewer';
import * as mediaLibrary from 'expo-media-library';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';
import { captureRef } from 'react-native-view-shot';

const PlaceholderImage = require('@/assets/images/livros.jpg');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  const [status, requestPermission] = mediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);

  // Animated scale para zoom
  const scale = useRef(new Animated.Value(1)).current;
  const [zoomed, setZoomed] = useState(false);

  // Função que alterna zoom no duplo toque
  const onDoubleTap = () => {
    Animated.timing(scale, {
      toValue: zoomed ? 1 : 2,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setZoomed(!zoomed);
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('Você não selecionou nenhuma imagem.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmoji(undefined);
    setSelectedImage(undefined);

    // Resetar zoom ao resetar imagem
    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setZoomed(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, { height: 440, quality: 1 });
        await mediaLibrary.saveToLibraryAsync(localUri);
        alert('Imagem salva na galeria!');
      } catch (e) {
        console.log(e);
        alert('Erro ao salvar imagem.');
      }
    } else {
      try {
        const element = document.getElementById('image-wrapper');
        if (!element) {
          alert('Erro: elemento para captura não encontrado na Web.');
          return;
        }

        const { default: html2canvas } = await import('html2canvas');
        const canvas = await html2canvas(element);
        const dataUrl = canvas.toDataURL('image/jpeg', 1.0);

        const link = document.createElement('a');
        link.download = 'captura.jpg';
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
        alert('Erro ao capturar imagem na Web.');
      }
    }
  };

  const onModalClose = () => setIsModalVisible(false);

  if (status === null) requestPermission();

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TapGestureHandler numberOfTaps={2} onActivated={onDoubleTap}>
            <Animated.View
              style={{ transform: [{ scale }] }}
              ref={imageRef}
              collapsable={false}
              {...(Platform.OS === 'web' ? { id: 'image-wrapper' } : {})}
            >
              <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
              {pickedEmoji && (
                <EmojiSticker imageSize={48} stickerSource={pickedEmoji} />
              )}
            </Animated.View>
          </TapGestureHandler>
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
