import React, { useContext, useState } from "react";
import { useLoader } from "../tools/useLoader";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../tools/ApiContext";

export function EditProfile() {
  const navigate = useNavigate();

  const { getUser, changeUser } = useContext(ApiContext);

  const [newGithub, setNewgithub] = useState();

  const { loading, error, data } = useLoader(async () => await getUser());

  const user = data;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div style={{ border: "1px solid red", background: "Pink" }}>
        An error occurred: {error.toString()}
      </div>
    );
  }

  async function SaveEdits(e) {
    e.preventDefault();
    await changeUser({
      newGithub,
    });
    navigate("..");
  }

  return <div>Not implemented</div>;
}
