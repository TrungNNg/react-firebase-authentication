import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";

// This is a HOC that handle authUser from App component.
// it will take in a Component => give it state management with useState, useEffect
// past the authUser as value through context API => then pass a firebase instance 
// via withFireBase HOC.

const withAuthentication = Component => {

  const WithAuthentication = props => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
      props.firebase.auth.onAuthStateChanged((authUser) => {
        authUser ? setAuthUser(authUser) : setAuthUser(null);
      });
    }, [authUser]);

    return(
        <AuthUserContext.Provider value={authUser}>
            <Component {...props}/>
        </AuthUserContext.Provider>
    )
  };

  return withFirebase(WithAuthentication);

};

export default withAuthentication;
