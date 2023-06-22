/*
public/sidebar.js defines the Sidebar class:
==========
_the class controls the behavior and appearance of the sidebar in the SmartNotes application
_it displays a list of note items and handles the user interactions associated with these items
*/

import Notes from "./notes.js";

export default class Sidebar {
  constructor(handleSelect, handleDelete) {
    // Create Notes instance
    this._Notes = new Notes();

    // Sidebar list input
    this._notesList = document.querySelector(".notes-list");

    // Bind event handlers
    this._handleSelect = handleSelect;
    this._handleDelete = handleDelete;
  }

  _createSidebarTile(note) {
    // Create formatted timestring
    let dateToday = new Date(note.timestamp).toLocaleDateString();
    let timeNow = new Date(note.timestamp).toLocaleTimeString("en-US", { hour12: false, hour: "numeric", minute: "numeric" });
    // Create new DOM element and add content to new side-bar note
    let newNote = document.createElement("div");
    newNote.innerText = `${note.title}\n${dateToday} ${timeNow}`;
    newNote.classList.add("note-item");
    newNote.dataset.noteId = note._id;
    // Add select and delete eventlisteners to the note
    newNote.addEventListener("click", () => this._handleSelect(note._id));
    newNote.addEventListener("dblclick", this._handleDelete);
    return newNote;
  }

  _addNoteToSidebar(note) {
    // Create new sidebar note
    let newNote = this._createSidebarTile(note);
    // Add new note to notes list
    this._notesList.prepend(newNote);
  }

  _clearSidebar() {
    this._notesList.innerHTML = "";
  }

  async _renderSidebar() {
    // Get all notes in MongoDB collection
    let notes = await this._Notes.fetchAllNotes();
    // Sort notes by most recently added/edited timestamp
    notes.sort((a, b) => new Date(b.timestamp) > new Date(a.timestamp) ? -1 : 1);
    // Update the sidebar with notes in order
    this._clearSidebar();
    notes.forEach((note) => this._addNoteToSidebar(note));
  }

  _selectNoteInSidebar(id) {
    // Add 'selected' class to only the selected note in the sidebar
    let allNotes = document.querySelectorAll(".note-item");
    // deselect all notes if new New Note button is clicked
    allNotes.forEach((newNote) => {
      newNote.classList.remove("selected");
      // if click on note in sidebar select that note
      if (newNote.dataset.noteId === id) {
        newNote.classList.add("selected");
      }
    });
  }

  _deselectAllNotes() {
    // deselect all notes if new New Note button is clicked
    let allNotes = document.querySelectorAll(".note-item");
    allNotes.forEach((newNote) => {
      newNote.classList.remove("selected");
    });
  }
}
