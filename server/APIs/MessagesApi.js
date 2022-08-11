import { Router } from "express";

export function MessagesApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {});

  router.post("/", async (req, res) => {
    const { username } = req.signedCookies;
  });

  return router;
}
