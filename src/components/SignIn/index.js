import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { SignUpLink } from '../SignUp';
import {PasswordForgetLink} from '../PasswordForget'
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => {
    return (
        <div>
            <h1>Sign In</h1>
            <SignInForm />
            <PasswordForgetLink />
            <SignUpLink />
        </div>
    )
}

const INITIAL_STATE = {
    email: "",
    password: "",
    error: null,
}

const SignInFormBase = props => {
    const [state, setState] = useState(INITIAL_STATE);
    const {email, password, error} = state;

    const isInvalid = email === "" || password === "";

    const onSubmit = event => {
        props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                setState({...INITIAL_STATE});
                props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                setState({...state, error: error})
            });
        
        event.preventDefault();
    }

    const onChange = event => {
        setState({...state, [event.target.name]:event.target.value})
    }

    return (
        <form onSubmit={onSubmit}>
            <input 
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
            />
            <input 
                name="password"
                value={password}
                onChange={onChange}
                type="text"
                placeholder="Password"
            />
            <button disabled={isInvalid} type="submit">Sign In</button>
            {error && <p>{error.message}</p>}
        </form>
    )
}

const SignInForm = compose(withRouter(withFirebase(SignInFormBase)));

export {SignInForm};

export default SignInPage;
