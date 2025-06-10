import { Livro } from '../types/Livro'; 

export async function buscarLivrosAPI(busca: string): Promise<Livro[]> {
  if (busca.trim() === '') {
    return [];
  }

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(busca)}`);
    
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();

    if (!data.items) {
      return [];
    }

    const livros: Livro[] = data.items.map((item: any) => ({
      id: item.id,
      volumeInfo: {
        title: item.volumeInfo?.title || 'Sem título',
        authors: item.volumeInfo?.authors || ['Autor desconhecido'],
        infoLink: item.volumeInfo?.infoLink,
      },
    }));

    return livros;

  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    throw new Error('Erro ao buscar os livros.');
  }
}
