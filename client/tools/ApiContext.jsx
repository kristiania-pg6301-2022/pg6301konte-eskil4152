import React from "react";
import { fetchJSON } from "./fetchJSON";
import { putJSON } from "./putJSON";

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
});
