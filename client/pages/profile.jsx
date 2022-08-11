import React, { useContext, useState } from "react";
import { useLoader } from "../tools/useLoader";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../tools/ApiContext";

export function Profile() {
  const navigate = useNavigate();

  const { getUser, changeUser } = useContext(ApiContext);

  const [newBio, setNewBio] = useState();

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
      newBio,
    });
    navigate("..");
  }

  return (
    <div id={"yourProfile"}>
      <div>
        <img src={user.picture} alt="profile picture" />
      </div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <form onSubmit={SaveEdits}>
        <input
          type="text"
          defaultValue={user.bio}
          onChange={(e) => setNewBio(e.target.value)}
        />
        <button>Save changes</button>
      </form>
    </div>
  );
}

export function AllProfiles() {
  const { getAllUsers } = useContext(ApiContext);

  const { loading, error, data } = useLoader(async () => await getAllUsers());

  const users = data;

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

  return (
    <div id="allUsersContainer">
      {users.map((user) => (
        <UserCard user={user} />
      ))}
    </div>
  );
}

function UserCard({ user, index }) {
  return (
    <div key={index} id={"allUsersCard"}>
      <div>
        <img src={user.picture} alt="profile pic" />
      </div>
      <div>{user.name}</div>
      <div>{user.bio}</div>
    </div>
  );
}
