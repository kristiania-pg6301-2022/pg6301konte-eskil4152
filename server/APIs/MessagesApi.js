import { Router } from "express";

export function MessagesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const messages = await mongoDatabase
      .collection("messages")
      .find()
      .map(({ messages }) => ({
        messages,
      }))
      .toArray();

    res.json(messages);
  });

  router.post("/", async (req, res) => {
    const { author } = req.body;
    const { message } = req.body;

    await mongoDatabase
      .collection("messages")
      .updateOne({ room: 1 }, { $push: { messages: `${author}: ${message}` } });

    res.sendStatus(200);
  });

  return router;
}
