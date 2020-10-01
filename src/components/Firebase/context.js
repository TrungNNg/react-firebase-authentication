import React from 'react'

// create firebase context to pass it to the top of component tree via 
// firebasecontext.provider and pass the firebase class to component which 
// need the class intance via firebasecontext.consumer
const FirebaseContext = React.createContext(null);

export default FirebaseContext;