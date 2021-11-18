import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {useTypedDispatch, useTypedSelector} from "./hooks/redux";
import {fetchUsers} from "./store/reducers/ActionCreators";
import PostContainer from "./components/PostContainer";

function App() {
  const  { users, isLoading, error } = useTypedSelector(state => state.userReducer)
  const dispatch = useTypedDispatch()

  useEffect(() => {
  dispatch(fetchUsers())
  }, [])

  return (
    <div className="App">

      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Произошел конфуз: {error}</h1>}
      <div className="container">

      <div className="users">
        <h3>Users</h3>
        {JSON.stringify(users, null, 2)}
      </div>
      <div className="posts" style={{display: 'flex', flexDirection: 'row', position: "relative"}}>
          <PostContainer/>
      </div>
      </div>

    </div>
  );
}

export default App;
