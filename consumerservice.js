const { Client } = require("pg");
const express = require("express");
const app = express();
const port = 8080;

const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

const createTable = async (id) => {
  try {
      await client.query(
          `CREATE TABLE IF NOT EXISTS customer
          (
              id SERIAL,
              name text,
              address text,
              email text,
              status text,
              CONSTRAINT customer_pkey PRIMARY KEY (id)
          );`); 
      return true;
  } catch (error) {
      console.log("Table creation failed");
      console.error(error.stack);
      return false;
  }
};

app.get("/customer", async (req, res) => {
  const results = await client
    .query("SELECT * FROM customer")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json"); 
  res.status(200);
  res.send(JSON.stringify(results));
});

(async () => {
  await client.connect();
  createTable();

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();