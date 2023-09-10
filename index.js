const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => {
    console.log(note.id, typeof note.id, id, typeof id, note.id === id);
    return note.id === id;
  });

  console.log(note);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
  response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  notes = notes.filter((note) => note.id !== id);

  if (note) response.statusMessage = `note deletes ${note.content}`;
  else response.statusMessage = "note not found";

  response.status(204).end();
});

const generateId = () => {
  const nextID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return nextID + 1;
};

app.post("/api/notes", (request, response) => {
  // const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;

  if (!request.body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const maxID = generateId();
  const note = request.body;
  note.id = maxID;
  notes = notes.concat(note);
  console.log(note);
  response.json(notes);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
