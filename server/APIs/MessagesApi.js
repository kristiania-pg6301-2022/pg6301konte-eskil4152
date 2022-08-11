import { Router } from "express";

export function MessagesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const messages = await mongoDatabase
      .collection("messages")
      .find()
      .toArray();

    res.json(messages);
  });

  router.post("/", async (req, res) => {
    const { username } = req.signedCookies;
    const { message } = req.body;

    await mongoDatabase
      .collection("messages")
      .updateOne(
        { room: 1 },
        { $push: { messages: `${username}: ${message}` } }
      );

    res.sendStatus(200);
  });

  return router;
}
