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
import ListItem from "../display/ListItem";
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
    console.log(status);
    if (status) {
      const newList = {...list, title: this.state.editableTitle};
      this.setState({editableTitle:''});
      this.props.updateList(newList);
      this.close();
    }else {
      this.setState({ open: true, editableTitle:list.title });
    }
  }

  removeBook = id => 
    this.props.books.filter(book => book._id !== id);

  removeList = id =>
    this.props.lists.filter(list => list._id !== id);

  editList = id => {
    this.props.lists.filter(list => list._id !== id); 
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true })
  }

  show = size => () => this.setState({ size, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { isConfirmed, books, lists} = this.props;
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
            {lists.map((list) => (
              <ListItem key={list._id} list={list} removeList={this.onDeleteList} editList={this.onEditList} />)
            )}
          </Card.Group>
        )}
        <Modal
          size="mini"
          style={styles.modalStyle}
          open={this.state.open}
          closeOnEscape={this.closeOnEscape}
          closeOnDimmerClick={this.closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Modifier le titre de la liste</Modal.Header>
          <Modal.Content>
            <Input focus value={this.state.editableTitle} onChange={(e,data) => this.setState({editableTitle: data.value})}/>
            <p>Etes-vous d'accord avec la modification?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              Non
            </Button>
            <Button
              onClick={() => this.onEditList(this.state.editableList, true)}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Oui'
            />
          </Modal.Actions>
        </Modal>
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
const styles = {
  modalStyle: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
}