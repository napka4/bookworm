import { normalize } from "normalizr";
import { SEARCH_BOOKS, BOOKS_FETCHED, BOOK_CREATED, BOOK_DELETED } from "../types";
import api from "../api";
import { bookSchema } from "../schemas";

// data.entities.books
const searchBookResults = searchResults => ({
  type: SEARCH_BOOKS,
  searchResults
});

const booksFetched = data => ({
  type: BOOKS_FETCHED,
  data
});

const bookCreated = data => ({
  type: BOOK_CREATED,
  data
});

const bookDeleted = results => ({
  type: BOOK_DELETED,
  results
});

export const search = ({ query }) => () => api.books.search(query);

export const searchBooks = query => dispatch => {
  api.books.search(query).then(books => {
    dispatch(searchBookResults(books));
  });
};

export const fetchBooks = () => dispatch =>
  api.books
    .fetchAll()
    .then(books => dispatch(booksFetched(normalize(books, [bookSchema]))));

export const createBook = data => dispatch =>
  api.books
    .create(data)
    .then(book => dispatch(bookCreated(normalize(book, bookSchema))));

export const deleteBook = data => dispatch =>
  api.books
    .delete(data)
    .then(() => dispatch(bookDeleted(data)));