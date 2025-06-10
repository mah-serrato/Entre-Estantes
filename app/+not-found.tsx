import { Text, View, StyleSheet } from "react-native";
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
  <>

  <Stack.Screen 
        options={{
          title: 'Ooops! Página não encontrada.',
          headerStyle: { backgroundColor: '#B18272' },
          headerTintColor: '#331F19',
        }} 
      />
      <View style={style.container}>
        <Link href="/" style={style.button}>
          Clique aqui para voltar à página de início!
        </Link>
      </View>
  </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
  },
  
  button: {
    color: '#342E3B',
    textDecorationLine: 'underline',
  },
}
);
