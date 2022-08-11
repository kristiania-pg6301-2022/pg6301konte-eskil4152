import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import {
  AzureCallback,
  AzureLogin,
  Callback,
  GoogleLogin,
  LoginAlternatives,
  Logout,
} from "./pages/login";
import googleImg from "./style/Google.svg.png";
import msImg from "./style/ms.png";
import { FrontPage } from "./pages/frontPage";
import { ProfilePage } from "./pages/profilePage";
import { EditProfile } from "./pages/editProfile";
import "./style/css.css";
import "./style/messages.css";
import { Messages } from "./pages/messages";

export function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<FrontPage />} />
        <Route path={"/login/*"} element={<LoginApplication />} />
        <Route path={"/profile/*"} element={<ProfileApplication />} />
        <Route path={"/messages/*"} element={<MessagesApplication />} />
        <Route path={"*"} element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

function MessagesApplication() {
  return (
    <Routes>
      <Route path={"/"} element={<Messages />} />
    </Routes>
  );
}

function LoginApplication() {
  return (
    <Routes>
      <Route path={"/"} element={<GoogleLogin />} />
      <Route path={"/callback"} element={<Callback />} />

      <Route path={"/callback/azure"} element={<AzureCallback />} />
      <Route path={"/azure"} element={<AzureLogin />} />

      <Route
        path={"/alternatives"}
        element={<LoginAlternatives google={googleImg} ms={msImg} />}
      />
      <Route path={"/logout"} element={<Logout />} />
    </Routes>
  );
}

function ProfileApplication() {
  return (
    <Routes>
      <Route path={"/"} element={<ProfilePage />} />
      <Route path={"/edit"} element={<EditProfile />} />
    </Routes>
  );
}
