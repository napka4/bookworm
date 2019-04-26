import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import gravatarUrl from "gravatar-url";
import * as actions from "../../actions/auth";
import { allBooksSelector } from "../../reducers/books";

const TopNavigation = ({ user, logout, hasBooks }) => (
  <Menu style={{ paddingTop: 10 }} secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Mon Board
    </Menu.Item>
    {hasBooks && (
      <Menu.Item as={Link} to="/books/new">
        Ajouter un nouveau livre
      </Menu.Item>
    )}
    <Menu.Item as={Link} to="/lists/new">
      Ajouter une nouvelle liste de lecture
    </Menu.Item>

    <Menu.Menu position="right">
      <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}>Déconnexion</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  hasBooks: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    hasBooks: allBooksSelector(state).length > 0
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);
