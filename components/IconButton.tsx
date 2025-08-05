import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
    onPress: () => void;
};

export default function IconButton({ icon, label, onPress }: Props) {
    return (
    <Pressable style={styles.iconButton} onPress={onPress}>
        <MaterialIcons name={icon} size={24} color="#5C4F4B" />
        <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    },
    iconButtonLabel: {
    color: '#5C4F4B',
    marginTop: 12,
    },
});