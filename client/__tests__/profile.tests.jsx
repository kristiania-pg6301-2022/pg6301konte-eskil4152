import { act } from "react-dom/test-utils";
import { ApiContext } from "../tools/ApiContext";
import { MemoryRouter } from "react-router-dom";
import { AllProfiles, Profile } from "../pages/profile";
import ReactDOM from "react-dom";
import React from "react";

describe("profile tests", () => {
  it("should show profile", async function () {
    const user = {
      name: "Emil",
      picture: "",
      email: "emil@berge.com",
      id: "uuid1",
      bio: "my bio",
    };
    const element = document.createElement("element");
    await act(() => {
      ReactDOM.render(
        <ApiContext.Provider value={{ getUser: () => user }}>
          <MemoryRouter>
            <Profile />
          </MemoryRouter>
        </ApiContext.Provider>,
        element
      );
    });
    expect(element).toMatchSnapshot();
  });

  it("should show all profiles", async function () {
    const users = [
      {
        name: "Emil",
        picture: "",
        email: "emil@berge.com",
        id: "uuid1",
        bio: "my bio",
      },
      {
        name: "Luis",
        picture: "",
        email: "luis@mahata.com",
        id: "uuid2",
        bio: "my bio",
      },
    ];
    const element = document.createElement("element");
    await act(() => {
      ReactDOM.render(
        <ApiContext.Provider value={{ getAllUsers: () => users }}>
          <MemoryRouter>
            <AllProfiles />
          </MemoryRouter>
        </ApiContext.Provider>,
        element
      );
    });
    expect(element).toMatchSnapshot();
  });
});
