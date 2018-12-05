import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';

class LoginForm extends React.Component {
    state = {
        data: {
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };

    onChange = e => 
    this.setState({
        data: {...this.state.data}, 
        [e.target.name]: e.target.value }
    );

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
    };

    validate = (data) => {
        const errors = {};
        if(!Validator.isEmail(data.email)) errors.email = "Adresse email Invalide !";
        if(!data.password) errors.password = "Ne peut être laissé vide !";
        return errors;
    }

    render () {
        const { data } = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="monmail@mail.com"
                    value={data.email}
                    onChange={this.onChange} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor="password">password</label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="super mot de passe!"
                    value={data.password}
                    onChange={this.onChange} />
                </Form.Field>
                <Button primary>Login</Button>
            </Form>
        );
    }
}

export default LoginForm;