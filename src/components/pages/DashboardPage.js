import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBooksSelector } from "../../reducers/books";
import { allListsSelector } from "../../reducers/lists";
import AddBookCtA from "../ctas/AddBookCta";
import AddListCtA from "../ctas/AddListCta";
import { fetchBooks, deleteBook } from "../../actions/books";
import { fetchLists, deleteList, updateList } from "../../actions/lists";
import BookItem from '../display/BookItem';
import ListItem from '../display/ListItem';
import ListModal from "../display/ListModal";
import { Card, Button, Modal, Input } from "semantic-ui-react";

class DashboardPage extends React.Component {
  state = { 
    open: false, 
    editableList: {} ,
    editableTitle: '',
  }

  componentDidMount = () => {
    this.props.fetchBooks();
    this.props.fetchLists();
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
      const newList = {...list, title: this.state.editableTitle};
      this.setState({editableTitle:''});
      this.props.updateList(newList);
      this.close();
    } else {
      this.setState({ open: true, editableTitle:list.title });
    }
  }

  onAddBookOnList = book => {
    console.log(book);
  }

  removeBook = id => 
    this.props.books.filter(book => book._id !== id);

  removeList = id =>
    this.props.lists.filter(list => list._id !== id);

  editList = id =>
    this.props.lists.filter(list => list._id !== id);

  closeConfigShow = () =>
    this.setState({ open: true });

  show = size => () => 
    this.setState({ size, open: true });

  close = () =>
    this.setState({ open: false });

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
              <BookItem key={book._id} book={book} removeBook={this.onDelete} addBookOnList={this.onAddBookOnList} />
            )}
          </Card.Group>
        )}

        {lists.length === 0 ? (
        <AddListCtA /> 
        ) : (
          <Card.Group>
            {lists.map((list) => (
              <ListItem key={list._id} list={list} removeList={this.onDeleteList} editList={this.onEditList} />)
            )}
          </Card.Group>
        )}

        <ListModal list={this.state.editableList} title={this.state.editableTitle} setTitle={(data) => this.setState(data)} onEditList={this.onEditList} close={this.close} isOpen={this.state.open} />
      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  fetchLists: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,   
  updateList: PropTypes.func.isRequired, 
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

export default connect(mapStateToProps, { fetchBooks, deleteBook, fetchLists, updateList, deleteList })(DashboardPage);