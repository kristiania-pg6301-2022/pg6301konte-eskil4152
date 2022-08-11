import { Router } from "express";
import fetch from "node-fetch";

export function UserApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const { author_id } = req.signedCookies;

    const user = await mongoDatabase
      .collection("users")
      .findOne({ id: author_id });

    res.json(user);
  });

  router.get("/all", async (req, res) => {
    const users = await mongoDatabase.collection("users").find().toArray();

    res.json(users);
  });

  router.put("/", async (req, res) => {
    const { newBio } = req.body;
    const { author_id } = req.signedCookies;

    await mongoDatabase.collection("users").updateOne(
      { id: author_id },
      {
        $set: {
          bio: newBio,
        },
      },
      { upsert: true, ignoreUndefined: true }
    );
    res.sendStatus(200);
  });

  router.get("/all", async (req, res) => {
    const users = await mongoDatabase
      .collection("users")
      .find()
      .map(({ name, picture, email, github }) => ({
        name,
        picture,
        email,

        github,
      }))
      .toArray();

    res.json(users);
  });

  return router;
}
