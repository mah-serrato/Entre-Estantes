import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTarefas } from '../hooks/useTarefas';

export default function App(){
    const { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa } = useTarefas();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Livros Para Ler</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite um novo livro..."
                    value={novaTarefa}
                    onChangeText={setNovaTarefa}
                />
                <TouchableOpacity onPress={adicionarTarefa}>
                 <Ionicons name="checkmark-done" size={30} color="#4B7F52" />
                 </TouchableOpacity>
            </View>

            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <View style={styles.tarefaContainer}>
                    <Text style={styles.tarefaTexto}>{item.texto}</Text>
                    <TouchableOpacity onPress={() => removerTarefa(item.id)}>    
                        <Ionicons name="close-circle-outline" size={25} color="#B85750" /> 
                    </TouchableOpacity>
                </View>
                )}
            />
        </View>
    );    

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fefaf9'
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold', 
        textAlign: 'center',
        marginBottom: 20,
        color: "#3e2925"
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#5C4F4B',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        color: '#937d62'
    },
    tarefaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 5,
        borderRadius: 5,
        shadowColor: '#0000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2
    },
    tarefaTexto: {
        fontSize: 16,
        
    },
    remover: {
        fontSize: 18,
        color: 'red'
    }

});