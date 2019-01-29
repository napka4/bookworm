import { schema } from "normalizr";

export const bookSchema = new schema.Entity(
  "books",
  {},
  { idAttribute: "_id" }
);

export const listSchema = new schema.Entity(
  "lists",
  {},
  { idAttribute: "_id" }
);
