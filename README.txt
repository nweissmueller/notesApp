Overview
--------
SimpleNotes is a note-taking app that allows the user to create, update, and delete simple raw text notes. 
Each note contains a title and a content body. The application renders all notes in a sidebar, sorted by timestamp.
Notes are saved with MongoDB. 


Running
-------
You can start the SimpleNotes app by running `npm install`, then `npm start`. 
The app uses MongoDB storage, so be sure that the mongosh server is running (port mongodb://127.0.0.1) before starting the SmartNotes app.
The app uses no additional libraries beyond the packages included with the starter code.

Do we need to load data from init_db.mongodb? No

Start-up:
On the first start-up, when there are no notes in the DB, the app will open without any notes in the sidebar. 
To create a first note, enter text and/or title and click the New Note button. 
The app automatically saves new notes and any updates to existing notes if there is text in the note's title or body.
Whenever you open the app at a later time, all your note records in MongoDB will be loaded automatically and displayed in the sidebar. 
See the "Features" section below for more information on app functionality.


Features
--------
Create a New Note: Click the 'New Note' button to create a new note.
Edit Note: Click on a note in the sidebar to select it. You can then edit its title and content.
Save Note: The app saves changes automatically when you switch notes or create a new one.
Delete Note: Double-click on a note in the sidebar to delete it.
View Notes: All notes are displayed in the sidebar, containing titles and timestamps.
Title autocomplete: If you do not enter a title, the app will use the first 5 words in the text as the title.
Mobile-friendly: Resize the browser window to a narrow width (column) and see the app change its layout.
Accessibility: Aria-labels are included in HTML and have specific CSS to be hidden unless settings request them. 


Collaboration and libraries
---------------------------
I developed this project individually and without collaboration. 
This project does not overlap with another project or coursework for another class.
Libraries: Express is used for the backend server, MongoDB for the database, and JavaScript for frontend interactions.
External code: I leveraged a few code chunks from my CS193X homework for api/index.js, public/index.js, and app.js.
Inspiration: Some of the SimpleNotes app layout and functionality was inspired by Apple's `Notes` app.
