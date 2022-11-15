const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");
var cors = require("cors");
const mysql = require("mysql");

// 환경변수 사용
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var connection;

// connection = mysql.createConnection({
//   host: process.env.JAWSDB_HOST,
//   user: process.env.JAWSDB_USER,
//   password: process.env.JAWSDB_PASSWORD,
//   database: process.env.JAWSDB_DATABASE,
// });

connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// 데이터베이스와 연동
connection.connect();

app.use(
  cors({
    origin: ["http://localhost:8000/", "http://localhost:3000/"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.get("/", (req, res) => {
  res.send("Hello!");
});

// events code
app.get("/api/events", (req, res) => {
  connection.query("SELECT * from events_table", (err, rows, fields) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.send({ rows });
    }
  });
});
app.post("/api/events/create", (req, res) => {
  console.log(req.body);
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const start = req.body.start;
  const end = req.body.end;
  connection.query(
    `INSERT INTO events_table (title, subtitle, start, end) VALUES(?,?,?,?)`,
    [title, subtitle, start, end],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
});
app.post("/api/events/delete", (req, res) => {
  const id = req.body.idx;

  connection.query(
    `DELETE FROM events_table where id=?`,
    [id],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
});

// todos code
app.get("/api/todos", (req, res) => {
  connection.query("SELECT * from todos_table", (err, rows, fields) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.send({ rows });
    }
  });
});

// todos code
app.post("/api/todos/create", (req, res) => {
  const text = req.body.text;
  const date = req.body.date;
  connection.query(
    `INSERT INTO todos_table (text, date) VALUES(?,?)`,
    [text, date],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
});
app.post("/api/todos/delete", (req, res) => {
  const id = req.body.id;
  connection.query(
    "DELETE FROM todos_table where id=?",
    [id],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
});
app.post("/api/todos/edit", (req, res) => {
  const text = req.body.text;
  const id = req.body.id;
  connection.query(
    `UPDATE lntgg9pdv0ixqjiq.todos_table SET text = ? WHERE ( id = ?)`,
    [text, id],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
});
app.post("/api/todos/checked", (req, res) => {
  const isChecked = req.body.isChecked;
  const id = req.body.id;
  connection.query(
    `UPDATE lntgg9pdv0ixqjiq.todos_table SET isChecked = ?WHERE ( id = ?)`,
    [isChecked, id],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        throw err;
      }
    }
  );
});

app.listen(port, () => {
  console.log(`localhost:${port} 서버 오픈!`);
});
