import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import Note from "./index";
import NotesContext from "../../contexts/notes";

describe("<Note />", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <NotesContext.Provider
        value={{
          notes: { "1": { title: "Note", content: "Content" } }
        }}
      >
        <Note match={{ params: { id: "1" } }} />
      </NotesContext.Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("can edit a note", () => {
    let note = { title: "Fake", content: "Content", id: "1" };
    const context = {
      notes: { "1": note },
      edit: (id, _note) => {
        if (id == _note.id) {
          note = _note;
          context.notes[id] = _note;
        }
      },
      get: () => {
        return [note];
      }
    };
    const component = mount(
      <NotesContext.Provider value={context}>
        <Note match={{ params: { id: "1" } }} history={{ replace: () => {} }} />
      </NotesContext.Provider>
    );
    const title = "Something nice";
    const content = "Something great";
    component.find("input").simulate("change", { target: { value: title } });
    component
      .find("textarea")
      .simulate("change", { target: { value: content } });
    component.find("button").simulate("click", {});
    expect(note.title).toBe(title);
    expect(note.content).toBe(content);
  });
});
