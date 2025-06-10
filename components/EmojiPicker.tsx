import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { PropsWithChildren } from "react";
import { MaterialIcons } from "@expo/vector-icons";

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, onClose, children }: Props) {
    return (
        <View>
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Escolha um Emoji</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" size={24} color="#fff" />
                    </Pressable>
                </View>
                {children}
            </View>
        </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        height: "25%",
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        position: "absolute",
        bottom: 0,
    },
    titleContainer: {
       height: "16%",
       backgroundColor: "#5C4F4B",
       borderTopRightRadius: 10,
       borderTopLeftRadius: 10,
       paddingHorizontal: 20,
       flexDirection: "row",
       alignItems: "center",
       justifyContent: "space-between",
    },
    title: {
        fontSize: 20,
        color: "#fff",
    }
});