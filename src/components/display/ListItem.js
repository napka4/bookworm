import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "semantic-ui-react";

const ListItem = ({ list, removeList, removeBookOnList, editList }) => {
  return (
    <div>
      <Card color="teal">
        <Card.Content>
          <Card.Header>
            {list.title}
          </Card.Header>
          <Button floated="right" color="blue" circular icon="edit" onClick={() => editList(list, false) } />
          <Button floated="right" color="red" circular icon="trash" onClick={() => removeList(list)} />
        </Card.Content>
        { 
          list.books.map((book, index) => (
            <Card.Content key={index}>
              { book.title }
              <Button floated="right" color="red" circular icon="trash" onClick={() => removeBookOnList(list, book)} />
            </Card.Content>
          ))
        }
      </Card>
    </div>
  );
};

ListItem.propTypes = {
  list: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  removeList: PropTypes.func.isRequired,
  removeBookOnList: PropTypes.func.isRequired,
  editList: PropTypes.func.isRequired
};

export default ListItem;