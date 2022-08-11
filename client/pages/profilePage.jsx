import { useLoader } from "../tools/useLoader";
import { useContext } from "react";
import { ApiContext } from "../tools/ApiContext";

export function ProfilePage() {
  const { getUser } = useContext(ApiContext);

  const { loading, error, data } = useLoader(async () => await getUser());

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

  return (
    <div>
      <div className={"image overflow-hidden"}>
        <img
          className={"h-auto w-full mx-auto"}
          src={user.picture}
          alt={"Profile picture"}
        />
      </div>
      <h1>{user.name}</h1>
      <p>{user.github}</p>
    </div>
  );
}
