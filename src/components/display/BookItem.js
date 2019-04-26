import React from "react";
import PropTypes from "prop-types";
import { Image, Label, Button, Card } from "semantic-ui-react";

const BookItem = ({ book, removeBook, addBookOnList }) => (
  <Card color="teal">
    <Image src={book.cover} size="tiny" centered />
    <Card.Content>
      <Card.Header>{ book.title }</Card.Header>
        <Button floated="right" color="blue" circular icon="list" onClick={() => addBookOnList(book)} />
        <Button floated="right" color="red" circular icon="trash" onClick={() => removeBook(book)} />
      <Card.Meta>
        <span className="authors">{book.authors}</span>
      </Card.Meta>
      { <Card.Description>
        
      </Card.Description> }
      <Card.Content extra>
        <Label icon="file" content={book.pages} />
      </Card.Content>
    </Card.Content>
  </Card>
);

BookItem.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    pages: PropTypes.number.isRequired
  }).isRequired,
  removeBook: PropTypes.func.isRequired
};

export default BookItem;