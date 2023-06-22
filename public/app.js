/*
public/app.js defines the App class and main logic for the SmartNotes app:
==========
_contains functionality for creating, selecting, saving, and deleting notes
_handles interactions with the sidebar that contains tiles of all note records in DB
*/

import Notes from "./notes.js";
import Sidebar from "./sidebar.js";

export default class App {
  constructor() {
    // Create a Notes instance
    this._Notes = new Notes();

    // Create Sidebar instance and pass App event handlers so they need not be repeated there
    this._Sidebar = new Sidebar(this._handleSelect.bind(this), this._handleDelete.bind(this));

    // Variables
    this._hasText = false;
    this._currentNoteId = null;

    // Bind event handlers
    this._handleAdd = this._handleAdd.bind(this);
    this._handleSave = this._handleSave.bind(this);
    this._handleInput = this._handleInput.bind(this);

    // Title text intput
    this._titleInput = document.querySelector(".note-title");
    this._titleInput.addEventListener("input", this._handleInput);

    // Content text intput
    this._contentInput = document.querySelector(".note-content");
    this._contentInput.addEventListener("input", this._handleInput);

    // New note button
    this._newNoteButton = document.querySelector(".new-note-btn");
    this._newNoteButton.addEventListener("click", this._handleAdd);

    // Initial sidebar render
    this._Sidebar._renderSidebar();
  }

  async _selectNote(id) {
    // Get a specific note from MongoDB collection
    let note = await this._Notes.fetchNote(id);
    if (note) {
      // if the note exists in DB, set global vars to its values
      this._titleInput.value = note.title;
      this._contentInput.value = note.content;
      this._currentNoteId = note._id;
      // Add 'selected' class to only the selected note in the sidebar
      this._Sidebar._selectNoteInSidebar(id);
    }
  }

  /* Class Methods and Handler Functions */
  _handleInput() {
    // user has provided inputs
    this._hasText = true;
  }

  async _handleSelect(id) {
    // Before navigating away from the current note, if it has content, automatically save the current note
    if (this._hasText) {
      try {
        // Save current note and select the requested note
        await this._handleSave(this._currentNoteId, this._titleInput.value, this._contentInput.value);
        await this._selectNote(id);
        // Reset its content indicator as main content div view resets to empty template
        this._hasText = false;
      } catch (e) {
        throw new Error(`Error saving current note: ${e}`);
      }
    } else {
      // current note has no content, don't save and select requested note
      await this._selectNote(id);
    }
  }

  async _handleAdd() {
    // On New Note button, save note if template has content
    if (this._hasText) {
      await this._handleSave();
      this._hasText = false;
    }
    // After saving the note, reset current note to empty template
    this._currentNoteId = null;
    this._titleInput.value = "";
    this._contentInput.value = "";
    // Deselect all notes in sidebar by removing 'selected' class
    this._Sidebar._deselectAllNotes();
  }

  async _handleSave() {
    // Capture current content
    let savedNote;
    let title = this._titleInput.value || "";
    let content = this._contentInput.value || "";
    // Update an existing note
    if (this._currentNoteId) {
      savedNote = await this._Notes.updateNote(this._currentNoteId, title, content);
    } else {
      // Create a new note
      savedNote = await this._Notes.createNote(title, content);
      // Set current note id to _id record created by MongoDB and add to sidebar
      this._currentNoteId = savedNote._id;
      this._Sidebar._addNoteToSidebar(savedNote);
    }
    // Reset content indicator to reflect empty content template view
    this._hasText = false;
    this._Sidebar._renderSidebar();
  }

  async _handleDelete(event) {
    // Prevent default
    event.preventDefault();
    let noteId = event.target.dataset.noteId;
    // If a note is selected and event occured
    if (noteId) {
      // Check if user wants to delete note
      let confirmDelete = confirm("Do you want to delete this note?");
      if (confirmDelete) {
        // Delete the note only if user confirmed
        await this._Notes.deleteNote(noteId);
        this._Sidebar._renderSidebar();
      }
    }
    // Reset content input fields to default
    this._titleInput.value = "";
    this._contentInput.value = "";
  }
}
