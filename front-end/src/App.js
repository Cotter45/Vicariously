// front-end/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import PostPage from "./components/PostPage";
import SplashPage from "./components/SplashPage";
import ExplorePage from "./components/ExplorePage";
import ProfilePage from "./components/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    dispatch(sessionActions.restoreUser()).then(() => setIsLoggedIn(true));

  }, [dispatch]);


  return (
    <>
      {isLoggedIn && (
        <>
          <Navigation isLoggedIn={isLoggedIn} />
          <Switch>
            <Route path="/posts/:postId">
              <PostPage />
            </Route>
            <Route path='/explore'>
              <ExplorePage />
            </Route>
            <Route path='/profile/:userId'>
              <ProfilePage />
            </Route>
            <Route path='/'>
              <SplashPage />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
