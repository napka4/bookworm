import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddListCtA = () => (
  <Card centered>
    <Card.Content textAlign="center">
      <Card.Header>Créer une nouvelle liste</Card.Header>
      <Link to="/lists/new">
        <Icon name="plus circle" size="massive" />
      </Link>
    </Card.Content>
  </Card>
);

export default AddListCtA;