import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJSON } from "../tools/fetchJSON";

export function GoogleLogin() {
  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );

    const parameters = {
      response_type: "token",
      client_id:
        "250152376199-cvdfhiiojgjgequmrqknhtmeolue4lp3.apps.googleusercontent.com",
      scope: "email profile",
      redirect_uri: window.location.origin + "/login/callback",
    };

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }, []);

  return (
    <div>
      <h1>Please wait....</h1>
    </div>
  );
}

export function Callback() {
  const navigate = useNavigate();
  useEffect(async () => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );

    await fetch("/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });

    window.location.href = window.location.origin + "/messages";
  });

  return <h1>Please wait...</h1>;
}

export function AzureLogin() {
  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(
      "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration"
    );

    const parameters = {
      client_id: "4de68f2d-d8d5-4d80-b87e-4a9f42ce148c",
      response_type: "token",
      scope: "openid email profile",
      nonce: "123",
      redirect_uri: window.location.origin + "/login/callback/azure",
    };

    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }, []);

  return (
    <div>
      <h1>Please wait...</h1>
    </div>
  );
}

export function AzureCallback() {
  const navigate = useNavigate();

  useEffect(async () => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );

    await fetch("/api/login/azure", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });

    window.location.href = window.location.origin + "/messages";
  });

  return <h1>Please wait...</h1>;
}

export function Logout() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/login/logout", {
      method: "delete",
    });

    if (res.ok) {
      navigate("/");
    } else {
      setError("Error: " + error.toString());
    }
  }

  return (
    <div className={"min-h-screen"}>
      <form className={"m-32"} onSubmit={handleSubmit}>
        <div
          className={
            "bg-gray-100 border border-black w-4/12 text-center my-auto mx-auto h-64"
          }
        >
          <h1 className={"font-sans font-semibold text-2xl mt-12"}>
            Logger av:
          </h1>
          <h1 className={"font-sans font-semibold"}>Er du sikker?</h1>
          <button
            className={
              "text-center mx-auto my-4 w-32 bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
            }
          >
            Logg av
          </button>
        </div>
      </form>
    </div>
  );
}

export function LoginAlternatives({ googleImg, msImg }) {
  return (
    <div>
      <a href="/login">
        <h1>Log in with Google </h1>
        <img
          className={"w-64 mx-auto mt-2"}
          src={googleImg}
          alt={"Google Logo"}
        />{" "}
      </a>
      <a href="/login/azure">
        <h1>Log in with Active Directory </h1>
        <img
          className={"w-64 mx-auto mt-2"}
          src={msImg}
          alt={"Microsoft Logo"}
        />
      </a>
    </div>
  );
}
