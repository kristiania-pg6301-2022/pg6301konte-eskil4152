import { Router } from "express";
import fetch from "node-fetch";

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Error fetching ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

export function LoginApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const { access_token, ms_access_token } = req.signedCookies;

    if (access_token) {
      const { userinfo_endpoint } = await fetchJSON(
        "https://accounts.google.com/.well-known/openid-configuration"
      );

      const userinfo = await fetchJSON(userinfo_endpoint, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      res.json(userinfo);
    } else if (ms_access_token) {
      const { userinfo_endpoint } = await fetchJSON(
        "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration"
      );

      const userinfo = await fetchJSON(userinfo_endpoint, {
        headers: {
          Authorization: `Bearer ${ms_access_token}`,
        },
      });

      res.json(userinfo);
    } else {
      res.sendStatus(204);
    }
  });

  router.post("/azure", async (req, res) => {
    const { access_token } = req.body;

    const { userinfo_endpoint } = await fetchJSON(
      "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration"
    );

    const userinfo = await fetchJSON(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.cookie("ms_access_token", access_token, {
      signed: true,
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.cookie("author_id", userinfo.sub, {
      signed: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
    res.cookie("username", userinfo.name, {
      signed: true,
      maxAge: 2 * 60 * 60 * 1000,
    });

    const name = userinfo.name;
    const picture = userinfo.picture;
    const email = userinfo.email;
    const id = userinfo.sub;
    const bio = "Link to your bio";

    const foo = await mongoDatabase
      .collection("users")
      .find({ id: id })
      .map(({ id }) => ({
        id,
      }))
      .toArray();

    if (foo.length === 0) {
      await mongoDatabase.collection("users").insertOne({
        name,
        picture,
        email,
        id,
        bio,
      });
    }

    res.sendStatus(200);
  });

  router.post("/", async (req, res) => {
    const { access_token } = req.body;

    const { userinfo_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );

    const userinfo = await fetchJSON(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.cookie("access_token", access_token, {
      signed: true,
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.cookie("author_id", userinfo.sub, {
      signed: true,
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.cookie("username", userinfo.name, {
      signed: true,
      maxAge: 2 * 60 * 60 * 1000,
    });

    const name = userinfo.name;
    const picture = userinfo.picture;
    const email = userinfo.email;
    const id = userinfo.sub;
    const bio = "Link to your bio";

    const foo = await mongoDatabase
      .collection("users")
      .find({ id: id })
      .map(({ id }) => ({
        id,
      }))
      .toArray();

    if (foo.length === 0) {
      await mongoDatabase.collection("users").insertOne({
        name,
        picture,
        email,
        id,
        bio,
      });
    }

    res.sendStatus(200);
  });

  router.delete("/logout", (req, res) => {
    res.clearCookie("access_token");
    res.clearCookie("ms_access_token");
    res.clearCookie("author_id");
    res.clearCookie("username");
    res.sendStatus(200);
  });

  return router;
}
