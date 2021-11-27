import './App.css';
import CardList from './components/card-list/card-list.component';
import { Route, Switch, Redirect } from 'react-router-dom';
import React, { useState } from 'react';

import PostDetail from './components/post-detail/post-detail.component';
import UserDetail from './components/user-detail/user-detail.component';

function App() {
  const [postDetail, setPostDetail] = useState({});
  const [userDetail, setUserDetail] = useState({});

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/posts" />} />
        <Route
          exact
          path="/posts"
          render={(props) => (
            <CardList {...props}/>
          )}
        />
        <Route
          path={`/post/:postId`}
          render={(props) => <PostDetail {...props} postDetail={postDetail} />}
        />
        <Route
          path={`/user/:userId`}
          render={(props) => <UserDetail {...props} />}
        />
      </Switch>
    </div>
  );
}

export default App;
