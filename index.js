import express, { response } from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express();

const PORT = 4000;

// Using the public folder at the root of our project
app.use(express.static("public"));

// Using the images folder at the route /images
app.use("/images", express.static("images"));

// Using express.json and express.urlencoded
//app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// GET
app.get("/", (request, response) => {
  response.json(data);
});

// POST - express.json and express.urlencoded
app.post("/item", (request, response) => {
  console.log(request.body);
  response.send(request.body);
});

// GET with next
app.get(
  "/next",
  (req, res, next) => {
    console.log("The response will be sent by the next function.");
    next();
  },
  (req, res) => {
    res.send("I just set up a route with a second callback");
  }
);

// GET - redirect method
app.get("/redirect", (request, response) => {
  response.redirect("http://linkedin.com");
});

// GET - download method
app.get("/download", (request, response) => {
  response.download("./public/mountains_1.jpeg");
});

// GET with routing parameters
app.get("/class/:id", (req, res) => {
  const studentId = Number(req.params.id);

  const student = data.find((stud) => stud.id === studentId);

  res.send(student);
});

// Route chaining
app
  .route("/class")
  .get((request, response) => {
    //response.send("Retrieve class info");
    throw new Error();
  })
  .post((request, response) => {
    response.send("Create class info");
  })
  .put((request, response) => {
    response.send("Update class info");
  });

// // GET
// app.get("/class", (request, response) => {
//   response.send("Retrieve class info");
// });

// // POST
// app.post("/class", (request, response) => {
//   response.send("Create class info");
// });

// // PUT
// app.put("/class", (request, response) => {
//   response.send("Update class info");
// });

// POST
app.post("/create", (request, response) => {
  response.send("This is a POST request at /create");
});

// PUT
app.put("/edit", (request, response) => {
  response.send("This is a PUT request at /edit");
});

// DELETE
app.delete("/delete", (request, response) => {
  response.send("This is a DELETE request at /delete");
});

app.use((err, req, res, next) => {
  console.error(err);
  response.status(500).send("Something is broken!");
});

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
