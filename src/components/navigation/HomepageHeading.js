import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import { Button,
  Container,
  Header,
  Icon
 } from 'semantic-ui-react';

const HomepageHeading = ({ mobile, isAuthenticated, logout }) => (
    <Container text>
      <Header
        as='h1'
        content="Biblio'Web"
        inverted
        style={{
          fontSize: mobile ? '2em' : '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: mobile ? '1.5em' : '3em',
        }}
      />
      <Header
        as='h2'
        content='Gérer votre bibliothèque virtuelle en ligne !'
        inverted
        style={{
          fontSize: mobile ? '1.5em' : '1.7em',
          fontWeight: 'normal',
          marginTop: mobile ? '0.5em' : '1.5em',
        }}
      />
      <Button primary size='huge'>
        Commencer
        <Icon name='right arrow' />
      </Button>
    </Container>
  )
  
  HomepageHeading.propTypes = {
    mobile: PropTypes.bool,
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
  }

  
function mapStateToProps(state) {
    return {
      isAuthenticated: !!state.user.token
    };
  }
  
  
  export default connect(mapStateToProps, { logout: actions.logout })(HomepageHeading);