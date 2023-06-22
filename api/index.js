/*
api/index.js defines server:
==========
_sets up an Express.js server with a REST API for performing CRUD operations on note objects in a MongoDB database
_provides error handling using middleware, speficic HTTP error codes, and a catch-all route for undefined endpoints
*/

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

// import MongoClient
import { MongoClient, ObjectId } from "mongodb";
const DATABASE_NAME = "notes_db";

// Initialize api router and set global vars
let api = express.Router();
let Notes;

const initApi = async (app) => {
  app.set("json spaces", 2);
  app.use("/api", api);

  // Set up database connection and collection variables
  try {
    let connection = await MongoClient.connect("mongodb://127.0.0.1");
    let db = connection.db(DATABASE_NAME);
    Notes = db.collection("notes");
  } catch {
    throw new Error("Failed to connect to MongoDB server");
  }

  // Interpret request bodies as JSON and store them in req.body
  api.use(bodyParser.json());
  api.use(cors());

  // Middleware to handle repeated check for Error: 404 - No note with ID [note ID]
  api.use("/notes/:id", async (req, res, next) => {
    let { id } = req.params;
    let note = await Notes.findOne({ _id: new ObjectId(id) });
    if (!note) {
      res.status(404).json({ error: `Unknown ID ${id}` });
      return;
    }
    // Store note so the handler can get it
    res.locals.id = id;
    res.locals.note = note;
    // "Keep going": call the handler
    next();
  });

  /*** Notes App API ***/
  // GET all notes from MongoDB
  api.get("/notes", async (req, res) => {
    let notes = await Notes.find().toArray();
    res.json(notes);
  });

  // GET a specific note
  api.get("/notes/:id", async (req, res) => {
    let { note } = res.locals;
    res.json(note);
  });

  // POST a new note to the DB
  api.post("/notes", async (req, res) => {
    // Create the note content
    let note = req.body;
    note.title = note.title || note.content.split(/\s+/).slice(0, 5).join(" ");
    note.content = note.content || "";
    note.timestamp = new Date().toISOString();
    // insert note into DB, check result and handle response
    let result = await Notes.insertOne(note);
    if (result.insertedId) {
      let insertedNote = await Notes.findOne({ _id: new ObjectId(result.insertedId) });
      res.json(insertedNote);
    } else {
      res.status(500).json({ error: "Note was not inserted correctly" });
    }
  });

  // PATCH an existing note
  api.patch("/notes/:id", async (req, res) => {
    // Get specific note content and update
    let { id } = res.locals;
    let updatedNote = req.body;
    updatedNote.timestamp = new Date().toISOString();
    // update the new note
    await Notes.updateOne({ _id: new ObjectId(id) }, { $set: updatedNote });
    // provide back the new note
    updatedNote = await Notes.findOne({ _id: new ObjectId(id) });
    res.json(updatedNote);
  });

  // DELETE a specific note
  api.delete("/notes/:id", async (req, res) => {
    // find and delete a specific note and report back
    let { id } = res.locals;
    await Notes.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: `Note ${id} deleted` });
  });

  // Catch-all route to return a JSON error if endpoint not defined
  api.all("/*", (req, res) => {
    res.status(404).json({ error: `Endpoint not found: ${req.method} ${req.originalUrl}` });
  });
};

export default initApi;
