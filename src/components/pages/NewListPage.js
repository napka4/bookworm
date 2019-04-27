import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";
import ListForm from "../forms/ListForm";
import { createList } from "../../actions/lists";

class NewListPage extends React.Component {
  state = {
    list: {
      title: "truc"
    }
};

//récupérer le titre de la iste créée et l'ajouter

  addList = list =>
    this.props
      .createList(list)
      .then((response) => {
        this.props.history.push("/dashboard")
      });

  render() {
    return (
      <Segment>
        <h1>Ajouter une liste à votre collection</h1>

        {this.state.list && (
          <ListForm submit={this.addList} list={this.state.list} />
        )}
      </Segment>
    );
  }
}

NewListPage.propTypes = {
  createList: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, { createList })(NewListPage);
