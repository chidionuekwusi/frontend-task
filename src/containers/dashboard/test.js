import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import Dashboard from "./index";
import NotesContext from "../../contexts/notes";

describe("<Dashboard />", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <NotesContext.Provider
        value={{
          get: () => {
            return [{ title: "Fake", content: "Content", id: "1" }];
          }
        }}
      >
        <Dashboard />
      </NotesContext.Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders all notes", () => {
    const component = mount(
      <NotesContext.Provider
        value={{
          get: () => {
            return [
              { title: "Fake", content: "Content", id: "1" },
              { title: "Fake 2", content: "Content 2", id: "2" },
              { title: "Fake 3", content: "Content 2", id: "3" }
            ];
          }
        }}
      >
        <Dashboard />
      </NotesContext.Provider>
    );
    expect(component.find(".fas.fa-trash").length).toBe(3);
  });

  it("can search for note", () => {
    const component = mount(
      <NotesContext.Provider
        value={{
          get: () => {
            return [
              { title: "Fake", content: "Content", id: "1" },
              { title: "supreme", content: "Content 2", id: "2" },
              { title: "Fake 3", content: "Content 2", id: "3" }
            ];
          }
        }}
      >
        <Dashboard />
      </NotesContext.Provider>
    );
    component
      .find("input")
      .simulate("change", { target: { value: "supreme" } });
    expect(component.find(".fas.fa-trash").length).toBe(1);
  });
});
