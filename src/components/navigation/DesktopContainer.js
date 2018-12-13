import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import HomepageHeading from './HomepageHeading';
import gravatarUrl from "gravatar-url";
import { Button,
  Container,
  Image,
  Dropdown,
  Menu,
  Responsive,
  Segment,
Visibility } from 'semantic-ui-react';


class DesktopContainer extends React.Component {
    state = {}
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
  
    render() {
      const { children } = this.props
      const { fixed } = this.state
      const { isAuthenticated } = this.props
      const { logout } = this.props
      const { user } = this.props
  
      return (
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <Visibility
            once={false}
            onBottomPassed={this.showFixedMenu}
            onBottomPassedReverse={this.hideFixedMenu}
          >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 700, padding: '1em 0em' }}
              vertical
            >
              <Menu
                fixed={fixed ? 'top' : null}
                inverted={!fixed}
                pointing={!fixed}
                secondary={!fixed}
                size='large'
              >
                <Container>
                <Menu.Item as={Link} to="/" active>
              Accueil
            </Menu.Item>
            <Menu.Item as={Link} to="/dashboard">Tableau de bord</Menu.Item>
                  <Menu.Item as='a'>Company</Menu.Item>
                  <Menu.Item as='a'>Careers</Menu.Item>
                  {isAuthenticated ? (
                    <Menu.Menu position="right">
                    <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}
                    disabled={user.email === undefined} >
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => logout()}>Se déconnecter</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
                    ) : (
                      <Menu.Item position='right'>
                    <Button as='a' inverted={!fixed}>
                    <Link to="/login">Se connecter</Link>
                    </Button>
                    <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    <Link to="/signup">S'inscrire</Link>
                    </Button>
                    </Menu.Item>
                  )}
                </Container>
              </Menu>
              <HomepageHeading />
            </Segment>
          </Visibility>
  
          {children}
        </Responsive>
      )
    }
  }
  
  DesktopContainer.propTypes = {
    children: PropTypes.node,
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
      }).isRequired
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: !!state.user.token,
      user: state.user,
    };
  }
  
  
  export default connect(mapStateToProps, { logout: actions.logout })(DesktopContainer);