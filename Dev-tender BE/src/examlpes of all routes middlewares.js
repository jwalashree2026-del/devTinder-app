const express = require("express");

const app = express();

const PORT = 3000;

/* =====================================
   BUILT-IN MIDDLEWARE
===================================== */

// parse JSON body
app.use(express.json());

/* =====================================
   GLOBAL LOGGER MIDDLEWARE
===================================== */

app.use((req, res, next) => {
  console.log("---- GLOBAL LOGGER ----");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Time:", new Date().toLocaleTimeString());
  console.log("------------------------");
  next();
});

/* =====================================
   CUSTOM AUTH MIDDLEWARE
===================================== */

const userAuth = (req, res, next) => {
  console.log("User Auth Middleware");

  const isLoggedIn = true;

  if (isLoggedIn) {
    req.user = "Ramya";
    next();
  } else {
    res.status(401).send("User not logged in");
  }
};

const adminAuth = (req, res, next) => {
  console.log("Admin Auth Middleware");

  const isAdmin = true;

  if (isAdmin) {
    next();
  } else {
    res.status(403).send("Admin access denied");
  }
};

/* =====================================
   BASIC ROUTES
===================================== */

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

/* =====================================
   MULTIPLE ROUTE HANDLERS
===================================== */

app.get(
  "/test",
  (req, res, next) => {
    console.log("Handler 1");
    next();
  },
  (req, res, next) => {
    console.log("Handler 2");
    next();
  },
  (req, res) => {
    res.send("Handler 3 Final Response");
  }
);

/* =====================================
   DYNAMIC ROUTES
===================================== */

app.get("/user/:id", userAuth, (req, res) => {
  const userId = req.params.id;

  res.send({
    message: "Dynamic route working",
    userId: userId,
    user: req.user,
  });
});

/* =====================================
   QUERY PARAMS
===================================== */

app.get("/search", (req, res) => {
  const name = req.query.name;
  const age = req.query.age;

  res.send({
    message: "Query params received",
    name,
    age,
  });
});

/* =====================================
   POST API
===================================== */

app.post("/create-user", (req, res) => {
  console.log("Body:", req.body);

  res.send({
    message: "User created",
    data: req.body,
  });
});

/* =====================================
   PATCH API
===================================== */

app.patch("/update-user/:id", (req, res) => {
  res.send({
    message: "User updated",
    userId: req.params.id,
    newData: req.body,
  });
});

/* =====================================
   DELETE API
===================================== */

app.delete("/delete-user/:id", adminAuth, (req, res) => {
  res.send({
    message: "User deleted",
    userId: req.params.id,
  });
});

/* =====================================
   REGEX ROUTE
===================================== */

app.get(/.*fly$/, (req, res) => {
  res.send("Route ends with fly");
});

/* =====================================
   ERROR ROUTE
===================================== */

app.get("/error", (req, res, next) => {
  next(new Error("Something went wrong"));
});

/* =====================================
   ERROR HANDLING MIDDLEWARE
===================================== */

app.use((err, req, res, next) => {
  console.log("Error Middleware:", err.message);

  res.status(500).send({
    message: "Internal Server Error",
    error: err.message,
  });
});

/* =====================================
   SERVER LISTEN
===================================== */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});