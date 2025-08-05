import { Text, View, StyleSheet, Dimensions } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>
          Faça resenhas sobre seus livros. Comente-os e seja livre para expressar sua opinião.
        </Text>
        <Text style={styles.text}>
          Encontre pessoas que pensam como você.
        </Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",    
    alignItems: "center",        
    backgroundColor: '#fefaf9',
  },
  textWrapper: {
    width: width > 600 ? 500 : '85%',
    alignItems: 'center',
  },
  text: {
    color: '#5C4F4B',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 16,
  },
});
