import { act } from "react-dom/test-utils";
import { ApiContext } from "../tools/ApiContext";
import { MemoryRouter } from "react-router-dom";
import { Messages } from "../pages/messages";
import ReactDOM from "react-dom";
import React from "react";

describe("messages tests", function () {
  it("should show messages", async function () {
    const messages = [{ room: 1, messages: ["Message one"] }];
    const element = document.createElement("element");

    await act(() => {
      ReactDOM.render(
        <ApiContext.Provider value={{ getMessages: () => messages }}>
          <MemoryRouter>
            <Messages />
          </MemoryRouter>
        </ApiContext.Provider>,
        element
      );
    });
    expect(element).toMatchSnapshot();
  });
});
