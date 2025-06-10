import { Image, ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
  containerStyle?: ViewStyle;
};

export default function EmojiSticker({ imageSize, stickerSource, containerStyle }: Props) {
  return (
    <View style={[styles.container, containerStyle]}>      
      <Image
        source={stickerSource}
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

