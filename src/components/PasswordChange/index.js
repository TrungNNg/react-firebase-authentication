import React, {useState} from 'react';
import { withFirebase } from '../Firebase';

const INITIAL_VALUE = {
    passwordOne: "",
    passwordTwo: "",
    error: null,
}

const PasswordChangeForm = ({firebase, ...props}) => {
    const [state, setState] = useState(INITIAL_VALUE);
    const {passwordOne, passwordTwo, error} = state;

    const isInvalid = passwordOne !== passwordTwo||passwordOne === "";   

    const onSubmit = event => {
        firebase.doPasswordUpdate(passwordOne)
            .then(() => {
                setState(INITIAL_VALUE);
            })
            .catch(error => {
                setState({...state, error: error});
            })

        event.preventDefault();
    }

    const onChange = event => {
        setState({...state, [event.target.name]:event.target.value});
    }

    return (
        <form onSubmit={onSubmit}>
            <input 
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="text"
                placeholder="New Password"
            />
            <input 
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="text"
                placeholder="Confirm New Password"
            />
            <button type="submit" disabled={isInvalid}>Reset My Password</button>
            {error && <p>{error.message}</p>}
        </form>
    )
}

export default withFirebase(PasswordChangeForm);
