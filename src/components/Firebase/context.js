import React from 'react'

// create firebase context to pass it to the top of component tree via 
// firebasecontext.provider and pass the firebase class to component which 
// need the class intance via firebasecontext.consumer
const FirebaseContext = React.createContext(null);

//this is a HOC that take in a component and pass firebase instace to it via .Consumer
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase}/>}
    </FirebaseContext.Consumer>
)

export default FirebaseContext;