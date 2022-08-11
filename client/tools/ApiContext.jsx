import React from "react";
import { fetchJSON } from "./fetchJSON";
import { putJSON } from "./putJSON";
import { postJSON } from "./postJSON";

export const ApiContext = React.createContext({
  async getUser() {
    return await fetchJSON("/api/user");
  },

  async changeUser(user) {
    return await putJSON("/api/user", user);
  },

  async checkProfile() {
    return await fetchJSON("/api/login");
  },

  async getMessages() {
    return await fetchJSON("/api/messages");
  },

  async sendMessage(message) {
    return await postJSON("/api/messages", message);
  },
});
