import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios.post("/api/auth/confirmation", { token }).then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => 
      axios.post("/api/auth/validate_token", { token }),
    resetPassword: data =>
      axios.post("/api/auth/reset_password", { data })
  },
  books: {
    fetchAll: () => 
      axios.get("/api/books").then(res => res.data.books),
    create: book =>
      axios.post("/api/books", { book }).then(res => res.data.book),
    delete: book => 
      axios.delete(`/api/books`,{ book }).then(res => res.data.book),
  },
  lists: {
    fetchAll: () => 
      axios.get("/api/lists").then(res => res.data.lists),
    create: list =>
      axios.post("/api/lists", list).then(res => res.data.list),
    update: list =>
      axios.put("/api/lists", list).then(res => res.data.list),
    delete: list => 
      axios.delete(`/api/lists`,{ list }).then(res => res.data.list),
  },
  booksOnList: {
    getByListId: list =>
      axios.get("/api/books-on-list", { list }).then(res => res.data.lists),
    create: (list, book) =>
      axios.post("/api/books-on-list", { list, book }).then(res => res.data),
    delete: (list, book) =>
      axios.delete("/api/books-on-list", { list, book }).then(res => res.data.result),
  }
};
