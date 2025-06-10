import React, { useState } from 'react';
import {
    Alert,
    Button,
    FlatList,
    Linking,
    ListRenderItem,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { Livro } from '../types/Livro';

import { buscarLivrosAPI } from '../hooks/buscarLivro';

export default function BusqueSeuLivro(): JSX.Element {
  const [busca, setBusca] = useState<string>('');
  const [resultados, setResultados] = useState<Livro[]>([]);

  async function buscarLivros(): Promise<void> {
    if (busca.trim() === '') {
      Alert.alert('Erro', 'Digite um termo para buscar.');
      setResultados([]);
      return;
    }

    try {
      const livros = await buscarLivrosAPI(busca);
      if (livros.length === 0) {
        Alert.alert('Nenhum resultado encontrado', 'Tente novamente com outro termo.');
      }
      setResultados(livros);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      Alert.alert('Erro', 'Não foi possível buscar os livros.');
    }
  }

  const renderResultado: ListRenderItem<Livro> = ({ item }) => {
    const { title, authors, infoLink } = item.volumeInfo;

    return (
      <View style={styles.resultado}>
        <View style={{ flex: 1 }}>
          <Text style={styles.link} onPress={() => infoLink && Linking.openURL(infoLink)}>
            {title}
          </Text>
          <Text style={styles.snippet}>
            {authors ? authors.join(', ') : 'Autor desconhecido'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Busque Seu Livro</Text>
      <TextInput
        style={styles.textinput}
        placeholder="Busque aqui o livro que deseja"
        placeholderTextColor="#937d62"
        value={busca}
        onChangeText={setBusca}
      />
      <Button title="Buscar" onPress={buscarLivros} color="#5C4F4B" />

      {resultados.length > 0 ? (
        <FlatList
          data={resultados}
          renderItem={renderResultado}
          keyExtractor={(item) => item.id}
          style={styles.resultados}
        />
      ) : (
        <Text style={styles.noResultsText}>Nenhum livro encontrado.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefaf9',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3e2925',
    marginBottom: 20,
    textAlign: 'center',
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#5C4F4B',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#5C4F4B',
  },
  resultados: {
    marginTop: 20,
  },
  resultado: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#937d62',
    marginBottom: 5,
  },
  snippet: {
    fontSize: 14,
    color: '#666',
  },
  noResultsText: {
    fontSize: 16,
    color: '#937d62',
    textAlign: 'center',
    marginTop: 20,
  },
});
