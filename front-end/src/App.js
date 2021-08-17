// front-end/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import PostPage from "./components/PostPage";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    dispatch(sessionActions.restoreUser()).then(() => setIsLoggedIn(true));

  }, [dispatch]);


  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} />
      {isLoggedIn && (
        <Switch>
          <Route path="/posts/:postId">
            <PostPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
