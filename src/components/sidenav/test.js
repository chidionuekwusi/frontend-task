import React from "react";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import SideNav from "./index";
import NotesContext from "../../contexts/notes";

test("side nav renders list of notes", () => {
  const component = renderer.create(
    <NotesContext.Provider
      value={{
        get: () => {
          return [
            { title: "Fake", content: "Content", id: "1" },
            { title: "Fake 2", content: "Content 2", id: "2" }
          ];
        }
      }}
    >
      <MemoryRouter>
        <SideNav />
      </MemoryRouter>
    </NotesContext.Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
