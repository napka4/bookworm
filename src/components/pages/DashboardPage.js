import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ConfirmEmailMessage from "../messages/ConfirmEmailMessage";
import { allBooksSelector } from '../../reducers/books';
import AddBookCta from '../ctas/AddBookCta';
import MobileContainer from "../navigation/MobileContainer";
import DesktopContainer from "../navigation/DesktopContainer";
import { fetchBooks } from "../../actions/books";

class DashboardPage extends React.Component {

  componentDidMount = () => this.onInit(this.props);

  onInit = props => props.fetchBooks();

  render() {
    const { isConfirmed, books } = this.props;
    return(
      <div>
      {!isConfirmed && <ConfirmEmailMessage />}
        <MobileContainer />
        <DesktopContainer />
    
      { books.length === 0 && <AddBookCta />}
      </div>
    )
  }

} 

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired).isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state)
  };
}

export default connect(mapStateToProps, { fetchBooks })(DashboardPage);