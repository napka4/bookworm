import { combineReducers } from "redux";

import user from "./reducers/user";
import books from "./reducers/books";
import lists from "./reducers/lists";

export default combineReducers({
  user,
  books,
  lists
});
