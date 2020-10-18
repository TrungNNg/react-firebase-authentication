import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
 
class AdminPage extends Component {
    state = {
      loading: false,
      users: [],
    };
 
    componentDidMount() {
        this.setState({ loading: true });
     
        this.props.firebase.users().on('value', snapshot => {
          const usersObject = snapshot.val(); // users object from database
    
          //Object.keys return array of keys of the users object
          const usersList = Object.keys(usersObject).map(key => ({
            ...usersObject[key], //get all the properties of this user
            uid: key,
          }));
     
          this.setState({
            users: usersList,
            loading: false,
          });
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }
 
  render() {
    const {users, loading} = this.state;
    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading...</div>}
        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
    <ul>
      {users.map(user => (
        <li key={user.uid}>
          <span>
            <strong>ID:</strong> {user.uid}
          </span>
          <span>
            <strong>E-Mail:</strong> {user.email}
          </span>
          <span>
            <strong>Username:</strong> {user.username}
          </span>
        </li>
      ))}
    </ul>
  );
 
export default withFirebase(AdminPage);
