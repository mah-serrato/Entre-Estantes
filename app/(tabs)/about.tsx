import { Text, View, StyleSheet, Dimensions } from "react-native";

export default function About() {
  return (
    <View style={style.container}>
      <View style={style.textWrapper}>
        <Text style={style.text}>
          Faça resenhas sobre seus livros. Comente-os e seja livre para expressar sua opinião.
        </Text>
        <Text style={style.text}>
          Encontre pessoas que pensam como você.
        </Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fefaf9',
  },
  textWrapper: {
    width: width > 600 ? 500 : '85%', // Continua responsivo
  },
  text: {
    color: '#5C4F4B',
    fontSize: 18,
    textAlign: 'center', // Agora centralizado
    lineHeight: 28,
    marginBottom: 16,
  },
});
