import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ 
        tabBarActiveTintColor: '#332621',
        tabBarInactiveTintColor: '#E3D9D3',
        headerStyle: {
          backgroundColor: '#B18272',
        },
        headerShadowVisible: false,
        headerTintColor: '#331F19',
        tabBarStyle: {
          backgroundColor: "#B18272",
        }


      }}
    >
      
      <Tabs.Screen 
        name = "index" 
        options = {{ 
          title: 'Entre Estantes', 
          tabBarIcon: ({color, focused}) => (
            <Ionicons name = {focused ? 'bookmarks' : 'bookmarks-outline'} color = {color} size = {24} />
          ),
        }} 
      />

      <Tabs.Screen 
        name = "about" 
        options = {{ 
          title: 'Sobre',
            tabBarIcon: ({color, focused}) => (
              <Ionicons name = {focused ? 'book' : 'book-outline'} color={color} size={24} />
            ),
          }} 
        />

    <Tabs.Screen 
      name="toDoList" options={{
      title: 'Livros Para Ler',
          tabBarIcon: ({color, focused}) => (
          <Ionicons name={focused ? 'list-circle' : 'list-circle-outline'} color={color} size = {20}/>
          ),
        }} 
       />

    

    <Tabs.Screen 
        name = "buscarLivro" 
        options = {{ 
          title: 'Busque Seu Livro', 
          tabBarIcon: ({color, focused}) => (
            <Ionicons name = {focused ? 'search-circle' : 'search-circle-outline'} color = {color} size = {24} />
          ),
        }} 
      />

        </Tabs>
    
  );
}
