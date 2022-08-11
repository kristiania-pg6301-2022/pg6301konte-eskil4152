import React, { useContext } from "react";

export function FrontPage() {
  return (
    <div>
      <h1>
        <a href="/login/alternatives">Log in</a>
      </h1>
      <br />
      <p>Already logged in?</p>
      <a href="/messages">See messages</a>
    </div>
  );
}
