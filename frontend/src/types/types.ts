export interface Movie {
  _id: string;
  title: string;
  director: string;
  releasedYear: number;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface Book {
  _id: string;
  title: string;
  author: string;
  publishedYear: number;
  createdAt: Date;
  updatedAt: Date;
}