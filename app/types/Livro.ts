export interface Livro {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    infoLink?: string;
  };
}
