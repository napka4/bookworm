import { normalize } from "normalizr";
import { LISTS_FETCHED, LIST_CREATED, LIST_DELETED } from "../types";
import api from "../api";
import { listSchema } from "../schemas";

// data.entities.books

const listsFetched = (data => {
  console.log(data);
  return {
  type: LISTS_FETCHED,
  data
}
});

const listCreated = data => ({
  type: LIST_CREATED,
  data
});

const listDeleted = results => ({
  type: LIST_DELETED,
  results
});

export const fetchLists = () => dispatch =>
  api.lists
    .fetchAll()
    .then(lists => dispatch(listsFetched(normalize(lists, [listSchema]))));

export const createList = data => dispatch =>
  api.lists
    .create(data)
    .then(list => dispatch(listCreated(normalize(list, listSchema))));

export const deleteList = data => dispatch =>
  api.lists
    .delete(data)
    .then(() => dispatch(listDeleted(data)));