const { Client } = require("pg");
const express = require("express");
const app = express();
const port = 8080;

const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

const createCustomerTable = async (id) => {
  try {
      await client.query(
          `CREATE TABLE IF NOT EXISTS customer
          (
              id SERIAL,
              name text,
              address text,
              birthdate text,
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

const createProductTable = async (id) => {
  try {
      await client.query(
          `CREATE TABLE IF NOT EXISTS products
          (
              id SERIAL,
              customer_id int,
              name text,
              balance int,
              productcode text,
              interestrate text,
              CONSTRAINT products_pkey PRIMARY KEY (id)
          );`); 
      return true;
  } catch (error) {
      console.log("Table creation failed");
      console.error(error.stack);
      return false;
  }
};

const insertCustomer = async (name, address, birthdate, email, status) => {
  try {
      await client.query(
          `INSERT INTO customer (name, address, birthdate, email, status)  
          VALUES ($1, $2, $3, $4, $5)`, [name, address, birthdate, email, status]);
      console.log("added data");
      return true;
  } catch (error) {
      console.log("Data could not be added");
      console.error(error.stack);
      return false;
  }
};

const insertProduct = async (customer_id, name, balance, productcode, interestrate) => {
  try {
      await client.query(
          `INSERT INTO products (customer_id, name, balance, productcode, interestrate)  
          VALUES ($1, $2, $3, $4, $5)`, [customer_id, name, balance, productcode, interestrate]);
      console.log("added data");
      return true;
  } catch (error) {
      console.log("Data could not be added");
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

app.get("/product", async (req, res) => {
  const results = await client
    .query("SELECT * FROM products")
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

app.get("/getCustomerData", async (req, res) => {
  const results = await client
    .query("SELECT * FROM customer")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  for (let i = 0; i < results.length; i++) {
    results[i].products = await client
    .query("SELECT products.name, products.balance FROM products WHERE products.customer_id = " + results[i].id)
    .then((payload) => {
     return payload.rows;
    })
    .catch(() => {
     throw new Error("Query failed");
    });
  }
  console.log(results);
  res.setHeader("Content-Type", "application/json"); 
  res.status(200);
  res.send(JSON.stringify(results));
});


(async () => {
  await client.connect();
  createCustomerTable();
  createProductTable();
  insertCustomer("Hakan", "Adresse", "xx-xx-xxxx" ,"Email-Adresse", "Status");
  insertCustomer("Günther", "Adresse", "xx-xx-xxxx" ,"Email-Adresse", "Status");
  insertProduct("1", "Staubsauger", "700", "91203912" , "2");
  insertProduct("1", "Staubsauger", "700", "91203912" , "2");
  insertProduct("2", "Backofen", "700", "91203912" , "3");
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();