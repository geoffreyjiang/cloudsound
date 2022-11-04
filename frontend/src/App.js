import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupForm from "./components/SignupForm";
import Navigation from "./components/Navigation";
import GetAllSongs from "./components/Songs";
import CreateSongForm from "./components/Songs/CreateSongForm";
import SongDetail from "./components/Songs/SongDetail";
import EditSong from "./components/Songs/EditSong";
import HomePage from "./components/HomePage";
// import EditComment from "./components/Comments/EditComment";
import * as sessionActions from "./store/session";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoadecd={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path exact="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/songs/:id/edit">
            <EditSong />
          </Route>
          <Route exact path="/songs/:id">
            <SongDetail />
          </Route>
          <Route path="/create">
            <CreateSongForm />
          </Route>
          {/* <Route exact path="/comments/:id">
            <EditComment />
          </Route> */}
          <Route path="/songs">
            <GetAllSongs />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
