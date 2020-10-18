import React,{ useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import {withFirebase} from '../Firebase'
import * as ROUTES from '../../constants/routes';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
)

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const SignUpFormBase = (props) => {
    const [state, setState] = useState(INITIAL_STATE);
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
    } = state;

    const isInvalid = 
        passwordOne !== passwordTwo || 
        passwordOne === "" || 
        email === "" || 
        username === "";

    const onSubmit = event => {
        props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            // Create a user in your Firebase realtime database
            return props.firebase
              .user(authUser.user.uid)
              .set({
                username,
                email,
              });
        })
        .then(() => {
            setState({...INITIAL_STATE}); // reset form.
            props.history.push(ROUTES.HOME); // redirect to home page.
        })
        .catch(error => {
            setState({...state, error:error});
        });

        event.preventDefault();
    }

    const onChange = event => {
        setState({...state, [event.target.name]: event.target.value});
    }

    return (
        <form onSubmit={onSubmit}>
            <input 
                name="username"
                value={username}
                onChange={onChange}
                type="text"
                placeholder="Full Name"
            />
            <input 
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
            />
            <input 
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="text"
                placeholder="Password"
            />
            <input 
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="text"
                placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">Sign Up</button>

            {error && <p>{state.error.message}</p>}
        </form>
    )
}

//using recompose() instead of
//const SignUpForm = withRouter(withFirebase(SignUpFormBase));
const SignUpForm = compose(withRouter, withFirebase,)(SignUpFormBase);

const SignUpLink = () => {
    return (
        <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
    )
}

export default SignUpPage;
export {SignUpForm, SignUpLink};