import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBooksSelector } from "../../reducers/books";
import { allListsSelector } from "../../reducers/lists";
import AddBookCtA from "../ctas/AddBookCta";
import AddListCtA from "../ctas/AddListCta";
import { fetchBooks, deleteBook } from "../../actions/books";
import { fetchLists, fetchAllWithBooks, deleteList, updateList } from "../../actions/lists";
import { createBookOnList, deleteBookOnList } from "../../actions/bookOnList";
import BookItem from '../display/BookItem';
import ListItem from '../display/ListItem';
import ListEditModal from "../display/ListEditModal";
import BookOnListModal from "../display/BookOnListModal";
import { Card } from "semantic-ui-react";

class DashboardPage extends React.Component {
  state = { 
    openModalList: false, 
    openModalBooksOnList: false, 
    selectedBookOnList: {},
    booksOnList: [],
    selectedList: {},
    editableList: {},
    editableTitle: '',
  }

  componentDidMount = () => {
    this.props.fetchBooks();
    // this.props.fetchLists();
    this.props.fetchAllWithBooks();
  }

  onDelete = book => {
    this.props.deleteBook(book._id);
  }

  onDeleteList = list => {
    this.props.deleteList(list._id);
  }

  onEditList = (list, status) => {
    this.setState({ editableList: list });

    if (status) {
      const newList = { ...list, title: this.state.editableTitle };
      this.setState({ editableTitle: '' });
      this.props.updateList(newList);
      this.closeModalList();
    } else {
      this.setState({ openModalList: true, editableTitle: list.title });
    }
  }

  onAddBookOnList = (book, status = false) => {
    this.setState({ selectedBookOnList: book });

    if (status) {
      const newBookOnList = { book, list: this.state.selectedList };
      this.setState({ selectedBookOnList: {}, selectedList: {} });
      this.props.createBookOnList(newBookOnList);
      this.closeModalBookOnList();
      this.props.fetchAllWithBooks();
    } else {
      this.setState({ openModalBooksOnList: true, selectedList: {} });
    }
  }

  setSelectedList = (list) =>
    this.setState({ selectedList: list });

  removeBook = id => 
    this.props.books.filter(book => book._id !== id);

  removeList = id =>
    this.props.lists.filter(list => list._id !== id);

  editList = id =>
    this.props.lists.filter(list => list._id !== id);

  closeModalList = () =>
    this.setState({ openModalList: false });

  closeModalBookOnList = () =>
    this.setState({ openModalBooksOnList: false });

  render() {
    const { isConfirmed, books, lists} = this.props;

    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {books.length === 0 ? (
        <AddBookCtA /> 
        ) : (
          <Card.Group>
            {books.map((book) => 
              <BookItem 
                key={book._id}
                book={book} 
                removeBook={this.onDelete} 
                addBookOnList={this.onAddBookOnList} />
            )}
          </Card.Group>
        )}

        {lists.length === 0 ? (
        <AddListCtA /> 
        ) : (
          <Card.Group>
            {lists.map((list) =>
              <ListItem 
                key={list._id} 
                list={list}
                removeList={this.onDeleteList} 
                editList={this.onEditList} />
            )}
          </Card.Group>
        )}

        <ListEditModal 
          close={this.closeModalList} 
          onEditList={this.onEditList} 
          list={this.state.editableList} 
          title={this.state.editableTitle} 
          setTitle={(data) => this.setState(data)} 
          isOpen={this.state.openModalList} />
        
        <BookOnListModal 
          lists={lists}
          setSelectedList={this.setSelectedList}
          selectedList={this.state.selectedList}
          book={this.state.selectedBookOnList}
          close={this.closeModalBookOnList}
          onAddBookOnList={this.onAddBookOnList}
          isOpen={this.state.openModalBooksOnList} />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  fetchLists: PropTypes.func.isRequired,
  fetchAllWithBooks: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,   
  updateList: PropTypes.func.isRequired, 
  createBookOnList: PropTypes.func.isRequired, 
  deleteBookOnList: PropTypes.func.isRequired, 
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state),
    lists: allListsSelector(state),
  };
}

export default connect(mapStateToProps, { fetchBooks, deleteBook, fetchLists, fetchAllWithBooks, updateList, deleteList, createBookOnList, deleteBookOnList })(DashboardPage);