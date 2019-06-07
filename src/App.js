import React from "react";
import { Route } from "react-router-dom";
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
          <h1>
            adeva💙notes
          </h1>
        </div>
        <div className={classNames.header} />
        <div className={classNames.side}>
          <SideNav />
        </div>
        <div className={classNames.content}>
          <Route path="/note/:id" component={Note} />
          <Route path="/" component={Dashboard} />
        </div>
      </div>
    </NotesProvider>
  );
}

export default App;
