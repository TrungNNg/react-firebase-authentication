import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => {
    return (
        <div>
            <h1>Password Forget</h1>
            <PasswordForgetForm />
        </div>
    )
}

const INITIAL_VALUE = {
    email: "",
    error: null,
}

const PasswordForgetFormBase = ({firebase, ...props}) => {
    const [state, setState] = useState(INITIAL_VALUE);
    const {email, error} = state;

    const isInvalid = email === "";

    const onSubmit = event => {
        firebase.doPasswordReset(email)
            .then(() => {
                setState(INITIAL_VALUE);
            })
            .catch(error => {
                setState({...state, error: error});
            });
        
            event.preventDefault();
    }

    const onChange = event => {
        setState({...state, [event.target.name]: event.target.value});
    }
    
    return(
        <form onSubmit={onSubmit}>
            <input 
                name='email'
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email address"
            />
            <button disabled={isInvalid} type="submit">Reset my password</button>

            {error && <p>{error.message}</p>}
        </form>
    )
}

const PasswordForgetLink = () => <p><Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link></p>

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export default PasswordForgetPage;
export {PasswordForgetLink, PasswordForgetForm};
