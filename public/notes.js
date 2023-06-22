/*
public/notes.js defines the Notes class:
==========
_provides an interface and methods to perform create, read, update, delete on notes via a REST API
_encapsulates all client-side API interactions and handles HTTP responses
*/

export default class Notes {
  constructor(_uri = "/api/notes") {
    this._uri = _uri;
  }

  /*** Notes Client-side of API ***/
  // GET all notes from MongoDB
  async fetchAllNotes() {
    let res = await fetch(this._uri, { method: "GET" });
    return await this._handleResponse(res);
  }

  // GET a specific note
  async fetchNote(id) {
    // create URL
    let url = this._uri;
    if (id) url += `/${id}`;
    // fetch data
    let res = await fetch(url, { method: "GET" });
    // return content or handle errors
    return await this._handleResponse(res);
  }

  // POST a new note to the DB
  async createNote(title = "", content = "") {
    let reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, timestamp: new Date().toISOString() })
    };
    let res = await fetch(this._uri, reqOptions);
    return await this._handleResponse(res);
  }

  // PATCH an existing note
  async updateNote(id, title, content) {
    let url = `${this._uri}/${id}`;
    let reqOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, timestamp: new Date().toISOString() })
    };
    let res = await fetch(url, reqOptions);
    // error checks and update note id with MongoDB created _id
    if (res.status === 200) {
      let note = await res.json();
      return { ...note, id: note._id };
    } else {
      let errorMsg = await res.json();
      throw new Error(`HTTP status: ${res.status}\nServer response body: ${errorMsg}`);
    }
  }

  // DELETE a specific note
  async deleteNote(id) {
    let url = `${this._uri}/${id}`;
    let reqOptions = {
      method: "DELETE"
    };
    let res = await fetch(url, reqOptions);
    return this._handleResponse(res);
  }

  // Define server response handler function
  async _handleResponse(res) {
    //return record content if response ok
    if (res.status === 200) {
      return await res.json();
    } else {
      // else provide details on error
      let errorMsg = await res.json();
      throw new Error(`HTTP status: ${res.status}\nServer response body: ${errorMsg}`);
    }
  }
}
