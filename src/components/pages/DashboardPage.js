import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBooksSelector } from "../../reducers/books";
import AddBookCtA from "../ctas/AddBookCtA";
import { fetchBooks, deleteBook } from "../../actions/books";
import BookItem from '../display/BookItem';
import { Card } from "semantic-ui-react";

class DashboardPage extends React.Component {
  componentDidMount = () => this.onInit(this.props);

  onInit = props => props.fetchBooks();

  onDelete = book => {
    this.props.deleteBook(book._id);
}

removeBook = id => 
this.state.books.filter(book => book._id !== id);

  render() {
    const { isConfirmed, books } = this.props;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}

        {books.length === 0 ? (
        <AddBookCtA /> 
        ) : (
          <Card.Group divided>
            {books.map((book) => 
              <BookItem key={book._id} book={book} removeBook={this.onDelete} />
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
  ).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state)
  };
}

export default connect(mapStateToProps, { fetchBooks, deleteBook })(DashboardPage);
