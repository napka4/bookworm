import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBooksSelector } from "../../reducers/books";
import { allListsSelector } from "../../reducers/lists";
import AddBookCtA from "../ctas/AddBookCta";
import AddListCtA from "../ctas/AddListCta";
import { fetchBooks, deleteBook } from "../../actions/books";
import { fetchLists, deleteList } from "../../actions/lists";
import BookItem from '../display/BookItem';
import ListItem from "../display/ListItem";
import { Card } from "semantic-ui-react";

class DashboardPage extends React.Component {
  componentDidMount = () => this.props.fetchBooks();

  onInitList = props => props.fetchLists();

  onDelete = book => {
    this.props.deleteBook(book._id);
    }

  onDeleteList = list => {
    this.props.deleteList(list._id);
}

removeBook = id => 
this.state.books.filter(book => book._id !== id);

removeList = id =>
this.state.lists.filter(list => list._id !== id);

  render() {
    const { isConfirmed, books, lists } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {books.length === 0 ? (
        <AddBookCtA /> 
        ) : (
          <Card.Group >
            {books.map((book) => 
              <BookItem key={book._id} book={book} removeBook={this.onDelete} />
            )}
          </Card.Group>
        )}

        {lists.length === 0 ? (
        <AddListCtA /> 
        ) : (
          <Card.Group >
            {lists.map((list) => 
              <ListItem key={list._id} list={list} removeList={this.onDeleteList} />
            )}
          </Card.Group>
        )}

      </div>
    );
  }
}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  fetchBooks: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state),
    lists: allListsSelector(state)
  };
}

export default connect(mapStateToProps, { fetchBooks, deleteBook, fetchLists, deleteList })(DashboardPage);
