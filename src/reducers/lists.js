import { createSelector } from "reselect";
import { LISTS_FETCHED, LIST_CREATED, LIST_DELETED } from "../types";

const deleteProperty = (key, obj) => {
  const { [key]: deletedItem, ...rest } = obj;
  return rest;
}

export default function lists(state = {}, action = {}) {
  switch (action.type) {
    case LISTS_FETCHED:
    case LIST_CREATED:
      return { ...state, ...action.data.entities.lists };
      case LIST_DELETED:
      return deleteProperty(action.results, state);
    default:
      return state;
  }
}

// SELECTORS

export const listsSelector = state => state.lists;

export const allListsSelector = createSelector(listsSelector, listsHash =>
  Object.values(listsHash)
);
