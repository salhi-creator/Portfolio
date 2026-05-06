import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

import express from "express";
import http from "http";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL);

import { json } from "stream/consumers";
import cors from "cors";

let app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-mu-lilac-xr8z38hue2.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
const server = http.createServer(app);
const port = process.env.PORT; // || 3800;
console.log("port", process.env.PORT);

server.listen(port, () => {
  console.log("server listen on port");
});

app.get("/auth",async (req, res) => {
  await client.connect();

  console.log("hit endpoint");
  let pass = req.query.pass;
  if (pass.trim() === process.env.SAGE_PASS) {
    return res.status(200).json({ auth: true });
  } else {
    return res.status(401).json({ auth: false });
  }
});

app.get("/giveMeData", async (req, res) => {
  try {
    console.log("for debuging , hit endpoint");
    const db = client.db("test");
    const col = db.collection("orders");

    let result = await col.find({}).toArray();
    console.log("result ", result);

    return res.json(result);
  } catch (err) {
    console.log("error fetching data .. \n", err);
    return res.status(500);
  }
});

process.on("SIGINT", async () => {
  await client.close();
});
