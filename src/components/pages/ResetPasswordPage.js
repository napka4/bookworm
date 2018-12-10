import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Message } from "semantic-ui-react";
import { validateToken } from '../../actions/auth';

class ResetPasswordPage extends React.Component {
    state = {
        loading: true,
        success: false
    }

    componentDidMount() {
        this.props.validateToken(this.props.match.params.token).then(() => this.setState({ loading: false, success: true }))
        .catch(() => this.setState({ loading: false, success: false}));
    }

    render() {
        const { loading, success } = this.state;
        return (
            <div>
                { loading && <Message>Chargement</Message> }
                { !loading && success && <Message>Form</Message>}
                { !loading && !success && <Message>Mauvais Token</Message>}
            </div>
        );
    }
}

ResetPasswordPage.propTypes = {
    validateToken: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default connect(null, { validateToken })(ResetPasswordPage);