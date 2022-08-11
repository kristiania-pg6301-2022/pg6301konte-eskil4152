import React, { useContext } from "react";
import { LoginAlternatives } from "./login";
import { useLoader } from "../tools/useLoader";
import { ApiContext } from "../tools/ApiContext";
import { Messages } from "./messages";

export function FrontPage() {
  const { checkProfile } = useContext(ApiContext);

  const { loading, error, data, reload } = useLoader(
    async () => await checkProfile()
  );

  const user = data;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div
        id={"errorBox"}
        style={{ border: "1px solid red", background: "Pink" }}
      >
        An error occurred: {error.toString()}
      </div>
    );
  }

  return <div>{user ? <LoggedIn /> : <NotLoggedIn />}</div>;
}

function NotLoggedIn() {
  return (
    <div>
      <a href="/login/alternatives">Logg inn</a>
    </div>
  );
}

function LoggedIn() {
  return <Messages />;
}
