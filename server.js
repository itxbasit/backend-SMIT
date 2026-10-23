import express from "express";
import { connect_DB } from "./app/DB/index.js";
import { configDotenv } from "dotenv";
import router from "./app/router.js";
import os from "os";

const app = express();

configDotenv();

connect_DB();

app.use(express.json());

const PORT = process.env.PORT;


app.use("/v1", router)

app.get("/test", (req, res) => {
  res.json({
    memory: os.freemem(),

    platform: os.arch(),

    uptime: os.homedir(),
  });
});

app.listen(PORT, () => {
  console.log(`Listen at ${PORT}`);
});
