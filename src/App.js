import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import { NotesProvider } from "./contexts/notes";
import SideNav from "./components/sidenav";
import Dashboard from "./containers/dashboard";
import Note from "./containers/note";
import classNames from "./app.scss";

function App() {
  return (
    <NotesProvider>
      <div className={classNames.app_container}>
        <div className={classNames.logo}>
          <Link to="/">
            <h1>adeva💙notes</h1>
          </Link>
        </div>
        <div className={classNames.header} />
        <div className={classNames.side}>
          <SideNav />
        </div>
        <div className={classNames.content}>
          <Switch>
            <Route path="/note/:id" component={Note} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </NotesProvider>
  );
}

export default App;
