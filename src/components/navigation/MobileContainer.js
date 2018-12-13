import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions/auth";
import HomepageHeading from './HomepageHeading';
import gravatarUrl from "gravatar-url";
import { Button,
  Container,
  Icon,
  Image,
  Dropdown,
  Menu,
  Responsive,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

class MobileContainer extends React.Component {
    state = {}
  
    handleSidebarHide = () => this.setState({ sidebarOpened: false })
  
    handleToggle = () => this.setState({ sidebarOpened: true })
  
    render() {
      const { children } = this.props
      const { sidebarOpened } = this.state
      const { isAuthenticated } = this.props
      const { logout } = this.props
      const { fixed } = this.state
      const { user } = this.props
  
      return (
        <Responsive as={Sidebar.Pushable} maxWidth={Responsive.onlyMobile.maxWidth}>
          <Sidebar
            as={Menu}
            animation='push'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as={Link} to="/" active>
              Accueil
            </Menu.Item>
            <Menu.Item as={Link} to="/dashboard">Tableau de bord</Menu.Item>
            <Menu.Item as='a'>Company</Menu.Item>
            <Menu.Item as='a'>Careers</Menu.Item>{isAuthenticated ? (
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
          </Sidebar>
  
          <Sidebar.Pusher dimmed={sidebarOpened}>
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  {isAuthenticated ? (
                    <button onClick={() => logout()}>Déconnexion</button>
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
                </Menu>
              </Container>
              <HomepageHeading mobile />
            </Segment>
  
            {children}
          </Sidebar.Pusher>
        </Responsive>
      )
    }
  }
  
  MobileContainer.propTypes = {
    children: PropTypes.node,
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
      }).isRequired,
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: !!state.user.token,
      user: state.user,
    };
  }
  
  
  export default connect(mapStateToProps, { logout: actions.logout })(MobileContainer);