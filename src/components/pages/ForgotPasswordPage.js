import React from "react";
import PropTypes from "prop-types";
import {Message } from 'semantic-ui-react';
import {connect} from 'react-redux';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import { resetPasswordRequest } from '../../actions/auth';

class ForgotPasswordPage extends React.Component {
    state = {
        success: false
    }

    submit = data => 
    this.props
    .resetPasswordRequest(data)
    .then(() => this.setState({ success: true }));

    render() {
        return (
            <div>

                {this.state.success ? <Message>Un email a été envoyé</Message> : 
            <ForgotPasswordForm submit={this.submit} />}
            </div>
        );
    }
}

ForgotPasswordPage.propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired
}

export default connect(null, {resetPasswordRequest})(ForgotPasswordPage);