import { Router } from "express";

export function MessagesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const messages = await mongoDatabase
      .collection("testmessage")
      .find()
      .toArray();

    res.json(messages);
  });

  router.post("/", async (req, res) => {
    const { username } = req.signedCookies;
    const { message } = req.body;

    await mongoDatabase
      .collection("testmessage")
      .updateOne(
        { room: 1 },
        { $push: { messages: { author: username, message: message } } }
      );

    res.sendStatus(200);
  });

  return router;
}
