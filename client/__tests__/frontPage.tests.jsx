import { FrontPage } from "../pages/frontPage";
import ReactDOM from "react-dom";
import React from "react";

describe("front page tests", function () {
  it("should show front page", function () {
    const element = document.createElement("element");
    ReactDOM.render(<FrontPage />, element);

    expect(element).toMatchSnapshot();
  });
});
