import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid, Segment } from "semantic-ui-react";
import InlineError from "../messages/InlineError";

class ListForm extends React.Component {
  state = {
    data: {
      title: this.props.list.title,
    },
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        title: props.list.title,
      },
    });
  }

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });



  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false }),
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Ne peut être laissé vide";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={1} stackable>
          <Grid.Row>
              
              <Form.Field error={!!errors.title}>
                <label htmlFor="title">Titre de la liste</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Titre"
                  value={data.title}
                  onChange={this.onChange}
                />
                {errors.title && <InlineError text={errors.title} />}
              </Form.Field>
            
          </Grid.Row>

            <Grid.Row>
              <Button primary>Sauvegarder</Button>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    );
  }
}

ListForm.propTypes = {
  submit: PropTypes.func.isRequired,
  list: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired
};

export default ListForm;
