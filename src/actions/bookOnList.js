import { normalize } from "normalizr";
import { BOOKONLIST_FETCHED, BOOKONLIST_CREATED, BOOKONLIST_DELETED } from "../types";
import api from "../api";
import { bookOnListSchema } from "../schemas";

const bookOnListFetched = data => ({
    type: BOOKONLIST_FETCHED,
    data
});

const bookOnListCreated = data => ({
  type: BOOKONLIST_CREATED,
  data
});

const  bookOnListDeleted = results => ({
  type: BOOKONLIST_DELETED,
  results
});

export const fetchByListId = (list) => dispatch =>
    api.booksOnList
      .getByListId(list)
      .then(books => dispatch(bookOnListFetched(books)));

export const createBookOnList = (list) => dispatch =>
  api.booksOnList
    .create(list)
    .then(bookOnList => dispatch(bookOnListCreated(normalize(bookOnList, bookOnListSchema))));

export const deleteBookOnList = (list, book) => dispatch =>
  api.booksOnList
    .delete(list, book)
    .then(result => dispatch(bookOnListDeleted(result)));